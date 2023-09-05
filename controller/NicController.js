const convertNIC = (req, res) => {
    const nicNumber = req.body.nic;

    // Check if the NIC number is valid for both old and new formats
    if (!/^(\d{9}[VvXx]|[\d]{12}|[0-9]{9}[vVxX]|[0-9]{12})$/.test(nicNumber)) {
        res.status(500).json({ "message":"ID number is invalid"});
        return;
    }

    let year, days, genderCode;

    if (nicNumber.length === 12) {
        // New NIC format 
        year = parseInt(nicNumber.substr(0, 4));
        days = parseInt(nicNumber.substr(4, 3));
        genderCode = parseInt(nicNumber.charAt(9));
    } else if (nicNumber.length === 10) {
        // Old NIC format 
        year = parseInt(nicNumber.substr(0, 2));
        days = parseInt(nicNumber.substr(2, 3));
        genderCode = parseInt(nicNumber.charAt(4));
    }else{
        res.status(500).json({ "message":"ID number is invalid"});
    }

    let gender = "";

    if (genderCode < 500) {
        gender = "Male";
    } else {
        gender = "Female";
    }

    // Calculate the birth year based on the gender code
    if (genderCode < 500 && year >= 0 && year <= 99) {
        year += 1900;
    } else if (genderCode >= 500 && year >= 0 && year <= 99) {
        year += 2000;
    }

    const birthDate = new Date(year, 0, days);
    const birthday = birthDate.toISOString().slice(0, 10);

    res.status(200).json({ birthday, gender });
};

module.exports = { convertNIC };
