"use client";

import React, { useState, useEffect, useContext } from 'react';
import { 
  User, Settings, Camera, Upload, Save, Eye, EyeOff, 
  Phone, Mail, MapPin, Calendar, Shield, LogOut,
  Bell, Palette, Globe, Lock, Key
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface UserProfile {
  UserID: number;
  UserName: string;
  Email: string;
  PhoneNumber: string;
  Role: string;
  CreatedAt: string;
  ProfilePicture?: string;
}

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    userName: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phone || '',
    profilePicture: user?.avatar || ''
  });
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    darkMode: false,
    language: 'en',
    timezone: 'UTC+3'
  });

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with actual API
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          ...profileData
        })
      });
      
      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('An error occurred while updating your profile.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long!');
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call - replace with actual API
      const response = await fetch('/api/profile/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      
      if (response.ok) {
        toast.success('Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordForm(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to change password.');
      }
    } catch (error) {
      console.error('Password change error:', error);
      toast.error('An error occurred while changing your password.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB.');
      return;
    }

    try {
      setLoading(true);
      
      // Create form data for file upload
      const formData = new FormData();
      formData.append('profilePicture', file);
      formData.append('userId', user?.UserID?.toString() || '');
      
      // Simulate API call - replace with actual API
      const response = await fetch('/api/profile/upload-picture', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        setProfileData(prev => ({ ...prev, profilePicture: result.imageUrl }));
        toast.success('Profile picture updated successfully!');
      } else {
        toast.error('Failed to update profile picture.');
      }
    } catch (error) {
      console.error('Profile picture upload error:', error);
      toast.error('An error occurred while uploading your picture.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout.');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    {profileData.profilePicture ? (
                      <AvatarImage src={profileData.profilePicture} alt="Profile" />
                    ) : (
                      <AvatarFallback className="text-lg">
                        {profileData.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2">
                    <label htmlFor="profile-picture" className="cursor-pointer">
                      <div className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors">
                        <Camera className="h-4 w-4" />
                      </div>
                    </label>
                    <input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                      disabled={loading}
                      aria-label="Upload profile picture"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={user?.role === 'Administrator' ? 'destructive' : 'default'}>
                      {user?.role === 'Administrator' ? <Shield className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                      {user?.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click the camera icon to change your profile picture. Max file size: 5MB
                  </p>
                  
                  {/* Profile Form */}
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="userName">Full Name</Label>
                      <Input
                        id="userName"
                        value={profileData.userName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, userName: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleProfileUpdate} 
                      disabled={loading}
                      className="w-fit"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-muted-foreground">
                      Change your account password
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
                
                {showPasswordForm && (
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          placeholder="Enter current password"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          placeholder="Enter new password"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          placeholder="Confirm new password"
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button onClick={handlePasswordChange} disabled={loading}>
                          {loading ? 'Changing...' : 'Change Password'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setShowPasswordForm(false);
                            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <Separator />
              
              {/* Account Info */}
              <div>
                <h3 className="font-medium mb-2">Account Information</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Account created: {new Date(user?.createdAt || '').toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>User ID: {user?.UserID}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, smsNotifications: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                App Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, language: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sw">Kiswahili</SelectItem>
                      <SelectItem value="lg">Luganda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, timezone: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC+3">UTC+3 (East Africa Time)</SelectItem>
                      <SelectItem value="UTC+0">UTC+0 (Greenwich Mean Time)</SelectItem>
                      <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, darkMode: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Logout Section */}
      <Card className="mt-8 border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Account Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Sign Out</h3>
              <p className="text-sm text-muted-foreground">
                Sign out of your account on this device
              </p>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be redirected to the login page and will need to sign in again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Sign Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}