"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDoListSchema = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
exports.toDoListSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    status: { type: String, enum: ["todo", "done", "trash"], required: true },
});
