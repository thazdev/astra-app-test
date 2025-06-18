import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../tests/helpers";

const users = () => db.collection("users");
const SECRET = "super-secret";

export async function loginUser(email: string, password: string) {
  const query = `
    FOR u IN users FILTER u.email == @email LIMIT 1 RETURN u
  `;
  const cursor = await db.query(query, { email });
  const user = await cursor.next();
  if (!user) throw new Error("Credenciais inválidas");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Credenciais inválidas");

  const token = jwt.sign({ sub: user._key }, SECRET, { expiresIn: "1h" });
  return {
    token,
    user: { _key: user._key, name: user.name, email: user.email },
  };
}
