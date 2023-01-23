"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
// **** Load test env file **** //
var result2 = dotenv_1.default.config({
    path: "./env/test.env",
});
if (result2.error) {
    throw result2.error;
}
