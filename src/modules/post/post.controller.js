import { Post } from "../../../database/models/post.model.js"
import { ApiFeatures } from "../../middleware/apiFeatures.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/Apperror.js"



export const addPost = async (req, res, next) => {


    req.body.user = req.user._id
    req.body.image = req.file.filename


    let post = await Post.insertMany(req.body)
    res.json({ message: "added", post })
}
export const getPosts = catchError(async (req, res, next) => {


    let mongooseSchema = Post.find()
    let apiFeatures = new ApiFeatures(mongooseSchema, req.query).pagination().sort().filter().fields().search()



    let posts = await apiFeatures.mongooseSchema
    console.log(posts);







    if (!posts) return next(new AppError('no posts existed', 401))
    res.json({ message: 'success', pageNumber: apiFeatures.pageNumber, posts })



})
export const getPost = async (req, res, next) => {
    let post = await Post.findById(req.params.id).populate('user')
    if (!post) return next(new AppError('no posts existed', 401))
    res.json({ message: 'success', post })
}
export const updatePost = async (req, res, next) => {
    let post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!post) return next(new AppError('no posts existed', 401))
    res.json({ message: 'updated', post })
}
export const deletePost = async (req, res, next) => {
    let post = await Post.findByIdAndDelete(req.params.id)
    if (!post) return next(new AppError('no posts existed', 401))
    res.json({ message: 'deleted', post })
}
export const userPosts = async (req, res, next) => {
    let post = await Post.findOne({ user: req.user._id })

    if (!post) return next(new AppError('no posts existed', 401))
    res.json({ message: 'success', post })
}


