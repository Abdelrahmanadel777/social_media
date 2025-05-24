import { Router } from "express";
import { protectedRoutes } from "../../middleware/protectedRoute.js";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";
import { validate } from "../../middleware/validation.js";
import { addReportValidation, removeReportValidation } from "./report.validation.js";
import { addReport, removeReport } from "./report.controller.js";

export const reportRouter = Router()
reportRouter.route('/:post').post(protectedRoutes, isAllowedTo('user', 'admin'), validate(addReportValidation), addReport)
reportRouter.route('/:id').delete(protectedRoutes, isAllowedTo('user', 'admin'), validate(removeReportValidation), removeReport)