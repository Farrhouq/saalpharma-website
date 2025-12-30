"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CheckCircle2,
  Send,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
  });

  const formatGhanaNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");

    if (!digits.startsWith("233")) return "+233 ";

    const rest = digits.slice(3, 12); // 9 digits max
    const parts = [rest.slice(0, 2), rest.slice(2, 5), rest.slice(5, 9)].filter(
      Boolean,
    );

    return `+233 ${parts.join(" ")}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "contact") {
      setFormData((prev) => ({
        ...prev,
        contact: formatGhanaNumber(value),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      // send order to your backend
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
          })),
          name: formData.firstName,
          email: formData.email,
          phone: formData.contact,
          address: formData.address,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit order");
      }

      toast.success("Order submitted successfully!");
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsSubmitting(false);
      clearCart();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <div className="grow flex items-center justify-center px-4 pt-24 pb-12">
          <Card className="max-w-md w-full text-center p-8 space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">
                Request Submitted!
              </CardTitle>
              <p className="text-gray-600">
                Thank you, {formData.firstName}. We've received your request and
                will contact you shortly to finalize your purchase.
              </p>
            </div>
            <Button onClick={() => router.push("/")} className="w-full">
              Back to Home
            </Button>
          </Card>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <div className="grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start flex-col gap-4 mb-8">
            <Button
              variant="ghost"
              className="-ml-3 hover:bg-white hover:text-gray-700 cursor-pointer"
              onClick={() => router.back()}
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Button>
            <h1 className="text-3xl font-bold text-secondary">Checkout</h1>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your Selected Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                      <Trash2 size={32} />
                    </div>
                    <p className="text-gray-500 text-lg">
                      Your cart is currently empty.
                    </p>
                    <Button onClick={() => router.push("/products")}>
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y">
                    {cart.map((item) => (
                      <div
                        key={item.name}
                        className="py-4 flex flex-wrap gap-4 items-center"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="grow min-w-0">
                          <h3 className="font-semibold text-secondary truncate">
                            {item.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg border p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary"
                            onClick={() =>
                              updateQuantity(item.name, item.quantity - 1)
                            }
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary"
                            onClick={() =>
                              updateQuantity(item.name, item.quantity + 1)
                            }
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer hover:text-red-600 hover:bg-white text-red-500 shrink-0"
                          onClick={() => removeFromCart(item.name)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {cart.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Details</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Kofi"
                        required
                        className="!p-5 focus:border-none!"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Annan"
                        className="!p-5 focus:border-none!"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="kofi@example.com"
                        required
                        className="!p-5 focus:border-none!"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        name="contact"
                        type="tel"
                        placeholder="+233 XX XXX XXXX"
                        // pattern="^\+233\d{9}$"
                        // title="Use Ghana format: +233XXXXXXXXX"
                        required
                        value={formData.contact}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="contact">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        type="tel"
                        placeholder="+233 XX XXX XXXX"
                        className="!p-5 focus:border-none!"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="mt-6">
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Send size={20} />
                          Submit Order Request
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
