import { User } from '../models/User.js';

export const checkUserExists = async (req, res, email) => {
  try {
    const user = await User.findOne({ email });
    res.writeHead(200);
    res.end(JSON.stringify({ exists: !!user }));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: "Error checking user" }));
  }
};

export const loginUser = async (req, res, body) => {
  const { email, password } = body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.writeHead(200);
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(401);
      res.end(JSON.stringify({ message: "Invalid email or password" }));
    }
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: "Server error" }));
  }
};

export const createUser = async (req, res, body) => {
  try {
    const newUser = new User(body);
    const savedUser = await newUser.save();
    res.writeHead(201);
    res.end(JSON.stringify(savedUser));
  } catch (error) {
    res.writeHead(400);
    res.end(JSON.stringify({ message: error.message }));
  }
};