"use client"
import { createProduct } from '@/actions/(admin)/product/create-product'
import { productFormSchema, type ProductFormValues } from '@/schemas/admin/products/create-product-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Category } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { CheckCircleIcon, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Props = {
    categories: Category[]
}

const plans = [
    { id: 'fast', name: 'Express', description: '1-5 business days' },
    { id: 'medium', name: 'Normal', description: '5-10 business days' },
    { id: 'slow', name: 'Standard', description: '10-15 business days' },
    { id: 'very-slow', name: 'Long Distance', description: '15-20 business days' },
]

const CreateProductForm = ({ categories }: Props) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            stock: "",
            shippingTime: plans[0].description,
            categoryId: categories.length > 0 ? categories[0].id : "",
            shortDescription: "",
            tag: "",
            thumbnail: "",
        },
    })

    const createProductMutation = useMutation({
        mutationKey: ["create-product"],
        mutationFn: createProduct,
        onMutate: () => {
            toast.loading("Creating Product", {id: "create-product"})
        },
        onSuccess: () => {
            toast.success("Product Created Successfully", {id: "create-product"})
        },
        onError: (error) => {
            console.error(error)
            toast.error("Failed to Create Product", {id: "create-product"})
        }
    })

    const onSubmit = (data: ProductFormValues) => {
        createProductMutation.mutate(data)
        router.push("/admin")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-2xl space-y-8 min-h-screen m-20">
            <h1 className='text-2xl font-semibold'>Create a Product</h1>
            <div>
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                    Name
                </label>
                <div className="mt-2">
                    <input
                        {...register("name")}
                        id="name"
                        name="name"
                        placeholder='Product Name'
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
                {errors.name && <p className="text-red-500 mt-2 opacity-80 text-xs">{errors.name.message}</p>}
            </div>
            <div>
                <label htmlFor="thumbnail" className="block text-sm/6 font-medium text-gray-900">
                    Thumbnail
                </label>
                <div className="mt-2">
                    <input
                        {...register("thumbnail")}
                        id="thumbnail"
                        name="thumbnail"
                        placeholder='Thumbnail Url (Make sure its 1 : 1)'
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
                {errors.thumbnail && <p className="text-red-500 mt-2 opacity-80 text-xs">{errors.thumbnail.message}</p>}
            </div>
            <div>
                <label htmlFor="tag" className="block text-sm/6 font-medium text-gray-900">
                    Tag
                </label>
                <div className="mt-2">
                    <input
                        {...register("tag")}
                        id="tag"
                        name="tag"
                        placeholder='Product Tag'
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
                {errors.tag && <p className="text-red-500 mt-2 opacity-80 text-xs">{errors.tag.message}</p>}
            </div>
            <div>
                <label htmlFor="short-description" className="block text-sm/6 font-medium text-gray-900">
                    Short Description
                </label>
                <div className="mt-2">
                    <textarea
                        id="short-description"
                        {...register("shortDescription")}
                        name="description"
                        rows={4}
                        placeholder='Product Description in atleast 10 characters'
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        defaultValue={''}
                    />
                </div>
                {errors.shortDescription && <p className="text-red-500 mt-2 opacity-80 text-xs">{errors.shortDescription.message}</p>}
            </div>
            <div className="flex items-center justify-center space-x-4">
                <div className='w-1/2'>
                    <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                        Price
                    </label>
                    <div className="mt-2">
                        <input
                            {...register("price")}
                            id="price"
                            name="price"
                            type='number'
                            step={"0.01"}
                            placeholder='Price in USD'
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    {errors.price && <p className="text-red-500 mt-2 opacity-80 text-xs">{errors.price.message}</p>}
                </div>
                <div className='w-1/2'>
                    <label htmlFor="stock" className="block text-sm/6 font-medium text-gray-900">
                        Quantity
                    </label>
                    <div className="mt-2">
                        <input
                            {...register("stock")}
                            id="stock"
                            type='number'
                            name="stock"
                            placeholder='Quantity'
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    {errors.stock && <p className="text-red-500 mt-2 opacity-80 text-xs">{errors.stock.message}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                    Product Description
                </label>
                <div className="mt-2">
                    <textarea
                        id="description"
                        {...register("description")}
                        name="description"
                        rows={4}
                        placeholder='Product Description in atleast 10 characters'
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        defaultValue={''}
                    />
                </div>
                {errors.description && <p className="text-red-500 mt-2 opacity-80 text-xs">{errors.description.message}</p>}
            </div>

            <fieldset aria-label="Plan" className='bg-white p-4 rounded-md'>
                <label htmlFor="shipping-time" className="block text-sm/6 font-medium text-gray-900 mb-6">
                    Shipping Time
                </label>
                <div className="space-y-5 grid grid-cols-2 gap-4">
                    {plans.map((plan) => (
                        <div key={plan.id} className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input
                                    {...register("shippingTime")}
                                    defaultChecked={plan.id === 'small'}
                                    id={plan.id}
                                    name="plan"
                                    type="radio"
                                    aria-describedby={`${plan.id}-description`}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                            </div>
                            <div className="ml-3 text-sm/6">
                                <label htmlFor={plan.id} className="font-medium text-gray-900">
                                    {plan.name}
                                </label>
                                <p id={`${plan.id}-description`} className="text-gray-500">
                                    {plan.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {errors.shippingTime && <p className="text-red-500 mt-2 opacity-80 text-xs">{errors.shippingTime.message}</p>}
            </fieldset>

            <fieldset aria-label="Category" className='bg-white p-4 rounded-md'>
                <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900 mb-6">
                    Product Category
                </label>
                <div className="space-y-5 grid grid-cols-2 gap-4">
                    {categories.map((category) => (
                        <div key={category.id} className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input
                                    {...register("categoryId")}
                                    defaultChecked={category.id === 'fast'}
                                    id={category.id}
                                    name="category"
                                    type="radio"
                                    aria-describedby={`${category.id}-description`}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                />
                            </div>
                            <div className="ml-3 text-sm/6">
                                <label htmlFor={category.id} className="font-medium text-gray-900">
                                    {category.name}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
                {errors.categoryId && <p className="text-red-500 mt-2 opacity-80 text-xs">{errors.categoryId.message}</p>}
                {errors.root && <p className="text-red-500 mt-2 opacity-80 text-xs">{errors.root.message}</p>}
            </fieldset>

            <button
                disabled={createProductMutation.isPending}
                type="submit"
                className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <CheckCircleIcon aria-hidden="true" className="-ml-0.5 size-5" />
                { createProductMutation.isPending ? <Loader2 className='animate-spin h-5 w-5' /> : "Submit" }
            </button>
        </form>
    )
}

export default CreateProductForm