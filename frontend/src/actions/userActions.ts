"use server";

import { createServerAction } from "./createServerAction";

interface CreateUserInput {
mobile: string;
roles?: [string];
password: string;
}

export const createUser = createServerAction<CreateUserInput, { success: boolean }>(
  async (data) => {
    // simulate DB logic
    console.log("Creating user with data:", data);
    return { success: true };
  },
  {
    validate(data) {
        if (!data.mobile || !data.roles || !data.password) {
            throw new Error("All fields are required");
        }   
    },
    onError(error) {
      console.error("Server Action Error:", error);
      throw new Error("Unable to create user");
    }
  }
);
