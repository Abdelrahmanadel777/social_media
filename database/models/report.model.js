import { model, Schema } from "mongoose";

const reportSchema = new Schema({
    report: {
        type: String,
        enum: ['none', 'span', 'abusive', 'stalker'],
        default: 'none',
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.ObjectId,
        ref: 'Post'
    }


}, { timestamps: true, versionKey: false })
reportSchema.index({ user: 1, post: 1 }, { unique: true });

export const Report = model('Report', reportSchema)