import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './../ui/card'
import { Button } from './../ui/button'
import { Badge } from './../ui/badge'
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from './../ui/dialog'
import { DescriptionList, DescriptionTerm, DescriptionDetails } from './../ui/description-list'
import { ArrowRightLeft, DollarSign, IndianRupee, RefreshCw, TrendingUp, Clock } from 'lucide-react'

interface HistoricalRate {
  rate: number
  timestamp: number
}

export default function USDToINRConverter() {
  const [usdAmount, setUsdAmount] = useState<string>('')
  const [inrAmount, setInrAmount] = useState<string>('')
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [historicalRates, setHistoricalRates] = useState<HistoricalRate[]>([])

  const fetchExchangeRate = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate')
      }
      
      const data = await response.json()
      const rate = data.rates.INR
      
      setExchangeRate(rate)
      setLastUpdated(new Date().toLocaleString())
      
      // Store historical rate for trend analysis
      setHistoricalRates(prev => [
        { rate, timestamp: Date.now() },
        ...prev.slice(0, 4) // Keep last 5 rates
      ])
      
    } catch (err) {
      setError('Unable to fetch current exchange rate. Please try again.')
      console.error('Exchange rate fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExchangeRate()
  }, [])

  const handleUSDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsdAmount(value)
    
    if (value && !isNaN(Number(value)) && exchangeRate) {
      const converted = (parseFloat(value) * exchangeRate).toFixed(2)
      setInrAmount(converted)
    } else {
      setInrAmount('')
    }
  }

  const handleINRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInrAmount(value)
    
    if (value && !isNaN(Number(value)) && exchangeRate) {
      const converted = (parseFloat(value) / exchangeRate).toFixed(2)
      setUsdAmount(converted)
    } else {
      setUsdAmount('')
    }
  }

  const swapCurrencies = () => {
    const tempUSD = usdAmount
    setUsdAmount(inrAmount)
    setInrAmount(tempUSD)
  }

  const clearAll = () => {
    setUsdAmount('')
    setInrAmount('')
  }

  const getTrendDirection = (): 'up' | 'down' | 'stable' | null => {
    if (historicalRates.length < 2) return null
    const current = historicalRates[0]?.rate
    const previous = historicalRates[1]?.rate
    if (current && previous) {
      return current > previous ? 'up' : current < previous ? 'down' : 'stable'
    }
    return null
  }

  const formatCurrency = (amount: string | number, currency: string): string => {
    if (!amount) return ''
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formatter.format(Number(amount))
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="overflow-hidden border-none bg-transparent shadow-none">
        <CardHeader className="text-center bg-gradient-to-r">
          <CardTitle className="flex items-center justify-center gap-2 text-xl">
            <DollarSign className="h-6 w-6 text-blue-600" />
            <ArrowRightLeft className="h-4 w-4 text-gray-500" />
            <IndianRupee className="h-6 w-6 text-green-600" />
            <span>Currency Converter</span>
          </CardTitle>
          {exchangeRate && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <Badge color="blue">
                1 USD = ₹{exchangeRate.toFixed(4)}
              </Badge>
              {getTrendDirection() === 'up' && (
                <Badge color="green">
                  <TrendingUp className="h-3 w-3" />
                  Rising
                </Badge>
              )}
              {getTrendDirection() === 'down' && (
                <Badge color="red">
                  <TrendingUp className="h-3 w-3 rotate-180" />
                  Falling
                </Badge>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm dark:bg-red-950/20 dark:border-red-800 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* USD Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <DollarSign className="h-4 w-4" />
                US Dollar (USD)
              </label>
              <input
                type="number"
                value={usdAmount}
                onChange={handleUSDChange}
                placeholder="Enter USD amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                disabled={loading}
              />
              {usdAmount && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatCurrency(usdAmount, 'USD')}
                </p>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                onClick={swapCurrencies}
                disabled={loading || !exchangeRate}
                color="indigo"
                className="rounded-full p-2"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* INR Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <IndianRupee className="h-4 w-4" />
                Indian Rupee (INR)
              </label>
              <input
                type="number"
                value={inrAmount}
                onChange={handleINRChange}
                placeholder="Enter INR amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                disabled={loading}
              />
              {inrAmount && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatCurrency(inrAmount, 'INR')}
                </p>
              )}
            </div>
          </div>

          {lastUpdated && (
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3" />
              Last updated: {lastUpdated}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button
            onClick={fetchExchangeRate}
            disabled={loading}
            color="blue"
            className="flex-1"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Refresh Rate
              </>
            )}
          </Button>
          
          <Button
            onClick={clearAll}
            disabled={loading}
            outline
            className="flex-1"
          >
            Clear All
          </Button>
          
          <Button
            onClick={() => setShowDetails(true)}
            disabled={!exchangeRate}
            plain
          >
            Details
          </Button>
        </CardFooter>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetails} onClose={() => setShowDetails(false)} size="md">
        <DialogTitle>Exchange Rate Details</DialogTitle>
        <DialogDescription>
          Current USD to INR conversion information and recent trends.
        </DialogDescription>
        
        <DialogBody>
          {exchangeRate && (
            <DescriptionList>
              <DescriptionTerm>Current Rate</DescriptionTerm>
              <DescriptionDetails>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg">₹{exchangeRate.toFixed(4)}</span>
                  <Badge color="blue" className="text-xs">per USD</Badge>
                </div>
              </DescriptionDetails>

              <DescriptionTerm>Reverse Rate</DescriptionTerm>
              <DescriptionDetails>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg">${(1/exchangeRate).toFixed(6)}</span>
                  <Badge color="green" className="text-xs">per INR</Badge>
                </div>
              </DescriptionDetails>

              <DescriptionTerm>Last Updated</DescriptionTerm>
              <DescriptionDetails>{lastUpdated}</DescriptionDetails>

              <DescriptionTerm>Data Source</DescriptionTerm>
              <DescriptionDetails>
                <Badge color="zinc" className="text-xs">ExchangeRate-API</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  Real-time exchange rates
                </span>
              </DescriptionDetails>

              {historicalRates.length > 1 && (
                <>
                  <DescriptionTerm>Recent Trend</DescriptionTerm>
                  <DescriptionDetails>
                    <div className="space-y-1">
                      {historicalRates.slice(0, 3).map((rate, index) => (
                        <div key={rate.timestamp} className="flex items-center gap-2 text-sm">
                          <span className="font-mono">₹{rate.rate.toFixed(4)}</span>
                          <span className="text-gray-500 text-xs">
                            {index === 0 ? 'Current' : `${index} update${index > 1 ? 's' : ''} ago`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </DescriptionDetails>
                </>
              )}
            </DescriptionList>
          )}
        </DialogBody>
        
        <DialogActions>
          <Button onClick={() => setShowDetails(false)} color="zinc">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}