import userModel from "../models/user-model.js";
import genToken from "../utils/genToken.js";
import bcrypt from "bcrypt";

// Function to register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User has already registered!" });
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(400).json({ message: err.message });
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(400).json({ message: err.message });
        const user = await userModel.create({ name, email, password: hash });
        await user.save();
        res.status(200).json({message: "User registered!", user})
      });
    });
  } catch (error) {
    return res.status(500).json({message: error.message});
  };
};

// Function to login a user
export const loginUser = async ( req, res ) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});
        if (!user) return res.status(401).json({message: "Email or Password incorrect!"});
        bcrypt.compare( password, user.password, (err, result) => {
            if (err) return res.json({message: err.message});
            if (result) {
                let token = genToken(user);
                res.cookie("token", token);
                res.status(201).json({message: "Logged in!"});
            } else {
                res.status(401).json({message: "Email or Password incorrect!"})
            };
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

// Function to logout a user
export const logoutUser = ( req,res ) => {
    res.cookie("token", "");
    res.status(201).json({message: "Logged out successfully!"})
};


// Function to get a user
export const getUser = async ( req, res ) => {
    try {
        const user = await userModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({message: "User not found!"});
        } else {
           res.status(200).json(user);
           console.log(req.params.name);
           
        }  
    } catch (error) {
       res.status(500).json({message: error.message}); 
    }
};