'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import type { Session } from 'next-auth'
import AddReviewForm from './add-review-form'

export default function AddReview({ session, productId }: { session: Session | null, productId: string }) {
  const [open, setOpen] = useState(false)
  if(!session?.user.id){
    return <div className='mt-3 text-sm text-gray-500'>Please login to add a review</div>
  }
  return (
    <>
      <button         
        className="rounded-sm mt-3 bg-indigo-600 px-5 py-1 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => setOpen(true)}
      >
        Add Review
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <AddReviewForm closeModal={setOpen} productId={productId} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    </>
  )
}
