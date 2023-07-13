const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

// Configure middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle routes
app.use(routes);

// Start server to listen to the requests
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}!`);
  });
});
