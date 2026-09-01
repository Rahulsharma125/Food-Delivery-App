import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
}, {timestamps: true})

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);