import { model } from 'mongoose';
import { IToDoList } from '../interfaces/IToDo';
import { toDoListSchema } from '../schemas/ToDoSchema';

// 3. Create a Model.
export const ToDoModel = model<IToDoList>('ToDoModel', toDoListSchema);


