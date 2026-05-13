// // utils/multer.ts
// import multer from 'multer';
// import path from 'path';

// const storage = multer.memoryStorage();

// const fileFilter = (
//   req: Express.Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   const filetypes = /jpeg|jpg|png|gif|webp|mp4|webm|ogg/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Error: Images and videos only!'));
//   }
// };

// export const uploadFiles = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: parseInt(process.env.MAX_FILE_UPLOAD || '10000000') },
// }).fields([
//   { name: 'images', maxCount: 5 },
//   { name: 'video', maxCount: 1 },
// ]);





//new


// import multer from 'multer';
// import path from 'path';
// import type { Request } from 'express';

// const storage = multer.memoryStorage();

// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   console.log(`Processing file: ${file.fieldname} - ${file.originalname} (${file.mimetype})`);
  
//   const filetypes = /jpeg|jpg|png|gif|webp|mp4|webm|ogg/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Error: Images and videos only!'));
//   }
// };

// // CHANGE THIS LINE - Use .any() instead of .fields()
// export const uploadFiles = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: parseInt(process.env.MAX_FILE_UPLOAD || '10000000') },
// }).any(); // Changed from .fields() to .any()





import multer from 'multer';
import path from 'path';
import type { Request } from 'express';

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  console.log(`Processing file: ${file.fieldname} - ${file.originalname} (${file.mimetype})`);
  
  // Accept images
  if (file.fieldname === 'images') {
    const imageExtensions = /\.(jpeg|jpg|png|gif|webp)$/i;
    const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    const extname = imageExtensions.test(path.extname(file.originalname));
    const mimetype = imageMimeTypes.includes(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images only! Please upload JPEG, PNG, GIF, or WEBP files.'));
    }
  } 
  // Accept videos
  else if (file.fieldname === 'video') {
    const videoExtensions = /\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv|m4v)$/i;
    const videoMimeTypes = [
      'video/mp4', 
      'video/webm', 
      'video/ogg', 
      'video/quicktime',
      'video/x-msvideo', 
      'video/x-matroska', 
      'video/x-flv', 
      'video/x-ms-wmv',
      'video/mpeg'
    ];
    
    const extname = videoExtensions.test(path.extname(file.originalname));
    const mimetype = videoMimeTypes.includes(file.mimetype);
    
    console.log(`Video check - Extension: ${extname}, MIME: ${file.mimetype}`);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else if (extname) {
      // Accept based on extension if MIME type is weird
      console.log(`Accepting video based on extension: ${file.originalname}`);
      return cb(null, true);
    } else {
      cb(new Error(`Error: Videos only! Please upload MP4, WEBM, OGG, or MOV files.`));
    }
  }
  else {
    cb(new Error(`Error: Unexpected fieldname "${file.fieldname}"`));
  }
};

export const uploadFiles = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
}).fields([
  { name: 'images', maxCount: 10 },
  { name: 'video', maxCount: 1 },
]);