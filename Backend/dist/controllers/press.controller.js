"use strict";
// import { RequestHandler } from "express";
// import Press, { IPress } from "../models/press.model";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPressBySlug = exports.getPublishedPress = void 0;
const press_model_1 = __importDefault(require("../models/press.model"));
// Get all published press items (optionally filter by type)
const getPublishedPress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = req.query.type; // "press" or "media"
        const filter = { status: "published" };
        if (type)
            filter.type = type;
        const pressItems = yield press_model_1.default.find(filter).sort({ publishedAt: -1 });
        res.status(200).json(pressItems);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getPublishedPress = getPublishedPress;
// Get single press item by slug
const getPressBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const pressItem = yield press_model_1.default.findOne({ slug: req.params.slug, status: "published" });
        if (!pressItem) {
            res.status(404).json({ message: "Press item not found" });
            return;
        }
        res.status(200).json(Object.assign(Object.assign({}, pressItem.toObject()), { publishedAt: ((_a = pressItem.publishedAt) === null || _a === void 0 ? void 0 : _a.toISOString()) || null, createdAt: pressItem.createdAt.toISOString(), updatedAt: pressItem.updatedAt.toISOString() }));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getPressBySlug = getPressBySlug;
