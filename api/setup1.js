import { hashPassword } from "./utils/bcryptControll.js";

async function setup() {
  console.log("first");
  console.log(await hashPassword("admin"));
}

setup();
