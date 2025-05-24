import { Report } from "../../../database/models/report.model.js"
import { AppError } from "../../utils/Apperror.js"

export const addReport = async (req, res, next) => {


    req.body.user = req.user._id
    req.body.post = req.params.post
    let report = new Report(req.body)
    await report.save()
    res.json({ message: "added", report })


}
export const removeReport = async (req, res, next) => {
    let report = await Report.findByIdAndDelete(req.params.id)
    if (!report) return next(new AppError('no report found', 404))
    res.json({ message: "deleted", report })
}
