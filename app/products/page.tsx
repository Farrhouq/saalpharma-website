"use client"

import { useSearchParams } from "next/navigation"
import { useState, useMemo } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Pill, Heart, Leaf, AlertCircle } from "lucide-react"
import Link from "next/link"

const allProducts = [
  {
    id: "prescription",
    title: "Prescription Medications",
    icon: Pill,
    description: "FDA-approved prescription drugs for various conditions",
    items: [
      { id: "antibiotics", name: "Antibiotics", details: "Broad spectrum infection treatment" },
      { id: "pain-relief", name: "Pain Relief", details: "Effective pain management solutions" },
      { id: "blood-pressure", name: "Blood Pressure Meds", details: "Hypertension management" },
      { id: "diabetes-care", name: "Diabetes Care", details: "Glucose control medications" },
      { id: "heart-medications", name: "Heart Medications", details: "Cardiovascular health support" },
      { id: "asthma-inhalers", name: "Asthma Inhalers", details: "Respiratory management" },
    ],
  },
  {
    id: "wellness",
    title: "Wellness Products",
    icon: Heart,
    description: "Vitamins, supplements, and preventive health products",
    items: [
      { id: "multivitamins", name: "Multivitamins", details: "Complete daily nutrition" },
      { id: "omega-3", name: "Omega-3", details: "Heart and brain health" },
      { id: "probiotics", name: "Probiotics", details: "Digestive health support" },
      { id: "minerals", name: "Minerals", details: "Essential mineral supplements" },
      { id: "vitamin-d", name: "Vitamin D", details: "Bone and immune support" },
      { id: "collagen", name: "Collagen", details: "Skin and joint health" },
    ],
  },
  {
    id: "otc",
    title: "Over-The-Counter",
    icon: Leaf,
    description: "Common medications available without prescription",
    items: [
      { id: "cough-syrups", name: "Cough Syrups", details: "Cold and cough relief" },
      { id: "allergy-relief", name: "Allergy Relief", details: "Antihistamine solutions" },
      { id: "digestive-aids", name: "Digestive Aids", details: "Stomach and digestion support" },
      { id: "sleep-support", name: "Sleep Support", details: "Natural sleep aids" },
      { id: "pain-relievers", name: "Pain Relievers", details: "Over-the-counter pain management" },
      { id: "fever-reducers", name: "Fever Reducers", details: "Temperature management" },
    ],
  },
  {
    id: "emergency",
    title: "Emergency Care",
    icon: AlertCircle,
    description: "First aid and emergency medical supplies",
    items: [
      { id: "first-aid-kits", name: "First Aid Kits", details: "Complete emergency kits" },
      { id: "bandages", name: "Bandages", details: "Various wound care bandages" },
      { id: "antiseptics", name: "Antiseptics", details: "Sterilization solutions" },
      { id: "emergency-supplies", name: "Emergency Supplies", details: "Critical care supplies" },
      { id: "thermometers", name: "Thermometers", details: "Temperature measurement" },
      { id: "blood-pressure-monitors", name: "Blood Pressure Monitors", details: "Health monitoring devices" },
    ],
  },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "prescription")

  const filteredProducts = useMemo(() => {
    return allProducts.find((cat) => cat.id === selectedCategory)
  }, [selectedCategory])

  return (
    <main className="overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Our Products
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary">
            Browse Our <span className="text-primary">Product Categories</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our comprehensive range of healthcare and wellness products
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-secondary mb-6">Select Category</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allProducts.map((category) => {
                const Icon = category.icon
                const isActive = selectedCategory === category.id

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left flex items-start gap-3 ${
                      isActive ? "border-primary bg-primary/5" : "border-gray-200 bg-white hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-secondary">{category.title}</div>
                      <div className="text-xs text-gray-500">{category.items.length} items</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts && (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    {filteredProducts && <filteredProducts.icon className="text-primary" size={24} />}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-secondary">{filteredProducts.title}</h2>
                    <p className="text-gray-600">{filteredProducts.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.items.map((product, index) => (
                  <Link key={product.id} href={`/products/${filteredProducts.id}--${product.id}`}>
                    <div
                      className="group p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="space-y-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <Pill size={20} className="text-primary group-hover:text-white" />
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-secondary mb-1">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.details}</p>
                        </div>

                        <button className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
