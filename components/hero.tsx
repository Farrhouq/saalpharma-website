"use client";

import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
  Phone,
} from "lucide-react";
import Link from "next/link";
import {
  useScrollAnimation,
  useCountAnimation,
} from "@/hooks/use-scroll-animation";

export default function Hero() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { count: patientsCount, ref: patientsRef } = useCountAnimation(50000);
  const { count: productsCount, ref: productsRef } = useCountAnimation(500);
  const { count: locationsCount, ref: locationsRef } = useCountAnimation(25);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="sm:pt-32 pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white via-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div ref={heroRef} className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 animate-slide-left ${heroVisible ? "visible" : ""}`}
          >
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium animate-shimmer">
                Welcome to S.A.A Lecacy Pharmaceuticals LTD
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold text-secondary leading-tight">
                When you need it, {" "}
                <span className="text-primary relative">
                  We supply it
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C50 4 150 4 198 10"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="animate-draw"
                      style={{
                        strokeDasharray: 200,
                        strokeDashoffset: heroVisible ? 0 : 200,
                        transition: "stroke-dashoffset 1s ease-out 0.5s",
                      }}
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-lg mt-8 text-gray-600 leading-relaxed max-w-lg">
                Trusted by over 50,000 patients, we provide quality medications,
                healthcare products, and expert pharmaceutical services with
                compassion and excellence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <button className="group btn-animated px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 font-semibold flex items-center justify-center gap-2 w-full sm:w-auto hover-glow">
                  Browse Products
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform duration-300"
                  />
                </button>
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="group px-8 py-4 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 font-semibold flex items-center justify-center gap-3"
              >
                <Phone
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                Contact Us
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              <div className="group cursor-default">
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  <span ref={patientsRef} className="counter-animate">
                    {patientsCount.toLocaleString()}
                  </span>
                  K+
                </p>
                <p className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                  Happy Patients
                </p>
              </div>
              <div className="group cursor-default">
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  <span ref={productsRef} className="counter-animate">
                    {productsCount}
                  </span>
                  +
                </p>
                <p className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                  Products
                </p>
              </div>
              <div className="group cursor-default">
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  <span ref={locationsRef} className="counter-animate">
                    {locationsCount}
                  </span>
                </p>
                <p className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                  Locations
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`relative animate-slide-right ${heroVisible ? "visible" : ""}`}
          >
            <div
              className="-top-4 -right-4 image-card animate-float"
              style={{ animationDelay: "0s" }}
            >
              <ShieldCheck size={32} className="text-primary" />
            </div>
            <div
              className="top-1/2 -left-6 image-card animate-float"
              style={{ animationDelay: "1s" }}
            >
              <Clock size={24} className="text-primary" />
            </div>
            <div
              className="-bottom-4 right-12 image-card animate-float"
              style={{ animationDelay: "2s" }}
            >
              <Award size={28} className="text-primary" />
            </div>

            <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-primary/5 rounded-3xl blur-3xl animate-pulse-glow"></div>
            <img
              src="/modern-pharmacy-storefront-with-green-cross-sign-h.jpg"
              alt="Modern pharmacy storefront"
              className="relative w-full h-full object-cover rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
            />

            <div
              className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-blur-in"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center animate-pulse-glow">
                  <span className="text-white font-bold text-xl">+</span>
                </div>
                <div>
                  <p className="font-bold text-secondary">24/7 Available</p>
                  <p className="text-sm text-gray-600">
                    Emergency services always open
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
