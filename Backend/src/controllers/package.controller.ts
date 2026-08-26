// src/controllers/package.controller.ts
import type { Request, Response } from "express"
import { Package } from "../models/package.model"
import { uploadImages } from "../utils/cloudinary"

interface UploadedFiles {
  images?: Express.Multer.File[]
  [key: string]: Express.Multer.File[] | undefined
}

const groupFilesByFieldname = (rawFiles: Express.Multer.File[]): UploadedFiles => {
  const files: UploadedFiles = {}
  rawFiles.forEach((file) => {
    if (!files[file.fieldname]) files[file.fieldname] = []
    files[file.fieldname]!.push(file)
  })
  return files
}

const parseJSONField = (value: any, fallback: any) => {
  if (value === undefined || value === null || value === "") return fallback
  if (typeof value !== "string") return value
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

// GET /api/packages - public, only active packages, optional ?category=
export const getPackages = async (req: Request, res: Response) => {
  const { category } = req.query
  const filter: Record<string, any> = { isActive: true }
  if (category) filter.category = category

  const packages = await Package.find(filter).sort({ createdAt: -1 })
  res.json({ success: true, data: packages })
}

// GET /api/packages/admin - admin, all packages including inactive
export const getAllPackagesAdmin = async (req: Request, res: Response) => {
  const packages = await Package.find().sort({ createdAt: -1 })
  res.json({ success: true, data: packages })
}

// GET /api/packages/:id
export const getPackageById = async (req: Request, res: Response) => {
  const { id } = req.params
  const pkg = (await Package.findById(id).catch(() => null)) || (await Package.findOne({ id }))

  if (!pkg) {
    return res.status(404).json({ success: false, message: "Package not found" })
  }
  res.json({ success: true, data: pkg })
}

// POST /api/packages - admin
export const createPackage = async (req: Request, res: Response) => {
  const body = req.body

  let images: string[] = parseJSONField(body.existingImages, [])

  const rawFiles = (req.files as Express.Multer.File[]) || []
  const files = groupFilesByFieldname(rawFiles)

  if (files.images && files.images.length > 0) {
    const uploaded = await uploadImages(files.images, "packages")
    images = [...images, ...uploaded]
  }

  const newPackage = await Package.create({
    id: body.id || body.slug,
    name: body.name,
    category: body.category,
    mode: body.mode,
    description: body.description,
    details: parseJSONField(body.details, []),
    images,
    price: body.price ? Number(body.price) : undefined,
    priceNote: body.priceNote,
    duration: body.duration,
    bookingType: body.bookingType || "inquiry",
    availability: parseJSONField(body.availability, []),
    location: parseJSONField(body.location, undefined),
    isActive: body.isActive === undefined ? true : body.isActive === "true" || body.isActive === true,
    seoTitle: body.seoTitle,
    seoDescription: body.seoDescription,
    seoKeywords: body.seoKeywords,
  })

  res.status(201).json({ success: true, data: newPackage })
}

// PUT /api/packages/:id - admin
export const updatePackage = async (req: Request, res: Response) => {
  const { id } = req.params
  const body = req.body

  const pkg = (await Package.findById(id).catch(() => null)) || (await Package.findOne({ id }))
  if (!pkg) {
    return res.status(404).json({ success: false, message: "Package not found" })
  }

  let images: string[] = parseJSONField(body.existingImages, pkg.images)

  const rawFiles = (req.files as Express.Multer.File[]) || []
  const files = groupFilesByFieldname(rawFiles)
  if (files.images && files.images.length > 0) {
    const uploaded = await uploadImages(files.images, "packages")
    images = [...images, ...uploaded]
  }

  if (body.name !== undefined) pkg.name = body.name
  if (body.category !== undefined) pkg.category = body.category
  if (body.mode !== undefined) pkg.mode = body.mode
  if (body.description !== undefined) pkg.description = body.description
  if (body.details !== undefined) pkg.details = parseJSONField(body.details, pkg.details)
  pkg.images = images
  if (body.price !== undefined) pkg.price = body.price === "" ? undefined : Number(body.price)
  if (body.priceNote !== undefined) pkg.priceNote = body.priceNote
  if (body.duration !== undefined) pkg.duration = body.duration
  if (body.bookingType !== undefined) pkg.bookingType = body.bookingType
  if (body.availability !== undefined) pkg.availability = parseJSONField(body.availability, pkg.availability)
  if (body.location !== undefined) pkg.location = parseJSONField(body.location, pkg.location)
  if (body.isActive !== undefined) pkg.isActive = body.isActive === "true" || body.isActive === true
  if (body.seoTitle !== undefined) pkg.seoTitle = body.seoTitle
  if (body.seoDescription !== undefined) pkg.seoDescription = body.seoDescription
  if (body.seoKeywords !== undefined) pkg.seoKeywords = body.seoKeywords

  await pkg.save()
  res.json({ success: true, data: pkg })
}

// DELETE /api/packages/:id - admin
export const deletePackage = async (req: Request, res: Response) => {
  const { id } = req.params
  const pkg = (await Package.findById(id).catch(() => null)) || (await Package.findOne({ id }))
  if (!pkg) {
    return res.status(404).json({ success: false, message: "Package not found" })
  }
  await pkg.deleteOne()
  res.json({ success: true, message: "Package deleted" })
}
