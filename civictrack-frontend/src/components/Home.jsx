import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(".fade-section");

    gsap.from(".hero-text", {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power2.out",
    });

    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 hero-text text-center">
          Welcome to CivicTrack
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl">
          Empower your community by reporting local issues like potholes,
          garbage, and broken streetlights.
        </p>
      </section>

      {/* Scroll Sections */}
      <section className="py-24 px-6 fade-section bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why CivicTrack?</h2>
          <p className="text-gray-600">
            We bridge the gap between citizens and local authorities by
            providing a transparent and trackable way to report civic issues.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 fade-section bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">
            Simply submit a report with a title, description, and image. We'll
            notify the right department and keep you updated.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 fade-section bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Your Impact</h2>
          <p className="text-gray-600">
            Every issue reported improves your neighborhood. Be the voice of
            change — your contribution matters!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
