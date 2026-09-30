import Image from "next/image";
import type { Band } from "../types/band";

type Props = {
  band: Band;
  isFollowing: boolean;
  likeCount: number;
  onToggleFollow: (id: number) => void;
  onLike: (id: number) => void;
};

export default function BandCard({
  band,
  isFollowing,
  likeCount,
  onToggleFollow,
  onLike,
}: Props) {
  return (
    <article className="bandCard">
      <Image
        src={band.image}
        alt={band.name}
        width={400}
        height={250}
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      <h2>{band.name}</h2>
      <p>แนวเพลง: {band.genre}</p>
      <p>ประวัติย่อ: {band.info}</p>

      <button
        type="button"
        aria-pressed={isFollowing}
        onClick={() => onToggleFollow(band.id)}
      >
        {isFollowing ? "เลิกติดตาม" : "ติดตาม"}
      </button>

      <button type="button" onClick={() => onLike(band.id)}>
        Like {likeCount}
      </button>

      <h3>สมาชิก</h3>

      <ul>
        {band.members.map((member) => (
          <li key={member.name}>
            {member.name} - {member.role}
            <Image
              src={member.image}
              alt={member.name}
              width={150}
              height={150}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
