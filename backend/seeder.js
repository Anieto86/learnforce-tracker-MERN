import mongoose from "mongoose";
import dotenv from "dotenv";
//todo data
import tickets from "./data/tickets.js";
// todo models
import Ticket from "./models/ticketsModels.js";
//todo connection to DB
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Ticket.deleteMany();
    await Ticket.insertMany(tickets);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Ticket.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
