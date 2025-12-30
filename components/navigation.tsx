"use client";

import { useState, useEffect } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (pathName !== "/") {
      router.push(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-lg py-2"
          : "bg-white/95 backdrop-blur-md py-4"
      } border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="size-10">
              <img src="/img/logo.png" alt="logo" />
            </div>
            <span className="font-bold text-lg text-secondary hidden sm:inline group-hover:text-primary transition-colors">
              SAAL PHARMA
            </span>
          </Link>

          <div className="hidden md:flex gap-8">
            {["Products", "About", "Team", "Contact"].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="cursor-pointer relative text-sm font-medium text-foreground hover:text-primary transition-colors group py-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/checkout"
              className="relative group p-2 hover:bg-primary/10 rounded-full transition-colors"
            >
              <ShoppingCart
                className="text-secondary group-hover:text-primary transition-colors"
                size={24}
              />
              {totalItems > 0 && (
                <p className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-primary border-2 border-white text-[10px] font-bold">
                  {totalItems}
                </p>
              )}
            </Link>

            <Link href="/products" className="hidden sm:block">
              <button className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-300 text-sm font-medium hover:scale-105 hover:shadow-lg btn-animated">
                Browse Products
              </button>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:rotate-90"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="pb-4 pt-2 space-y-1">
            {["Products", "About", "Team", "Contact"].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item}
              </button>
            ))}
            <Link href="/checkout" className="block">
              <button className="w-full px-4 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium mt-2 flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Checkout ({totalItems})
              </button>
            </Link>
            <Link href="/products" className="block">
              <button className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium mt-2">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
