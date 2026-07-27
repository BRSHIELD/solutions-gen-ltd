import { motion } from "framer-motion";
import React from "react";

interface BackgroundVideoProps {
  videoSrc: string;
  overlayOpacity?: number; // 0-100, default 60
  children?: React.ReactNode;
  className?: string;
  videoClassName?: string;
}

export default function BackgroundVideo({
  videoSrc,
  overlayOpacity = 60,
  children,
  className = "",
  videoClassName = "",
}: BackgroundVideoProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover ${videoClassName}`}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Text Readability */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: overlayOpacity / 100 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
