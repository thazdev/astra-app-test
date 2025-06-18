import { expect, it } from "vitest";
import { loginUser } from "../../services/authService";
import { hashPassword } from "../../services/userService";
import { db } from "../helpers";

it("rejects wrong password", async () => {
  const email = "u@t.dev";
  const pass = "123";

  await db
    .collection("users")
    .save({ email, password: await hashPassword(pass), name: "U" });
  await expect(loginUser(email, "wrong")).rejects.toThrow(
    /Credenciais inválidas/,
  );
});
