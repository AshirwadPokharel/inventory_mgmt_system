// @modules/layout/components/search-bar.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

type Product = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [showResults, setShowResults] = useState(false)

 useEffect(() => {
  fetch("http://localhost:9000/store/products?limit=100", {
    headers: {
      "x-publishable-api-key": "pk_1f131861746fa9a9e81bac7452986cf10c90bd59c6360b4e3867f6cfc0a2a95c", // Replace this!
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data.products)) {
        setProducts(data.products)
      }
    })
    .catch((err) => console.error("Failed to fetch products:", err))
}, [])


  useEffect(() => {
    if (query.trim().length > 0) {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
      setFiltered(results)
      setShowResults(true)
    } else {
      setShowResults(false)
      setFiltered([])
    }
  }, [query, products])

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-white border border-ui-border-base rounded-md px-3 py-1 text-sm outline-none w-60"
      />

      {showResults && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-ui-border-base rounded-md shadow-lg z-50 max-h-72 overflow-auto">
          {filtered.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {filtered.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.handle}`}
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setQuery("")
                      setShowResults(false)
                    }}
                  >
                    {product.thumbnail && (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                    <span>{product.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No matching products
            </div>
          )}
        </div>
      )}
    </div>
  )
}
