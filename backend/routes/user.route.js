import express from "express";
import {testUserApi} from "../controllers/user.controller.js";


const router = express.Router();

router.get('/', testUserApi)


export default router
