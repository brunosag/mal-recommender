export async function GET(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const token = params.get('token');

  const url = `https://api.myanimelist.net/v2/users/@me/animelist?status=completed&limit=1000&fields=list_status,genres,mean,alternative_titles`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    const animelist = data.data.map((anime) => {
      return {
        id: anime.node.id,
        title: anime.node.alternative_titles.en ?? anime.node.title,
        image: anime.node.main_picture.large,
        score: anime.list_status.score,
        mean: anime.node.mean,
        genres: anime.node.genres,
      };
    });

    return Response.json(animelist);
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
