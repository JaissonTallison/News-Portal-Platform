import { rateLimit } from "./rate-limit";

//  login (mais sensível)
export const loginRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 5,
});

//  posts
export const postRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});