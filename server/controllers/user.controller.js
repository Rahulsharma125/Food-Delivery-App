import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {
  //   console.log(req.body);
  //   res.send("registered successfully!");
  const { name, email, password, location } = req.body;
    console.log(req.body);
    
  // console.log(name);
  // console.log(email);

  if (!name || !email || !password || !location) {
    return res.status(400).send("All fields are required!");
  }

  const existingUser = await User.findOne({ email });

  // console.log(existingUser);

  if (existingUser) {
    return res.status(409).send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // console.log("Password hashed successfully!");

  const createdUser = await User.create({
    name,
    email,
    password: hashedPassword,
    location,
  });
  return res.status(201).send("User registered successfully!");
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  if( !email || !password){
    return res.status(400).send("Email and password are required!");
  }
  const checkEmail = await User.findOne({ email });
  if( !checkEmail ){
    return res.status(404).send("Invalid email!"); 
  }
  const checkPassword = await bcrypt.compare(password, checkEmail.password);
  if( !checkPassword ){
    return res.status(401).send("Invalid password!");
  }
  const token = jwt.sign(
    {
      userId: checkEmail._id,
    },
    process.env.JWT_SECRET,
  );
  return res.status(200).json({
    message: "User logged in seccessfully!",
    token
  })
}

async function getProfile(req, res){
  const user = await User.findById(req.user.userId).select("-password");
  if (!user) {
    return res.status(404).send("user doesn't exists!");
  }
  return res.status(200).json({
    message: "User profile fetched successfully!",
    user
  });
}
export { registerUser, loginUser, getProfile };