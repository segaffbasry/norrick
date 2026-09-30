// Where "Log in" and "Join Norrick" go. Norrick's own /login and /signup pages
// are design previews with no auth behind them, so every link on the site
// points at the working sign-in on the live product until Norrick auth ships.
// When it does, switch these to "/login", "/signup" and "/forgot-password" and
// remove the noindex from app/login and app/signup.
export const authLinks = {
  signIn: "https://umdb.org/auth/signin",
  signUp: "https://umdb.org/auth/signup",
  forgotPassword: "https://umdb.org/auth/forgot-password",
} as const;
