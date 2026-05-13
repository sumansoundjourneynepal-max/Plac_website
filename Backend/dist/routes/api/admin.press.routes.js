"use strict";
// import { Router } from "express";
// import { createPress } from  '../../controllers/admin.press.controller';
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.post("/", createPress); 
// export default router;
const express_1 = require("express");
const admin_press_controller_1 = require("../../controllers/admin.press.controller");
const router = (0, express_1.Router)();
router.post("/", admin_press_controller_1.createPress);
router.get("/", admin_press_controller_1.getAllPress); // Add this line
router.get("/:id", admin_press_controller_1.getPressById); // Add this line
router.put("/:id", admin_press_controller_1.updatePress); // Add this line
router.delete("/:id", admin_press_controller_1.deletePress); // Add this line
exports.default = router;
