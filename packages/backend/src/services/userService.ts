import { Database, DocumentCollection } from "arangojs";
import bcrypt from "bcryptjs";

function users(db: Database): DocumentCollection {
  return db.collection("users");
}

export async function createUserService(
  db: Database,
  input: { name: string; email: string; password: string },
) {
  const { name, email, password } = input;

  /* procura duplicado */
  const cursor = await db.query(
    `FOR u IN users FILTER u.email == @email LIMIT 1 RETURN u`,
    { email },
  );
  const exists = await cursor.next();
  if (exists) throw new Error("E-mail already in use");

  /* cria usuário */
  const hashed = await bcrypt.hash(password, 10);
  const meta = await users(db).save({ name, email, password: hashed });

  return { _key: meta._key, name, email };
}
