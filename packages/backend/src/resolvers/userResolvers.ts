import { loginUser } from "../services/authService";
import { createUserService } from "../services/userService";

export const userResolvers = {
  Mutation: {
    createUser: (_: unknown, { input }: any, { db }: any) =>
      createUserService(db, input),
    login: (_: unknown, { input }) => loginUser(input.email, input.password),
  },
};
