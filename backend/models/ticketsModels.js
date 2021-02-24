import mongoose from 'mongoose'

const ticketSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
    client: {
        type: String,
        required: true,
      },
    crm: {
        type: String,
        required: true,
      },
    status: {
        type: String,
        required: true,
      },
},
    {
        timestamps:true
    }
)

const Ticket = mongoose.model("Ticket", ticketSchema)

export default Ticket
