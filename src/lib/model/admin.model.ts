import { InferSchemaType, Schema, model, models } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      // select: false, // Hide this field in query
    },

    avatar: {
      type: String,
      default: "",
    },

    permissions: {
      type: [String],
      default: [],
    },

    role: {
      type: String,
      default: "admin"
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },

    blocked: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

export type AdminType = InferSchemaType<typeof adminSchema>

const Admin = models?.Admin || model("Admin", adminSchema);

export default Admin
