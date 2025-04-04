import { prisma } from "@/lib/db/prisma";
import { serializePrismaObject } from "@/lib/db/serializer";
import ProductDescription from "@/modules/products/sections/product-description";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: {
        id
    },
    include: {
        images: true,
        category: true,
        options: true,
        videos: true,
        reviews: {
            take: 10,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        profilePic: true
                    }
                }
            }
        }
    }
  })
  if(!product){
    notFound();
  }
  return (
    <div className="w-full">
        <ProductDescription product={serializePrismaObject(product)} images={product.images} />
    </div>
  )
};

export default ProductPage;
