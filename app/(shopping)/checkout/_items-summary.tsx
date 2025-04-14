import { CheckoutSession } from '@/modules/products/types/checkout'
import React from 'react'
import { Heading, Subheading } from '@/components/ui/heading'
import { Divider } from '@/components/ui/divider'
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DescriptionList, DescriptionTerm, DescriptionDetails } from '@/components/ui/description-list'

type Props = {
  checkoutSession?: CheckoutSession
}

const ItemsSummary = ({ checkoutSession }: Props) => {
  // Default to empty array if line_items is undefined
  const lineItems = checkoutSession?.line_items || [];

  function truncateText(text: string | null, maxLength: number = 100) {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }
  
  // Calculate totals with null checks
  const subtotal = lineItems.reduce((total, item) => {
    return total + (item.price_data.unit_amount * item.quantity)
  }, 0);
  
  // Get currency or default to USD
  const currency = lineItems[0]?.price_data.currency || 'usd';
  
  // Format currency based on locale
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2
    }).format(amount / 100)
  }

  // Show loading or empty state if no checkout session is available
  if (!checkoutSession) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Heading level={1} className="mb-6">Order Summary</Heading>
        <div className="p-8 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">Loading checkout information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-8 md:mr-10">
      <Heading level={1} className="mb-6">Order Summary</Heading>
      <div className="overflow-hidden">
        {lineItems.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">No items in your cart</p>
          </div>
        ) : (
          <Table grid dense>
            <TableHead>
              <TableRow>
                <TableHeader>Product</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Quantity</TableHeader>
                <TableHeader className="text-right">Total</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {lineItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center">
                      {item.price_data.product_data.images && item.price_data.product_data.images.length > 0 && (
                        <div className="mr-3 flex-shrink-0">
                          <img 
                            src={item.price_data.product_data.images[0]} 
                            alt={item.price_data.product_data.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-zinc-900 dark:text-white">
                          {truncateText(item.price_data.product_data.name, 30)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(item.price_data.unit_amount)}</TableCell>
                  <TableCell>
                    <Badge color="blue">{item.quantity}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(item.price_data.unit_amount * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        
        <Divider soft className="mt-4" />
        
        {/* Order Summary */}
        <div className="p-6">
          <Subheading level={2} className="mb-4 text-lg">Order Details</Subheading>
          
          <DescriptionList className="mb-6">
            <DescriptionTerm>Payment Mode</DescriptionTerm>
            <DescriptionDetails>
              <Badge color="green">{checkoutSession.mode}</Badge>
            </DescriptionDetails>
            
            <DescriptionTerm>Subtotal</DescriptionTerm>
            <DescriptionDetails>{formatCurrency(subtotal)}</DescriptionDetails>
            
            <DescriptionTerm>Tax</DescriptionTerm>
            <DescriptionDetails>Calculated at checkout</DescriptionDetails>
            
            <DescriptionTerm className="font-medium">Total</DescriptionTerm>
            <DescriptionDetails className="font-semibold">{formatCurrency(subtotal)}</DescriptionDetails>
          </DescriptionList>
        </div>
      </div>
    </div>
  )
}

export default ItemsSummary