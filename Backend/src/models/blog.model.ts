import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage?: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    category: { type: String, required: true },
    featuredImage: { type: String },
    author: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    publishedAt: { type: Date }
  },
  { timestamps: true }
);

export const Blog = mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;
