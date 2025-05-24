process.on('uncaughtException', ((err) => {
    console.log(err.message);

}))
import express from 'express'
import dotenv from 'dotenv'
import { dbConnection } from './database/dbConnection/dbConnection.js'
import { bootstrap } from './src/modules/bootstrap.js'
import { globalError } from './src/middleware/globalError.js'
const app = express()
dotenv.config()
const port = 3000
app.use(express.json())
app.use('/uploads', express.static('uploads'))
process.on('unhandledRejection', ((err) => {
    console.log(err.message);

}))

dbConnection()
bootstrap(app)
app.use(globalError)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
