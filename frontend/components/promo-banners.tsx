import Link from "next/link"

export function PromoBanners() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/sale" className="block">
          <div className="bg-[#FF6700] rounded-lg p-8 text-white text-center h-full flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-2">NEW YEAR</h2>
            <h2 className="text-4xl font-bold mb-4">SALE</h2>
            <div className="bg-white text-[#FF6700] px-6 py-2 rounded-full font-bold">UP TO 60% OFF</div>
          </div>
        </Link>

        <Link href="/delivery" className="block">
          <div className="bg-[#00A859] rounded-lg p-8 text-white h-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">FYNZA DELIVERY</h2>
              <p className="text-lg">Send parcels easily</p>
            </div>
          </div>
        </Link>

        <Link href="/sell" className="block">
          <div className="bg-[#FF6700] rounded-lg p-8 text-white h-full flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-2">⭐</div>
            <h2 className="text-3xl font-bold mb-2">FYNZA FORCE</h2>
            <h3 className="text-2xl font-bold">MAKE EXTRA</h3>
            <h3 className="text-2xl font-bold">CASH</h3>
          </div>
        </Link>
      </div>
    </div>
  )
}
