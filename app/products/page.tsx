"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Pill, ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const allProducts = [
  {
    id: "appetite",
    title: "Appetite Stimulant",
    icon: Pill,
    items: [
      {
        name: "Cyprodine syrup",
        image: "/img/Cyprodine syrup.webp",
      },
      {
        name: "Cyprodine syrup 1",
        image: "/img/Cyprodine syrup1.jpg",
      },
    ],
  },
  {
    id: "cardiovascular",
    title: "Cardiovascular",
    icon: Pill,
    items: [
      {
        name: "Hydralazine 25mg",
        image: "/img/Hydralazine__25mg.jpg",
      },
      {
        name: "Hydralazine 50mg",
        image: "/img/Hydralazine__50mg.jpg",
      },
      {
        name: "Atorvastatin 10mg",
        image: "/img/Atorvastatin-10mg.jpeg",
      },
      {
        name: "Atorvastatin 20mg",
        image: "/img/Atorvastatin-20mg.jpeg",
      },
      {
        name: "Atorvastatin 40mg",
        image: "/img/Atorvastatin-40mg.jpeg",
      },
      {
        name: "Amlodipine 5mg",
        image: "/img/Amlodipine 5mg.jpeg",
      },
      {
        name: "Amlodipine 10mg",
        image: "/img/Amlodipine 10mg.jpeg",
      },
    ],
  },
  {
    id: "suppl",
    title: "Supplements and Vitamins",
    icon: Pill,
    items: [
      {
        name: "Pregnacare Original",
        image: "/img/Pregnacare Original.jpeg",
      },
      {
        name: "Pregnacare Plus",
        image: "/img/Pregnacare-Plus.jpeg",
      },
      {
        name: "Well Woman 50+",
        image: "/img/Well-Woman-50+.webp",
      },
      {
        name: "Well Woman Original",
        image: "/img/wellwoman Original.webp",
      },
      {
        name: "Ferroglobin caps 3",
        image: "/img/Feroglobin-caps-3.webp",
      },
      {
        name: "Ferroglobin Syrup",
        image: "/img/Feroglobin_Syrup.jpeg",
      },
    ],
  },
  {
    id: "endocrine",
    title: "Endocrine",
    icon: Pill,
    items: [
      {
        name: "Levothyroxin Sodium 500mcg Tablet",
        image: "/img/levothyroxin-sodium-500mcg-tablet.jpeg",
      },
      {
        name: "Tylenol",
        image: "/img/tylenol.webp",
      },
    ],
  },
  {
    id: "analgesics",
    title: "Analgesics/NSAIDs",
    icon: Pill,
    items: [
      {
        name: "Tylenol",
        image: "/img/tylenol.webp",
      },
    ],
  },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState("appetite");
  const { cart, addToCart, updateQuantity } = useCart();
  const { totalItems } = useCart();

  const filteredProducts = useMemo(() => {
    return allProducts.find((cat) => cat.id === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="sm:pt-32 pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Our Products
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-secondary">
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
            <h2 className="text-lg font-semibold text-secondary mb-6">
              Select Category
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allProducts.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left flex items-start gap-3 ${
                      isActive
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 bg-white hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-secondary">
                        {category.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {category.items.length} items
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts && (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    {filteredProducts && (
                      <filteredProducts.icon
                        className="text-primary"
                        size={24}
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-secondary">
                      {filteredProducts.title}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.items.map((product, index) => {
                  const cartItem = cart.find(
                    (item) => item.name === product.name,
                  );
                  const quantity = cartItem?.quantity || 0;

                  return (
                    <Card
                      key={index}
                      className="group hover:shadow-lg transition-all cursor-pointer"
                    >
                      <CardHeader className="p-0">
                        <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      </CardHeader>

                      <CardContent className="p-4">
                        <CardTitle className="text-lg">
                          {product.name}
                        </CardTitle>
                      </CardContent>

                      <CardFooter className="p-4 pt-0">
                        {quantity > 0 ? (
                          <div className="flex items-center justify-between w-full bg-white rounded-lg p-1 border border-primary/20">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                updateQuantity(product.name, quantity - 1)
                              }
                              className="h-8 w-8 text-primary hover:bg-primary/5"
                            >
                              <Minus size={16} />
                            </Button>
                            <span className="font-semibold text-secondary">
                              {quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                updateQuantity(product.name, quantity + 1)
                              }
                              className="h-8 w-8 text-primary hover:bg-primary/5"
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            className="w-full gap-2 bg-primary hover:bg-primary/90 text-white"
                            onClick={() => {
                              addToCart(product);
                              toast.success(`${product.name} added to cart`);
                            }}
                          >
                            <ShoppingCart size={18} />
                            Add to Cart
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
          {totalItems != 0 && (
            <Link href="/checkout" className="block mt-5 w-fit">
              <button className="w-full px-4 py-3 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-colors text-sm font-medium mt-2 flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Checkout ({totalItems})
              </button>
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
