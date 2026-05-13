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
const mongoose_1 = __importDefault(require("mongoose"));
const admin_model_1 = require("../models/admin.model"); // Now this import will work
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
function seedAdmins() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1. Connect to MongoDB
            const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/omsound';
            yield mongoose_1.default.connect(MONGO_URI);
            console.log('✅ Connected to MongoDB');
            // 2. Clear existing admins (optional - comment out if you want to keep existing data)
            yield admin_model_1.Admin.deleteMany({});
            console.log('🗑️ Cleared existing admin accounts');
            // 3. Create new admin accounts
            const admins = [
                {
                    username: 'admin',
                    email: 'admin@omsound.com',
                    password: 'admin123', // Will be hashed by the pre-save middleware
                    role: 'admin',
                    status: 'active'
                },
                {
                    username: 'subadmin',
                    email: 'subadmin@omsound.com',
                    password: 'admin123', // Will be hashed by the pre-save middleware
                    role: 'sub-admin',
                    status: 'active'
                }
            ];
            // Use create instead of insertMany to trigger pre-save middleware
            for (const adminData of admins) {
                yield admin_model_1.Admin.create(adminData);
            }
            console.log('✅ Admin accounts created successfully');
            console.log('📧 Admin credentials:');
            console.log('   - Username: admin, Password: admin123');
            console.log('   - Username: subadmin, Password: admin123');
        }
        catch (error) {
            // 4. Proper error handling
            if (error instanceof Error) {
                console.error('❌ Seeding failed:', error.message);
            }
            else {
                console.error('❌ Unknown error occurred during seeding');
            }
            process.exit(1);
        }
        finally {
            // 5. Disconnect from MongoDB
            yield mongoose_1.default.disconnect();
            console.log('🔌 Disconnected from MongoDB');
            process.exit(0);
        }
    });
}
// Execute the function only if this file is run directly
if (require.main === module) {
    seedAdmins();
}
exports.default = seedAdmins;
// ========================================
// package.json scripts section (add this to your package.json)
/*
{
  "scripts": {
    "seed:admins": "ts-node src/scripts/seedAdmins.ts",
    "seed:admins:dev": "tsx src/scripts/seedAdmins.ts"
  }
}
*/ 
