import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.Mixed, // Allow both ObjectId and String (email)
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      option: {
        type: String,
        default: null
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
  paymentDetails: {
    method: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    deliveryFee: {
      type: Number,
    },
    subtotal: {
      type: Number,
    },
    promoCode: {
      type: String,
      default: null
    }
  },
  deliveryInfo: {
    fullName: {
      type: String,
    },
    phone: {
      type: String,
    },
    province: {
      type: String,
    },
    district: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    landmark: {
      type: String,
    },
    deliveryLabel: {
      type: String,
    }
  }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;