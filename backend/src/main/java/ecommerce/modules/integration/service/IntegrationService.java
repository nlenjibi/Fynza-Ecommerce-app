package ecommerce.modules.integration.service;

import ecommerce.modules.integration.dto.IntegrationResult;

import java.math.BigDecimal;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

/**
 * IntegrationService Interface
 * 
 * Orchestrates parallel calls to external APIs including shipping calculations,
 * tax calculations, and fraud detection with timeout protection and fallback behaviors.
 */
public interface IntegrationService {

    /**
     * Calculate shipping costs for an order
     * @param orderId The order ID
     * @param destinationAddress The destination address
     * @param weight The total weight of items
     * @return CompletableFuture containing shipping cost
     */
    CompletableFuture<BigDecimal> calculateShipping(UUID orderId, String destinationAddress, Double weight);

    /**
     * Calculate tax for an order
     * @param orderId The order ID
     * @param subtotal The order subtotal
     * @param state The state for tax calculation
     * @return CompletableFuture containing tax amount
     */
    CompletableFuture<BigDecimal> calculateTax(UUID orderId, BigDecimal subtotal, String state);

    /**
     * Check for fraud
     * @param orderId The order ID
     * @param customerId The customer ID
     * @param amount The order amount
     * @return CompletableFuture containing fraud check result
     */
    CompletableFuture<Boolean> checkFraud(UUID orderId, UUID customerId, BigDecimal amount);

    /**
     * Orchestrate all external API calls in parallel
     * @param orderId The order ID
     * @param destinationAddress The destination address
     * @param weight The total weight
     * @param subtotal The subtotal
     * @param state The state
     * @param customerId The customer ID
     * @return CompletableFuture containing IntegrationResult with all results
     */
    CompletableFuture<IntegrationResult> processAllIntegrations(UUID orderId, String destinationAddress,
            Double weight, BigDecimal subtotal, String state, UUID customerId);
}
