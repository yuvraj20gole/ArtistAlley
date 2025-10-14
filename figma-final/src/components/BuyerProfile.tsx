import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { User, MapPin, CreditCard, Bell, Shield, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer';
}

interface BuyerProfileProps {
  user: User | null;
}

interface Address {
  id: number;
  label: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

// Mock saved addresses
const initialAddresses: Address[] = [
  {
    id: 1,
    label: 'Home',
    name: 'John Doe',
    phone: '+91 9876543210',
    addressLine1: '123, MG Road',
    addressLine2: 'Near Central Mall',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Office',
    name: 'John Doe',
    phone: '+91 9876543210',
    addressLine1: '456, Brigade Road',
    addressLine2: 'Tech Park, 3rd Floor',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560025',
    isDefault: false,
  },
];

export function BuyerProfile({ user }: BuyerProfileProps) {
  const [activeSection, setActiveSection] = useState('personal');
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 9876543210',
    bio: 'Art enthusiast and collector',
  });

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newArtwork: true,
    artistUpdates: true,
    promotions: false,
    newsletter: true,
  });

  const handleSavePersonalInfo = () => {
    toast.success('Personal information updated successfully!');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences updated!');
  };

  const handleDeleteAddress = (addressId: number) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== addressId));
      toast.success('Address deleted successfully');
    }
  };

  const handleSetDefaultAddress = (addressId: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
    toast.success('Default address updated');
  };

  const sections = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-6">
            <h3 className="text-xl mb-6" style={{ fontFamily: 'Playfair Display' }}>Personal Information</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    className="bg-input-background border-stone-300 mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="bg-input-background border-stone-300 mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  className="bg-input-background border-stone-300 mt-2"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={personalInfo.bio}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                  className="bg-input-background border-stone-300 mt-2"
                  rows={4}
                />
              </div>

              <Button
                onClick={handleSavePersonalInfo}
                className="bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700"
              >
                Save Changes
              </Button>
            </div>
          </Card>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl" style={{ fontFamily: 'Playfair Display' }}>Saved Addresses</h3>
                <Button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>
              </div>

              {showAddressForm && (
                <div className="mb-6 p-6 bg-stone-50 rounded-lg border border-stone-200">
                  <h4 className="mb-4">New Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Label (e.g., Home, Office)" className="bg-white border-stone-300" />
                    <Input placeholder="Full Name" className="bg-white border-stone-300" />
                    <Input placeholder="Phone Number" className="bg-white border-stone-300" />
                    <Input placeholder="Pincode" className="bg-white border-stone-300" />
                    <Input placeholder="Address Line 1" className="md:col-span-2 bg-white border-stone-300" />
                    <Input placeholder="Address Line 2" className="md:col-span-2 bg-white border-stone-300" />
                    <Input placeholder="City" className="bg-white border-stone-300" />
                    <Input placeholder="State" className="bg-white border-stone-300" />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button className="bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700">
                      Save Address
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddressForm(false)} className="border-stone-300">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="p-4 border border-stone-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-stone-800 text-white rounded-md text-sm">
                          {address.label}
                        </span>
                        {address.isDefault && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm">
                            Default
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-stone-700 space-y-1">
                      <p>{address.name}</p>
                      <p>{address.phone}</p>
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>{address.city}, {address.state} - {address.pincode}</p>
                    </div>
                    {!address.isDefault && (
                      <Button
                        onClick={() => handleSetDefaultAddress(address.id)}
                        variant="outline"
                        size="sm"
                        className="mt-3 border-stone-300"
                      >
                        Set as Default
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'payment':
        return (
          <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-6">
            <h3 className="text-xl mb-6" style={{ fontFamily: 'Playfair Display' }}>Payment Methods</h3>
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 mx-auto mb-4 text-stone-300" />
              <p className="text-stone-600 mb-4">No saved payment methods</p>
              <p className="text-sm text-stone-500 mb-6">Payment methods will be available when integrated with payment gateway</p>
              <Button className="bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </Card>
        );

      case 'notifications':
        return (
          <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-6">
            <h3 className="text-xl mb-6" style={{ fontFamily: 'Playfair Display' }}>Notification Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-stone-200">
                <div>
                  <p>Order Updates</p>
                  <p className="text-sm text-stone-600">Get notified about your order status</p>
                </div>
                <Switch
                  checked={notifications.orderUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-stone-200">
                <div>
                  <p>New Artwork Alerts</p>
                  <p className="text-sm text-stone-600">Notifications when artists you follow add new artwork</p>
                </div>
                <Switch
                  checked={notifications.newArtwork}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newArtwork: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-stone-200">
                <div>
                  <p>Artist Updates</p>
                  <p className="text-sm text-stone-600">Updates from artists you follow</p>
                </div>
                <Switch
                  checked={notifications.artistUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, artistUpdates: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-stone-200">
                <div>
                  <p>Promotions & Offers</p>
                  <p className="text-sm text-stone-600">Special deals and discounts</p>
                </div>
                <Switch
                  checked={notifications.promotions}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p>Newsletter</p>
                  <p className="text-sm text-stone-600">Monthly newsletter with curated artwork</p>
                </div>
                <Switch
                  checked={notifications.newsletter}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newsletter: checked })}
                />
              </div>

              <Button
                onClick={handleSaveNotifications}
                className="bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700"
              >
                Save Preferences
              </Button>
            </div>
          </Card>
        );

      case 'security':
        return (
          <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-6">
            <h3 className="text-xl mb-6" style={{ fontFamily: 'Playfair Display' }}>Security Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="mb-4">Change Password</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="bg-input-background border-stone-300 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      className="bg-input-background border-stone-300 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="bg-input-background border-stone-300 mt-2"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700">
                    Update Password
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-200">
                <h4 className="mb-4">Two-Factor Authentication</h4>
                <p className="text-stone-600 mb-4">Add an extra layer of security to your account</p>
                <Button variant="outline" className="border-stone-300">
                  Enable Two-Factor Authentication
                </Button>
              </div>

              <div className="pt-6 border-t border-stone-200">
                <h4 className="mb-4 text-red-600">Danger Zone</h4>
                <p className="text-stone-600 mb-4">Permanently delete your account and all associated data</p>
                <Button variant="destructive">
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display' }}>Profile & Settings</h2>
        <p className="text-stone-600">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-4 h-fit">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-stone-800 to-neutral-800 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
