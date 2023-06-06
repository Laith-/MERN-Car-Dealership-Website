const express = require("express")
const colors = require("colors")
const doenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const port = process.env.PORT

connectDB()

const app = express()

app.use(express.json.apply())

app.use(express.urlencoded({extended: false}))

app.use("/api/inventory", require("./routes/inventoryManagerRoutes"))

app.use(errorHandler)

app.listen(port, console.log("server running"))
