import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema(
  {
    userId:   { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true, 
        unique: true 
    },
    firstname:{ 
        type: String, 
        required: true 
    },
    lastname: { 
        type: String, 
        required: true 
    },
    mnumber:  { 
        type: String, 
        required: true 
    },
    address:  { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);

const UserDetails = mongoose.models.UserDetails || mongoose.model("UserDetails", userDetailsSchema);
export default UserDetails;
