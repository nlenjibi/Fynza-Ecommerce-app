package ecommerce.common.enums;

public enum TrackingEventType {
    PRODUCT_VIEW("Product View", "User viewed a product"),
    PRODUCT_CLICK("Product Click", "User clicked on a product"),
    ADD_TO_CART("Add to Cart", "User added product to cart"),
    REMOVE_FROM_CART("Remove from Cart", "User removed product from cart"),
    ADD_TO_WISHLIST("Add to Wishlist", "User added product to wishlist"),
    REMOVE_FROM_WISHLIST("Remove from Wishlist", "User removed product from wishlist"),
    BEGIN_CHECKOUT("Begin Checkout", "User started checkout process"),
    PURCHASE("Purchase", "User completed a purchase"),
    SEARCH("Search", "User performed a search"),
    PAGE_VIEW("Page View", "User viewed a page"),
    SIGN_UP("Sign Up", "User registered an account"),
    LOGIN("Login", "User logged in");

    private final String displayName;
    private final String description;

    TrackingEventType(String displayName, String description) {
        this.displayName = displayName;
        this.description = description;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }
}
