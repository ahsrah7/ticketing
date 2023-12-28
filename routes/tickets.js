const express = require('express');
const router = express.Router();

const TicketController = require('../controllers/TicketController');


// Update the ticket status (open/close + adding user details)
router.put(
  '/tickets/:seat',
  async (req,res)=>{await TicketController.updateTicketStatus(req,res)}
  );

// get the ticket status 
router.get(
  '/ticket/status/:seat',
  async (req,res)=>{
    req.body.attributes = ["status"] 
    await TicketController.getTicketDetails(req,res)
  }
  );

 // View all closed tickets
router.get('/closed-tickets', 
async (req,res) => { 
  req.body.status = 'close'
  await TicketController.getTickets(req,res);
}
);

 // View all open tickets
 router.get('/open-tickets', 
 async (req,res) => { 
   req.body.status = 'open'
   await TicketController.getTickets(req,res);
 }
 );

// Additional API for admin to reset the server (opens up all the tickets)
router.post('/admin/reset',
async (req,res) => { await TicketController.resetTickets(req,res)}
)

// View Details of the person owning the ticket
router.get('/ticket-details/:seat',
async (req,res) => { 
  req.body.attributes = ["full_name","status","gender","age"]
  await TicketController.getTicketDetails(req,res);
}
);

module.exports = router;