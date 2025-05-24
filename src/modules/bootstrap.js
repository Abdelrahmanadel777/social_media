import { AppError } from "../utils/Apperror.js"
import { authRouter } from "./authentication/authentication.routes.js"
import { commentRouter } from "./comment/comment.routes.js"
import { postRouter } from "./post/post.routes.js"
import { reactRouter } from "./react/react.routes.js"
import { reportRouter } from "./report/report.routes.js"
import { userRouter } from "./user/user.routes.js"

export const bootstrap = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/post', postRouter)
    app.use('/api/user', userRouter)
    app.use('/api/comment', commentRouter)
    app.use('/api/react', reactRouter),
    app.use('/api/report', reportRouter)

    app.use('*', (req, res, next) => {
        next(new AppError('error in endpoint', 404))
    })
}