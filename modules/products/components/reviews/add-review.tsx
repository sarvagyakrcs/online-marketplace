"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Session } from "next-auth";
import AddReviewForm from "./add-review-form";
import { Button } from "@/components/ui/button";

export default function AddReview({
  session,
  productId,
}: {
  session: Session | null;
  productId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  if (!session?.user.id) {
    return (
      <div className="mt-3 text-sm text-gray-500">
        Please login to add a review
      </div>
    );
  }
  return (
    <>
      <Button className="mt-4" type="button" onClick={() => setIsOpen(true)}>
        Add Review
      </Button>
      <Dialog className="min-w-2xl" open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Add Review</DialogTitle>
        <DialogBody>
          <AddReviewForm setIsOpen={setIsOpen} productId={productId} />
        </DialogBody>
      </Dialog>
    </>
  );
}
