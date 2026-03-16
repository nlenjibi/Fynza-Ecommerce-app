package ecommerce.modules.search.async;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;

/**
 * SearchIndexingService
 * 
 * Handles asynchronous search indexing with retry mechanisms and coalescing of updates.
 * Supports parallel indexing and batch processing for improved performance.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class SearchIndexingService {

    private static final int MAX_RETRIES = 3;
    private static final long INITIAL_BACKOFF_MS = 1000;
    private static final long COALESCING_WINDOW_MS = 500;
    private static final int BATCH_SIZE = 50;

    private final Map<String, Long> pendingUpdates = new ConcurrentHashMap<>();
    private final Map<String, String> updateOperations = new ConcurrentHashMap<>();
    private final Map<String, Consumer<Boolean>> completionHandlers = new ConcurrentHashMap<>();
    
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    /**
     * Index a product asynchronously with retry mechanism
     */
    @Async("searchExecutor")
    public CompletableFuture<Void> indexProductAsync(Long productId, String operation) {
        return indexProductAsync(productId, operation, null);
    }

    /**
     * Index a product asynchronously with retry mechanism and completion callback
     */
    @Async("searchExecutor")
    public CompletableFuture<Void> indexProductAsync(Long productId, String operation, Consumer<Boolean> completionHandler) {
        String correlationId = productId + "-" + operation;
        log.info("[{}] Starting search indexing for product: {}, operation: {}", 
                correlationId, productId, operation);

        if (completionHandler != null) {
            completionHandlers.put(correlationId, completionHandler);
        }

        return attemptIndex(productId, operation, 0)
                .thenRun(() -> {
                    log.info("[{}] Search indexing completed for product: {}", correlationId, productId);
                    pendingUpdates.remove(productId.toString());
                    updateOperations.remove(productId.toString());
                    
                    Consumer<Boolean> handler = completionHandlers.remove(correlationId);
                    if (handler != null) {
                        handler.accept(true);
                    }
                });
    }

    /**
     * Index multiple products in a batch
     */
    @Async("searchExecutor")
    public CompletableFuture<Void> indexBatchAsync(java.util.List<Long> productIds, String operation) {
        log.info("Starting batch indexing for {} products", productIds.size());
        
        java.util.List<CompletableFuture<Void>> futures = new java.util.ArrayList<>();
        
        for (int i = 0; i < productIds.size(); i += BATCH_SIZE) {
            int end = Math.min(i + BATCH_SIZE, productIds.size());
            java.util.List<Long> batch = productIds.subList(i, end);
            
            CompletableFuture<Void> batchFuture = CompletableFuture.allOf(
                    batch.stream()
                        .map(id -> indexProductAsync(id, operation))
                        .toArray(CompletableFuture[]::new)
            );
            futures.add(batchFuture);
        }
        
        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenRun(() -> log.info("Batch indexing completed for {} products", productIds.size()));
    }

    /**
     * Attempt to index with exponential backoff retry
     */
    private CompletableFuture<Void> attemptIndex(Long productId, String operation, int attempt) {
        if (attempt >= MAX_RETRIES) {
            log.error("Search indexing failed after {} attempts for product: {}", MAX_RETRIES, productId);
            String correlationId = productId + "-" + operation;
            Consumer<Boolean> handler = completionHandlers.remove(correlationId);
            if (handler != null) {
                handler.accept(false);
            }
            return CompletableFuture.completedFuture(null);
        }

        return CompletableFuture.runAsync(() -> {
            try {
                log.debug("Indexing product: {} (attempt {}/{})", productId, attempt + 1, MAX_RETRIES);
                pendingUpdates.put(productId.toString(), System.currentTimeMillis());
                updateOperations.put(productId.toString(), operation);
                
                // Simulate actual indexing work
                // In production, this would call Elasticsearch, Solr, or other search engine
                Thread.sleep(100);
                
                log.debug("Successfully indexed product: {}", productId);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException("Indexing interrupted", e);
            } catch (Exception e) {
                log.warn("Indexing failed for product: {}, scheduling retry", productId, e);
                throw new RuntimeException("Indexing failed", e);
            }
        }).exceptionally(ex -> {
            log.warn("Indexing failed for product: {}, scheduling retry (attempt {})", productId, attempt + 1);
            long backoffMs = INITIAL_BACKOFF_MS * (long) Math.pow(2, attempt);
            try {
                TimeUnit.MILLISECONDS.sleep(backoffMs);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return attemptIndex(productId, operation, attempt + 1).join();
        });
    }

    /**
     * Coalesce updates - groups multiple updates for the same product
     * Uses a delayed execution to batch multiple rapid updates together
     */
    public void coalesceUpdates(Long productId, String operation) {
        String key = productId.toString();
        pendingUpdates.put(key, System.currentTimeMillis());
        updateOperations.put(key, operation);
        
        log.debug("Coalescing update for product: {}, operation: {}", productId, operation);
        
        // Schedule actual indexing after a delay to coalesce rapid updates
        scheduler.schedule(() -> {
            String currentOperation = updateOperations.get(key);
            if (currentOperation != null) {
                log.debug("Executing coalesced update for product: {}", productId);
                indexProductAsync(productId, currentOperation);
            }
        }, COALESCING_WINDOW_MS, TimeUnit.MILLISECONDS);
    }

    /**
     * Coalesce updates with completion handler
     */
    public void coalesceUpdates(Long productId, String operation, Consumer<Boolean> completionHandler) {
        String key = productId.toString();
        pendingUpdates.put(key, System.currentTimeMillis());
        updateOperations.put(key, operation);
        
        log.debug("Coalescing update for product: {}, operation: {}", productId, operation);
        
        // Schedule actual indexing after a delay to coalesce rapid updates
        scheduler.schedule(() -> {
            String currentOperation = updateOperations.get(key);
            if (currentOperation != null) {
                log.debug("Executing coalesced update for product: {}", productId);
                indexProductAsync(productId, currentOperation, completionHandler);
            }
        }, COALESCING_WINDOW_MS, TimeUnit.MILLISECONDS);
    }

    /**
     * Trigger full reindex
     */
    @Async("searchExecutor")
    public CompletableFuture<Void> reindexAllAsync() {
        log.info("Starting full search reindex");
        
        return CompletableFuture.runAsync(() -> {
            // Simulate full reindex
            // In production, this would iterate all products and reindex them
            try {
                Thread.sleep(500);
                log.info("Full search reindex completed");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException("Reindex interrupted", e);
            }
        });
    }

    /**
     * Check if indexing is complete for a product
     */
    public boolean isIndexingComplete(Long productId) {
        return !pendingUpdates.containsKey(productId.toString());
    }

    /**
     * Get pending update count
     */
    public int getPendingUpdateCount() {
        return pendingUpdates.size();
    }

    /**
     * Clear all pending updates
     */
    public void clearPendingUpdates() {
        pendingUpdates.clear();
        updateOperations.clear();
        log.info("Cleared all pending search updates");
    }

    /**
     * Shutdown the scheduler
     */
    public void shutdown() {
        scheduler.shutdown();
        try {
            if (!scheduler.awaitTermination(5, TimeUnit.SECONDS)) {
                scheduler.shutdownNow();
            }
        } catch (InterruptedException e) {
            scheduler.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }
}
