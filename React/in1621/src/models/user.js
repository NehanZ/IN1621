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
    },
    {timestamps: true,} 
);


// // Add method to compare passwords
// userSchema.methods.comparePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };



const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;

