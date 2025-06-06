import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	firstName: {
		type: String,
		required: false,
	},
	lastName: {
		type: String,
		required: false,
	},
	image: {
		type: String,
		required: false
	},
	color: {
		type: Number,
		required: false
	},
	profileSetup: {
		type: Boolean,
		default: false
	}
});

userSchema.pre("save", async function(next) {
	const salt = await bcrypt.genSalt(10);  // Ensure you call it as a method of bcrypt
	this.password = await bcrypt.hash(this.password, salt);
	next();
})

const User = mongoose.model("Users", userSchema);

export default User;