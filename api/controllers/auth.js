import handleUser from "../middlewars/user.js";
import emp from "../models/Employee.js";
import { comparePassword } from "../utils/bcryptControll.js";

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .send({ message: "username and password are required" });

    const user = await emp.findOne({ username });
    if (!user) return res.status(400).send({ message: "user not found" });
    const comparedPassword = await comparePassword(password, user.password);
    if (!comparedPassword)
      return res.status(400).send({ message: "password are incorrect" });

    const userHandled = handleUser(user);
    res.status(200).send({ user: userHandled });
  } catch (err) {
    console.log(err.message);
    return res.status(505).send({ message: "internal server error" });
  }
}
