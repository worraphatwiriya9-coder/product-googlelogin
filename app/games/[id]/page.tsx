import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games } from "../../data/games";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { id } = await params;
  const game = games.find((item) => item.id === id);
  return { title: game ? game.name : "ไม่พบเกม" };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const game = games.find((item) => item.id === id);

  if (!game) notFound();

  return (
    <main>
      <article className="gameDetail">
        <h1>{game.name}</h1>
        <p>แพลตฟอร์ม: {game.platform}</p>
        <p>จำนวนชั่วโมง: {game.hours} ชั่วโมง</p>
        <p>สถานะ: {game.status}</p>
      </article>
    </main>
  );
}
