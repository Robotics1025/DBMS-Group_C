"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [step, setStep] = useState(1)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "", // Changed from username to name
    email: "",
    role: "",
    password: "",
    confirmPassword: "", // Keep for UI validation only
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    // Validate current step before proceeding
    if (step === 1 && (!formData.name || !formData.email)) {
      toast.error("Please fill in all fields")
      return
    }
    if (step === 2 && !formData.role) {
      toast.error("Please select a role")
      return
    }
    step < 3 && setStep(step + 1)
  }
  
  const prevStep = () => step > 1 && setStep(step - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    
    // Validate password strength
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    try {
      // Send only the required fields to the API
      const { confirmPassword, ...apiData } = formData
      
      console.log("Sending data to API:", apiData)
      
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      })
      
      const data = await res.json()
      console.log("API response:", data)
      
      if (res.ok) {
        toast.success("Signup successful! You can now log in.")
        // Reset form
        setFormData({
          name: "",
          email: "",
          role: "",
          password: "",
          confirmPassword: "",
        })
        setStep(1)
        // Optionally redirect to login
        // router.push("/login")
      } else {
        toast.error(data.error || "Signup failed")
      }
    } catch (err) {
      console.error("Signup error:", err)
      toast.error("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setLoadingProvider(provider)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(`Social signup with: ${provider}`)
    setLoadingProvider(null)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-balance">
                  Sign up to get started with Acme Inc
                </p>
              </div>

              {/* Progress with numbers */}
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium",
                      step >= num
                        ? "bg-primary text-white border-primary"
                        : "bg-muted text-muted-foreground border"
                    )}
                  >
                    {num}
                  </div>
                ))}
              </div>
              <Progress value={(step / 3) * 100} className="w-full" />

              {/* Step 1 → Name & Email */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Full Name</Label> {/* Changed from Username */}
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2 → Role */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      onValueChange={(val) => handleChange("role", val)}
                      value={formData.role}
                    >
                      <SelectTrigger
                        id="role"
                        className="rounded-lg border bg-background px-3 py-2 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
                      >
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3 → Password & Confirm */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password (min 6 characters)"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      required
                    />
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-red-500">Passwords do not match</p>
                  )}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-between">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    className="bg-[hsl(27,96%,61%)] text-white hover:bg-[hsl(27,96%,51%)]"
                  >
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" onClick={nextStep} className="ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto" disabled={loading}>
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                    ) : null}
                    Sign Up
                  </Button>
                )}
              </div>

              {/* Social logins */}
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={() => handleSocialLogin("instagram")}
                  disabled={loadingProvider === "instagram"}
                >
                  {loadingProvider === "instagram" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Image
                      src="/instagram.svg"
                      alt="Instagram"
                      width={20}
                      height={20}
                    />
                  )}
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={() => handleSocialLogin("google")}
                  disabled={loadingProvider === "google"}
                >
                  {loadingProvider === "google" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Image
                      src="/google.svg"
                      alt="Google"
                      width={20}
                      height={20}
                    />
                  )}
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={() => handleSocialLogin("microsoft")}
                  disabled={loadingProvider === "microsoft"}
                >
                  {loadingProvider === "microsoft" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Image
                      src="/microsoft.svg"
                      alt="Microsoft"
                      width={20}
                      height={20}
                    />
                  )}
                </Button>
              </div>

              {/* Already have an account */}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </div>
          </form>

          {/* Side image */}
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/home.jpg"
              alt="Signup illustration"
              fill
              className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}