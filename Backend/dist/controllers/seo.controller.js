"use strict";
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
exports.deleteSEOPage = exports.updateSEOPage = exports.createSEOPage = exports.getSEOPageByPath = exports.getSEOPages = void 0;
const seo_model_1 = __importDefault(require("../models/seo.model"));
const express_validator_1 = require("express-validator");
const getSEOPages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pages = yield seo_model_1.default.find().sort({ updatedAt: -1 });
        res.json(pages);
    }
    catch (error) {
        console.error('Error fetching SEO pages:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getSEOPages = getSEOPages;
const getSEOPageByPath = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { path } = req.params;
        const page = yield seo_model_1.default.findOne({ path, isActive: true });
        if (!page) {
            return res.status(404).json({ message: 'SEO page not found' });
        }
        res.json(page);
    }
    catch (error) {
        console.error('Error fetching SEO page:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getSEOPageByPath = getSEOPageByPath;
const createSEOPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { pageName, path, title, description, keywords, ogImage, isActive, structuredData } = req.body;
        const newPage = new seo_model_1.default({
            pageName,
            path,
            title,
            description,
            keywords: Array.isArray(keywords)
                ? keywords
                : keywords.split(',').map((k) => k.trim()), // Explicitly type 'k' as string
            ogImage,
            isActive: isActive !== false,
            structuredData
        });
        yield newPage.save();
        res.status(201).json(newPage);
    }
    catch (error) {
        console.error('Error creating SEO page:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createSEOPage = createSEOPage;
const updateSEOPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const { pageName, path, title, description, keywords, ogImage, isActive, structuredData } = req.body;
        const updatedPage = yield seo_model_1.default.findByIdAndUpdate(id, {
            pageName,
            path,
            title,
            description,
            keywords: Array.isArray(keywords)
                ? keywords
                : keywords.split(',').map((k) => k.trim()), // Explicitly type 'k' as string
            ogImage,
            isActive,
            structuredData
        }, { new: true });
        if (!updatedPage) {
            return res.status(404).json({ message: 'SEO page not found' });
        }
        res.json(updatedPage);
    }
    catch (error) {
        console.error('Error updating SEO page:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateSEOPage = updateSEOPage;
const deleteSEOPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedPage = yield seo_model_1.default.findByIdAndDelete(id);
        if (!deletedPage) {
            return res.status(404).json({ message: 'SEO page not found' });
        }
        res.json({ message: 'SEO page deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting SEO page:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteSEOPage = deleteSEOPage;
