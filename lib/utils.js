import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function calculatePoints({ votes, score, mean }) {
  const w_v = Math.log(votes);
  const w_s = Math.pow(2, score - 7);
  const w_m = Math.pow(2, mean - 6);

  const points = w_v * w_s * w_m;

  return points;
}
