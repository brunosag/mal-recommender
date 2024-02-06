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

export function formatYearInterval(yearInterval, minYear, maxYear) {
  if (yearInterval.initial_year === minYear && yearInterval.final_year === maxYear) return 'Year';
  return yearInterval.initial_year.toString() + ' – ' + yearInterval.final_year.toString();
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function sortAnimeRecommendationsList(animeRecommendationsList, sortType) {
  if (sortType.has('points')) return animeRecommendationsList.sort((a, b) => b.points - a.points);
  if (sortType.has('title')) return animeRecommendationsList.sort((a, b) => a.title.jp.localeCompare(b.title.jp));
  if (sortType.has('mean')) return animeRecommendationsList.sort((a, b) => b.mean - a.mean);
  if (sortType.has('members')) return animeRecommendationsList.sort((a, b) => b.members - a.members);
  return animeRecommendationsList;
}

function intersection(setA, setB) {
  return new Set([...setA].filter((x) => setB.has(x)));
}

function filterAnimeRecommendationsList(animeRecommendationsList, filters, filtersCollections) {
  let filteredAnimeRecommendationsList = [];

  // Filter by genres (intersection)
  const filteredGenres = filtersCollections.genres.filter((genre) => {
    return filters.genres.has(genre.genre_id.toString());
  });

  let allFilteredAnimeIdsSet = new Set([...animeRecommendationsList.map((anime) => anime.anime_id)]);
  for (const genre of filteredGenres) {
    const animeIdsGenreSet = new Set([...genre.anime_ids]);
    allFilteredAnimeIdsSet = intersection(allFilteredAnimeIdsSet, animeIdsGenreSet);
  }

  // Filter by media types (intersection)
  const filteredMediaTypes = filtersCollections.media_types.filter((mediaType) => {
    return filters.media_types.has(mediaType.media_type);
  });

  for (const mediaType of filteredMediaTypes) {
    const animeIdsMediaTypeSet = new Set([...mediaType.anime_ids]);
    allFilteredAnimeIdsSet = intersection(allFilteredAnimeIdsSet, animeIdsMediaTypeSet);
  }

  // Filter by years (intersection)
  filteredAnimeRecommendationsList = animeRecommendationsList.filter((anime) =>
    allFilteredAnimeIdsSet.has(anime.anime_id)
  );

  console.log(allFilteredAnimeIdsSet);
  console.log(filteredAnimeRecommendationsList);
  const filteredYears = filters.years;
  if (filteredYears) {
    filteredAnimeRecommendationsList = filteredAnimeRecommendationsList.filter(
      (anime) => anime.year >= filteredYears.initial_year && anime.year <= filteredYears.final_year
    );
  }
  return filteredAnimeRecommendationsList;
}

export function prepareAnimeRecommendationsList({ animeRecommendationsList, filters, filtersCollections, sortType }) {
  const filteredAnimeRecommendationsList = filterAnimeRecommendationsList(
    animeRecommendationsList,
    filters,
    filtersCollections
  );

  return sortAnimeRecommendationsList(filteredAnimeRecommendationsList, sortType);
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
