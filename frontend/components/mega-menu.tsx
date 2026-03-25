"use client"

import Link from "next/link"
import {
  Smartphone,
  ShoppingBag,
  Home,
  Laptop,
  Shirt,
  Dumbbell,
  Baby,
  Gamepad2,
  MoreHorizontal,
  Heart,
  Package,
  Tv,
} from "lucide-react"

interface MegaMenuProps {
  onClose: () => void
  activeCategory: string | null
  setActiveCategory: (category: string | null) => void
}

const categories = [
  { id: "supermarket", icon: ShoppingBag, label: "Supermarket", color: "text-green-600" },
  { id: "phones", icon: Smartphone, label: "Phones & Tablets", color: "text-blue-600" },
  { id: "health", icon: Heart, label: "Health & Beauty", color: "text-pink-600" },
  { id: "home", icon: Home, label: "Home & Office", color: "text-yellow-600" },
  { id: "appliances", icon: Package, label: "Appliances", color: "text-orange-600" },
  { id: "electronics", icon: Tv, label: "Electronics", color: "text-purple-600" },
  { id: "computing", icon: Laptop, label: "Computing", color: "text-indigo-600" },
  { id: "fashion", icon: Shirt, label: "Fashion", color: "text-red-600" },
  { id: "sporting", icon: Dumbbell, label: "Sporting Goods", color: "text-teal-600" },
  { id: "baby", icon: Baby, label: "Baby Products", color: "text-cyan-600" },
  { id: "gaming", icon: Gamepad2, label: "Gaming", color: "text-violet-600" },
  { id: "other", icon: MoreHorizontal, label: "Other categories", color: "text-gray-600" },
]

