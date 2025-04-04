"use server"
import {prisma} from '@/lib/db/prisma'
import CreateProductForm from '@/modules/admin/components/create-product-form';
import React from 'react'

const CreateProductsManualPage = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div className="p-24">
      <div className="min-w-7xl mx-auto flex items-center justify-center space-x-3">
        <CreateProductForm categories={categories} />
      </div>
    </div>
  )
}

export default CreateProductsManualPage
