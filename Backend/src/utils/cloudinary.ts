// import { v2 as cloudinary } from "cloudinary"
// import type { Express } from "express"

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// export const uploadToCloudinary = async (buffer: Buffer, folder: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream(
//         {
//           folder,
//           resource_type: "auto",
//         },
//         (error, result) => {
//           if (error) {
//             console.error("Cloudinary upload error:", error)
//             reject(error)
//           } else if (result) {
//             resolve(result.secure_url)
//           } else {
//             reject(new Error("Upload failed - no result"))
//           }
//         },
//       )
//       .end(buffer)
//   })
// }

// export const uploadImages = async (files: Express.Multer.File[], folder: string): Promise<string[]> => {
//   const uploadPromises = files.map((file) => uploadToCloudinary(file.buffer, folder))
//   return Promise.all(uploadPromises)
// }




import { v2 as cloudinary } from "cloudinary"
// @ts-ignore - streamifier doesn't have types
import streamifier from "streamifier"
import type { Express } from "express"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadToCloudinary = async (buffer: Buffer, folder: string, mimeType?: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const isVideo = mimeType?.startsWith('video/');
    
    console.log(`Uploading to Cloudinary - Type: ${isVideo ? 'video' : 'image'}, MIME: ${mimeType}`);
    
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: isVideo ? "video" : "image",
          allowed_formats: isVideo 
            ? ["mp4", "webm", "ogg", "mov", "avi", "mkv", "mpg", "mpeg"] 
            : ["jpg", "jpeg", "png", "gif", "webp"],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error)
            reject(error)
          } else if (result) {
            console.log(`Upload successful: ${result.secure_url}`);
            resolve(result.secure_url)
          } else {
            reject(new Error("Upload failed - no result"))
          }
        },
      )
      .end(buffer)
  })
}

export const uploadImages = async (files: Express.Multer.File[], folder: string): Promise<string[]> => {
  console.log(`Uploading ${files.length} images to Cloudinary`);
  const uploadPromises = files.map((file) => uploadToCloudinary(file.buffer, folder, file.mimetype))
  return Promise.all(uploadPromises)
}