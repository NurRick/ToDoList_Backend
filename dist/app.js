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
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const ToDoModel_1 = require("./models/ToDoModel");
const app = (0, express_1.default)();
app.use(express_1.default.json());
run().catch(err => console.log(err));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 4. Connect to MongoDB
            yield (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/todolist');
        }
        catch (err) {
            console.log("db connection failed" + err);
        }
        ;
    });
}
;
app.get("/todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield ToDoModel_1.ToDoModel.find();
        res.status(200).json(todo);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something is wrong in server");
    }
}));
app.post("/todo/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = new ToDoModel_1.ToDoModel({
            text: 'buy a car',
            status: 'done',
        });
        yield todo.save();
        console.log(todo.status);
        res.json(todo);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}));
app.put("/todo/update/:id/:newstatus", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const statusUpdate = req.params.newstatus;
        if (statusUpdate === "todo" || statusUpdate === "done" || statusUpdate === "trash") {
            const updateData = yield ToDoModel_1.ToDoModel.findByIdAndUpdate(id, { status: statusUpdate }, { new: true });
            res.status(200).json(updateData);
        }
        else {
            res.status(406).send("Incorrect status");
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}));
app.delete("/todo/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const todo = yield ToDoModel_1.ToDoModel.findByIdAndDelete(id);
        res.status(200).send(" document deleted ");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something is wrong in server");
    }
}));
app.listen(8080, () => {
    console.log("server is running");
});
