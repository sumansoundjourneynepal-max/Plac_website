"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// utils/logger.utils.ts
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.json()),
    defaultMeta: { service: 'omsound-backend' },
    transports: [
        new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'combined.log' }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.transports.Console({
        format: winston_1.format.simple()
    }));
}
exports.default = logger;
