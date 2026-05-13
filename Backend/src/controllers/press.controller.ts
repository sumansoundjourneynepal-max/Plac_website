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


//new 

import { RequestHandler } from "express";
import Press, { IPress } from "../models/press.model";

// Get all published press items (optionally filter by type)
export const getPublishedPress: RequestHandler = async (req, res) => {
  try {
    const type = req.query.type as string | undefined; // "press" or "media"

    const filter: any = { status: "published" };
    if (type) filter.type = type;

    const pressItems: IPress[] = await Press.find(filter).sort({ publishedAt: -1 });
    res.status(200).json(pressItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single press item by slug
export const getPressBySlug: RequestHandler = async (req, res) => {
  try {
    const pressItem = await Press.findOne({ slug: req.params.slug, status: "published" });
    if (!pressItem) {
      res.status(404).json({ message: "Press item not found" });
      return;
    }

    res.status(200).json({
      ...pressItem.toObject(),
      publishedAt: pressItem.publishedAt?.toISOString() || null,
      createdAt: pressItem.createdAt.toISOString(),
      updatedAt: pressItem.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
