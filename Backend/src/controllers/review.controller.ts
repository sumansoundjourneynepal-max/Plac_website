// import type { Request, Response } from "express"
// import Review, { type IReview } from "../models/review.model" // Import the Mongoose Review model
// import { asyncHandler } from "../utils/asyncHandler.utils"

// // --- Controller Functions ---

// /**
//  * Creates a new product review or updates an existing one.
//  * POST /api/reviews
//  */
// export const createReview = asyncHandler(async (req: Request, res: Response) => {
//   const { productId, orderId, rating, comment, productName, productImage, userId, reviewerName } = req.body

//   if (!productId || !orderId || !rating || !comment || !productName || !userId || !reviewerName) {
//     return res.status(400).json({ message: "Missing required review fields." })
//   }

//   if (rating < 1 || rating > 5) {
//     return res.status(400).json({ message: "Rating must be between 1 and 5." })
//   }

//   // Check if a review already exists for this product and order by this user
//   const review = await Review.findOne({ productId, userId, orderId })

//   if (review) {
//     // If exists, update it
//     review.rating = rating
//     review.comment = comment
//     review.productName = productName // Update if product name changes
//     review.productImage = productImage // Update if product image changes
//     review.reviewerName = reviewerName // Update if reviewer name changes
//     review.verified = true // Assuming reviews from delivered orders are verified
//     await review.save()
//     return res.status(200).json(review)
//   } else {
//     // Otherwise, create new
//     const newReview: IReview = await Review.create({
//       productId,
//       userId,
//       orderId,
//       reviewerName,
//       productName,
//       productImage: productImage || "/placeholder.svg",
//       rating,
//       comment,
//       verified: true, // Assuming reviews from delivered orders are verified
//     })
//     return res.status(201).json(newReview)
//   }
// })

// /**
//  * Fetches all reviews for a specific product.
//  * GET /api/reviews/product/:productId
//  */
// export const getReviewsByProductId = asyncHandler(async (req: Request, res: Response) => {
//   const { productId } = req.params
//   const productReviews = await Review.find({ productId }).populate("userId", "firstName lastName")
//   return res.status(200).json(productReviews)
// })

// /**
//  * Fetches all reviews written by a specific user.
//  * GET /api/reviews/user/:userId
//  */
// export const getReviewsByUserId = asyncHandler(async (req: Request, res: Response) => {
//   const { userId } = req.params
//   const userReviews = await Review.find({ userId }).populate("userId", "firstName lastName")
//   return res.status(200).json(userReviews)
// })

// /**
//  * Fetches a single review by its ID.
//  * GET /api/reviews/:id
//  */
// export const getReviewById = asyncHandler(async (req: Request, res: Response) => {
//   const { id } = req.params
//   const review = await Review.findById(id).populate("userId", "firstName lastName")
//   if (!review) {
//     return res.status(404).json({ message: "Review not found" })
//   }
//   return res.status(200).json(review)
// })

// /**
//  * Updates an existing review.
//  * PUT /api/reviews/:id
//  */
// export const updateReview = asyncHandler(async (req: Request, res: Response) => {
//   const { id } = req.params
//   const { rating, comment, userId } = req.body // userId is for authorization check

//   const review = await Review.findById(id)
//   if (!review) {
//     return res.status(404).json({ message: "Review not found" })
//   }

//   // Basic authorization check: ensure the user updating the review is the owner
//   if (review.userId.toString() !== userId) {
//     return res.status(403).json({ message: "Unauthorized to update this review" })
//   }

//   if (rating !== undefined) {
//     if (rating < 1 || rating > 5) {
//       return res.status(400).json({ message: "Rating must be between 1 and 5." })
//     }
//     review.rating = rating
//   }
//   if (comment !== undefined) {
//     review.comment = comment
//   }
//   review.updatedAt = new Date() // Update timestamp on modification

//   await review.save()
//   return res.status(200).json(review)
// })

// /**
//  * Deletes a review.
//  * DELETE /api/reviews/:id
//  */
// export const deleteReview = asyncHandler(async (req: Request, res: Response) => {
//   const { id } = req.params
//   const { userId } = req.body // Expect userId in body for authorization

