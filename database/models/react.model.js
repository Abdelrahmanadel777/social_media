import { model, Schema } from "mongoose";

const reactSchema = new Schema({
    type: String,

    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.ObjectId,
        ref: 'Post'
    },
    react: {
        type: String,
        enum: ['none','haha', 'like', 'love', 'sad', 'angry', 'care'],
        default: 'none',
    }


}, { timestamps: true, versionKey: false })
export const React = model('React', reactSchema)