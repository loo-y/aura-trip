"use client";

import { useEffect, useRef } from "react";
import { GalleryImage } from "@/data/images";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { X } from "lucide-react";
import Image from "next/image";

interface ExpandedImageProps {
  image: GalleryImage;
  clickPosition: { x: number; y: number };
  onClose: () => void;
}

export function ExpandedImage({ image, clickPosition, onClose }: ExpandedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalElement = document.getElementById(`gallery-image-${image.id}`);
    
    if (originalElement && imageRef.current && containerRef.current) {
      const originalRect = originalElement.getBoundingClientRect();
      
      const tl = gsap.timeline();
      
      tl.set(imageRef.current, {
        width: originalRect.width,
        height: originalRect.height,
        x: originalRect.left,
        y: originalRect.top,
        rotateX: "45deg",
        rotateY: "0deg",
        borderRadius: "12px",
      });
      
      tl.to(containerRef.current, {
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        duration: 0.6,
        ease: "power2.inOut",
      }, 0);
      
      tl.to(imageRef.current, {
        width: "100%",
        height: "100vh",
        x: 0,
        y: 0,
        rotateX: "0deg",
        rotateY: "360deg",
        borderRadius: 0,
        duration: 1,
        ease: "power3.inOut",
      }, 0);
      
      tl.fromTo(imageRef.current.querySelector("img"), 
        { scale: 1 },
        { 
          scale: 1,
          duration: 1.2,
          ease: "power3.out" 
        }, 
        0
      );
      
      return () => {
        tl.kill();
      };
    }
  }, [image.id]);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  const closeButtonVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5, 
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const handleClose = () => {
    if (imageRef.current && containerRef.current) {
      const originalElement = document.getElementById(`gallery-image-${image.id}`);
      
      if (originalElement) {
        const originalRect = originalElement.getBoundingClientRect();
        
        const tl = gsap.timeline({
          onComplete: onClose
        });
        
        tl.to(containerRef.current, {
          backgroundColor: "rgba(0, 0, 0, 0)",
          duration: 0.5,
          ease: "power2.inOut",
        }, 0);
        
        tl.to(imageRef.current, {
          width: originalRect.width,
          height: originalRect.height,
          x: originalRect.left,
          y: originalRect.top,
          rotateX: "45deg",
          rotateY: "0deg",
          borderRadius: "12px",
          duration: 0.8,
          ease: "power3.inOut",
        }, 0);
      } else {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-black/0"
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      onClick={handleClose}
    >
      <motion.div
        ref={imageRef}
        className="overflow-hidden relative"
        initial={{ borderRadius: "12px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          priority={true}
          quality={100}
          sizes="100vw"
        />

        <motion.div 
          className="absolute bottom-8 left-0 right-0 text-center text-white z-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <h2 className="text-3xl font-bold mb-2">{image.alt}</h2>
        </motion.div>
      </motion.div>

      <motion.button
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white z-10 hover:bg-black/80 transition-colors"
        variants={closeButtonVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={handleClose}
      >
        <X size={28} />
      </motion.button>
    </motion.div>
  );
}