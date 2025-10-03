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
    NationalID: "",
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    DateOfBirth: "",
    Role: "",
    Password: "",
    ConfirmPassword: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step === 1 && (!formData.NationalID || !formData.FirstName || !formData.LastName || !formData.Email)) {
      toast.error("Please fill in all required fields")
      return
    }
    if (step === 2 && !formData.Role) {
      toast.error("Please select a role")
      return
    }
    step < 3 && setStep(step + 1)
  }

  const prevStep = () => step > 1 && setStep(step - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.Password !== formData.ConfirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (formData.Password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    try {
      // Prepare data for API
      const { ConfirmPassword, Password, ...rest } = formData
      const apiData = {
        ...rest,
        PasswordHash: Password, // Backend should hash
      }

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
        setFormData({
          NationalID: "",
          FirstName: "",
          LastName: "",
          Email: "",
          PhoneNumber: "",
          DateOfBirth: "",
          Role: "",
          Password: "",
          ConfirmPassword: "",
        })
        setStep(1)
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
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-balance">
                  Sign up to get started with Acme Inc
                </p>
              </div>

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

              {/* Step 1 → NationalID, FirstName, LastName, Email */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <Label htmlFor="NationalID">NationalID</Label>
                    <Input
                      id="NationalID"
                      type="text"
                      placeholder="Enter your NationalID"
                      value={formData.NationalID}
                      onChange={(e) => handleChange("NationalID", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="FirstName">First Name</Label>
                    <Input
                      id="FirstName"
                      type="text"
                      placeholder="First Name"
                      value={formData.FirstName}
                      onChange={(e) => handleChange("FirstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="LastName">Last Name</Label>
                    <Input
                      id="LastName"
                      type="text"
                      placeholder="Last Name"
                      value={formData.LastName}
                      onChange={(e) => handleChange("LastName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="Email">Email</Label>
                    <Input
                      id="Email"
                      type="email"
                      placeholder="Email"
                      value={formData.Email}
                      onChange={(e) => handleChange("Email", e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2 → PhoneNumber, DateOfBirth, Role */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <Label htmlFor="PhoneNumber">Phone Number</Label>
                    <Input
                      id="PhoneNumber"
                      type="tel"
                      placeholder="Optional"
                      value={formData.PhoneNumber}
                      onChange={(e) => handleChange("PhoneNumber", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="DateOfBirth">Date of Birth</Label>
                    <Input
                      id="DateOfBirth"
                      type="date"
                      placeholder="Optional"
                      value={formData.DateOfBirth}
                      onChange={(e) => handleChange("DateOfBirth", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="Role">Role</Label>
                    <Select
                      onValueChange={(val) => handleChange("Role", val)}
                      value={formData.Role}
                    >
                      <SelectTrigger id="Role" className="rounded-lg border px-3 py-2">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Customer">Customer</SelectItem>
                        <SelectItem value="Staff">Staff</SelectItem>
                        <SelectItem value="Administrator">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3 → Password & Confirm Password */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <Label htmlFor="Password">Password</Label>
                    <Input
                      id="Password"
                      type="password"
                      placeholder="Enter password (min 6 characters)"
                      value={formData.Password}
                      onChange={(e) => handleChange("Password", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="ConfirmPassword">Confirm Password</Label>
                    <Input
                      id="ConfirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={formData.ConfirmPassword}
                      onChange={(e) =>
                        handleChange("ConfirmPassword", e.target.value)
                      }
                      required
                    />
                  </div>
                  {formData.Password && formData.ConfirmPassword && formData.Password !== formData.ConfirmPassword && (
                    <p className="text-sm text-red-500">Passwords do not match</p>
                  )}
                </div>
              )}

              <div className="flex justify-between">
                {step > 1 && (
                  <Button type="button" onClick={prevStep} className="bg-[hsl(27,96%,61%)] text-white hover:bg-[hsl(27,96%,51%)]">
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
                {["instagram", "google", "microsoft"].map((provider) => (
                  <Button
                    key={provider}
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={() => handleSocialLogin(provider)}
                    disabled={loadingProvider === provider}
                  >
                    {loadingProvider === provider ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Image src={`/${provider}.svg`} alt={provider} width={20} height={20} />
                    )}
                  </Button>
                ))}
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </div>
          </form>

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


      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
