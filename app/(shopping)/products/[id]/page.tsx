import { getBasicProductDetails } from "@/actions/products/product/get-basic-details";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { serializePrismaObject } from "@/lib/db/serializer";
import Reviews from "@/modules/products/components/reviews/reviews";
import ProductDescription from "@/modules/products/sections/product-description";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params:  Promise<{ id: string }>
};

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;
  const basicDetails = await getBasicProductDetails(id);

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
                        profilePic: true,
                    }
                }
            }
        }
    }
  })
  if(!product){
    notFound();
  }
  const session = await auth();
  return (
    <div className="w-full">
        <ProductDescription basicDetails={serializePrismaObject(basicDetails)} product={serializePrismaObject(product)} images={product.images} />
        <Reviews productId={product.id} session={session} reviews={product.reviews ?? []} />
    </div>
  )
};

export default ProductPage;
