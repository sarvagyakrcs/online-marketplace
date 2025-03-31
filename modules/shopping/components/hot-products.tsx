"use server"
import { GetFeaturedPrpducts } from "@/actions/products/hot-products";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default async function HotProducts() {
    const products : {
        id: string;
        name: string;
        tag: string;
        imageSrc: string | null;
        price: number;
        imageAlt: string | null;
    }[] = await GetFeaturedPrpducts({
        take: 4,
        skip: 0
    });
  return (
    <div className="mx-auto pt-6 max-w-2xl lg:max-w-7xl">
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="h-42 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-52 xl:h-64">
              <Image
                height={300}
                width={300}
                alt={product.imageAlt || "Product image"}
                src={product.imageSrc || "/assets/empty-cart.png"}
                className="size-full aspect-square object-cover object-center bg-gray-500"
                sizes="(min-width: 1024px) 100vw, (min-width: 640px) 50vw, 100vw"
                priority
                loading="eager"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link href={`/products/${product.id}`}>
                <span className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <div className="w-full flex justify-between">
                <p className="mt-1 text-sm font-medium text-gray-900">
                    $ {product.price.toString()}
                </p>
                <Badge>{product.tag}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
