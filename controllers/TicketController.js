const CONSTANTS = require("../CONSTANTS");
const Ticket = require("../models/Ticket");
const { z } = require("zod");
const { getTicketAttributes } = require("../util");


const TicketController = {

  updateTicketStatus: async (req, res) => {
    try {
      const  seat  = parseInt(req.params.seat);
      const { status, full_name, age, gender } = req.body;
      const schema = z.object({
        vstatus: z.number().int(),
        vseat: z.number().int().gte(1).lte(40),
        vfull_name: z
          .string()
          .max(150, { message: "Must be 150 or fewer characters long" }),
        vage: z.number().int(),
        vgender: z.number().int(),
      });
      const { vstatus, vfull_name, vage, vgender, vseat } = schema.parse({
        vseat:seat,
        vstatus: CONSTANTS.status.inputMap[status.toLowerCase()],
        vfull_name:full_name,
        vage:age,
        vgender: CONSTANTS.gender.inputMap[gender.toLowerCase()],
      });
      const updatedRow = await Ticket.update(
        { status: vstatus, full_name: vfull_name, age: vage, gender: vgender },
        { where: { seat: vseat } }
      );

      if (!updatedRow) {
        return res
          .status(404)
          .send({ error: "Ticket not found or already closed" });
      }

      console.info(
        `Ticket ${seat} updated - Status: ${status}
        )}`
      );
      res.status(200).send({ message: "Ticket updated successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: JSON.parse(error?.message) || "Internal Server Error" });
    }
  },

  
  getTickets : async (req, res) => {  
    try {
      const {status} = req.body;
      const schema = z.object({
        vstatus: z.number().int(),
      });
      const { vstatus} = schema.parse({
        vstatus: CONSTANTS.status.inputMap[status.toLowerCase()],
      });
      const closedTickets = await Ticket.findAll({ 
        attributes: getTicketAttributes(),
        where: { status: vstatus }
       });
      res.status(200).send({data:closedTickets});
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: JSON.parse(error?.message) ||'Internal Server Error' });
    }
  },

resetTickets : async (req, res) => {
  try {
    // Reset all tickets to 'open' status
    await Ticket.update({ status: CONSTANTS.status.inputMap.open,full_name:'',age:null,gender:0  }, { where: {} });
   
    res.status(200).send({ message: 'Server reset successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({error : 'Internal Server Error' });
  }
},

 getTicketDetails : async (req, res) => {
  try {
    const  seat  = parseInt(req.params.seat);
    const schema = z.object({
      vseat:z.number().int().gte(1).lte(40),
    });
    const { vseat} = schema.parse({
      vseat: seat,
    });
    const attributes = req.body.attributes;
    const ticket = await Ticket.findOne({ attributes:getTicketAttributes(attributes),where: { seat:vseat } });

    if (!ticket) {
      return res.status(404).send({ error: 'Ticket not found or not closed' });
    }

    res.status(200).send(ticket);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: JSON.parse(error?.message) ||'Internal Server Error' });
  }
}

};
module.exports = TicketController;
