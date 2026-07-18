const bcrypt = require("bcrypt");


const register = async (req, res) => {
  const {email, password, phone, role} = req.body
  const hashedPassword = await bcrypt.hash(password,10);
  
};

module.register = register;