const megaMenuContent: Record<string, any> = {
  phones: {
    sections: [
      {
        title: "MOBILE PHONES",
        links: [
          { label: "Smartphones", href: "/category/smartphones" },
          { label: "Android Phones", href: "/category/android-phones" },
          { label: "iOS Phones", href: "/category/ios-phones" },
          { label: "Basic Phones", href: "/category/basic-phones" },
          { label: "5G Phones", href: "/category/5g-phones" },
        ],
      },
      {
        title: "TABLETS",
        links: [
          { label: "Tablets", href: "/category/tablets" },
          { label: "Educational & Kids Tablets", href: "/category/kids-tablets" },
          { label: "Samsung Tablets", href: "/category/samsung-tablets" },
          { label: "iPad Tablets", href: "/category/ipad-tablets" },
        ],
      },
      {
        title: "MOBILE ACCESSORIES",
        links: [
          { label: "Phone Cases", href: "/category/phone-cases" },
          { label: "Screen Protectors", href: "/category/screen-protectors" },
          { label: "Memory Cards", href: "/category/memory-cards" },
          { label: "Batteries", href: "/category/batteries" },
          { label: "Power Banks", href: "/category/power-banks" },
        ],
      },
      {
        title: "TOP PHONE BRANDS",
        links: [
          { label: "Samsung", href: "/brand/samsung" },
          { label: "Apple", href: "/brand/apple" },
          { label: "Tecno", href: "/brand/tecno" },
          { label: "Infinix", href: "/brand/infinix" },
          { label: "Motorola", href: "/brand/motorola" },
        ],
      },
    ],
  },
  fashion: {
    sections: [
      {
        title: "WOMEN'S FASHION",
        links: [
          { label: "Clothing", href: "/category/womens-clothing" },
          { label: "Shoes", href: "/category/womens-shoes" },
          { label: "Accessories", href: "/category/womens-accessories" },
          { label: "Jewelry", href: "/category/jewelry" },
          { label: "Bags", href: "/category/bags" },
          { label: "Dresses", href: "/category/dresses" },
        ],
      },
      {
        title: "MEN'S FASHION",
        links: [
          { label: "Clothing", href: "/category/mens-clothing" },
          { label: "Shoes", href: "/category/mens-shoes" },
          { label: "Accessories", href: "/category/mens-accessories" },
          { label: "Jewelry", href: "/category/mens-jewelry" },
          { label: "Underwear & Sleepwear", href: "/category/mens-underwear" },
          { label: "Suits", href: "/category/suits" },
        ],
      },
      {
        title: "BOYS' FASHION",
        links: [
          { label: "Accessories", href: "/category/boys-accessories" },
          { label: "Clothing", href: "/category/boys-clothing" },
          { label: "Shoes", href: "/category/boys-shoes" },
          { label: "Watches", href: "/category/boys-watches" },
        ],
      },
      {
        title: "GIRLS' FASHION",
        links: [
          { label: "Accessories", href: "/category/girls-accessories" },
          { label: "Clothing", href: "/category/girls-clothing" },
          { label: "Shoes", href: "/category/girls-shoes" },
          { label: "Watches", href: "/category/girls-watches" },
        ],
      },
    ],
  },
  appliances: {
    sections: [
      {
        title: "LARGE APPLIANCES",
        links: [
          { label: "Refrigerators", href: "/category/refrigerators" },
          { label: "Freezers", href: "/category/freezers" },
          { label: "Washing Machines", href: "/category/washing-machines" },
          { label: "Water Dispensers", href: "/category/water-dispensers" },
          { label: "Gas Cookers", href: "/category/gas-cookers" },
        ],
      },
      {
        title: "SMALL APPLIANCES",
        links: [
          { label: "Blenders", href: "/category/blenders" },
          { label: "Cookers", href: "/category/cookers" },
          { label: "Rice Cookers", href: "/category/rice-cookers" },
          { label: "Microwave Ovens", href: "/category/microwaves" },
          { label: "Toasters", href: "/category/toasters" },
        ],
      },
      {
        title: "HEATING, COOLING & AIR QUALITY",
        links: [
          { label: "Air Conditioners", href: "/category/air-conditioners" },
          { label: "Fans", href: "/category/fans" },
          { label: "Humidifiers", href: "/category/humidifiers" },
          { label: "Air Purifiers", href: "/category/air-purifiers" },
        ],
      },
    ],
  },
  electronics: {
    sections: [
      {
        title: "HOME AUDIO",
        links: [
          { label: "Speakers", href: "/category/speakers" },
          { label: "Bluetooth Speakers", href: "/category/bluetooth-speakers" },
          { label: "Home Theatre Systems", href: "/category/home-theatre" },
        ],
      },
      {
        title: "TELEVISION & AUDIO",
        links: [
          { label: "Televisions", href: "/category/televisions" },
          { label: "DVD Players", href: "/category/dvd-players" },
          { label: "LED & LCD TVs", href: "/category/led-tvs" },
          { label: "32-inch TVs", href: "/category/32-inch-tvs" },
        ],
      },
      {
        title: "DIGITAL CAMERAS",
        links: [
          { label: "Video", href: "/category/video-cameras" },
          { label: "Video Surveillance", href: "/category/surveillance" },
          { label: "Projectors", href: "/category/projectors" },
          { label: "Headphones", href: "/category/headphones" },
        ],
      },
    ],
  },
  computing: {
    sections: [
      {
        title: "COMPUTER ACCESSORIES",
        links: [
          { label: "Keyboards and Mice", href: "/category/keyboards-mice" },
          { label: "Printer, Ink & Toner", href: "/category/printers" },
          { label: "UPS", href: "/category/ups" },
          { label: "Flash Drives", href: "/category/flash-drives" },
          { label: "External Hard Drives", href: "/category/external-drives" },
        ],
      },
      {
        title: "LAPTOPS",
        links: [
          { label: "HP Laptops", href: "/category/hp-laptops" },
          { label: "Dell Laptops", href: "/category/dell-laptops" },
          { label: "Macbooks", href: "/category/macbooks" },
          { label: "Lenovo Laptops", href: "/category/lenovo-laptops" },
          { label: "Asus Laptops", href: "/category/asus-laptops" },
        ],
      },
    ],
  },
  home: {
    sections: [
      {
        title: "HOME & KITCHEN",
        links: [
          { label: "Home Decor", href: "/category/home-decor" },
          { label: "Bedding", href: "/category/bedding" },
          { label: "Bath", href: "/category/bath" },
          { label: "Event & Party Supplies", href: "/category/party-supplies" },
          { label: "Lighting & Ceiling Fans", href: "/category/lighting" },
        ],
      },
      {
        title: "FURNITURE",
        links: [
          { label: "Living Room furniture", href: "/category/living-room-furniture" },
          { label: "Kitchen furniture", href: "/category/kitchen-furniture" },
          { label: "Dining Room furniture", href: "/category/dining-room-furniture" },
          { label: "Bedroom furniture", href: "/category/bedroom-furniture" },
          { label: "Office furniture", href: "/category/office-furniture" },
        ],
      },
      {
        title: "KITCHEN & DINING",
        links: [
          { label: "Small Appliances", href: "/category/small-kitchen-appliances" },
          { label: "Dining & Entertaining", href: "/category/dining" },
          { label: "Kitchen Utensils & Gadgets", href: "/category/kitchen-gadgets" },
          { label: "Cookware", href: "/category/cookware" },
        ],
      },
      {
        title: "OFFICE PRODUCTS",
        links: [{ label: "Office & School Supplies", href: "/category/office-supplies" }],
      },
    ],
  },
  health: {
    sections: [
      {
        title: "FRAGRANCES",
        links: [
          { label: "Men's Fragrances", href: "/category/mens-fragrances" },
          { label: "Women's Fragrances", href: "/category/womens-fragrances" },
          { label: "Antiperspirants & Deodorants", href: "/category/deodorants" },
        ],
      },
      {
        title: "BEAUTY & PERSONAL CARE",
        links: [
          { label: "Makeup", href: "/category/makeup" },
          { label: "Tools & Accessories", href: "/category/beauty-tools" },
          { label: "Personal Care", href: "/category/personal-care" },
          { label: "Hair Care", href: "/category/hair-care" },
          { label: "Oral Care", href: "/category/oral-care" },
          { label: "Skin Care", href: "/category/skin-care" },
        ],
      },
      {
        title: "HEALTH CARE",
        links: [
          { label: "First Aid", href: "/category/first-aid" },
          { label: "Diabetes Care", href: "/category/diabetes-care" },
          { label: "Medications & Treatments", href: "/category/medications" },
          { label: "Alternative Medicine", href: "/category/alternative-medicine" },
        ],
      },
    ],
  },
  sporting: {
    sections: [
      {
        title: "SPORTING GOODS",
        links: [{ label: "Outdoor Recreation", href: "/category/outdoor-recreation" }],
      },
      {
        title: "SPORTS & FITNESS",
        links: [
          { label: "Team Sports", href: "/category/team-sports" },
          { label: "Swimming", href: "/category/swimming" },
          { label: "Exercise & Fitness", href: "/category/exercise-fitness" },
          { label: "Leisure Sports", href: "/category/leisure-sports" },
        ],
      },
    ],
  },
}

export function MegaMenu({ onClose, activeCategory, setActiveCategory }: MegaMenuProps) {
  return (
    <div className="absolute left-0 top-full mt-1 bg-background border shadow-xl rounded-md w-[60vw]" onMouseLeave={onClose}>
      <div className="container mx-auto px-4">
        <div className="flex">
          {/* Category Sidebar */}
          <div className="w-64 border-r py-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors ${activeCategory === category.id ? "bg-muted" : ""
                  }`}
                onMouseEnter={() => setActiveCategory(category.id)}
              >
                <category.icon className={`h-5 w-5 ${category.color}`} />
                <span className="text-sm">{category.label}</span>
              </Link>
            ))}
          </div>

          {/* Mega Menu Content */}
          <div className="flex-1 py-6 px-8">
            {activeCategory && megaMenuContent[activeCategory] && (
              <div className="grid grid-cols-4 gap-8">
                {megaMenuContent[activeCategory].sections.map((section: any) => (
                  <div key={section.title}>
                    <h3 className="font-semibold text-sm mb-3 text-foreground">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.links.map((link: any) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            onClick={onClose}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
