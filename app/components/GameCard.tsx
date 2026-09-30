import Link from "next/link";
import type { Game } from "../types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: () => void;
};

export default function GameCard({ game, onEdit, onDelete, onStatusChange }: GameCardProps) {
  return (
    <article className="gameCard">
      <h2><Link href={`/games/${game.id}`}>{game.name}</Link></h2>
      <p>แพลตฟอร์ม: {game.platform}</p>
      <p>จำนวนชั่วโมง: {game.hours} ชั่วโมง</p>
      <p>สถานะ: {game.status}</p>
      <button type="button" onClick={onStatusChange}>เปลี่ยนสถานะ</button>
      <button type="button" onClick={onEdit}>แก้ไข</button>
      <button type="button" onClick={onDelete}>ลบ</button>
    </article>
  );
}
