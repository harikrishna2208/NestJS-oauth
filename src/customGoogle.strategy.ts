import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '674207711117-hq7hna7rsijjv1eshrdp9jganbdkejgd.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5000/auth/google/callback',
      passReqToCallback: true,
    },
    function (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: (arg0: any, arg1: any) => any,
    ) {
      return done(null, profile);
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
