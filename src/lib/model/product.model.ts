import { InferSchemaType, model, models, Schema } from "mongoose";

const productSchema = new Schema({
  // Seller
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
    index: true,
  },

  // Category
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    index: true,
  },

  // Information
  name: {
    type: String,
    required: true,
    trim: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  brand: {
    type: String,
  },

  shortDesc: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  // Pricing
  price: {
    type: Number,
    required: true,
    min: 0,
  },

  stock: {
    type: Number,
    default: 0,
  },

  images: [
    {
      type: String,
    },
  ],

  // Status
  status: {
    type: String,
    enum: ["draft", "active", "archived"],
    default: "draft",
  },

  // Analytics
  views: {
    type: Number,
    default: 0,
  },

  sales: {
    type: Number,
    default: 0,
  },

  // Comments
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      comment: {
        type: String,
        required: true,
        trim: true,
      },

      rating: {
        type: Number,
        min: 1,
        max: 5,
      },

      likes: {
        type: Number,
        default: 0,
      },

      edited: {
        type: Boolean,
        default: false,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },

      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

},
  {
    timestamps: true,
  })

export type ProductType = InferSchemaType<typeof productSchema>

const Product = models?.Product || model("Product", productSchema)

export default Product
