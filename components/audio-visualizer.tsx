"use client";

import { useEffect, useRef } from "react";

export function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const bars = 50;
    const barWidth = canvas.width / bars;
    
    const renderFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Simple animation for demo purposes
      // In a real app, this would visualize actual audio data
      for (let i = 0; i < bars; i++) {
        // Generate random height for each bar
        const height = Math.random() * 50 + 5;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(
          i * barWidth, 
          canvas.height - height, 
          barWidth - 1, 
          height
        );
      }
      
      requestAnimationFrame(renderFrame);
    };
    
    const animationId = requestAnimationFrame(renderFrame);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={60} 
      className="rounded-md bg-transparent"
    />
  );
}