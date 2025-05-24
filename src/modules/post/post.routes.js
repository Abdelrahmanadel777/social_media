import { Router } from "express";
import { addPost, deletePost, getPost, getPosts, updatePost, userPosts } from "./post.controller.js";
import { protectedRoutes } from "../../middleware/protectedRoute.js";
import { validate } from "../../middleware/validation.js";
import * as validation from "./post.validation.js";
import { uploadSingleFile } from "../../middleware/fileUpload.js";


export const postRouter = Router()

postRouter.route('/').post(protectedRoutes, uploadSingleFile('image'), validate(validation.addPostValidation), addPost)
    .get(getPosts)
postRouter.route('/:id').get(protectedRoutes, validate(validation.getPostValidation), getPost).put(protectedRoutes, validate(validation.updatePostValidation), updatePost)
    .delete(protectedRoutes, deletePost)
postRouter.route('userPosts').get(protectedRoutes, userPosts)
