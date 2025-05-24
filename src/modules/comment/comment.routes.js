import { Router } from "express";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";
import { protectedRoutes } from "../../middleware/protectedRoute.js";
import * as commentCruds from "./comment.controller.js";
import { validate } from "../../middleware/validation.js";
import { addCommentValidation, CommentValidation } from "./comment.validation.js";
import { uploadSingleFile } from "../../middleware/fileUpload.js";

export const commentRouter = Router()


commentRouter.route('/:id').get(protectedRoutes, isAllowedTo('Admin', 'User'), validate(CommentValidation), commentCruds.getCommentsOfPost)
    .put(protectedRoutes, isAllowedTo('Admin', 'User'), validate(CommentValidation), commentCruds.updateComment)
    .delete(protectedRoutes, isAllowedTo('Admin', 'User'), validate(CommentValidation), commentCruds.deleteComment)
    .post(protectedRoutes, isAllowedTo('Admin', 'User'), uploadSingleFile('image'), validate(addCommentValidation), commentCruds.addComment)
