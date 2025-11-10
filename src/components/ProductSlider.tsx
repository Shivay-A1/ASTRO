"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const images = [
  {
    src: "/images/rudraksha.png",
   
    category: "rudraksha",
  },
  {
    src: "/images/temple.png",
   
    category: "temple",
  },
  {
    src: "/images/gemstone.png",
   
    category: "gemstone",
  },
  {
    src: "/images/bracelet.png",
    alt: "Bracelet",
    category: "bracelet",
  },
  {
    src: "/images/yantra.png",
    alt: "Yantra",
    category: "yantra",
  },
];

export default function ProductSlider() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (category: string) => {
    router.push(`/category/${category}`);
  };

  return (
    <div className="relative w-full h-[45vh] md:h-[50vh] overflow-hidden cursor-pointer">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => handleClick(img.category)}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === index}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
              {img.alt}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
