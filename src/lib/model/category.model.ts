import { InferSchemaType, Schema, model, models } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  productCount: {
    type: Number,
    default: 0,
    min: 0
  },

  active: {
    type: Boolean,
    default: true,
  },
},
  {
    timestamps: true,
  }
);

export type CategoryType = InferSchemaType<typeof categorySchema>
const Category = models?.Category || model("Category", categorySchema);
export default Category
