"use client";
import "../app/globals.css";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    if (!imageElement) {
      console.error("imageRef.current is null"); // Debugging
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      console.log("Scroll Position:", scrollPosition); // Debugging

      if (scrollPosition > 100) {
        imageElement.classList.add("scrolled");
        console.log("Class added: scrolled");
      } else {
        imageElement.classList.remove("scrolled");
        console.log("Class removed: scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finances <br /> with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="https://www.youtube.com/watch?v=egS6fnZAdzk&t=1157s">
            <Button size="lg" variant="outline" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper">
          <Image
            ref={imageRef} // ✅ Move ref here
            src="/banner.jpeg"
            width={1280}
            height={720}
            alt="Dashboard Preview"
            className="hero-image rounded-lg shadow-2xl border mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
