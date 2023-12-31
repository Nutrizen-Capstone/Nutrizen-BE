import express from "express";
import  { getUsers, Login, Logout, Register, getUser, editProfile, Welcome, deleteAccount } from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { addScanHistory, deleteScanHistory, getScanHistory } from "../controllers/ScanController.js";

const router = express.Router();

//user
router.get('/', Welcome);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/users', verifyToken, getUsers);
router.get('/users/:id', verifyToken, getUser);
router.put('/profile/:id', verifyToken, editProfile);
router.post('/users/delete', verifyToken, deleteAccount);

//scan
router.post('/scan', verifyToken, addScanHistory);
router.post('/scanHistory', verifyToken, getScanHistory);
router.post('/scanHistory/delete', verifyToken, deleteScanHistory);

export default router