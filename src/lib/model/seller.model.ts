import { InferSchemaType, model, models, Schema } from "mongoose";

const sellerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "required:name"],
    minlength: [3, "minlength:3"],
    maxlength: [30, "maxlength:30"],
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, "required:email"],
    match: [/^\S+@\S+\.\S+$/, "invalid:email"],
  },

  password: {
    type: String,
    minlength: [8, "minlength:8"],
    maxlength: [60, "maxlength:60"]
  },

  phone: {
    type: String,
    trim: true,
    match: [/^[6-9]\d{9}$/, "invalid:number"],
  },

  business: {
    businessType: {
      type: String,
      enum: {
        values: ["individual", "company"],
        message: "invalid:businessType",
      },
    },

    gstNumber: {
      type: String,
      default: "",
    },

    businessAddress: {
      type: String,
      default: "",
    },
  },

  bank: {
    accountHolder: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String,
  },

  documents: {
    panCard: {
      publicId: String,
      url: String,
      verified: {
        type: Boolean,
        default: false
      }
    },

    identityCard: {
      publicId: String,
      url: String,
      verified: {
        type: Boolean,
        default: false
      }
    },

    gstCertificate: {
      publicId: String,
      url: String,
      verified: {
        type: Boolean,
        default: false
      }
    }
  },

  onboardingComplete: {
    type: Boolean,
    default: false
  },

  store: {
    url: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      sparse: true,
      required: false
    },
    name: String,
    logo: {
      url: String,
      publicId: String
    },
    banner: {
      url: String,
      publicId: String
    },
    description: String
  },

  role: {
    type: String,
    enum: {
      values: ["user", "seller", "admin"],
      message: "invalid:role",
    },
    default: "seller"
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ], 

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

  approvedAt: Date,
  rejectedAt: Date,
  lastLogin: Date,

}, { timestamps: true })

export type SellerType = InferSchemaType<typeof sellerSchema>

const Seller = models?.Seller || model("Seller", sellerSchema)

export default Seller

