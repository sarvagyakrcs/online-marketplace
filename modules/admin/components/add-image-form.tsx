import { z } from "zod"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Prisma } from "@prisma/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { addImagesToProduct } from "@/actions/(admin)/product/add-image"
import toast from "react-hot-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"

type Props = {
  product: Prisma.ProductGetPayload<{
    include: {
      category: true
      images: true
      videos: true
    }
  }>
}

const imageSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  isMain: z.boolean().default(false),
})

const formSchema = z.object({
  images: z.array(imageSchema).min(1, "Add at least one image"),
})

type FormValues = z.infer<typeof formSchema>

const AddImageForm = ({ product }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  })

  const mutation = useMutation({
    mutationFn: (imageData: FormValues) => addImagesToProduct(product.id, imageData),
    onSuccess: () => {
      toast.success("Images added successfully", { id: "add-image" })
    },
    onError: () => {
      toast.error("Failed to add images", { id: "add-image" })
    },
    onMutate: () => {
      toast.loading("Adding images", { id: "add-image" })
    },
  })

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data)
  }

  const handleAddImage = () => {
    append({ url: "", isMain: false })
  }

  const handleMainImageChange = (index: number, checked: boolean) => {
    if (checked) {
      const currentImages = form.getValues("images")
      currentImages.forEach((_, i) => {
        if (i !== index) {
          form.setValue(`images.${i}.isMain`, false)
        }
      })
    }
    form.setValue(`images.${index}.isMain`, checked)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Add Images to Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {fields.map((field, index) => (
                <Card key={field.id} className="overflow-hidden">
                  <CardHeader className="bg-muted">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Image {index + 1}</CardTitle>
                      <Button type="button" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`images.${index}.url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Image URL</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter image URL" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`images.${index}.isMain`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => handleMainImageChange(index, checked as boolean)}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Set as main product image</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      {form.watch(`images.${index}.url`) && (
                        <div className="relative aspect-square w-full max-w-[200px] rounded-lg overflow-hidden border">
                          <Image
                            src={form.watch(`images.${index}.url`) || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                            onError={() => {
                              form.setError(`images.${index}.url`, {
                                type: "manual",
                                message: "Failed to load image",
                              })
                            }}
                          />
                          {form.watch(`images.${index}.isMain`) && (
                            <Badge className="absolute top-2 left-2 z-10">
                              Main Image
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <Button type="button" onClick={handleAddImage}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Image
              </Button>
              <Button disabled={mutation.isPending} type="submit">
                Save Images
              </Button>
            </div>
          </CardContent>
        </Card>

        {fields.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Image Preview Grid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {fields.map((field, index) => {
                  const imageUrl = form.watch(`images.${index}.url`)
                  const isMain = form.watch(`images.${index}.isMain`)

                  if (!imageUrl) return null

                  return (
                    <div
                      key={field.id}
                      className={cn(
                        "group relative aspect-square overflow-hidden rounded-lg",
                        "transition-all duration-300 hover:shadow-lg",
                        isMain ? "ring-2 ring-primary ring-offset-2" : "border border-border",
                      )}
                    >
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {isMain && (
                        <Badge className="absolute top-2 left-2 z-10">
                          Main Image
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </Form>
  )
}

export default AddImageForm

