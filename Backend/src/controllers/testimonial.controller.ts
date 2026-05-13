// import { RequestHandler } from 'express';
// import Testimonial from '../models/testimonial.model';

// // 🌍 Get all active testimonials (PUBLIC)
// export const getActiveTestimonials: RequestHandler = async (req, res) => {
//   try {
//     const testimonials = await Testimonial.find({ isActive: true })
//       .sort({ sortOrder: 1, createdAt: -1 });

//     res.status(200).json(testimonials);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // 🔍 Get single testimonial (ADMIN / optional)
// export const getTestimonialById: RequestHandler = async (req, res) => {
//   try {
//     const testimonial = await Testimonial.findById(req.params.id);

//     if (!testimonial) {
//       res.status(404).json({ message: 'Testimonial not found' });
//       return;
//     }

//     res.status(200).json(testimonial);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ➕ Create testimonial (ADMIN)
// export const createTestimonial: RequestHandler = async (req, res) => {
//   try {
//     const testimonial = await Testimonial.create(req.body);
//     res.status(201).json(testimonial);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: 'Invalid data' });
//   }
// };

// // ✏️ Update testimonial (ADMIN)
// export const updateTestimonial: RequestHandler = async (req, res) => {
//   try {
//     const updated = await Testimonial.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updated) {
//       res.status(404).json({ message: 'Testimonial not found' });
//       return;
//     }

//     res.status(200).json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: 'Invalid data' });
//   }
// };

// // 🗑 Delete testimonial (ADMIN)
// export const deleteTestimonial: RequestHandler = async (req, res) => {
//   try {
//     const deleted = await Testimonial.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       res.status(404).json({ message: 'Testimonial not found' });
//       return;
//     }

//     res.status(200).json({ message: 'Testimonial deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// import { RequestHandler } from "express"
// import Testimonial from "../models/testimonial.model"

// /* =========================
//    Get active testimonials (PUBLIC)
// ========================= */
// export const getActiveTestimonials: RequestHandler = async (req, res) => {
//   try {
//     const testimonials = await Testimonial.find({ isActive: true })
//       .sort({ sortOrder: 1, createdAt: -1 })

//     res.status(200).json(testimonials)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Server error" })
//   }
// }

// /* =========================
//    Get all testimonials (ADMIN)
// ========================= */
// export const getAllTestimonials: RequestHandler = async (req, res) => {
//   try {
//     const testimonials = await Testimonial.find().sort({
//       sortOrder: 1,
//       createdAt: -1
//     })

//     res.status(200).json(testimonials)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Server error" })
//   }
// }

// /* =========================
//    Create testimonial
// ========================= */
// export const createTestimonial: RequestHandler = async (req, res) => {
//   try {
//     const testimonial = new Testimonial(req.body)
//     await testimonial.save()

//     res.status(201).json(testimonial)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Failed to create testimonial" })
//   }
// }

// /* =========================
//    Update testimonial
// ========================= */
// export const updateTestimonial: RequestHandler = async (req, res) => {
//   try {
//     const testimonial = await Testimonial.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     )

//     if (!testimonial) {
//       res.status(404).json({ message: "Testimonial not found" })
//       return
//     }

//     res.status(200).json(testimonial)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Failed to update testimonial" })
//   }
// }

// /* =========================
//    Delete testimonial
// ========================= */
// export const deleteTestimonial: RequestHandler = async (req, res) => {
//   try {
//     const testimonial = await Testimonial.findByIdAndDelete(req.params.id)

//     if (!testimonial) {
//       res.status(404).json({ message: "Testimonial not found" })
//       return
//     }

//     res.status(200).json({ message: "Testimonial deleted" })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Failed to delete testimonial" })
//   }
// }


import { RequestHandler } from "express"
import Testimonial from "../models/testimonial.model"

/* =========================
   PUBLIC
========================= */
export const getActiveTestimonials: RequestHandler = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })

    res.status(200).json(testimonials)
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
    return
  }
}

/* =========================
   ADMIN
========================= */
export const getAllTestimonials: RequestHandler = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ sortOrder: 1, createdAt: -1 })

    res.status(200).json(testimonials)
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
    return
  }
}

/* =========================
   CREATE
========================= */
export const createTestimonial: RequestHandler = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body)

    res.status(201).json(testimonial)
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to create testimonial" })
    return
  }
}

/* =========================
   UPDATE
========================= */
export const updateTestimonial: RequestHandler = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!testimonial) {
      res.status(404).json({ message: "Testimonial not found" })
      return
    }

    res.status(200).json(testimonial)
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to update testimonial" })
    return
  }
}

/* =========================
   DELETE
========================= */
export const deleteTestimonial: RequestHandler = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id)

    if (!testimonial) {
      res.status(404).json({ message: "Testimonial not found" })
      return
    }

    res.status(200).json({ success: true })
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to delete testimonial" })
    return
  }
}
