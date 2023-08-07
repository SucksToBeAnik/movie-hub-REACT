import { pb } from "./database";

export async function signinWithUsername(user) {
  try {
    await pb.collection("users").authWithPassword(user.username, user.password);
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function createUserWithUsername(user) {
  try {
    const newUser = await pb.collection("users").create({
      username: user.username,
      password: user.password,
      passwordConfirm: user.confirmPassword,
    });

    const newProfile = await pb.collection("profiles").create({
      username: newUser.username,
      user: newUser.id
    });
  } catch (e) {
    
    if (e?.response?.data?.username) {
      throw new Error(e.response.data.username.message);
    } else {
      throw new Error(e.message);
    }
  }
}


