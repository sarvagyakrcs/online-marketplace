"use server"
import { AiOutlineAlibaba } from "react-icons/ai";
import { FaAmazon } from "react-icons/fa";
import { PlusIcon } from 'lucide-react'
import React from 'react'
import CreateProductButton from "@/modules/admin/components/create-button";

const CreateProductsPage = async () => {
  // const categories = await prisma.category.findMany();
  return (
    <div className="p-24">
      <div className="min-w-7xl mx-auto flex items-center justify-center space-x-3">
        <CreateProductButton href='/admin/create-product/manual' Icon={PlusIcon} title='Add Product Manually' />
        <CreateProductButton href='/admin/create-product/amazon' Icon={FaAmazon} title='Import From Amazon' />
        <CreateProductButton href='/admin/create-product/alibaba' Icon={AiOutlineAlibaba} title='Import From Alibaba' />
      </div>
    </div>
  )
}

export default CreateProductsPage
