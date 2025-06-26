import { api } from "../../lib/axios";
import { getItem, removeItem, setItem } from "../../storage/localStorage";
import { AUTH_TOKEN_STORAGE } from "../../storage/storageConfig";

type SignUpRequest = {
  name: string;
  email: string;
  birthday: Date;
  password: string;
  password_confirmation: string;
};

async function signIn(email: string, password: string) {
  try {
    const { data } = await api.post("/signin", {
      email,
      password,
    });

    await setItem(AUTH_TOKEN_STORAGE, data.token);

    return data;
  } catch (error) {
    throw error;
  }
}

async function signUp(data: SignUpRequest) {
  try {
    await api.post("/signup", data);
  } catch (error) {
    throw error;
  }
}

async function signOut() {
  try {
    await removeItem(AUTH_TOKEN_STORAGE);
  } catch (error) {
    throw error;
  }
}

async function getAuthToken() {
  const token = getItem(AUTH_TOKEN_STORAGE);

  return token;
}

export { SignUpRequest, signIn, signUp, signOut, getAuthToken };
