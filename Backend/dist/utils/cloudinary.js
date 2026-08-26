"use strict";
// import { v2 as cloudinary } from "cloudinary"
// import type { Express } from "express"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = exports.uploadToCloudinary = void 0;
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
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = (buffer, folder, mimeType) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const isVideo = mimeType === null || mimeType === void 0 ? void 0 : mimeType.startsWith('video/');
        console.log(`Uploading to Cloudinary - Type: ${isVideo ? 'video' : 'image'}, MIME: ${mimeType}`);
        cloudinary_1.v2.uploader
            .upload_stream({
            folder,
            resource_type: isVideo ? "video" : "image",
            allowed_formats: isVideo
                ? ["mp4", "webm", "ogg", "mov", "avi", "mkv", "mpg", "mpeg"]
                : ["jpg", "jpeg", "png", "gif", "webp"],
        }, (error, result) => {
            if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
            }
            else if (result) {
                console.log(`Upload successful: ${result.secure_url}`);
                resolve(result.secure_url);
            }
            else {
                reject(new Error("Upload failed - no result"));
            }
        })
            .end(buffer);
    });
});
exports.uploadToCloudinary = uploadToCloudinary;
const uploadImages = (files, folder) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Uploading ${files.length} images to Cloudinary`);
    const uploadPromises = files.map((file) => (0, exports.uploadToCloudinary)(file.buffer, folder, file.mimetype));
    return Promise.all(uploadPromises);
});
exports.uploadImages = uploadImages;
