package ecommerce.modules.integration.service.impl;

import ecommerce.modules.integration.dto.IntegrationResult;
import ecommerce.modules.integration.service.IntegrationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import static java.util.concurrent.CompletableFuture.allOf;

/**
 * ExternalIntegrationServiceImpl
 * 
 * Orchestrates parallel calls to external APIs with timeout protection and fallback behaviors.
 * Simulates shipping calculations, tax calculations, and fraud detection.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ExternalIntegrationServiceImpl implements IntegrationService {

    private static final long DEFAULT_TIMEOUT_SECONDS = 5;
    private static final BigDecimal DEFAULT_SHIPPING_COST = new BigDecimal("5.99");
    private static final BigDecimal DEFAULT_TAX_RATE = new BigDecimal("0.08");

    @Value("${integration.shipping.timeout-seconds:5}")
    private long shippingTimeoutSeconds;

    @Value("${integration.tax.timeout-seconds:5}")
    private long taxTimeoutSeconds;

    @Value("${integration.fraud.timeout-seconds:5}")
    private long fraudTimeoutSeconds;

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<BigDecimal> calculateShipping(UUID orderId, String destinationAddress, Double weight) {
        log.info("Calculating shipping for order {} to address {}", orderId, destinationAddress);

        return CompletableFuture.supplyAsync(() -> {
            try {
                // Simulate API call delay
                Thread.sleep(500 + (long) (Math.random() * 1000));

                // Calculate shipping based on weight (placeholder logic)
                BigDecimal baseRate = new BigDecimal("3.99");
                BigDecimal weightCharge = BigDecimal.valueOf(weight * 0.50);
                BigDecimal shippingCost = baseRate.add(weightCharge).setScale(2, RoundingMode.HALF_UP);

                log.info("Shipping calculated for order {}: ${}", orderId, shippingCost);
                return shippingCost;

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                log.warn("Shipping calculation interrupted for order {}", orderId);
                return DEFAULT_SHIPPING_COST;
            } catch (Exception e) {
                log.error("Shipping calculation failed for order {}: {}", orderId, e.getMessage());
                return DEFAULT_SHIPPING_COST; // Fallback
            }
        }).orTimeout(DEFAULT_TIMEOUT_SECONDS, TimeUnit.SECONDS)
                .exceptionally(ex -> {
                    log.warn("Shipping calculation timed out for order {}, using fallback", orderId);
                    return DEFAULT_SHIPPING_COST;
                });
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<BigDecimal> calculateTax(UUID orderId, BigDecimal subtotal, String state) {
        log.info("Calculating tax for order {} in state {}", orderId, state);

        return CompletableFuture.supplyAsync(() -> {
            try {
                // Simulate API call delay
                Thread.sleep(300 + (long) (Math.random() * 700));

                // Calculate tax based on state (simplified placeholder)
                BigDecimal taxRate = getTaxRateForState(state);
                BigDecimal taxAmount = subtotal.multiply(taxRate).setScale(2, RoundingMode.HALF_UP);

                log.info("Tax calculated for order {}: ${} (rate: {})", orderId, taxAmount, taxRate);
                return taxAmount;

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                log.warn("Tax calculation interrupted for order {}", orderId);
                return subtotal.multiply(DEFAULT_TAX_RATE).setScale(2, RoundingMode.HALF_UP);
            } catch (Exception e) {
                log.error("Tax calculation failed for order {}: {}", orderId, e.getMessage());
                return subtotal.multiply(DEFAULT_TAX_RATE).setScale(2, RoundingMode.HALF_UP); // Fallback
            }
        }).orTimeout(DEFAULT_TIMEOUT_SECONDS, TimeUnit.SECONDS)
                .exceptionally(ex -> {
                    log.warn("Tax calculation timed out for order {}, using fallback", orderId);
                    return subtotal.multiply(DEFAULT_TAX_RATE).setScale(2, RoundingMode.HALF_UP);
                });
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<Boolean> checkFraud(UUID orderId, UUID customerId, BigDecimal amount) {
        log.info("Checking fraud for order {} (customer: {}, amount: ${})", orderId, customerId, amount);

        return CompletableFuture.supplyAsync(() -> {
            try {
                // Simulate API call delay
                Thread.sleep(400 + (long) (Math.random() * 800));

                // Fraud detection logic (simplified placeholder)
                // In production, this would call a real fraud detection service
                boolean isHighRisk = amount.compareTo(new BigDecimal("10000")) > 0;
                
                if (isHighRisk) {
                    log.warn("High-value order detected for order {}: ${}", orderId, amount);
                }

                log.info("Fraud check completed for order {}: {}", orderId, !isHighRisk ? "PASSED" : "FLAGGED");
                return !isHighRisk; // Return false (flagged) for high-risk orders

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                log.warn("Fraud check interrupted for order {}", orderId);
                return true; // Default to pass on interruption
            } catch (Exception e) {
                log.error("Fraud check failed for order {}: {}", orderId, e.getMessage());
                return true; // Default to pass on failure (fail-open for UX)
            }
        }).orTimeout(DEFAULT_TIMEOUT_SECONDS, TimeUnit.SECONDS)
                .exceptionally(ex -> {
                    log.warn("Fraud check timed out for order {}, defaulting to pass", orderId);
                    return true;
                });
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<IntegrationResult> processAllIntegrations(UUID orderId, String destinationAddress,
            Double weight, BigDecimal subtotal, String state, UUID customerId) {
        
        log.info("Processing all integrations for order {}", orderId);

        // Call all external APIs in parallel
        CompletableFuture<BigDecimal> shippingFuture = calculateShipping(orderId, destinationAddress, weight);
        CompletableFuture<BigDecimal> taxFuture = calculateTax(orderId, subtotal, state);
        CompletableFuture<Boolean> fraudFuture = checkFraud(orderId, customerId, subtotal);

        // Wait for all to complete
        return allOf(shippingFuture, taxFuture, fraudFuture)
                .thenApply(v -> {
                    BigDecimal shippingCost;
                    BigDecimal taxAmount;
                    boolean fraudPassed;
                    boolean shippingSuccess = false;
                    boolean taxSuccess = false;
                    boolean fraudSuccess = false;

                    try {
                        shippingCost = shippingFuture.get();
                        shippingSuccess = true;
                    } catch (Exception e) {
                        log.error("Failed to get shipping result: {}", e.getMessage());
                        shippingCost = DEFAULT_SHIPPING_COST;
                    }

                    try {
                        taxAmount = taxFuture.get();
                        taxSuccess = true;
                    } catch (Exception e) {
                        log.error("Failed to get tax result: {}", e.getMessage());
                        taxAmount = subtotal.multiply(DEFAULT_TAX_RATE).setScale(2, RoundingMode.HALF_UP);
                    }

                    try {
                        fraudPassed = fraudFuture.get();
                        fraudSuccess = true;
                    } catch (Exception e) {
                        log.error("Failed to get fraud result: {}", e.getMessage());
                        fraudPassed = true; // Fail open
                    }

                    IntegrationResult result = IntegrationResult.builder()
                            .shippingCost(shippingCost)
                            .taxAmount(taxAmount)
                            .fraudCheckPassed(fraudPassed)
                            .fraudRiskLevel(fraudPassed ? "LOW" : "HIGH")
                            .shippingSuccess(shippingSuccess)
                            .taxSuccess(taxSuccess)
                            .fraudCheckSuccess(fraudSuccess)
                            .build();

                    log.info("All integrations processed for order {}: success={}, shipping=${}, tax=${}, fraud={}",
                            orderId, result.isAllSuccessful(), shippingCost, taxAmount, fraudPassed);

                    return result;
                });
    }

    /**
     * Get tax rate for a given state (simplified placeholder)
     */
    private BigDecimal getTaxRateForState(String state) {
        if (state == null) {
            return DEFAULT_TAX_RATE;
        }
        
        return switch (state.toUpperCase()) {
            case "CA", "NY", "TX" -> new BigDecimal("0.0825"); // Higher tax states
            case "OR", "MT", "NH" -> BigDecimal.ZERO; // No sales tax states
            case "AK" -> new BigDecimal("0.0216"); // Alaska average
            default -> DEFAULT_TAX_RATE;
        };
    }
}
