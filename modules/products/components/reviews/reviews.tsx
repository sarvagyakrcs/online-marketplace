import { StarIcon } from '@heroicons/react/20/solid';
import AddReview from './add-review';
import type { Session } from 'next-auth';
import { cn } from '@/lib/utils';
import { ExtendedReviewType } from '../../types/reviews';
import { Avatar } from '@/components/ui/avatar';
import NoReviewsState from './no-reviews-state';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ReviewsProps {
  reviews: ExtendedReviewType[];
  session: Session | null;
  productId: string;
}

export default function Reviews({ reviews, session, productId }: ReviewsProps) {
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;

  const ratingCounts = [0, 0, 0, 0, 0]; // Initialize counts for 1-5 stars
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });

  return (
    <div className='border-t mt-6 border-gray-200'>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customer Reviews</h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      averageRating > rating ? 'text-yellow-400' : 'text-gray-300',
                      'size-5 shrink-0',
                    )}
                  />
                ))}
              </div>
              <p className="sr-only">{averageRating.toFixed(1)} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">Based on {totalReviews} reviews</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {ratingCounts.map((count, index) => (
                <div key={index} className="flex items-center text-sm">
                  <dt className="flex flex-1 items-center">
                    <p className="w-3 font-medium text-gray-900">
                      {index + 1}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                      <StarIcon
                        aria-hidden="true"
                        className={classNames(count > 0 ? 'text-yellow-400' : 'text-gray-300', 'size-5 shrink-0')}
                      />

                      <div className="relative ml-3 flex-1">
                        <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                        {count > 0 ? (
                          <div
                            style={{ width: `calc(${count} / ${totalReviews} * 100%)` }}
                            className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right text-sm text-gray-900 tabular-nums">
                    {totalReviews ? Math.round((count / totalReviews) * 100) : 0}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other customers
            </p>

            <AddReview session={session} productId={productId} />
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>


          <div className="space-y-8 p-6">
            { reviews && reviews.length === 0 && <NoReviewsState session={session} productId={productId} />}
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 border-b border-gray-200 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar src={review.user.profilePic || "/default-profile-pic.png"} className="h-12 w-12 border border-gray-300" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {review.user.name || "Anonymous"}
                      </h4>
                      <div className="flex items-center mt-1">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            aria-hidden="true"
                            className={cn(
                              review.rating > rating ? "text-yellow-400" : "text-gray-300",
                              "size-5"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 ml-8 text-gray-600 text-base italic leading-relaxed">
                  {review.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}