// import { RequestHandler } from "express";
// import Press, { IPress } from "../models/press.model";

// export const createPress: RequestHandler = async (req, res) => {
//   try {
//     const {
//       title,
//       slug,
//       excerpt,
//       content,
//       type,
//       featuredImage,
//       externalLink,
//       status,
//     } = req.body;

//     const press: IPress = await Press.create({
//       title,
//       slug,
//       excerpt,
//       content,
//       type,
//       featuredImage,
//       externalLink,
//       status,
//       publishedAt: status === "published" ? new Date() : null,
//     });

//     res.status(201).json({
//       id: press._id.toString(),
//       ...press.toObject(),
//       publishedAt: press.publishedAt?.toISOString() || null,
//       createdAt: press.createdAt.toISOString(),
//       updatedAt: press.updatedAt.toISOString(),
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


import { RequestHandler } from "express";
import Press, { IPress } from "../models/press.model";

// Create press item
export const createPress: RequestHandler = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      type,
      featuredImage,
      externalLink,
      status,
    } = req.body;

    const press: IPress = await Press.create({
      title,
      slug,
      excerpt,
      content,
      type,
      featuredImage,
      externalLink,
      status,
      publishedAt: status === "published" ? new Date() : null,
    });

    res.status(201).json({
      id: press._id.toString(),
      title: press.title,
      slug: press.slug,
      excerpt: press.excerpt,
      content: press.content,
      type: press.type,
      featuredImage: press.featuredImage,
      externalLink: press.externalLink,
      status: press.status,
      publishedAt: press.publishedAt?.toISOString() || null,
      createdAt: press.createdAt.toISOString(),
      updatedAt: press.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all press items (for admin - includes all statuses)
export const getAllPress: RequestHandler = async (req, res) => {
  try {
    const pressItems = await Press.find().sort({ createdAt: -1 });
    
    const formattedPress = pressItems.map(press => ({
      _id: press._id.toString(),
      title: press.title,
      slug: press.slug,
      excerpt: press.excerpt,
      content: press.content,
      type: press.type,
      featuredImage: press.featuredImage,
      externalLink: press.externalLink,
      status: press.status,
      publishedAt: press.publishedAt?.toISOString() || null,
      createdAt: press.createdAt.toISOString(),
      updatedAt: press.updatedAt.toISOString(),
    }));

    res.status(200).json(formattedPress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single press item by ID (for admin)
export const getPressById: RequestHandler = async (req, res) => {
  try {
    const pressItem = await Press.findById(req.params.id);
    if (!pressItem) {
      res.status(404).json({ message: "Press item not found" });
      return;
    }

    res.status(200).json({
      _id: pressItem._id.toString(),
      title: pressItem.title,
      slug: pressItem.slug,
      excerpt: pressItem.excerpt,
      content: pressItem.content,
      type: pressItem.type,
      featuredImage: pressItem.featuredImage,
      externalLink: pressItem.externalLink,
      status: pressItem.status,
      publishedAt: pressItem.publishedAt?.toISOString() || null,
      createdAt: pressItem.createdAt.toISOString(),
      updatedAt: pressItem.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update press item
export const updatePress: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      excerpt,
      content,
      type,
      featuredImage,
      externalLink,
      status,
    } = req.body;

    const updateData: any = {
      title,
      slug,
      excerpt,
      content,
      type,
      featuredImage,
      externalLink,
      status,
      updatedAt: new Date(),
    };

    // Only update publishedAt if status is changing to published
    if (status === "published") {
      const existingPress = await Press.findById(id);
      if (existingPress && existingPress.status !== "published") {
        updateData.publishedAt = new Date();
      }
    }

    const pressItem = await Press.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!pressItem) {
      res.status(404).json({ message: "Press item not found" });
      return;
    }

    res.status(200).json({
      _id: pressItem._id.toString(),
      title: pressItem.title,
      slug: pressItem.slug,
      excerpt: pressItem.excerpt,
      content: pressItem.content,
      type: pressItem.type,
      featuredImage: pressItem.featuredImage,
      externalLink: pressItem.externalLink,
      status: pressItem.status,
      publishedAt: pressItem.publishedAt?.toISOString() || null,
      createdAt: pressItem.createdAt.toISOString(),
      updatedAt: pressItem.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete press item
export const deletePress: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pressItem = await Press.findByIdAndDelete(id);
    
    if (!pressItem) {
      res.status(404).json({ message: "Press item not found" });
      return;
    }

    res.status(200).json({ 
      message: "Press item deleted successfully",
      id: pressItem._id.toString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};