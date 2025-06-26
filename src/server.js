import express from "express";
import config from "./config/index.js";
import sessionRouter from "./routes/session.router.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";
import hbs from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializedPassport from "./config/passport/config.js";
import cartsRouter from "./routes/carts.router.js";

const { PORT, MONGO_URI } = config;
const server = express();

server.engine("handlebars", hbs.engine());
server.set("views", import.meta.dirname + "/views");
server.set("view engine", "handlebars");

server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

initializedPassport();
server.use(passport.initialize());

server.use("/", viewsRouter);
server.use("/api/carts", cartsRouter);
server.use("/api/sessions", sessionRouter);
server.use("/api/users", usersRouter);



server.listen(PORT, () => console.log(`listening on port ${PORT}`))

mongoose.connect(MONGO_URI, { dbName: "integrative_practice" })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error({ error: err.message })
    process.exit(1)
  })