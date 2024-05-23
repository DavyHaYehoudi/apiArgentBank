import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express"
import yaml from "yamljs"
const swaggerDocs = yaml.load('./swagger.yaml')
import dbConnection from "./database/connection.js"
import userRoutes from "./routes/userRoutes.js"


const app = express()
const PORT = process.env.PORT || 3001

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors())

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use('/api/v1/user', userRoutes)

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

app.get('/', (req, res, next) => {
  res.send('Hello from my Express server v2!')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
