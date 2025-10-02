import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AutoSliderCards } from "./AutoSliderCards";
export function HeroBanner() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <Card className="lg:col-span-2 bg-gradient-primary text-white border-0 animate-slide-up relative overflow-hidden group">
        <CardContent className="p-8 flex items-center justify-between relative z-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green/20 text-green text-xs font-semibold mb-2">
                ✨ DASHBOARD
              </div>
              <h2 className="text-3xl font-bold leading-tight">
                Welcome back 👋<br />
                <span className="text-2xl">Jaydon Frankie</span>
              </h2>
            </div>
            <p className="text-slate-200 max-w-md leading-relaxed">
              Ready to boost your productivity? Explore new features and insights to make your workflow seamless and efficient.
            </p>
            <Button className="bg-success hover:bg-success/90 text-success-foreground transition-all duration-300 hover:scale-105 hover:shadow-xl px-6 py-3 font-semibold">
              Get Started →
            </Button>
          </div>
          <div className="hidden lg:block">
            <div className="w-36 h-36 bg-gradient-to-br from-green/20 to-blue/20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110">
              <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-12 shadow-2xl">
                <span className="text-3xl">👨‍💻</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green/10 to-transparent rounded-tr-full" />
      </Card>

      <div className="animate-fade-in-up">
        <AutoSliderCards />
      </div>
    </div>
  );
}