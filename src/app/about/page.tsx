"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const [animateIndex, setAnimateIndex] = useState(-1);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setAnimateIndex(i);
      i++;
      if (i > 5) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">

      {/* 🌟 Background Section */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden">

        {/* Background Image */}
        <Image
          src="/images/r.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Main Content Over Image */}
        <div className="relative z-10 flex flex-col justify-start items-center px-6 md:px-16 pt-10 max-w-6xl mx-auto text-center space-y-6">

          {/* About AstroNova */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
              About AstroNova
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white drop-shadow-sm max-w-2xl mx-auto">
              Life becomes meaningful when lived with intention. We bring back the ritual of pause — reconnect with what truly matters.
            </p>
          </div>

          {/* Our Promise */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-sm">
              Our Promise
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white drop-shadow-sm max-w-2xl mx-auto">
              Crafted with intention, natural, and sustainable products that align with your spiritual journey.
            </p>
          </div>

          {/* Promise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4 w-full">
            {[
              { title: "Natural by Nature", desc: "Crafted from sacred cow dung, free from toxins and chemicals.", icon: "/icons/natural.png" },
              { title: "Purposeful Blends", desc: "Infused with essences chosen for clarity, renewal, and peace.", icon: "/icons/purposeful.png" },
              { title: "Sustainable Living", desc: "Each cup returns gently to the soil, leaving no trace behind.", icon: "/icons/sustainable.png" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center p-6 rounded-3xl bg-white/20 backdrop-blur-sm border border-white/40 shadow-lg transform transition duration-500 h-[180px]
                  ${animateIndex >= idx ? "scale-100 opacity-100" : "scale-90 opacity-0"}
                  hover:scale-105 hover:shadow-2xl`}
              >
                <div className="w-12 h-12 mb-2">
                  <Image src={item.icon} alt={item.title} width={48} height={48} />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 text-center">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-white text-center">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Ritual Steps Section */}
          <div className="w-full mt-6">
            <div className="space-y-2 mb-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                How To Perform
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white drop-shadow-sm">
                Your Ritual In 3 Simple Steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
              {[
                { title: "Place incense cup on stand", desc: "Place incense cup on stand", icon: "/icons/incense.png" },
                { title: "Light the rim and let smoke clear", desc: "Light the rim and let smoke clear", icon: "/icons/light.png" },
                { title: "Set your intention and play the ritual", desc: "Set your intention and play the ritual", icon: "/icons/play.png" },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center p-6 rounded-3xl bg-white/20 backdrop-blur-sm border border-white/40 shadow-lg transform transition duration-500 h-[180px]
                    ${animateIndex >= idx + 3 ? "scale-100 opacity-100" : "scale-90 opacity-0"}
                    hover:scale-105 hover:shadow-2xl`}
                >
                  <Image src={step.icon} alt={step.title} width={64} height={64} className="mb-2" />
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 text-center">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-sm text-white text-center">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
