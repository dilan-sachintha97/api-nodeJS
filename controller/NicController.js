const {request, response} = require("express");

const convertNIC = (request, response) => {
    const nicNumber = request.body.nic;
    // Implement the NIC conversion logic here
    // Extract birthday and gender from the NIC number
    // Example: const { birthday, gender } = convertNICNumber(nicNumber);
  
    // Placeholder response for now
    const birthday = '1990-01-01';
    const gender = 'Male';
  
    // Return the result
    response.status(200).json({ birthday, gender });
  };
  

module.exports= {convertNIC}