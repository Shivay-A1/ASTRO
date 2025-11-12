import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fff8e7] dark:bg-gray-950">

      {/* 🪔 Hero Section with Image + Form Overlay */}
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-r from-[#f3e5c0] via-[#f8edcc] to-[#fffaf0]">

        {/* Hero Image */}
        <Image
          src="/images/r.png"
          alt="Contact Banner"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Text Over Image (Top-Left) */}
        <div className="absolute top-10 left-10 z-10 max-w-md md:max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            Get In Touch
          </h1>
          <p className="mt-2 text-md md:text-lg text-white drop-shadow-sm">
            Reach out for support, questions, or custom orders.
          </p>
        </div>

        {/* Form Over Image (Top-Left, below heading) */}
        <div className="absolute top-44 left-10 w-full max-w-2xl z-10">
          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-white/50 bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#f3e5c0] focus:ring-opacity-50"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-white/50 bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#f3e5c0] focus:ring-opacity-50"
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Write your message here..."
              className="w-full px-4 py-3 rounded-lg border border-white/50 bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#f3e5c0] focus:ring-opacity-50"
            />
            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
