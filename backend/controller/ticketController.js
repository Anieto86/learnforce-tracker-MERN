import asyncHandler from "express-async-handler";
import Ticket from "../models/ticketsModels.js";

const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({});
  console.log("tickets retrieved");
  res.json(tickets);
});

const getTicketsId = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404).json({ status: "404 Not Found" });
  }
});

const createTicket = asyncHandler(async (req, res) => {
  const { _id, title, client, crm , status } = req.body;
  const newTicket = new Ticket({
    _id: _id,
    title: title,
    client: client,
    crm: crm,
    status: status,
  });
  await newTicket.save();
  res.json({ newTicket });
});

const deleteTicket = asyncHandler(async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.json("Ticket Deleted");
  console.log("delete clicked");
});

const updateTicket = asyncHandler(async (req, res) => {
  await Ticket.findByIdAndUpdate(req.params.id, req.body);
  res.json("Ticket Update");
  console.log("update clicked");
});

export { getTickets, getTicketsId, createTicket, deleteTicket, updateTicket };

