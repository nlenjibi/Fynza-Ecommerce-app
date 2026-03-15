"use client"

import Link from "next/link"

const categories = [
    { name: "Supermarket", slug: "supermarket", icon: "🛒" },
    { name: "Health & Beauty", slug: "health-beauty", icon: "💄" },
    { name: "Home & Office", slug: "home-office", icon: "🏠" },
    { name: "Phones & Tablets", slug: "phones-tablets", icon: "📱" },
    { name: "Computing", slug: "computing", icon: "💻" },
    { name: "Electronics", slug: "electronics", icon: "📺" },
    { name: "Women's Fashion", slug: "womens-fashion", icon: "👗" },
    { name: "Men's Fashion", slug: "mens-fashion", icon: "👔" },
    { name: "Kids & Toys", slug: "kids-toys", icon: "🧸" },
    { name: "Gaming", slug: "gaming", icon: "🎮" },
    { name: "Sports", slug: "sports", icon: "⚽" },
    { name: "Automotive", slug: "automotive", icon: "🚗" },
]

export function CategoriesGrid() {
    return (
        <div className="container mx-auto px-4 py-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="font-bold text-lg mb-4">Shop by Category</h2>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/category/${category.slug}`}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-orange-50 transition-colors">
                                <span className="text-3xl">{category.icon}</span>
                            </div>
                            <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-[#FF6900] transition-colors">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
