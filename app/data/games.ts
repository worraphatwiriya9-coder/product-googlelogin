import type { Game } from "../types/game";

export const games: Game[] = [
  {
    id: "game-1",
    name: "Grand Theft Auto V",
    platform: "PC",
    hours: 80,
    status: "กำลังเล่น",
  },
  {
    id: "game-2",
    name: "Valorant",
    platform: "PC",
    hours: 120,
    status: "กำลังเล่น",
  },
  {
    id: "game-3",
    name: "Minecraft",
    platform: "PC",
    hours: 60,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "game-4",
    name: "Red Dead Redemption 2",
    platform: "PC",
    hours: 50,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "game-5",
    name: "The Last of Us Part I",
    platform: "PS5",
    hours: 15,
    status: "เล่นจบแล้ว",
  },
];
