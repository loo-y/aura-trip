"use client";

import { useState, useRef } from "react";
import { GalleryImage, galleryImages } from "@/data/images";
import { ExpandedImage } from "./expanded-image";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Clock, MapPin, Star, ShoppingCart, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { SourcesSidebar } from "./sources-sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CartItem extends GalleryImage {
  quantity: number;
}

export function GalleryLayout() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [cart, setCart] = useState<CartItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleImageClick = (image: GalleryImage, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const addToCart = (item: GalleryImage) => {
    setCart(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    toast({
      title: "Added to cart",
      description: `${item.alt} has been added to your cart.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'attraction': return 'bg-blue-500/10 text-blue-500';
      case 'accommodation': return 'bg-purple-500/10 text-purple-500';
      case 'transportation': return 'bg-green-500/10 text-green-500';
      case 'dining': return 'bg-orange-500/10 text-orange-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const groupedByDay = galleryImages.reduce((acc, image) => {
    if (!acc[image.day]) {
      acc[image.day] = [];
    }
    acc[image.day].push(image);
    return acc;
  }, {} as Record<number, GalleryImage[]>);

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground h-full scrollbar-hide overflow-y-scroll" ref={containerRef}>
      <SourcesSidebar />
      
      <div className="container mx-auto px-4 py-12 md:py-24">
        <motion.div 
          className="mb-12 md:mb-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            A Day in Kyoto
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the timeless beauty of Japan's ancient capital through this carefully curated journey.
          </p>
        </motion.div>

        <div className="fixed top-4 right-4 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Itinerary</SheetTitle>
              </SheetHeader>
              <div className="mt-8">
                {cart.map(item => (
                  <div key={item.id} className="flex flex-col gap-4 mb-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.alt}</h3>
                        <p className="text-sm text-muted-foreground">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Separator />
                  </div>
                ))}
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground">Your cart is empty</p>
                ) : (
                  <div className="mt-8">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">${totalPrice}</span>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => router.push("/checkout")}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30" />

          {Object.entries(groupedByDay).map(([day, images]) => (
            <div key={day} className="mb-24">
              <motion.h2
                className="text-3xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Day {day}
              </motion.h2>

              {images.map((image, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={image.id}
                    className={`relative flex items-center gap-8 mb-24 ${isEven ? 'justify-start' : 'flex-row-reverse'}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <motion.div
                        className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transform-gpu"
                        whileHover={{ scale: 1.02 }}
                        onClick={(e) => handleImageClick(image, e)}
                        id={`gallery-image-${image.id}`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300"
                          whileHover={{ opacity: 1 }}
                        />
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>

                    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-12 h-12 -ml-6 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>

                    <div className={`w-full md:w-5/12 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                      <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className={getTypeColor(image.type)}>
                            {image.type}
                          </Badge>
                          <span className="text-primary">{image.time}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{image.alt}</h3>
                        <p className="text-muted-foreground mb-4">{image.description}</p>
                        
                        {image.bookingInfo && (
                          <div className="space-y-2 mb-4">
                            {image.bookingInfo.address && (
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>{image.bookingInfo.address}</span>
                              </div>
                            )}
                            {image.bookingInfo.rating && (
                              <div className="flex items-center gap-2 text-sm">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>{image.bookingInfo.rating}/5</span>
                              </div>
                            )}
                            {image.bookingInfo.amenities && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {image.bookingInfo.amenities.map((amenity, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {image.price > 0 && (
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-xl font-bold">${image.price}</span>
                            <Button onClick={() => addToCart(image)}>
                              Add to Cart
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedImage && (
          <ExpandedImage
            image={selectedImage}
            clickPosition={clickPosition}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}