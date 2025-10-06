import express from "express";
import { addUser, getUsers, updateUser } from "../controllers/employee.js";

const router = express.Router();

router.get("/users", getUsers);
router.put("", updateUser);
router.post("", addUser);

export default router;
