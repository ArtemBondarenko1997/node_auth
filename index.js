const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 8000
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const dotenv = require('dotenv').config()
const cors = require('cors');
const app = express()

app.use(cors());

app.use(express.json())
app.use("/auth", authRouter)

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );

let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


const start = async () => {
    try {
        console.log(process.env)
        await mongoose.connect(process.env.DB_URL, options)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

