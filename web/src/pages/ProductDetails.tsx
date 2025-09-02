import { useParams } from 'react-router-dom'

export default function ProductDetails() {
  const { id } = useParams()
  return (
    <section>
      <h2 className="text-2xl font-semibold">Product Details</h2>
      <p className="text-neutral-600">Product ID: {id}</p>
    </section>
  )
}


