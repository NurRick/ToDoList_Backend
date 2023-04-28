import { Schema } from 'mongoose';
import { IToDoList } from '../interfaces/IToDo';

// 2. Create a Schema corresponding to the document interface.
export const toDoListSchema = new Schema<IToDoList>({
    text: { type: String, required: true },
    status: { type: String,enum:["todo", "done", "trash"], required: true },
  });