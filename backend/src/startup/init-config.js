import config from "config";

const initConfig = () => {
  // Check for JWT secret
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: JWT secret(vitesell_JWTSECRET) is not defined.");
  };
};          
export default initConfig;