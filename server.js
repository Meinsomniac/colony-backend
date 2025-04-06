const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");

const server = http.createServer(app);

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.p3d0z.mongodb.net/tether")
  .then(() => console.log("Database connected Successfully"));

server.listen(8080, () => console.log("server is running on port 8080"));

const io = new Server(server, { cors: true });
io.on("connection", () => {
  console.log("Socket connected successfully!");
});
