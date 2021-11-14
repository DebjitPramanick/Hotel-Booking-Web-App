const express = require('express')
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const schema = require("./schemas/Schema.js")
const isAuth = require('./middlewares/isAuth.js')
const dotenv = require('dotenv')

const app = express()
app.use(cors())
app.use(express.json())
app.use(isAuth)
dotenv.config()

const mongoURL = process.env.MONGO_URL
console.log(mongoURL)
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => console.log("DB Connected..."))

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(8000, () => console.log("Sever is running..."))
app.get('/', (req,res) => res.send("Auth system..."))