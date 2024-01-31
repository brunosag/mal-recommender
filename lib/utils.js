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

export function calculatePoints({ votes, score, mean, members }) {
  const weightVotes = votes / members < 1 ? 1 : (votes / members) * Math.pow(10, 5);
  const weightScore = Math.pow(2, (score === 0 ? 7 : score) - 7);
  const weightMean = Math.pow(2, mean - 6);

  const points = weightVotes * weightScore * weightMean;

  return points;
}

export async function getData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function postData(url, body) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function patchData(url, body) {
  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}
