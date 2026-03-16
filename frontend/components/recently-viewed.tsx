import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const recentlyViewed = [
  {
    id: 11,
    name: "3pcs 0-3 Years Baby Boys Set",
    price: "GHC 67.24",
    image: "/assorted-baby-clothes.png",
    rating: 4,
  },
  {
    id: 12,
    name: "3pcs 3-5 Years Baby Boys Suit",
    price: "GHC 89.00",
    image: "/orange-sunshine-shirt.jpg",
    rating: 5,
  },
]

export function RecentlyViewed() {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {recentlyViewed.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="bg-white hover:shadow-lg transition-shadow overflow-hidden h-full">
              <div className="relative aspect-square">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="text-sm line-clamp-2 mb-2">{product.name}</h3>
                <div className="font-bold text-sm mb-1">{product.price}</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < product.rating ? "fill-[#FF6700] text-[#FF6700]" : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
