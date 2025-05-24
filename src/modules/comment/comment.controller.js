import { Comment } from "../../../database/models/comment.model.js"
import { Post } from "../../../database/models/post.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/Apperror.js"


export const addComment = catchError(async (req, res, next) => {
    let post = await Post.findById(req.params.id)
    if (!post) return next(new AppError('no post existed', 404))
    req.body.user = req.user._id
    req.body.image = req.file.filename
    req.body.post = req.params.id
    req.body.role = req.user.role
    let comment = await Comment.insertMany(req.body)

    res.json({ message: 'added', comment })
})
export const updateComment = catchError(async (req, res, next) => {
    let comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!comment) return next(new AppError('comment not found'))
    res.json({ message: "updated", comment })

})
export const deleteComment = catchError(async (req, res, next) => {
    let comment = await Comment.findByIdAndDelete(req.params.id)
    if (!comment) return next(new AppError('comment not found'))
    res.json({ message: "deleted", comment })

})
export const getCommentsOfPost = catchError(async (req, res, next) => {
    let comments = await Comment.find({ post: req.params.id })
    let numOfComments = comments.length
    if (!comments) return next(new AppError('no comments found'))
    res.json({ message: "success", comments, numOfComments })

})
