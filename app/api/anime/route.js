export async function GET(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const token = params.get('token');
  const id = params.get('id');

  const url = `https://api.myanimelist.net/v2/anime/${id}?fields=recommendations,mean,genres,alternative_titles,start_season,related_anime`;

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
      mean: data.mean,
      genres: data.genres,
      year: data.start_season.year,
      recommendations: data.recommendations,
      hasPrequel: data.related_anime.some((item) =>
        ['prequel', 'parent_story', 'full_story'].includes(item.relation_type)
      ),
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
