const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const propertyRoute = require("./routes/properties");
const uploadTenantRoute = require("./routes/uploadTenant");
const reportRoute = require("./routes/reportModel");
const currentJobRoute = require("./routes/currentJob");
const BiddingRoute = require("./routes/bidding");
const taskRoute = require("./routes/task");
const taskDocumentsRoute = require("./routes/taskDocuments");

// express app initialization
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "hello.jpeg");
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/properties", propertyRoute);
app.use("/api/uploadTenants", uploadTenantRoute);
app.use("/api/reports", reportRoute);
app.use("/api/currentJobs", currentJobRoute);
app.use("/api/biddings", BiddingRoute);
app.use("/api/taskDocuments", taskDocumentsRoute);

app.use("/", (req, res) => res.send("Hello World!"));
app.listen(3500, () => {
  console.log("app listening at port 3500");
});
