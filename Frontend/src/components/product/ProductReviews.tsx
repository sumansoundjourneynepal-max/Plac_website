import React, { useEffect, useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

interface Review {
  _id: string
  reviewerName: string
  rating: number
  comment: string
  createdAt: string
  adminReply?: {
    message: string
    repliedBy: string
    repliedAt: string
  }
}

interface Props {
  productId: string
  productName: string
  productImage?: string
}

const ProductReviews: React.FC<Props> = ({
  productId,
  productName,
  productImage = "/placeholder.svg",
}) => {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [newRating, setNewRating] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)

  const reviewsPerPage = 5

  useEffect(() => {
    if (!productId) return
    fetch(`http://localhost:5000/api/reviews/product/${productId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setReviews(data)
        else setReviews([])
      })
      .catch(err => {
        console.error("Failed to fetch reviews:", err)
        setReviews([])
      })
  }, [productId])

  const totalPages = Math.ceil(reviews.length / reviewsPerPage)
  const startIndex = (currentPage - 1) * reviewsPerPage
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage)

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return alert("Login required")
    if (newRating === 0) return alert("Please select a rating")
    if (!newComment.trim()) return alert("Please write a comment")
    if (!productName || !productId) return alert("Product information missing")

    setLoading(true)

    const payload = {
      productId,
      productName,
      productImage,
      rating: newRating,
      comment: newComment,
      userId: user._id,
      reviewerName: user.email,
    }

    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        alert(data.message || "Failed to submit review")
        return
      }

      setReviews(prev => [data, ...prev])
      setNewComment("")
      setNewRating(0)
    } catch (err) {
      console.error(err)
      alert("Something went wrong while submitting the review")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

  return (
    <div className="space-y-6 py-8 max-w-3xl mx-auto text-gray-100">
      {/* Review Form */}
      {user && (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Write a review</h3>
          <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4, 5].map(n => (
              <Star
                key={n}
                onClick={() => setNewRating(n)}
                className={`cursor-pointer transition-colors ${n <= newRating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
              />
            ))}
          </div>
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Share your experience..."
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
          />
          <button
            onClick={submitReview}
            disabled={loading}
            className="bg-yellow-400 text-gray-900 px-4 py-1 rounded hover:bg-yellow-500 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      )}

      {/* Reviews List */}
      {currentReviews.length === 0 ? (
        <div className="text-gray-500 py-4">No reviews yet.</div>
      ) : (
        currentReviews.map(review => (
          <div key={review._id} className="space-y-1 border-b border-gray-600 pb-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{review.reviewerName}</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`text-yellow-400 ${i < review.rating ? "fill-yellow-400" : "text-gray-500"}`}
                  />
                ))}
              </div>
            </div>
            <p>{review.comment}</p>
            <p className="text-gray-400 text-sm">{formatDate(review.createdAt)}</p>
            {review.adminReply && (
              <div className="ml-4 border-l border-yellow-400 pl-2 text-gray-400 text-sm">
                <strong>Admin:</strong> {review.adminReply.message} <br />
                <span className="text-xs">{formatDate(review.adminReply.repliedAt)}</span>
              </div>
            )}
          </div>
        ))
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-3 justify-center mt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-gray-700 disabled:opacity-50 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-gray-400 text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded hover:bg-gray-700 disabled:opacity-50 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductReviews
