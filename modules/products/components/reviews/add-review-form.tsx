import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2, Star } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  AddReviewInput,
  AddReviewSchema,
} from "@/schemas/products/reviews/review-schema";
import { addReview } from "@/actions/products/reviews/add-review";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AddReviewForm({
  productId,
  setIsOpen,
}: {
  productId: string;
  setIsOpen: (open: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddReviewInput>({
    resolver: zodResolver(AddReviewSchema),
    defaultValues: { productId: productId, rating: 1, review: "" },
  });

  const [rating, setRating] = useState(5);

  const addReviewMutation = useMutation({
    mutationKey: ["add-review"],
    mutationFn: addReview,
    onMutate: () => {
      toast.loading("Adding review", { id: "add-review" });
    },
    onSuccess: () => {
      toast.success("Review added successfully", { id: "add-review" });
    },
    onError: (e) => {
      console.error(e);
      toast.error("Failed to add review", { id: "add-review" });
    },
  });

  const onSubmit = (data: AddReviewInput) => {
    addReviewMutation.mutate(data);
    setIsOpen(false);
  };

  return (
    <div className="w-xl mx-auto p-4 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => {
                setRating(star);
                setValue("rating", star);
              }}
              className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
              fill={star <= rating ? "#FACC15" : "none"}
            />
          ))}
        </div>
        {errors.rating && (
          <p className="text-red-500">{errors.rating.message}</p>
        )}

        <Textarea
          placeholder="Write your review..."
          {...register("review")}
          className="w-full p-2 rounded-md"
          rows={12}
        />
        {errors.review && (
          <p className="text-red-500">{errors.review.message}</p>
        )}

        <div className="flex items-center justify-between">
        <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={addReviewMutation.isPending}
            type="submit"
            color="sky"
          >
            {addReviewMutation.isPending ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Submit Review"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
