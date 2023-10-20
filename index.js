const express = require("express");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const { createTables } = require("./models/tables");

app.use("/api", require("./routes/routes"));

let tablesCreated = false;

async function createTablesOnce() {
  if (!tablesCreated) {
    try {
      await createTables();

      tablesCreated = true;
    } catch (error) {
      console.error("Error creating tables:", error);
    }
  }
}

createTablesOnce()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error starting the server:", err);
  });
