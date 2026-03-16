package ecommerce.exception;

import lombok.extern.slf4j.Slf4j;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.net.URI;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String BASE_URI = "https://api.fynza.com/errors";

    // 400 – Bad Request
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Validation failed");
        problem.setType(URI.create(BASE_URI + "/validation-failed"));
        problem.setTitle("Validation Failed");

        Map<String, String> errors = ex.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(
                        e -> e.getField(),
                        e -> e.getDefaultMessage() != null ? e.getDefaultMessage() : "Invalid value"
                ));
        problem.setProperty("errors", errors);
        
        log.warn("Validation failure: {}", errors);
        return problem;
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ProblemDetail handleConstraintViolation(jakarta.validation.ConstraintViolationException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Constraint violation");
        problem.setType(URI.create(BASE_URI + "/constraint-violation"));
        problem.setTitle("Bad Request");

        Map<String, String> errors = ex.getConstraintViolations().stream()
                .collect(Collectors.toMap(
                        cv -> cv.getPropertyPath().toString(),
                        cv -> cv.getMessage()
                ));
        problem.setProperty("errors", errors);
        
        log.warn("Constraint violation: {}", errors);
        return problem;
    }

    @ExceptionHandler(BadRequestException.class)
    public ProblemDetail handleBadRequest(BadRequestException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
        problem.setType(URI.create(BASE_URI + "/bad-request"));
        problem.setTitle("Bad Request");
        
        log.warn("Bad request: {}", ex.getMessage());
        return problem;
    }

    // 401 – Unauthorized
    @ExceptionHandler({BadCredentialsException.class, UsernameNotFoundException.class})
    public ProblemDetail handleBadCredentials(AuthenticationException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        problem.setType(URI.create(BASE_URI + "/unauthorized"));
        problem.setTitle("Unauthorized");
        
        log.warn("Authentication failure: {}", ex.getMessage());
        return problem;
    }

    @ExceptionHandler({AccountExpiredException.class, LockedException.class, DisabledException.class, CredentialsExpiredException.class})
    public ProblemDetail handleAccountStatus(AuthenticationException ex) {
        String message = resolveAccountStatusMessage(ex);
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, message);
        problem.setType(URI.create(BASE_URI + "/unauthorized"));
        problem.setTitle("Unauthorized");
        
        log.warn("Account status failure: {}", ex.getMessage());
        return problem;
    }

    @ExceptionHandler({TokenNotFoundException.class, TokenExpiredException.class, InvalidTokenException.class})
    public ProblemDetail handleTokenExceptions(RuntimeException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, ex.getMessage());
        problem.setType(URI.create(BASE_URI + "/unauthorized"));
        problem.setTitle("Unauthorized");
        
        log.warn("Token error: {}", ex.getMessage());
        return problem;
    }

    // 403 – Forbidden
    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDenied(AccessDeniedException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, "You do not have permission to access this resource");
        problem.setType(URI.create(BASE_URI + "/forbidden"));
        problem.setTitle("Forbidden");
        
        log.warn("Access denied: {}", ex.getMessage());
        return problem;
    }

    @ExceptionHandler(AuthorizationException.class)
    public ProblemDetail handleAuthorizationException(AuthorizationException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, ex.getMessage());
        problem.setType(URI.create(BASE_URI + "/forbidden"));
        problem.setTitle("Forbidden");
        
        log.warn("Authorization failure: {}", ex.getMessage());
        return problem;
    }

    // 404 – Not Found
    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleResourceNotFound(ResourceNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problem.setType(URI.create(BASE_URI + "/not-found"));
        problem.setTitle("Not Found");
        
        log.warn("Resource not found: {}", ex.getMessage());
        return problem;
    }

    @ExceptionHandler(CartNotFoundException.class)
    public ProblemDetail handleCartNotFound(CartNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problem.setType(URI.create(BASE_URI + "/not-found"));
        problem.setTitle("Not Found");
        
        log.warn("Cart not found: {}", ex.getMessage());
        return problem;
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ProblemDetail handleNoStaticResource(NoResourceFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, "Resource not found");
        problem.setType(URI.create(BASE_URI + "/not-found"));
        problem.setTitle("Not Found");
        
        log.debug("Static resource not found: {}", ex.getMessage());
        return problem;
    }

    // 409 – Conflict
    @ExceptionHandler(DuplicateResourceException.class)
    public ProblemDetail handleDuplicateResource(DuplicateResourceException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
        problem.setType(URI.create(BASE_URI + "/conflict"));
        problem.setTitle("Conflict");
        
        log.warn("Duplicate resource: {}", ex.getMessage());
        return problem;
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ProblemDetail handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, "A data conflict occurred. The resource may already exist.");
        problem.setType(URI.create(BASE_URI + "/conflict"));
        problem.setTitle("Conflict");
        
        log.warn("Data integrity violation: {}", ex.getMessage());
        return problem;
    }

    // 422 – Unprocessable Entity
    @ExceptionHandler(InsufficientStockException.class)
    public ProblemDetail handleInsufficientStock(InsufficientStockException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, ex.getMessage());
        problem.setType(URI.create(BASE_URI + "/insufficient-stock"));
        problem.setTitle("Insufficient Stock");
        
        log.warn("Insufficient stock: {}", ex.getMessage());
        return problem;
    }

    // 429 – Too Many Requests
    @ExceptionHandler(ecommerce.aspect.RateLimitingAspect.RateLimitExceededException.class)
    public ProblemDetail handleRateLimitExceeded(ecommerce.aspect.RateLimitingAspect.RateLimitExceededException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.TOO_MANY_REQUESTS, "Too many requests. Please slow down and try again later.");
        problem.setType(URI.create(BASE_URI + "/rate-limit-exceeded"));
        problem.setTitle("Rate Limit Exceeded");
        problem.setProperty("retryAfter", 60);
        
        log.warn("Rate limit exceeded: {}", ex.getMessage());
        return problem;
    }

    // 500 – Internal Server Error
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleUnexpected(Exception ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred. Please contact support if this persists.");
        problem.setType(URI.create(BASE_URI + "/internal-server-error"));
        problem.setTitle("Internal Server Error");
        
        log.error("Unexpected error: {}", ex.getMessage(), ex);
        return problem;
    }

    private String resolveAccountStatusMessage(AuthenticationException ex) {
        if (ex instanceof LockedException) return "Your account is locked. Please contact support.";
        if (ex instanceof DisabledException) return "Your account has been disabled. Please contact support.";
        if (ex instanceof AccountExpiredException) return "Your account has expired. Please contact support.";
        if (ex instanceof CredentialsExpiredException) return "Your password has expired. Please reset your password.";
        return "Your account is not in a valid state. Please contact support.";
    }
}
