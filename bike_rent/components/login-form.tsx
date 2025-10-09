"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { Loader2, Users } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth, getDashboardPath, UserRole } from "@/contexts/AuthContext"
import { useNotify } from "@/hooks/use-notify"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, user, isAuthenticated } = useAuth()
  const { notify } = useNotify()
  const message = searchParams.get("message")

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboardPath = getDashboardPath(user.role)
      router.push(dashboardPath)
    }
  }, [isAuthenticated, user, router])

  // Show success message if redirected from signup
  useEffect(() => {
    if (message) {
      notify.success("Account created", message)
      const url = new URL(window.location.href)
      url.searchParams.delete("message")
      window.history.replaceState({}, "", url.toString())
    }
  }, [message, notify])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      notify.error("Please fill in all fields")
      return
    }

    setLoading(true)

    try {
      const result = await login(email, password)

      if (!result.success) {
        notify.error("Login failed", result.message || "Invalid credentials")
        return
      }

      if (result.user) {
        const dashboardPath = getDashboardPath(result.user.role)
        notify.success("Login successful!", `Welcome ${result.user.name}`)
        router.push(dashboardPath)
      }
    } catch (err) {
      console.error("Login failed:", err)
      notify.error("Login failed", "Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    notify.warning("Coming soon", `${provider} login is not implemented yet.`)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left Side → Form */}
          <form onSubmit={handleLogin} className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col items-center text-center space-y-1">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground text-balance">
                Login to your Bike Rental System
              </p>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* Divider */}
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:border-t after:border-border">
              <span className="bg-card relative z-10 px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>

            {/* Social Auth */}
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" type="button" className="w-full" onClick={() => handleSocialLogin("instagram")} disabled={loading}>
                <Image src="/instagram.svg" alt="Instagram" width={20} height={20} />
                <span className="sr-only">Login with Instagram</span>
              </Button>
              <Button variant="outline" type="button" className="w-full" onClick={() => handleSocialLogin("google")} disabled={loading}>
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                <span className="sr-only">Login with Google</span>
              </Button>
              <Button variant="outline" type="button" className="w-full" onClick={() => handleSocialLogin("microsoft")} disabled={loading}>
                <Image src="/microsoft.svg" alt="Microsoft" width={20} height={20} />
                <span className="sr-only">Login with Microsoft</span>
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                Sign up
              </Link>
            </div>
          </form>

          {/* Right Side → Image */}
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/bike.jpg"
              alt="Login illustration"
              fill
              className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
              priority
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
        By clicking continue, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  )
}
