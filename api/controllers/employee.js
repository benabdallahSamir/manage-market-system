import Employee from "../models/Employee.js";
import handleUser from "../middlewars/user.js";
import { hashPassword } from "../utils/bcryptControll.js";

export async function getUsers(req, res) {
  try {
    let users = await Employee.find();
    users = users.map((user) => handleUser(user));
    res.status(200).send({ users });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
}

export async function addUser(req, res) {
  try {
    const { password, username, role } = req.body;
    console.log(req.body)
    const userExist = await Employee.findOne({ username });
    if (userExist)
      return res.status(400).send({ message: "username are exist" });
    console.log(password)
    const hashingPassword = await hashPassword(password);
    let newUser = await new Employee({
      username,
      password: hashingPassword,
    }).save();
    newUser = handleUser(newUser);
    return res.status(200).send({ user: newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
}
export async function updateUser(req, res) {}
