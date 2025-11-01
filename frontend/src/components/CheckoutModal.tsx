import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { X, CreditCard, MapPin, User, Phone } from "lucide-react";
import { toast } from "sonner";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  }) => void;
  total: number;
}

export function CheckoutModal({ isOpen, onClose, onConfirm, total }: CheckoutModalProps) {
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    if (!shippingAddress.name || !shippingAddress.address || !shippingAddress.city || 
        !shippingAddress.state || !shippingAddress.pincode || !shippingAddress.phone) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method');
      setLoading(false);
      return;
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onConfirm(shippingAddress);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Playfair Display' }}>
            Checkout
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Shipping Address */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-stone-600" />
              <h3 className="text-lg font-semibold text-stone-800">Shipping Address</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  value={shippingAddress.name}
                  onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <Input
                  type="text"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                  placeholder="Enter your full address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <Input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  placeholder="Enter your city"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <Input
                  type="text"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                  placeholder="Enter your state"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode *
                </label>
                <Input
                  type="text"
                  value={shippingAddress.pincode}
                  onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                  placeholder="Enter pincode"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-stone-600" />
              <h3 className="text-lg font-semibold text-stone-800">Payment Method</h3>
            </div>
            
            <div className="space-y-3">
              {/* UPI */}
              <Card 
                className={`p-4 cursor-pointer transition-all ${
                  selectedPaymentMethod === 'upi' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-stone-200 hover:border-stone-400'
                }`}
                onClick={() => setSelectedPaymentMethod('upi')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">UPI</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-stone-800">UPI Payment</p>
                    <p className="text-sm text-stone-600">Pay using PhonePe, Google Pay, Paytm, etc.</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPaymentMethod === 'upi' ? 'border-purple-500 bg-purple-500' : 'border-stone-400'
                  }`}></div>
                </div>
              </Card>

              {/* Credit/Debit Card */}
              <Card 
                className={`p-4 cursor-pointer transition-all ${
                  selectedPaymentMethod === 'card' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-stone-200 hover:border-stone-400'
                }`}
                onClick={() => setSelectedPaymentMethod('card')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-stone-800">Credit/Debit Card</p>
                    <p className="text-sm text-stone-600">Visa, Mastercard, RuPay accepted</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPaymentMethod === 'card' ? 'border-blue-500 bg-blue-500' : 'border-stone-400'
                  }`}></div>
                </div>
              </Card>

              {/* Net Banking */}
              <Card 
                className={`p-4 cursor-pointer transition-all ${
                  selectedPaymentMethod === 'netbanking' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-stone-200 hover:border-stone-400'
                }`}
                onClick={() => setSelectedPaymentMethod('netbanking')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">NB</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-stone-800">Net Banking</p>
                    <p className="text-sm text-stone-600">Pay directly from your bank account</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPaymentMethod === 'netbanking' ? 'border-green-500 bg-green-500' : 'border-stone-400'
                  }`}></div>
                </div>
              </Card>

              {/* Wallets */}
              <Card 
                className={`p-4 cursor-pointer transition-all ${
                  selectedPaymentMethod === 'wallet' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-stone-200 hover:border-stone-400'
                }`}
                onClick={() => setSelectedPaymentMethod('wallet')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-orange-600 to-orange-800 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">₹</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-stone-800">Digital Wallets</p>
                    <p className="text-sm text-stone-600">Paytm, MobiKwik, Freecharge, etc.</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPaymentMethod === 'wallet' ? 'border-orange-500 bg-orange-500' : 'border-stone-400'
                  }`}></div>
                </div>
              </Card>
            </div>
          </div>

          {/* Order Summary */}
          <Card className="p-4 border-stone-200">
            <h3 className="text-lg font-semibold text-stone-800 mb-3">Order Summary</h3>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total Amount:</span>
              <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display' }}>
                ₹{total.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-stone-600 mt-2">
              * Including 18% GST. Free shipping on orders above ₹10,000.
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Payment will be processed securely after order confirmation.
            </p>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Place Order
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
