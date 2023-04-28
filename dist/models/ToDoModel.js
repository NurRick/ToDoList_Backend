"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoModel = void 0;
const mongoose_1 = require("mongoose");
const ToDoSchema_1 = require("../schemas/ToDoSchema");
// 3. Create a Model.
exports.ToDoModel = (0, mongoose_1.model)('ToDoModel', ToDoSchema_1.toDoListSchema);
