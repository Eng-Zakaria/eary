const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));
app.use(cors());
const db = require("./db/dbConnection");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRouter");
const examsAppRouter = require("./routes/exam-routes/route-application");
const examsManageRouter = require("./routes/exam-routes/router-manage");

app.use("/api/exams", examsAppRouter);
app.use("/api/exams/manage", examsManageRouter);

app.use("/users", userRouter);
app.use("/auth", authRouter);



const port = 4000;
app.listen(port, "localhost", () => {
    console.log(`Server is running on port ${port}`);
  
});