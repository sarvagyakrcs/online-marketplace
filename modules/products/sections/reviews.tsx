import React from 'react'
import NoReviewsState from '../components/reviews/no-reviews-state'
import { Session } from 'next-auth'
import Reviews from '../components/reviews/reviews'
import { ExtendedReviewType } from '../types/reviews'

type Props = {
    reviews: ExtendedReviewType[]
    productId: string
    session: Session | null
}

const ProductReviews = ({ reviews, productId, session }: Props) => {
  return (
    <section aria-labelledby="reviews-heading">
          <div className="max-w-7xl">
            <div className="space-y-8">
                {reviews.length === 0 
                  ? <NoReviewsState 
                      productId={productId}
                      session={session}
                    />
                  : <Reviews 
                      session={session} 
                      productId={productId} 
                      reviews={reviews} 
                    />}
            </div>
          </div>
        </section>
  )
}

export default ProductReviews