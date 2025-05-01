"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Calendar, 
  MapPin, 
  Clock,
  ChevronLeft
} from "lucide-react";

export function CheckoutLayout() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Booking confirmed!",
      description: "Your itinerary has been successfully booked.",
    });
    
    setLoading(false);
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => router.push("/")}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Itinerary
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="w-5 h-5" />
                <span>Secure payment processing</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border"
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border"
                />
              </div>
            </div>
          </div>

          <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl sticky top-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>$920.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$92.00</span>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span>$1,012.00</span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Complete Booking"}
              </Button>

              <div className="text-sm text-muted-foreground">
                By completing this booking, you agree to our terms and conditions.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}