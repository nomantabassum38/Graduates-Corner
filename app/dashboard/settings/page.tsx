"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, User, Building2, MapPin, Globe, Phone, Linkedin } from "lucide-react"
import { ProfilePhotoSection } from "@/components/shared/profile-photo-section"

export default function SettingsPage() {
  const { user } = useAuth()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    address: "",
    website: "",
    linkedin: "",
    phone: "",
    organization: "",
  })

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (data && !error) {
          setFormData({
            name: data.name || "",
            bio: data.bio || "",
            address: data.address || "",
            website: data.website || "",
            linkedin: data.linkedin || "",
            phone: data.phone || "",
            organization: data.organization || "",
          })
        }
      }
      fetchProfile()
    }
  }, [user, supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    const { error } = await supabase
      .from('profiles')
      .update({
        name: formData.name,
        bio: formData.bio,
        address: formData.address,
        website: formData.website,
        linkedin: formData.linkedin,
        phone: formData.phone,
        organization: formData.organization,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    setLoading(false)

    if (error) {
      toast.error("Failed to update profile", { description: error.message })
    } else {
      toast.success("Profile updated successfully")
    }
  }

  if (!user) return null

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account settings and profile information.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_250px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and how others see you on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name / Display Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="pl-9" 
                        placeholder="John Doe" 
                      />
                    </div>
                  </div>

                  {(user.type === 'company' || user.type === 'university') && (
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="organization" 
                          name="organization" 
                          value={formData.organization} 
                          onChange={handleChange} 
                          className="pl-9" 
                          placeholder="Acme Corp" 
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio / About</Label>
                    <Textarea 
                      id="bio" 
                      name="bio" 
                      value={formData.bio} 
                      onChange={handleChange} 
                      className="min-h-[100px]" 
                      placeholder="Tell us a little bit about yourself..." 
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="address">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="address" 
                          name="address" 
                          value={formData.address} 
                          onChange={handleChange} 
                          className="pl-9" 
                          placeholder="City, Country" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          className="pl-9" 
                          placeholder="+1 234 567 8900" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="website" 
                          name="website" 
                          value={formData.website} 
                          onChange={handleChange} 
                          className="pl-9" 
                          placeholder="https://example.com" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="linkedin" 
                          name="linkedin" 
                          value={formData.linkedin} 
                          onChange={handleChange} 
                          className="pl-9" 
                          placeholder="https://linkedin.com/in/username" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" form="profile-form" disabled={loading} className="w-full sm:w-auto">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
              <ProfilePhotoSection size="lg" />
              <p className="text-center text-xs text-muted-foreground">
                Click the image to upload a new profile photo. Max size 2MB.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
