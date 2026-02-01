import { User } from '../models/User.js';

export const getUsers = async (req, res, url) => {
  const email = url.searchParams.get("email");
  const password = url.searchParams.get("password");
  const filter = {};
  if (email) filter.email = email;
  if (password) filter.password = password;

  const users = await User.find(filter);
  res.writeHead(200);
  res.end(JSON.stringify(users));
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