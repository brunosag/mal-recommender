export async function GET(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const token = params.get('token');

  const status = ['watching', 'completed', 'dropped'];

  let animeList = [];
  for (const entry of status) {
    const url = `https://api.myanimelist.net/v2/users/@me/animelist?status=${entry}&nsfw=true&limit=1000&fields=list_status,media_type,genres,mean,alternative_titles,num_list_users,start_season`;

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      const animeListStatus = data.data.map((anime) => {
        return {
          id: anime.node.id,
          title: { jp: anime.node.title, en: anime.node.alternative_titles.en },
          image: anime.node.main_picture.large,
          media_type: anime.node.media_type,
          mean: anime.node.mean,
          year: anime.node.start_season.year,
          genres: anime.node.genres,
          members: anime.node.num_list_users,
          status: anime.list_status.status,
          score: anime.list_status.score,
        };
      });

      animeList = animeList.concat(animeListStatus);
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  return Response.json(animeList);
}
