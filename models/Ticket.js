const Sequelize = require("sequelize");
const db = require("../config/database");

const Ticket = db.define("ticket", {
  seat: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  bus_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  gender: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  full_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
},
{
  timestamps: false,
});

Ticket.sync().then(() => {
  console.log("table created");
});
module.exports = Ticket;
