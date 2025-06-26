// config/jwt.strategy.js
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userModel from "../../models/user.model.js";
import config from "../index.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET
};

export const jwtStrategy = new JwtStrategy(options, async (jwt_payload, done) => {
  try {
    const user = await userModel.findById(jwt_payload.id);
    if (!user) return done(null, false);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
