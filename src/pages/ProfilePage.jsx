import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Bell,
  CreditCard,
  Package,
  Heart,
  Settings,
  LogOut,
  Download,
  Eye,
  Trash2
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { cn } from '../lib/utils'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Solar Street, Green City, GC 12345',
    dateOfBirth: '1990-01-15',
    bio: 'Passionate about renewable energy and sustainable living.',
    avatar: null
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    orderUpdates: true,
    newsletter: true,
    darkMode: false
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Save to backend
    console.log('Saving profile:', profileData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset changes
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: '$2,499.99',
      items: 2,
      product: 'SolarMax Pro 5kW Inverter'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: '$899.99',
      items: 1,
      product: 'Solar Battery Pack 10kWh'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Processing',
      total: '$1,299.99',
      items: 3,
      product: 'Solar Panel Kit 300W'
    }
  ]

  const wishlistItems = [
    {
      id: 1,
      name: 'SolarMax Elite 10kW',
      price: '$4,999.99',
      image: '/api/placeholder/200/200',
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Solar Controller',
      price: '$299.99',
      image: '/api/placeholder/200/200',
      inStock: false
    },
    {
      id: 3,
      name: 'Solar Monitoring System',
      price: '$199.99',
      image: '/api/placeholder/200/200',
      inStock: true
    }
  ]

  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Solar Street',
      city: 'Green City',
      state: 'GC',
      zip: '12345',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      address: '456 Business Ave',
      city: 'Tech City',
      state: 'TC',
      zip: '67890',
      isDefault: false
    }
  ]

  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiry: '09/26',
      isDefault: false
    }
  ]

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-solar rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-muted-foreground">{profileData.email}</p>
                </div>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Member since Jan 2024</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <input
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={cn(
                  "w-full px-3 py-2 border rounded-lg bg-background",
                  isEditing 
                    ? "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                    : "bg-muted cursor-not-allowed"
                )}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <input
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={cn(
                  "w-full px-3 py-2 border rounded-lg bg-background",
                  isEditing 
                    ? "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                    : "bg-muted cursor-not-allowed"
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <input
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={cn(
                "w-full px-3 py-2 border rounded-lg bg-background",
                isEditing 
                  ? "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                  : "bg-muted cursor-not-allowed"
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={profileData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={cn(
                "w-full px-3 py-2 border rounded-lg bg-background",
                isEditing 
                  ? "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                  : "bg-muted cursor-not-allowed"
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <input
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={cn(
                "w-full px-3 py-2 border rounded-lg bg-background",
                isEditing 
                  ? "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                  : "bg-muted cursor-not-allowed"
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={3}
              className={cn(
                "w-full px-3 py-2 border rounded-lg bg-background resize-none",
                isEditing 
                  ? "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                  : "bg-muted cursor-not-allowed"
              )}
            />
          </div>

          {isEditing && (
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>
            Track and manage your solar equipment orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">#{order.id}</span>
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full",
                      order.status === 'Delivered' && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                      order.status === 'Shipped' && "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                      order.status === 'Processing' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    )}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.product}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.date} • {order.items} item{order.items > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.total}</p>
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Invoice
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderWishlistTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wishlist</CardTitle>
          <CardDescription>
            Your saved solar products for future purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-lg font-bold text-primary">{item.price}</p>
                  <p className={cn(
                    "text-sm",
                    item.inStock ? "text-green-600" : "text-red-600"
                  )}>
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1" disabled={!item.inStock}>
                    Add to Cart
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAddressesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Saved Addresses</CardTitle>
            <CardDescription>
              Manage your delivery addresses
            </CardDescription>
          </div>
          <Button>Add New Address</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="flex items-start justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{address.type}</span>
                    {address.isDefault && (
                      <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm">{address.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {address.address}<br />
                    {address.city}, {address.state} {address.zip}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPaymentTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>
              Manage your saved payment methods
            </CardDescription>
          </div>
          <Button>Add New Card</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-purple-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    {method.type.slice(0, 4).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• {method.last4}</p>
                    <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                  </div>
                  {method.isDefault && (
                    <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose how you want to receive updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(preferences).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'smsNotifications' && 'Receive notifications via SMS'}
                  {key === 'marketingEmails' && 'Receive promotional emails'}
                  {key === 'orderUpdates' && 'Get updates about your orders'}
                  {key === 'newsletter' && 'Subscribe to our newsletter'}
                  {key === 'darkMode' && 'Use dark theme'}
                </p>
              </div>
              <button
                onClick={() => handlePreferenceChange(key)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  value ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    value ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24">
              <CardContent className="p-0">
                <div className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors",
                        activeTab === tab.id && "bg-primary/10 text-primary border-r-2 border-primary"
                      )}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                  
                  <div className="border-t">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors text-red-600">
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'orders' && renderOrdersTab()}
            {activeTab === 'wishlist' && renderWishlistTab()}
            {activeTab === 'addresses' && renderAddressesTab()}
            {activeTab === 'payment' && renderPaymentTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}