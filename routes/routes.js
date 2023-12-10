import express from "express";
import  { getUsers, Login, Logout, Register, getUser } from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/users', verifyToken, getUsers);
router.get('/users/:id', verifyToken, getUser);

export default router