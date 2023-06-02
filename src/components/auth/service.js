import client, {
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";

export const login = credentials => {
  return client.post("/api/auth/login", credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    if (credentials.rememberMe) storage.set("auth", accessToken);
  });
};

export const logout = async () => {
  removeAuthorizationHeader();
  storage.remove("auth");
  await Promise.resolve();
};
