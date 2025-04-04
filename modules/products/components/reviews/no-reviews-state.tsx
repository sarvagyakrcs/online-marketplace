import AddReview from "./add-review";
import type { Session } from "next-auth";

export default function NoReviewsState({ session, productId }: { session: Session | null, productId: string }) {
  return (
    <div className="text-center border-2 border-gray-200 rounded-lg p-4">
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="mx-auto size-12 text-gray-400"
      >
        <path
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No Reviews</h3>
      <AddReview session={session} productId={productId} />
    </div>
  )
}
