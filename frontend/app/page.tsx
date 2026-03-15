import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FlashSales } from "@/components/flash-sales"
import { ProductCarousel } from "@/components/product-carousel"
import { HeroBanner } from "@/components/hero-banner"
import { CategoriesGrid } from "@/components/categories-grid"
import { PromoBanners } from "@/components/promo-banners"
import { BestSellingProducts } from "@/components/best-selling-products"
import { NewArrivals } from "@/components/new-arrivals"
import { RecommendedProducts } from "@/components/recommended-products"
import { SellerHighlights } from "@/components/seller-highlights"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Banner */}
        <HeroBanner />

        {/* Categories Grid */}
        <CategoriesGrid />

        {/* Flash Sales */}
        <FlashSales />

        {/* Promo Banners */}
        <PromoBanners />

        {/* Best Selling Products */}
        <BestSellingProducts />

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl">Featured Products</h2>
            <a href="/category/featured" className="text-[#FF6900] hover:underline text-sm">See All</a>
          </div>
          <ProductCarousel limit={8} />
        </section>

        {/* New Arrivals */}
        <NewArrivals />

        {/* Promotions Banner */}
        <section className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/category/electronics" className="block">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Electronics Sale</h3>
                <p className="text-blue-100 mb-4">Up to 40% off on phones & tablets</p>
                <span className="inline-block bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                  Shop Now
                </span>
              </div>
            </a>
            <a href="/category/fashion" className="block">
              <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Fashion Week</h3>
                <p className="text-pink-100 mb-4">Buy 2 Get 1 Free on selected items</p>
                <span className="inline-block bg-white text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">
                  Shop Now
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* Recommended Products */}
        <RecommendedProducts />

        {/* Recently Added */}
        <section className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl">Recently Added</h2>
            <a href="/category/recent" className="text-[#FF6900] hover:underline text-sm">See All</a>
          </div>
          <ProductCarousel limit={8} />
        </section>

        {/* Seller Highlights */}
        <SellerHighlights />

        {/* Trending Products */}
        <section className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl">Trending Products</h2>
            <a href="/category/trending" className="text-[#FF6900] hover:underline text-sm">See All</a>
          </div>
          <ProductCarousel limit={8} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
