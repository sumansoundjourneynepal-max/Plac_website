"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/admin.routes.ts
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const router = (0, express_1.Router)();
router.post('/login', admin_controller_1.adminLogin);
exports.default = router;
