const CONSTANTS = require("./CONSTANTS");
const sequelize = require("sequelize");


module.exports ={
  
  getTicketAttributes: (attributes=["id","seat","gender","bus_id","full_name","age","status"])=>{

    let attributeObj={
      id:"id",
    seat:"seat",
    gender:[
      sequelize.literal(
        `CASE WHEN gender = 1 THEN '${
          CONSTANTS.gender.retrievalMap[1]
        }' WHEN gender = 2 THEN '${
          CONSTANTS.gender.retrievalMap[2]
        }' WHEN gender = 3 THEN '${
          CONSTANTS.gender.retrievalMap[3]
        }' ELSE '${null}' END`
      ),
      "gender",
    ], // literal to fill values for the constant place holders
    bus_id:"bus_id",
    full_name:"full_name",
    age:"age",
    status:[
      sequelize.literal(
        `CASE WHEN status = 1 THEN '${
          CONSTANTS.status.retrievalMap[1]
        }' WHEN status = 2 THEN '${
          CONSTANTS.status.retrievalMap[2]
        }' ELSE '${null}' END`
      ),
      "status",
    ]
    }

    return attributes.reduce((accumulator, currentValue) => {
      if(attributeObj[currentValue]){
        accumulator.push(attributeObj[currentValue])
      }
      return accumulator
    },
    [])
  }
   
}