"use client"

import { useState } from "react"
import { Bell, Search, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { motion, AnimatePresence } from "framer-motion"

export function TopNav() {
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-2" />

          {/* Search (desktop only) */}
          <div className="relative hidden md:block w-80 lg:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-background w-full"
            />
          </div>

          {/* Mobile search icon */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileSearch(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full p-0"
              >
                <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search (animated) */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-16 z-30 bg-card px-4 pb-3 border-b border-border md:hidden"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search..."
                className="pl-10 pr-10 bg-background w-full"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1"
                onClick={() => setShowMobileSearch(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
