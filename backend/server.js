//*entry point  for the backend
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import _ from 'lodash'; 
import cors from 'cors';
//*daba connections
import connectDB from './config/db.js'
//todo import routes
import ticketRoutes from './routes/ticketRouter.js' 

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//data source
//import tickets from './data/tickets.js';

//*Routes
app.get('/', (req, res) => {
    res.send ("Api is running")
})

//Ticket route 
app.use('/api/tickets', ticketRoutes )

//*setup server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });


