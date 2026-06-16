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

  storeSlug: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  },

  phone: {
    type: String,
    trim: true,
    match: [/^[6-9]\d{9}$/, "invalid:number"],
  },

  businessType: {
    type: String,
    enum: {
      values: ["individual", "company"],
      message: "invalid:businessType",
    },
    default: "individual"
  },

  gstNumber: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  },

  bank: {
    accountHolder: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String,
  },

  documents: {
    panCard: {
      url: String,
      verified: {
        type: Boolean,
        default: false
      }
    },

    aadhaarCard: {
      url: String,
      verified: {
        type: Boolean,
        default: false
      }
    },

    gstCertificate: {
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
    name: String,
    logo: String,
    banner: String,
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

