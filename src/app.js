import express, { json } from "express";
import 'dotenv/config'
import blogRouter from "./routes/blogRoute.js"
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api', blogRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
