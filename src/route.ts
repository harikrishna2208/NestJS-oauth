import { Router } from 'express';
import passport from 'passport';

const mainRouter = Router();

function isLoggedIn(req: any, res: any, next: any) {
  req.user ? next() : res.sendStatus(401);
}

mainRouter.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

mainRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

mainRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure',
  }),
);

mainRouter.get('/protected', isLoggedIn, (req, res) => {
  res.send({ Email: req.user['email'], Name: req.user['displayName'] });
});

mainRouter.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy(() => {
    console.log('session cleared');
  });
  res.send('logged out');
});

mainRouter.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

export default mainRouter;
