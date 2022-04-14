/* eslint-disable @typescript-eslint/no-var-requires */
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './customGoogle.strategy';
import cors from 'cors';
import route from './route';

async function nestApp() {
  const app = express();

  app.use(
    session({ secret: 'Secret', resave: false, saveUninitialized: true }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    // to access from React or any other frontend FrameWork
    cors({
      credentials: true,
      origin: ['http://localhost:3000'],
    }),
  );

  app.use('/', route);

  app.listen(5000, () => {
    console.log('app listening on port 5000');
  });
}

nestApp();
