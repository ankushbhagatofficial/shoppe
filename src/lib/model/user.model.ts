import { InferSchemaType, model, models, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "required:name"],
    trim: true,
    minlength: [3, "minlength:3"],
    maxlength: [30, "maxlength:30"],
  },

  email: {
    type: String,
    required: [true, "required:email"],
    lowercase: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "invalid:email"],
  },

  password: {
    type: String,
    required: [true, "required:email"],
    minlength: [8, "minlength:8"],
    maxlength: [60, "maxlength:60"]
  },

  phone: {
    type: String,
    match: [/^[6-9]\d{9}$/, "invalid:number"],
  },

  avatar: {
    type: String,
  },

  role: {
    type: String,
    enum: {
      values: ["user", "seller", "admin"],
      message: "invalid:role",
    },
    default: "user"
  },

  verified: {
    type: Boolean,
    default: false
  },

  blocked: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: {
      values: ["pending", "approved", "rejected"],
      message: "invalid:status"
    },
    default: "pending"
  },

  lastLogin: {
    type: Date
  },

  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],

}, { timestamps: true })

type User = InferSchemaType<typeof userSchema>

const User = models?.User || model("User", userSchema)

export default User

