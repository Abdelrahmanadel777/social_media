import { model, Schema } from "mongoose";

const postSchema = new Schema({
    caption: {
        type: String,
    },
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    image: {
        type: String
    },



}, { timestamps: true, versionKey: false })
postSchema.post('init', function (doc) {
    console.log(doc);

    if (doc.image) doc.image = process.env.WEB_SERVER + doc.image
})
export const Post = model('Post', postSchema)