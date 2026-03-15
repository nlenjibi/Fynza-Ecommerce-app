import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const relatedProducts = [
  {
    id: 2,
    name: "0-3 Years Baby Boys Summer Casual Sets Short Sleeve",
    price: "GHC 52.00",
    oldPrice: "GHC 98.00",
    rating: 5,
    reviews: 12,
    image: "/yellow-striped-shirt.jpg",
  },
  {
    id: 3,
    name: "3pcs Baby Boys Clothes Set Romper Bodysuit",
    price: "GHC 67.24",
    oldPrice: "GHC 89.00",
    rating: 4,
    reviews: 8,
    image: "/baby-clothing-set.jpg",
  },
  {
    id: 4,
    name: "Fasfion 2pcs 0-3 Years Boys Clothes",
    price: "GHC 89.80",
    oldPrice: "GHC 125.00",
    rating: 5,
    reviews: 15,
    image: "/tropical-shirt.jpg",
  },
  {
    id: 5,
    name: "5pcs Baby Feeding Set With Utensils",
    price: "GHC 125.00",
    oldPrice: "GHC 180.00",
    rating: 5,
    reviews: 23,
    image: "/assorted-baby-clothes.png",
  },
]

export function RelatedProducts() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="bg-white hover:shadow-lg transition-shadow overflow-hidden h-full">
              <div className="relative aspect-square">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="text-sm line-clamp-2 mb-2 min-h-[40px]">{product.name}</h3>
                <div className="mb-1">
                  <div className="font-bold text-base">{product.price}</div>
                  <div className="text-xs text-gray-500 line-through">{product.oldPrice}</div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < product.rating ? "fill-[#FF6700] text-[#FF6700]" : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
