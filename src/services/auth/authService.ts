import * as authResource from "./authResource";

async function signIn(email: string, password: string) {
  const data = await authResource.signIn(email, password);

  return data;
}

async function signUp(data: authResource.SignUpRequest) {
  await authResource.signUp(data);
}

async function signOut() {
  await authResource.signOut();
}

async function getAuthToken() {
  const token = authResource.getAuthToken();

  return token;
}

export { signIn, signUp, signOut, getAuthToken };
