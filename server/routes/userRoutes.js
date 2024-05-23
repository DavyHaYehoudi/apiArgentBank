import express from "express";
const router = express.Router()
import tokenValidation from "../middleware/tokenValidation.js"
import userController from "../controllers/userController.js"

router.post('/signup', userController.createUser)

router.post('/login', userController.loginUser)

router.post(
  '/profile',
  tokenValidation,
  userController.getUserProfile
)

router.put(
  '/profile',
  tokenValidation,
  userController.updateUserProfile
)

export default router;