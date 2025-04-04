"use client";
import { Button } from "@/components/ui/button";
import { LoaderPinwheel, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { deletePorduct } from "@/actions/(admin)/product/delete-product";
import toast from "react-hot-toast";

type Props = {
  productId: string;
};

const DeleteProductButton = ({ productId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const {
    isPending,
    mutate
  } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: deletePorduct,
    onMutate: () => {
        toast.loading("Deleting product", { id: "delete-product" });
    },
    onSuccess: () => {
      toast.success("Product deleted successfully", { id: "delete-product" });
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to delete product", { id: "delete-product" });
    },
  })

  const handleDelete = () => {
    mutate(productId);
  }

  return (
    <>
      <Button
        outline
        className="border-none"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <Trash2Icon className="text-red-500" />
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete the product
            and all its associated data.
        </DialogDescription>
        <DialogBody>
          <Field>
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} name="amount" placeholder='Type "DELETE" to continue' />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button color="rose" disabled={inputValue !== "DELETE" || isPending} onClick={handleDelete}>
            {isPending ? <LoaderPinwheel size={20} className="animate-spin" /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteProductButton;
