import passport from "passport";
import { jwtStrategy } from "../JWT/jwt.strategy.js";
import userModel from "../../models/user.model.js";





const initializedPassport = () => {
  passport.use("jwt", jwtStrategy);
};

export default initializedPassport;


