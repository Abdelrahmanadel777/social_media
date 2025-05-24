import { model, Schema } from "mongoose";

const commentSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    post: {
        type: Schema.ObjectId,
        ref: 'Post'
    },
    image: {
        type: String
    }


}, { timestamps: true, versionKey: false })
commentSchema.post('init', function (doc) {
    console.log(doc);

    doc.image = process.env.WEB_SERVER + doc.image
})
export const Comment = model('Comment', commentSchema)