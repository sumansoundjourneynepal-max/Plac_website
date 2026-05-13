import { useState } from "react";
import { Star, Send } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface Props {
  productId: string;
  onReviewAdded: () => void;
}

export default function AddReviewForm({ productId, onReviewAdded }: Props) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <p className="text-gray-300 text-center bg-[#1a1f2a] p-4 rounded-lg mt-4">
        You must be logged in to write a review.
      </p>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/reviews/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          reviewerName: user.email,
          rating,
          comment,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      setRating(0);
      setComment("");
      onReviewAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#151922] p-5 rounded-xl mt-6 shadow-lg border border-white/10"
    >
      <h3 className="text-2xl font-semibold text-white mb-4">
        {/* Write a Review */}
      </h3>

      {/* Stars */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <Star
            key={num}
            size={26}
            className={`cursor-pointer transition-all ${
              num <= rating
                ? "text-yellow-400 fill-yellow-400 scale-110"
                : "text-gray-500 hover:text-yellow-300"
            }`}
            onClick={() => setRating(num)}
          />
        ))}
      </div>

      {/* Comment Section (Facebook Style) */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
          {user.email[0].toUpperCase()}
        </div>

        {/* Input Box */}
        <div className="flex-1 bg-[#1e2533] rounded-2xl p-3 shadow-md border border-white/10 transition focus-within:border-blue-400">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full bg-transparent text-white outline-none resize-none"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md transition disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
}
