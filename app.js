const express = require("express");
const app = express();
const db = require("./config/database");
const exercisesRoutes = require("./routes/exercises");

require("dotenv").config();

db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to database:", err));

app.use(express.json());

app.use("/exercises", exercisesRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
