import express from "express";
const router = express.Router();
import {
  getTickets,
  getTicketsId,
  createTicket,
  deleteTicket,
  updateTicket,
} from "../controller/ticketController.js";

//(CRUD)
router.route("/")
  .get(getTickets)
  .post(createTicket);

router.route("/:id").get(getTicketsId).delete(deleteTicket).put(updateTicket);

export default router;
