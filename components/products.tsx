"use client";

import { Pill, Heart, Leaf, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const productCategories = [
  {
    id: "appetite",
    title: "Appetite Stimulant",
    description: "FDA-approved prescription drugs for various conditions",
    icon: Pill,
    products: [
      "Antibiotics",
      "Pain Relief",
      "Blood Pressure Meds",
      "Diabetes Care",
    ],
  },
  {
    id: "cardiovascular",
    title: "Cardiovascular",
    description: "Vitamins, supplements, and preventive health products",
    icon: Heart,
    products: ["Multivitamins", "Omega-3", "Probiotics", "Minerals"],
  },
  {
    id: "suppl",
    title: "Supplements and Vitamins",
    description: "Common medications available without prescription",
    icon: Leaf,
    products: [
      "Cough Syrups",
      "Allergy Relief",
      "Digestive Aids",
      "Sleep Support",
    ],
  },
  {
    id: "endocrine",
    title: "Endocrine",
    description: "First aid and emergency medical supplies",
    icon: AlertCircle,
    products: [
      "First Aid Kits",
      "Bandages",
      "Antiseptics",
      "Emergency Supplies",
    ],
  },
  {
    id: "analgesics",
    title: "Analgesics/NSAIDs",
    description: "First aid and emergency medical supplies",
    icon: AlertCircle,
    products: [
      "First Aid Kits",
      "Bandages",
      "Antiseptics",
      "Emergency Supplies",
    ],
  },
];

export default function Products() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section
      id="products"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center space-y-4 mb-16 animate-on-scroll ${headerVisible ? "visible" : ""}`}
        >
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Our Products
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-secondary">
            Comprehensive Healthcare{" "}
            <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From prescription medications to wellness supplements, we provide
            everything you need for optimal health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {productCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <ProductCard
                key={category.id}
                category={category}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  category,
  index,
}: {
  category: (typeof productCategories)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className={`animate-on-scroll stagger-${index + 1} ${isVisible ? "visible" : ""}`}
    >
      <div className="hover-lift border-glow p-8 bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-2xl group cursor-pointer h-full">
        <div className="space-y-6">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:scale-110">
            <Pill
              size={28}
              className="text-primary group-hover:text-white transition-colors duration-300"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
              {category.title}
            </h3>
            <p className="text-gray-600 mb-6">{category.description}</p>
          </div>

          {/* <div className="space-y-3">
            {category.products.map((product, pIndex) => (
              <div
                key={product}
                className="flex items-center gap-3 group/item"
                style={{ transitionDelay: `${pIndex * 50}ms` }}
              >
                <div className="w-2 h-2 bg-primary rounded-full group-hover/item:scale-150 transition-transform"></div>
                <span className="text-sm text-gray-700 group-hover/item:text-primary group-hover/item:translate-x-1 transition-all">
                  {product}
                </span>
              </div>
            ))}
          </div> */}

          <Link href={`/products?category=${category.id}`}>
            <button className="group/btn w-full mt-4 px-4 py-3 bg-primary text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 font-semibold text-sm flex items-center justify-center gap-2">
              View Category
              <ArrowRight
                size={16}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
