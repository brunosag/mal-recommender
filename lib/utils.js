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

export function rateLimitExceeded(response) {
  return typeof response === 'undefined' || 'message' in response;
}

export function hasPrequel(anime) {
  return anime.related_anime.some((relatedAnime) =>
    ['prequel', 'parent_story', 'full_story'].includes(relatedAnime.relation_type)
  );
}

export function formatUserAnimeRecommendations(animeRecommendations) {
  return animeRecommendations.length !== 0
    ? animeRecommendations
        .map((anime) => ({
          anime_id: anime.anime_id,
          title: anime.title,
          image: anime.image,
          media_type: anime.media_type,
          mean: anime.mean,
          year: anime.year,
          genres: anime.genres,
          members: anime.members,
          points: anime.points * anime.related_anime.length,
          related_anime: anime.related_anime,
        }))
        .sort((a, b) => b.points - a.points)
    : [];
}

export function formatMediaType(mediaType) {
  if (mediaType === 'tv') return 'TV';
  if (mediaType === 'tv_special') return 'TV Special';
  if (mediaType === 'movie') return 'Movie';
  if (mediaType === 'ova') return 'OVA';
  if (mediaType === 'ona') return 'ONA';
  if (mediaType === 'special') return 'Special';
  if (mediaType === 'music') return 'Music';
  return mediaType;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sortAnimeRecommendationsList(animeRecommendationsList, sortType) {
  if (sortType.has('points')) return animeRecommendationsList.sort((a, b) => b.points - a.points);
  if (sortType.has('title')) return animeRecommendationsList.sort((a, b) => a.title.jp.localeCompare(b.title.jp));
  if (sortType.has('mean')) return animeRecommendationsList.sort((a, b) => b.mean - a.mean);
  if (sortType.has('members')) return animeRecommendationsList.sort((a, b) => b.members - a.members);
  return animeRecommendationsList;
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
