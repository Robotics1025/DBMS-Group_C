import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-1w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BR</span>
              </div>
              <span className="text-xl font-bold">BikeRent</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for bike rentals. Ride with confidence, explore with freedom.
            </p>
            <div className="flex items-center gap-3">
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:bg-gray-800 p-0 h-10 w-10"
                asChild
              >
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Image 
                    src="/assets/icons/social/facebook.png" 
                    alt="Facebook" 
                    width={20} 
                    height={20}
                    className="object-contain"
                  />
                </Link>
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:bg-gray-800 p-0 h-10 w-10"
                asChild
              >
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Image 
                    src="/assets/icons/social/tiktok.png" 
                    alt="TikTok" 
                    width={20} 
                    height={20}
                    className="object-contain"
                  />
                </Link>
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:bg-gray-800 p-0 h-10 w-10"
                asChild
              >
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Image 
                    src="/assets/icons/social/instagram.png" 
                    alt="Instagram" 
                    width={20} 
                    height={20}
                    className="object-contain"
                  />
                </Link>
              </Button>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/customer-dashboard/profile" className="hover:text-orange-500">Help Center</Link></li>
              <li><Link href="/customer-dashboard/profile" className="hover:text-orange-500">Track Order</Link></li>
              <li><Link href="/customer-dashboard/profile" className="hover:text-orange-500">Returns & Refunds</Link></li>
              <li><Link href="/customer-dashboard/profile" className="hover:text-orange-500">FAQs</Link></li>
              <li><Link href="/customer-dashboard/profile" className="hover:text-orange-500">Contact Us</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/customer-dashboard" className="hover:text-orange-500">All Bikes</Link></li>
              <li><Link href="/customer-dashboard" className="hover:text-orange-500">Electric Bikes</Link></li>
              <li><Link href="/customer-dashboard" className="hover:text-orange-500">City Bikes</Link></li>
              <li><Link href="/customer-dashboard" className="hover:text-orange-500">Mountain Bikes</Link></li>
              <li><Link href="/customer-dashboard/profile" className="hover:text-orange-500">My Account</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>+256-XXX-XXXX</p>
                  <p className="text-xs">Mon-Fri 9am-6pm</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>support@bikerent.com</p>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>123 Main Street, Kampala<br />Uganda</p>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© 2025 BikeRent. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-orange-500">Privacy Policy</Link>
            <Link href="#" className="hover:text-orange-500">Terms of Service</Link>
            <Link href="#" className="hover:text-orange-500">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
