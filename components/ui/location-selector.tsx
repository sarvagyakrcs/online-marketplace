"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { Input } from "./input"
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem, DropdownHeader } from "./dropdown"
import { cn } from "@/lib/utils"

// Import JSON data directly
import countries from "@/data/countries.json"
import states from "@/data/states.json"

interface Timezone {
  zoneName: string
  gmtOffset: number
  gmtOffsetName: string
  abbreviation: string
  tzName: string
}

interface CountryProps {
  id: number
  name: string
  iso3: string
  iso2: string
  numeric_code: string
  phone_code: string
  capital: string
  currency: string
  currency_name: string
  currency_symbol: string
  tld: string
  native: string
  region: string
  region_id: string
  subregion: string
  subregion_id: string
  nationality: string
  timezones: Timezone[]
  translations: Record<string, string>
  latitude: string
  longitude: string
  emoji: string
  emojiU: string
}

interface StateProps {
  id: number
  name: string
  country_id: number
  country_code: string
  country_name: string
  state_code: string
  type: string | null
  latitude: string
  longitude: string
}

interface LocationSelectorProps {
  disabled?: boolean
  onCountryChange?: (country: CountryProps | null) => void
  onStateChange?: (state: StateProps | null) => void
}

const LocationSelector = ({ disabled, onCountryChange, onStateChange }: LocationSelectorProps) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryProps | null>(null)
  const [selectedState, setSelectedState] = useState<StateProps | null>(null)
  const [, setOpenCountryDropdown] = useState(false)
  const [, setOpenStateDropdown] = useState(false)
  const [countrySearchQuery, setCountrySearchQuery] = useState("")
  const [stateSearchQuery, setStateSearchQuery] = useState("")

  // Cast imported JSON data to their respective types
  const countriesData = countries as CountryProps[]
  const statesData = states as StateProps[]

  // Filter states for selected country
  const availableStates = statesData.filter((state) => state.country_id === selectedCountry?.id)

  // Filter countries based on search query
  const filteredCountries = countriesData.filter((country) =>
    country.name.toLowerCase().includes(countrySearchQuery.toLowerCase()),
  )

  // Filter states based on search query
  const filteredStates = availableStates.filter((state) =>
    state.name.toLowerCase().includes(stateSearchQuery.toLowerCase()),
  )

  const handleCountrySelect = (country: CountryProps | null) => {
    setSelectedCountry(country)
    setSelectedState(null) // Reset state when country changes
    onCountryChange?.(country)
    onStateChange?.(null)
  }

  const handleStateSelect = (state: StateProps | null) => {
    setSelectedState(state)
    onStateChange?.(state)
  }

  return (
    <div className="flex gap-4">
      {/* Country Selector */}
      <Dropdown>
        <DropdownButton outline disabled={disabled} className="w-full">
          {selectedCountry ? (
            <div className="flex items-center w-full gap-2">
              <span className="text-2xl">{selectedCountry.emoji}</span>
              <span>{selectedCountry.name}</span>
            </div>
          ) : (
            <span>Select Country</span>
          )}
        </DropdownButton>
        <DropdownMenu className="w-[300px] p-2">
          <DropdownHeader>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                className="w-full"
                placeholder="Search country..."
                value={countrySearchQuery}
                onChange={(e) => setCountrySearchQuery(e.target.value)}
              />
            </div>
          </DropdownHeader>

          <div className="max-h-[300px] min-w-72 overflow-y-auto mt-2">
            {filteredCountries.length === 0 ? (
              <div className="py-2 px-3 min-w-full flex items-center justify-center text-sm text-zinc-500">No country found.</div>
            ) : (
              filteredCountries.map((country) => (
                <DropdownItem
                  key={country.id}
                  onClick={() => {
                    handleCountrySelect(country)
                    setOpenCountryDropdown(false)
                  }}
                  className="w-full"
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="text-2xl">{country.emoji}</span>
                    <span>{country.name}</span>
                  </div>
                  <Check className={cn("h-4 w-4", selectedCountry?.id === country.id ? "opacity-100" : "opacity-0")} />
                </DropdownItem>
              ))
            )}
          </div>
        </DropdownMenu>
      </Dropdown>

      {/* State Selector - Only shown if selected country has states */}
      {availableStates.length > 0 && (
        <Dropdown>
          <DropdownButton outline disabled={!selectedCountry} className="w-full justify-between flex items-center">
            {selectedState ? <span>{selectedState.name}</span> : <span>Select State...</span>}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </DropdownButton>
          <DropdownMenu anchor="top" className="w-[300px] p-2">
            <DropdownHeader>
              <div className="relative w-full">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  className="w-full"
                  placeholder="Search state..."
                  value={stateSearchQuery}
                  onChange={(e) => setStateSearchQuery(e.target.value)}
                />
              </div>
            </DropdownHeader>

            <div className="max-h-[300px] overflow-y-auto mt-2">
              {filteredStates.length === 0 ? (
                <div className="py-2 px-3 text-sm text-zinc-500">No state found.</div>
              ) : (
                filteredStates.map((state) => (
                  <DropdownItem
                    key={state.id}
                    onClick={() => {
                      handleStateSelect(state)
                      setOpenStateDropdown(false)
                    }}
                    className="flex cursor-pointer w-40 items-center justify-between text-sm"
                  >
                    <span>{state.name}</span>
                    <Check className={cn("h-4 w-4", selectedState?.id === state.id ? "opacity-100" : "opacity-0")} />
                  </DropdownItem>
                ))
              )}
            </div>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  )
}

export default LocationSelector
