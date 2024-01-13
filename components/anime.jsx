import Image from 'next/image';
import Link from 'next/link';

export default function Anime({ anime, points }) {
  if (!anime) return null;

  const MALUrl = `https://myanimelist.net/anime/${anime.id}`;

  return (
    <div className="rounded-md flex justify-between p-2 border gap-5">
      <div className="flex gap-4">
        <Link href={MALUrl} target="_blank">
          <Image src={anime.image} alt={anime.title} width="0" height="0" sizes="100vw" className="w-24 h-auto rounded-md" />
        </Link>
        <div className="flex flex-col justify-center gap-1">
          <Link href={MALUrl} target="_blank">
            <span className="text-xl font-semibold">{anime.title}</span>
          </Link>
          <span className="text-foreground/50 text-xs">
            {anime.genres
              .map((genre, index) => (index === anime.genres.length - 1 ? genre.name : `${genre.name}, `))
              .join('')}
          </span>
          <span className="text-xs font-semibold">{anime.mean}</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mr-4">
        <span className="text-2xl/[1] font-bold">{Math.round(points)}</span>
        <span className="text-foreground/50 text-sm"> points</span>
      </div>
    </div>
  );
}
