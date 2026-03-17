import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FlashSales } from "@/components/flash-sales"
import { PromoBanners } from "@/components/promo-banners"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <FlashSales />
        <PromoBanners />
      </main>

      <Footer />
    </div>
  )
}
