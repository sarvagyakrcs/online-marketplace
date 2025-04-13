"use client"

import { searchProducts } from "@/actions/products/search"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import type React from "react"
import { useState } from "react"
import { Loader2 } from 'lucide-react'
import Link from "next/link"

const SearchForm = ({ setIsOpen } : {setIsOpen : (arg0: boolean) => void}) => {
  const placeholders = [
    "Pashmina Shawl",
    "Bidriware Vase",
    "Channapatna Wooden Toys",
    "Madhubani Painting",
    "Brass Dhokra Figurine",
  ]

  const [searchTerm, setSearchTerm] = useState("")

  const {
    isPending,
    error,
    data: searchResults = [],
  } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      if (!searchTerm) return []
      return await searchProducts(searchTerm)
    },
    enabled: searchTerm.length > 0,
    // Don't show loading state initially
    initialData: [],
  })

  const handleDebouncedSearch = (value: string) => {
    setSearchTerm(value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get("search") as string
    setSearchTerm(query)
  }

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-2xl mx-auto px-4">
      <div className="w-full">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={() => {}}
          onDebouncedChange={handleDebouncedSearch}
          onSubmit={onSubmit}
          debounceMs={300}
        />
      </div>

      {/* Results container with consistent height */}
      <div className="mt-6 w-full min-h-[200px] transition-all duration-200">
        {/* Loading state - only show when actively searching */}
        {isPending && searchTerm.length > 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-muted-foreground">Searching for artisan treasures</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="p-6 text-center">
            <p>
              {error instanceof Error ? error.message : "An error occurred while searching"}
            </p>
          </div>
        )}

        {/* Results */}
        {!isPending && !error && searchResults.length > 0 && (
          <div className="w-full">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
            </h3>
            <ul className="space-y-2">
              {searchResults.map((result) => (
                <Link
                  href={`/products/${result.id}`}
                  key={result.id}
                  onClick={() => setIsOpen(false)}
                  className="group p-3 transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                        {result.thumbnail ? (
                          <Image
                            src={result.thumbnail || "/placeholder.svg"}
                            alt={result.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            width={64}
                            height={64}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <span className="text-xs text-muted-foreground">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium group-hover:text-primary transition-colors duration-200">
                          {result.name}
                        </span>
                        <span className="text-xs text-muted-foreground">Handcrafted artisan product</span>
                      </div>
                    </div>
                    <span className="font-semibold text-primary">$ {result.price}</span>
                  </div>
                </Link>
              ))}
            </ul>
          </div>
        )}

        {/* No results */}
        {!isPending && !error && searchTerm && searchResults.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-muted-foreground mb-1">No artisan products found</p>
            <p className="text-xs text-muted-foreground">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchForm
