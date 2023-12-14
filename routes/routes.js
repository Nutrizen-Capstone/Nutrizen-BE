import express from "express";
import  { getUsers, Login, Logout, Register, getUser, completeProfile, editProfile, Welcome } from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/', Welcome);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/users', verifyToken, getUsers);
router.get('/users/:id', verifyToken, getUser);
router.put('/profile/:id', verifyToken, completeProfile);
router.put('/profile/:id/edit', verifyToken, editProfile);

export default router