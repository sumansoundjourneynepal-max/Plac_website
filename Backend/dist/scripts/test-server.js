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
const node_fetch_1 = __importDefault(require("node-fetch"));
function testServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Testing server connection...");
            // Test basic server connection
            const response = yield (0, node_fetch_1.default)("http://localhost:5000/api/products", {
                method: "GET",
            });
            console.log("Server response status:", response.status);
            console.log("Server response headers:", Object.fromEntries(response.headers.entries()));
            if (response.ok) {
                const data = (yield response.json());
                console.log("Server is running! Products:", Array.isArray(data) ? data.length : 0);
            }
            else {
                const errorText = yield response.text();
                console.error("Server error:", errorText);
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error("Failed to connect to server:", errorMessage);
            console.log("Make sure your backend server is running on http://localhost:5000");
        }
    });
}
testServer().catch((error) => {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Test failed:", errorMessage);
});
