import { connect } from 'mongoose';
import { ToDoModel } from './models/ToDoModel';


run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/todolist');

  const todo = new ToDoModel({
    text: 'acomplish my projects - todolist',
    status: 'trash',
  });
  await todo.save();

  console.log(todo.status); 
}