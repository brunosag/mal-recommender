export async function GET(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const token = params.get('token');
  const id = params.get('id');

  const url = `https://api.myanimelist.net/v2/anime/${id}?fields=media_type,recommendations,mean,genres,alternative_titles,start_season,related_anime,num_list_users`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    const anime = {
      id: data.id,
      title: { jp: data.title, en: data.alternative_titles.en },
      image: data.main_picture.large,
      media_type: data.media_type,
      mean: data.mean,
      year: data.start_season.year,
      genres: data.genres,
      members: data.num_list_users,
      related_anime: data.related_anime.map((relatedAnime) => ({
        anime_id: relatedAnime.node.id,
        relation_type: relatedAnime.relation_type,
      })),
      recommendations: data.recommendations.map((recommendation) => ({
        anime_id: recommendation.node.id,
        num_recommendations: recommendation.num_recommendations,
      })),
    };

    return Response.json(anime);
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
