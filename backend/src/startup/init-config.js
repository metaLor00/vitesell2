import config from "config";

const initConfig = () => {
  // Check for JWT secret
  if (!config.get("jwtPrivateKey")) {
    throw new Error(
      "FATAL ERROR: JWT secret (JWT_PRIVATE_KEY) is not defined."
    );
  }
};
export default initConfig;
