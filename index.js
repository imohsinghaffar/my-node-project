import express from "express";
const app = express();
const PORT = 8000;
import todoRoutes from './routes/todoRoutes.js'
app.use(express.json());

app.use('/', todoRoutes);

app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
