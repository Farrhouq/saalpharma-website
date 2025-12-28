"use client"

import { useParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Check, Heart } from "lucide-react"

const allProducts = [
  {
    id: "prescription",
    title: "Prescription Medications",
    description: "FDA-approved prescription drugs for various conditions",
    items: [
      {
        id: "antibiotics",
        name: "Antibiotics",
        details: "Broad spectrum infection treatment",
        fullDescription:
          "Our comprehensive range of antibiotics treats various bacterial infections. All medications are FDA-approved and dispensed with proper prescriptions.",
        price: "₵45 - ₵250",
        uses: [
          "Bacterial infection treatment",
          "Post-surgery infection prevention",
          "Respiratory infections",
          "Urinary tract infections",
        ],
        availability: "In Stock",
      },
      {
        id: "pain-relief",
        name: "Pain Relief",
        details: "Effective pain management solutions",
        fullDescription:
          "Professional-grade pain management medications for various conditions. From mild to moderate pain relief with prescription-strength formulations.",
        price: "₵30 - ₵180",
        uses: [
          "Chronic pain management",
          "Post-operative pain relief",
          "Arthritis pain management",
          "Migraine and headache relief",
        ],
        availability: "In Stock",
      },
      {
        id: "blood-pressure",
        name: "Blood Pressure Meds",
        details: "Hypertension management",
        fullDescription:
          "Clinically proven medications to help manage hypertension and maintain healthy blood pressure levels.",
        price: "₵60 - ₵150",
        uses: [
          "Hypertension management",
          "Blood pressure regulation",
          "Cardiovascular disease prevention",
          "Heart health maintenance",
        ],
        availability: "In Stock",
      },
      {
        id: "diabetes-care",
        name: "Diabetes Care",
        details: "Glucose control medications",
        fullDescription:
          "Advanced diabetes management medications to help maintain healthy glucose levels and prevent complications.",
        price: "₵80 - ₵200",
        uses: [
          "Type 2 diabetes management",
          "Glucose level control",
          "Diabetes complication prevention",
          "Insulin therapy support",
        ],
        availability: "In Stock",
      },
      {
        id: "heart-medications",
        name: "Heart Medications",
        details: "Cardiovascular health support",
        fullDescription:
          "Specialized medications for cardiovascular health and heart disease management with proven efficacy.",
        price: "₵70 - ₵220",
        uses: [
          "Heart disease management",
          "Stroke prevention",
          "Coronary artery disease treatment",
          "Cholesterol management",
        ],
        availability: "In Stock",
      },
      {
        id: "asthma-inhalers",
        name: "Asthma Inhalers",
        details: "Respiratory management",
        fullDescription:
          "Effective respiratory medications including rescue inhalers and maintenance treatments for asthma control.",
        price: "₵35 - ₵120",
        uses: [
          "Asthma attack relief",
          "Respiratory disease management",
          "Breathing ease improvement",
          "Chronic obstructive pulmonary disease support",
        ],
        availability: "In Stock",
      },
    ],
  },
  {
    id: "wellness",
    title: "Wellness Products",
    description: "Vitamins, supplements, and preventive health products",
    items: [
      {
        id: "multivitamins",
        name: "Multivitamins",
        details: "Complete daily nutrition",
        fullDescription:
          "Complete daily multivitamin formulations containing essential vitamins and minerals for overall wellness.",
        price: "₵25 - ₵80",
        uses: [
          "Daily nutritional support",
          "Energy level maintenance",
          "Immune system boost",
          "General health maintenance",
        ],
        availability: "In Stock",
      },
      {
        id: "omega-3",
        name: "Omega-3",
        details: "Heart and brain health",
        fullDescription: "Pure omega-3 fish oil supplements for cardiovascular and cognitive health support.",
        price: "₵40 - ₵95",
        uses: [
          "Heart health support",
          "Brain function enhancement",
          "Joint health maintenance",
          "Anti-inflammatory benefits",
        ],
        availability: "In Stock",
      },
      {
        id: "probiotics",
        name: "Probiotics",
        details: "Digestive health support",
        fullDescription:
          "Professional-grade probiotics for optimal digestive system health and gut microbiome balance.",
        price: "₵30 - ₵90",
        uses: [
          "Digestive health support",
          "Gut bacteria balance",
          "Immune function boost",
          "Digestive comfort improvement",
        ],
        availability: "In Stock",
      },
      {
        id: "minerals",
        name: "Minerals",
        details: "Essential mineral supplements",
        fullDescription:
          "Essential minerals including calcium, magnesium, zinc, and iron for complete nutritional support.",
        price: "₵20 - ₵70",
        uses: [
          "Bone health support",
          "Muscle function enhancement",
          "Energy metabolism support",
          "Nutritional deficiency correction",
        ],
        availability: "In Stock",
      },
      {
        id: "vitamin-d",
        name: "Vitamin D",
        details: "Bone and immune support",
        fullDescription: "High-potency Vitamin D supplements for bone strength and immune system optimization.",
        price: "₵28 - ₵75",
        uses: [
          "Bone health maintenance",
          "Immune system strengthening",
          "Calcium absorption enhancement",
          "Seasonal mood support",
        ],
        availability: "In Stock",
      },
      {
        id: "collagen",
        name: "Collagen",
        details: "Skin and joint health",
        fullDescription:
          "Premium collagen supplements for skin elasticity, joint flexibility, and overall connective tissue health.",
        price: "₵50 - ₵120",
        uses: [
          "Skin elasticity improvement",
          "Joint flexibility enhancement",
          "Hair and nail strengthening",
          "Anti-aging support",
        ],
        availability: "In Stock",
      },
    ],
  },
  {
    id: "otc",
    title: "Over-The-Counter",
    description: "Common medications available without prescription",
    items: [
      {
        id: "cough-syrups",
        name: "Cough Syrups",
        details: "Cold and cough relief",
        fullDescription:
          "Effective over-the-counter cough syrups for cold and cough symptom relief without drowsiness.",
        price: "₵15 - ₵45",
        uses: ["Cough suppression", "Cold symptom relief", "Throat soothing", "Respiratory comfort"],
        availability: "In Stock",
      },
      {
        id: "allergy-relief",
        name: "Allergy Relief",
        details: "Antihistamine solutions",
        fullDescription:
          "Non-drowsy antihistamines for fast allergy symptom relief including sneezing, itching, and congestion.",
        price: "₵20 - ₵60",
        uses: [
          "Allergy symptom relief",
          "Seasonal allergy management",
          "Histamine reaction control",
          "Hay fever relief",
        ],
        availability: "In Stock",
      },
      {
        id: "digestive-aids",
        name: "Digestive Aids",
        details: "Stomach and digestion support",
        fullDescription: "Effective digestive aids for bloating, gas, indigestion, and overall digestive comfort.",
        price: "₵18 - ₵50",
        uses: ["Bloating reduction", "Gas relief", "Indigestion management", "Digestive enzyme support"],
        availability: "In Stock",
      },
      {
        id: "sleep-support",
        name: "Sleep Support",
        details: "Natural sleep aids",
        fullDescription:
          "Natural sleep support supplements including melatonin and herbal formulations for better sleep quality.",
        price: "₵25 - ₵65",
        uses: ["Sleep quality improvement", "Natural sleep induction", "Sleep cycle regulation", "Jet lag management"],
        availability: "In Stock",
      },
      {
        id: "pain-relievers",
        name: "Pain Relievers",
        details: "Over-the-counter pain management",
        fullDescription: "OTC pain relievers for minor aches, pains, and fever relief. Fast-acting formulations.",
        price: "₵10 - ₵30",
        uses: ["Minor pain relief", "Fever reduction", "Headache management", "Muscle ache relief"],
        availability: "In Stock",
      },
      {
        id: "fever-reducers",
        name: "Fever Reducers",
        details: "Temperature management",
        fullDescription: "Effective fever reducers for safe temperature management in adults and children.",
        price: "₵12 - ₵35",
        uses: ["Fever reduction", "Temperature normalization", "Cold symptom management", "Flu symptom relief"],
        availability: "In Stock",
      },
    ],
  },
  {
    id: "emergency",
    title: "Emergency Care",
    description: "First aid and emergency medical supplies",
    items: [
      {
        id: "first-aid-kits",
        name: "First Aid Kits",
        details: "Complete emergency kits",
        fullDescription:
          "Comprehensive first aid kits for home, office, and vehicle emergencies with essential supplies.",
        price: "₵35 - ₵120",
        uses: [
          "Minor injury treatment",
          "Emergency preparedness",
          "Wound care at home",
          "Emergency response readiness",
        ],
        availability: "In Stock",
      },
      {
        id: "bandages",
        name: "Bandages",
        details: "Various wound care bandages",
        fullDescription: "Multiple bandage types including adhesive bandages, gauze pads, and compression wraps.",
        price: "₵8 - ₵25",
        uses: ["Minor cut treatment", "Wound protection", "Blister management", "Scrape coverage"],
        availability: "In Stock",
      },
      {
        id: "antiseptics",
        name: "Antiseptics",
        details: "Sterilization solutions",
        fullDescription: "Professional-grade antiseptic solutions for wound sterilization and infection prevention.",
        price: "₵12 - ₵40",
        uses: [
          "Wound sterilization",
          "Infection prevention",
          "Surface disinfection",
          "Medical equipment sterilization",
        ],
        availability: "In Stock",
      },
      {
        id: "emergency-supplies",
        name: "Emergency Supplies",
        details: "Critical care supplies",
        fullDescription: "Essential emergency medical supplies including gloves, masks, and emergency blankets.",
        price: "₵20 - ₵80",
        uses: [
          "Emergency response preparation",
          "Medical professional supplies",
          "Disaster preparedness",
          "Emergency medical care",
        ],
        availability: "In Stock",
      },
      {
        id: "thermometers",
        name: "Thermometers",
        details: "Temperature measurement",
        fullDescription: "Digital and contact thermometers for accurate temperature measurement and monitoring.",
        price: "₵15 - ₵60",
        uses: ["Temperature monitoring", "Fever detection", "Health condition assessment", "Daily health tracking"],
        availability: "In Stock",
      },
      {
        id: "blood-pressure-monitors",
        name: "Blood Pressure Monitors",
        details: "Health monitoring devices",
        fullDescription: "Accurate digital blood pressure monitors for home health monitoring and tracking.",
        price: "₵80 - ₵250",
        uses: [
          "Blood pressure monitoring",
          "Hypertension tracking",
          "Health data recording",
          "Cardiovascular health assessment",
        ],
        availability: "In Stock",
      },
    ],
  },
]

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = params.id as string
  const [categoryId, itemId] = productId.split("--")

  const category = allProducts.find((cat) => cat.id === categoryId)
  const product = category?.items.find((item) => item.id === itemId)

  if (!product || !category) {
    return (
      <main className="overflow-hidden">
        <Navigation />
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-secondary mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link href="/products">
              <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Back to Products
              </button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-primary/5 to-white">
        <div className="max-w-4xl mx-auto">
          <Link href="/products">
            <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 font-medium">
              <ArrowLeft size={20} />
              Back to Products
            </button>
          </Link>
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {category.title}
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Image Area */}
            <div className="flex flex-col gap-6">
              <div className="w-full aspect-square bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border-2 border-primary/20">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary/60 text-center">
                    <span className="text-sm font-semibold">{product.name}</span>
                  </div>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                <Heart size={20} />
                Add to Favorites
              </button>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-secondary mb-3">{product.name}</h1>
                <p className="text-gray-600 text-lg">{product.details}</p>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Price Range</h3>
                <p className="text-3xl font-bold text-primary">{product.price}</p>
                <p className="text-sm text-gray-600">*Prices may vary based on quantity and specific formulation</p>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-green-700">{product.availability}</span>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-secondary">About This Product</h3>
                <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
              </div>

              {/* Uses */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-secondary">Common Uses</h3>
                <div className="space-y-3">
                  {product.uses.map((use) => (
                    <div key={use} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={16} className="text-primary" />
                      </div>
                      <span className="text-gray-700">{use}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <button className="w-full px-6 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors">
                  Request Information
                </button>
                <p className="text-center text-xs text-gray-500">
                  For prescription medications, you'll need a valid prescription. Contact us for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-secondary mb-8">More {category.title}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {category.items.slice(0, 4).map((item) => (
              <Link key={item.id} href={`/products/${categoryId}--${item.id}`}>
                <div className="p-6 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <div className="text-primary font-bold">+</div>
                  </div>
                  <h3 className="font-bold text-secondary mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.details}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
