import React from 'react'

type Props = {
    params: {
        id: string
    }
}

const EditProductPage = async ({ params }: Props) => {
    const { id} = await params;
  return (
    <div>{ id }</div>
  )
}

export default EditProductPage