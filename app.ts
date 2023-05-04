import express, {Express, Request, Response} from 'express';
import { connect } from 'mongoose';
import { ToDoModel } from './models/ToDoModel';

const app: Express = express();

app.use(express.json());

run().catch(err => console.log(err));

async function run() {
  try {
    // 4. Connect to MongoDB
    await connect('mongodb://127.0.0.1:27017/todolist');
  } catch (err) {
    console.log("db connection failed" + err);
  };
};

app.get("/todo", async (req: Request, res: Response) => {
  try {
    const todo = await ToDoModel.find();
    res.status(200).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something is wrong in server");
  }
});

app.post("/todo/create", async (req: Request, res: Response) => {
  try {
    const todo = new ToDoModel({
      text: 'buy a car',
      status: 'done',
    });
    await todo.save();

    console.log(todo.status);


    res.json(todo);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.put("/todo/update/:id/:newstatus", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const statusUpdate = req.params.newstatus;
    if ( statusUpdate === "todo" || statusUpdate === "done" || statusUpdate === "trash"){
      const updateData = await ToDoModel.findByIdAndUpdate(id, {status: statusUpdate}, {new: true});
      res.status(200).json(updateData);
    } else {
      res.status(406).send("Incorrect status");
    } 
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.delete("/todo/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const todo = await ToDoModel.findByIdAndDelete(id);
    res.status(200).send(" document deleted " );
  } catch (err) {
    console.error(err);
    res.status(500).send("Something is wrong in server");
  }
});



app.listen(8080, () => {
  console.log("server is running");
})