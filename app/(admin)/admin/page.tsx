"use server";

import { auth } from "@/auth";
import {prisma} from "@/lib/db/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import ProductSearchControls from "@/modules/admin/components/product-search-controls";
import TakeOfflineSwitch from "@/modules/admin/components/take-offline-switch";
import AddImages from "@/modules/admin/components/add-image";
import { serializePrismaObject } from "@/lib/db/serializer";
import DeleteProductButton from "@/modules/admin/components/delete-product-button";
import PriceEdit from "@/modules/admin/edit/price";
import DescriptionForm from "@/modules/admin/edit/description-form";

function truncateText(text: string | null, maxLength: number = 100) {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { 
    search?: string; 
    sort?: string;
    page?: string;
    limit?: string;
  };
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  // Use destructuring to avoid accessing searchParams properties directly
  const { search = '', sort = 'name-asc', page: pageStr = '1', limit: limitStr = '6' } = await searchParams;
  
  // Convert page and limit to numbers after destructuring
  const page = Number(pageStr);
  const limit = Number(limitStr);
  const skip = (page - 1) * limit;

  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: true,
        images: true,
        videos: true,
      },
      where: {
        userId: session.user.id,
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { category: { name: { contains: search, mode: 'insensitive' } } },
        ],
      },
      orderBy: sort === 'name-asc' ? { name: 'asc' } :
                sort === 'name-desc' ? { name: 'desc' } :
                sort === 'price-asc' ? { price: 'asc' } :
                sort === 'price-desc' ? { price: 'desc' } :
                { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.product.count({
      where: {
        userId: session.user.id,
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { category: { name: { contains: search, mode: 'insensitive' } } },
        ],
      },
    })
  ]);
  return (
    <div className="px-4 sm:px-6 lg:px-8 my-8 max-h-screen overflow-hidden">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all products in your account.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href={"/admin/create-product"}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Product
          </Link>
        </div>
      </div>
      <ProductSearchControls 
        defaultSearch={search} 
        defaultSort={sort}
      />
      <div className="mt-8 flow-root max-w-full overflow-hidden">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Shipping Time
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Images
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                      Product Online
                    </th>
                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr className="">
                      <td colSpan={5} className="py-4 px-3 text-sm text-center text-gray-500">
                        No products found
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className={cn(product.images.length === 0 && "bg-red-100")}>
                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                          <Link href={`/products/${product.id}`} className="text-blue-700 hover:text-blue-900 hover:underline">{truncateText(product.name, 30)}</Link>
                        </td>
                        <td className="py-4 text-sm whitespace-nowrap flex items-center justify-center space-x-2 text-gray-500">
                          $ <PriceEdit productId={product.id} price={Number(product.price)} />
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {product.shippingTime}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {product.category?.name || "N/A"}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {product.images.length === 0 ? <AddImages product={serializePrismaObject(product)} /> : product.images.length}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          <DescriptionForm productId={product.id} description={product.description} shortDescription={product.shortDescription} />
                        </td>
                        <td className="px-3 py-4 text-sm text-right whitespace-nowrap">
                          <TakeOfflineSwitch  product={serializePrismaObject(product)} />
                        </td>
                        <td className="px-3 py-4 text-sm text-right whitespace-nowrap">
                          <DeleteProductButton productId={product.id} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{skip + 1}</span> to{" "}
          <span className="font-medium">{Math.min(skip + limit, totalProducts)}</span> of{" "}
          <span className="font-medium">{totalProducts}</span> products
        </div>
      </div>
    </div>
  );
}