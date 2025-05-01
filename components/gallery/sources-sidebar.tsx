"use client";

import { motion } from "framer-motion";
import { itinerarySources } from "@/data/sources";
import { ExternalLink, CheckCircle, BookOpen, Globe, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SourcesSidebar() {
  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'guide': return <BookOpen className="w-4 h-4" />;
      case 'blog': return <Newspaper className="w-4 h-4" />;
      case 'official': return <Globe className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getSourceColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-purple-500/10 text-purple-500';
      case 'blog': return 'bg-blue-500/10 text-blue-500';
      case 'official': return 'bg-green-500/10 text-green-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="fixed left-4 top-1/2 -translate-y-1/2 rotate-90 origin-left"
        >
          View Sources
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Itinerary Sources</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-6">
          {itinerarySources.map((source) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card/30 backdrop-blur-sm p-4 rounded-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={getSourceColor(source.type)}>
                      <span className="flex items-center gap-1">
                        {getSourceIcon(source.type)}
                        {source.type}
                      </span>
                    </Badge>
                    {source.verified && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <h3 className="font-medium mb-1">{source.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {source.description}
                  </p>
                  {source.rating && (
                    <div className="flex items-center gap-1 text-sm text-yellow-500 mb-2">
                      {'★'.repeat(Math.floor(source.rating))}
                      <span className="text-muted-foreground ml-1">
                        ({source.rating})
                      </span>
                    </div>
                  )}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    Visit source
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}