//   const review = await Review.findById(id)
//   if (!review) {
//     return res.status(404).json({ message: "Review not found" })
//   }

//   // Basic authorization check: ensure the user deleting the review is the owner
//   if (review.userId.toString() !== userId) {
//     return res.status(403).json({ message: "Unauthorized to delete this review" })
//   }

//   await Review.findByIdAndDelete(id)
//   return res.status(204).send() // No content on successful deletion
// })

// /**
//  * Fetches review statistics for a product.
//  * GET /api/reviews/stats/:productId
//  */
// export const getReviewStatsForProduct = asyncHandler(async (req: Request, res: Response) => {
//   const { productId } = req.params

//   const stats = await Review.aggregate([
//     { $match: { productId: productId } },
//     {
//       $group: {
//         _id: null,
//         totalReviews: { $sum: 1 },
//         averageRating: { $avg: "$rating" },
//         rating1: { $sum: { $cond: [{ $eq: ["$rating", 1] }, 1, 0] } },
//         rating2: { $sum: { $cond: [{ $eq: ["$rating", 2] }, 1, 0] } },
//         rating3: { $sum: { $cond: [{ $eq: ["$rating", 3] }, 1, 0] } },
//         rating4: { $sum: { $cond: [{ $eq: ["$rating", 4] }, 1, 0] } },
//         rating5: { $sum: { $cond: [{ $eq: ["$rating", 5] }, 1, 0] } },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         totalReviews: 1,
//         averageRating: { $round: ["$averageRating", 1] },
//         ratingBreakdown: {
//           "1": "$rating1",
//           "2": "$rating2",
//           "3": "$rating3",
//           "4": "$rating4",
//           "5": "$rating5",
//         },
//       },
//     },
//   ])

//   // Return default stats if no reviews found
//   return res.status(200).json(
//     stats[0] || {
//       averageRating: 0,
//       totalReviews: 0,
//       ratingBreakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
//     },
//   )
// })



import { Request, Response } from "express"
import Review from "../models/review.model"
import { asyncHandler } from "../utils/asyncHandler.utils"

/**
 * CREATE OR UPDATE REVIEW
 * POST /api/reviews
 */
export const createReview = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      productId,
      productName,
      productImage,
      rating,
      comment,
      userId,
      reviewerName,
    } = req.body

    if (!productId) return res.status(400).json({ message: "Product ID missing" })
    if (!productName)
      return res.status(400).json({ message: "Product name missing" })
    if (!rating) return res.status(400).json({ message: "Rating missing" })
    if (!comment)
      return res.status(400).json({ message: "Comment missing" })
    if (!userId)
      return res.status(400).json({ message: "User ID missing" })
    if (!reviewerName)
      return res.status(400).json({ message: "Reviewer name missing" })

    const existing = await Review.findOne({ productId, userId })

    if (existing) {
      existing.rating = rating
      existing.comment = comment
      await existing.save()
      return res.status(200).json(existing)
    }

    const review = await Review.create({
      productId,
      productName,
      productImage: productImage || "/placeholder.svg",
      rating,
      comment,
      userId,
      reviewerName,
      verified: true,
    })

    return res.status(201).json(review)
  }
)


/**
 * GET REVIEWS BY PRODUCT
 * GET /api/reviews/product/:productId
 */
export const getReviewsByProductId = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params

    const reviews = await Review.find({ productId })
      .sort({ createdAt: -1 })

    return res.status(200).json(reviews)
  }
)

/**
 * GET ALL REVIEWS (ADMIN)
 * GET /api/reviews/admin/all
 */
export const getAllReviewsAdmin = asyncHandler(
  async (_req: Request, res: Response) => {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })

    return res.status(200).json(reviews)
  }
)

/**
 * ADMIN REPLY TO REVIEW
 * PUT /api/reviews/admin/reply/:id
 */
export const adminReplyToReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ message: "Reply message required" })
    }

    const review = await Review.findById(id)

    if (!review) {
      return res.status(404).json({ message: "Review not found" })
    }

    review.adminReply = {
      message,
      repliedBy: "Admin",
      repliedAt: new Date(),
    }

    await review.save()
    return res.status(200).json(review)
  }
)
