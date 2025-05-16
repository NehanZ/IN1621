import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstname: {
            type: string,
            required: true,
        },
        lastname: {
            type: string,
            required: true,
        },
        mnumber: {
            type: string,
            required: true,
        },
        address: {
            type: string,
            required: true,
        },
        
    },
    {timestamps: true,} 
);





const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;

