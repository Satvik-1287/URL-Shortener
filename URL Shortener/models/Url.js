import mongoose, { Model, Schema } from "mongoose";

const UrlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
    },

    shortId: {
        type: String,
        unique: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const UrlModel = mongoose.model('url', UrlSchema);
export default UrlModel;