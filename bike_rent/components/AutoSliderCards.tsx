import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import workspace1 from "@/assets/workspace-1.jpg";
import analyticsDashboard from "@/assets/analytics-dashboard.jpg";

const slides = [
  {
    id: 1,
    title: "Remote Work Revolution",
    description: "Discover how remote work is transforming modern business landscapes worldwide.",
    badge: "TRENDING",
    image: workspace1,
    gradient: "from-slate-900 to-purple-950",
  },
  {
    id: 2,
    title: "Analytics Dashboard",
    description: "Real-time insights and data visualization for better decision making.",
    badge: "NEW FEATURE",
    image: analyticsDashboard,
    gradient: "from-slate-900 to-blue-950",
  },
];

export function AutoSliderCards() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative">
      <Card
        className={`bg-gradient-to-br ${currentSlideData.gradient} text-white border-0 relative overflow-hidden group cursor-pointer transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up`}
      >
        <CardContent className="p-0 relative h-64">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={currentSlideData.image}
              alt={currentSlideData.title}
              fill
              className="object-cover opacity-40 group-hover:opacity-50 transition-all duration-700 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-all duration-300 group/btn"
          >
            <ChevronLeft className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-all duration-300 group/btn"
          >
            <ChevronRight className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
          </button>

          {/* Badge */}
          <div className="absolute top-4 right-4 z-10">
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                currentSlide === 0
                  ? "bg-green/30 text-green border border-green/50"
                  : "bg-blue/30 text-blue border border-blue/50"
              }`}
            >
              {currentSlideData.badge}
            </div>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <h3 className="font-bold text-xl mb-3 leading-tight">
              {currentSlideData.title}
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed max-w-md">
              {currentSlideData.description}
            </p>
          </div>

          {/* Decorative element */}
          <div
            className={`absolute bottom-0 right-0 w-24 h-24 ${
              currentSlide === 0
                ? "bg-gradient-to-tl from-green/40 to-transparent"
                : "bg-gradient-to-tl from-blue/40 to-transparent"
            } rounded-tl-full transition-all duration-700 group-hover:w-28 group-hover:h-28`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
