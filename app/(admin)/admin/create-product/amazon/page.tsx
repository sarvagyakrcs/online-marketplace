"use client"
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { FaAmazon } from "react-icons/fa";
import { useState } from "react";
import { scrapeAmazonProduct } from "@/actions/amazon-scraper";

type ProductPreview = Awaited<ReturnType<typeof scrapeAmazonProduct>>;

export default function ImportProductFromAmazon() {
    const [productUrl, setProductUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState<ProductPreview | null>(null);

    const handleScrape = async () => {
        try {
            setIsLoading(true);
            const data = await scrapeAmazonProduct(productUrl);
            setProductData(data);
        } catch (error) {
            console.error('Failed to scrape product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-24 max-w-3xl mx-auto hover:shadow-2xs">
            <div className="mx-auto w-full text-center my-9">
                <h2 className="text-3xl flex items-center justify-center gap-2 font-semibold tracking-tight text-gray-900 sm:text-7xl">
                    <FaAmazon className="size-20" />
                    <span>Import</span>
                </h2>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                    Import products from <Link href="https://amazon.com" className="text-indigo-600 hover:underline">amazon.com</Link>
                </p>
            </div>
            <div className="flex justify-between">
                <label htmlFor="productId" className="block text-sm/6 font-medium text-gray-900">
                    Product URL or Product ID
                </label>
                <span id="email-optional" className="text-sm/6 text-red-500">
                    Required
                </span>
            </div>
            <div className="mt-2">
                <input
                    id="productId"
                    name="productId"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    placeholder="https://www.amazon.com/dp/ASIN"
                    aria-describedby="email-optional"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <button
                    type="button"
                    onClick={handleScrape}
                    disabled={isLoading}
                    className="rounded-md my-6 cursor-pointer bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                >
                    <div className="flex items-center gap-2">
                        <span>{isLoading ? 'Importing...' : 'Import'}</span> 
                        <PlusIcon className="size-4" />
                    </div>
                </button>
            </div>

            {/* Product Preview Section */}
            {productData && (
                <div className="mt-8 border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Product Preview</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium">Name:</p>
                                <p className="text-gray-600">{productData.name}</p>
                            </div>
                            <div>
                                <p className="font-medium">Price:</p>
                                <p className="text-gray-600">${productData.price}</p>
                            </div>
                            <div>
                                <p className="font-medium">Category:</p>
                                <p className="text-gray-600">{productData.category}</p>
                            </div>
                            <div>
                                <p className="font-medium">ASIN:</p>
                                <p className="text-gray-600">{productData.asin}</p>
                            </div>
                        </div>
                        
                        <div>
                            <p className="font-medium">Description:</p>
                            <p className="text-gray-600">{productData.description}</p>
                        </div>

                        <div>
                            <p className="font-medium">Images:</p>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {productData.imageUrls.map((url, index) => (
                                    <img 
                                        key={index}
                                        src={url}
                                        alt={`Product image ${index + 1}`}
                                        className="w-full h-24 object-cover rounded"
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => console.log(productData)}
                            className="mt-4 px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
                        >
                            Log Data to Console
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
