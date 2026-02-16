const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./database/db");
const router = require("./routes/userRoutes");
const router2 = require("./routes/productRoutes");
const cors = require("cors");

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/api/users", router);
app.use('/api/product',router2)



app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
