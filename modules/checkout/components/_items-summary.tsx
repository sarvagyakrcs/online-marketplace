import USDToINRConverter from '@/components/global/currency-converter';
import { Divider } from '@/components/ui/divider';
import { CheckoutSession } from '@/modules/products/types/checkout';
import React from 'react';

type Props = {
  checkoutSession?: CheckoutSession
}

const ItemsSummary = ({ checkoutSession }: Props) => {
  // Default to empty array if line_items is undefined
  const lineItems = checkoutSession?.line_items || [];

  function truncateText(text: string | null, maxLength: number = 100) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  
  // Calculate totals with null checks
  const subtotal = lineItems.reduce((total, item) => {
    return total + (item.price_data.unit_amount * item.quantity);
  }, 0);
  
  // Get currency or default to USD
  const currency = lineItems[0]?.price_data.currency || 'usd';
  
  // Format currency based on locale
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2
    }).format(amount / 100);
  };

  // Show loading or empty state if no checkout session is available
  if (!checkoutSession) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-medium mb-6">Order Summary</h1>
        <div className="py-12 text-center">
          <p className="text-gray-500">Loading checkout information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-2xl font-medium mb-6">Order Summary</h1>
      
      {lineItems.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">No items in your cart</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Product list */}
          <div className="space-y-4">
            {lineItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  {item.price_data.product_data.images && item.price_data.product_data.images.length > 0 && (
                    <div className="flex-shrink-0">
                      <img 
                        src={item.price_data.product_data.images[0]} 
                        alt={item.price_data.product_data.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">
                      {truncateText(item.price_data.product_data.name, 30)}
                    </p>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <span>{formatCurrency(item.price_data.unit_amount)}</span>
                      <span className="mx-2">×</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="font-medium">
                  {formatCurrency(item.price_data.unit_amount * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Divider */}
          <div className="h-px bg-gray-100 my-4"></div>
          
          {/* Order totals */}
          <div className="space-y-3">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <Divider />
            
            <USDToINRConverter />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsSummary;