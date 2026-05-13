import { useEffect, useState } from "react"
import axios from "axios"

const AdminReview = () => {
  const [reviews, setReviews] = useState([])
  const [reply, setReply] = useState("")
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    axios.get("http://localhost:5000/api/reviews/admin/all")
      .then(res => setReviews(res.data))
  }, [])

  const sendReply = async (id: string) => {
    await axios.put(`http://localhost:5000/api/reviews/admin/reply/${id}`, {
      message: reply,
    })
    setReply("")
    setActive(null)

    const res = await axios.get("http://localhost:5000/api/reviews/admin/all")
    setReviews(res.data)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reviews</h1>

      {reviews.map(r => (
        <div key={r._id} className="bg-white p-4 rounded">
          <p>{r.reviewerName}</p>
          <p>{r.comment}</p>

          {!r.adminReply && (
            <>
              {active === r._id && (
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  className="w-full border mt-2"
                />
              )}
              <button
                onClick={() =>
                  active === r._id ? sendReply(r._id) : setActive(r._id)
                }
                className="mt-2 bg-gold px-3 py-1 rounded"
              >
                Reply
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default AdminReview
