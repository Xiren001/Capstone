import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import db from "../models/index.js";
const { User } = db;
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        // Ensure this is an access token, not a refresh token
        if (payload.type !== "access") {
          return done(null, false);
        }

        const user = await User.findByPk(payload.id);
        return done(null, user || false);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
