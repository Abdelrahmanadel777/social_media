import { React } from "../../../database/models/react.model.js"
import { AppError } from "../../utils/Apperror.js"

export const addReact = async (req, res, next) => {
    let data = await React.find({ user: req.user._id, post: req.params.post })
    if (data) return next(new AppError('already reacted'))
    req.body.user = req.user._id
    req.body.post = req.params.post
    let react = await React.insertMany(req.body)
    res.json({ message: "added", react })
}
export const getReacts = async (req, res, next) => {
    let reacts = await React.find({ post: req.params.post })
    if (!reacts) return next(new AppError('no reacts found', 404))
    let numOfReacts = reacts.length
    res.json({ message: "success", reacts, numOfReacts })
}
export const deleteReact = async (req, res, next) => {
    let reacts = await React.findByIdAndDelete(req.params.id)
    res.json({ message: "deleted", reacts })
}
export const getReact = async (req, res, next) => {
    let reacts = await React.find({ post: req.params.post, react: req.params.react })
    if (!reacts) return next(new AppError('no reacts found', 404))
    let numOfReacts = reacts.length
    res.json({ message: "success", reacts, numOfReacts })
}
