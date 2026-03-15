import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategorySidebar } from "@/components/category-sidebar"
import { ProductGrid } from "@/components/product-grid"
import { FilterBar } from "@/components/filter-bar"

export default function FlashSalesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                    <CategorySidebar />
                    <div>
                        <FilterBar />
                        <ProductGrid />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}