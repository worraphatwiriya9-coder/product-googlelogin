"use client";

import { useState } from "react";
import GameCard from "./GameCard";
import GameForm, { type GameDraft } from "./GameForm";
import type { Game, GameStatus } from "../types/game";

type GameExplorerProps = {
  initialGames: Game[];
};

const statuses: (GameStatus | "ทั้งหมด")[] = ["ทั้งหมด", "ยังไม่เริ่ม", "กำลังเล่น", "เล่นจบแล้ว"];

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  const [gameList, setGameList] = useState<Game[]>(initialGames);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<GameStatus | "ทั้งหมด">("ทั้งหมด");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function handleSave(draft: GameDraft) {
    if (editingId) {
      setGameList((prev) =>
        prev.map((game) =>
          game.id === editingId
            ? { ...game, name: draft.name.trim(), platform: draft.platform, hours: Number(draft.hours), status: draft.status }
            : game
        )
      );
      setEditingId(null);
      return;
    }

    setGameList((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: draft.name.trim(),
        platform: draft.platform,
        hours: Number(draft.hours),
        status: draft.status,
      },
    ]);
  }

  function handleDelete() {
    if (!deleteId) return;
    setGameList((prev) => prev.filter((game) => game.id !== deleteId));
    setDeleteId(null);
  }

  function handleStatusChange(id: string) {
    const order: GameStatus[] = ["ยังไม่เริ่ม", "กำลังเล่น", "เล่นจบแล้ว"];
    setGameList((prev) =>
      prev.map((game) => {
        if (game.id !== id) return game;
        const next = order[(order.indexOf(game.status) + 1) % order.length];
        return { ...game, status: next };
      })
    );
  }

  const visibleGames = gameList.filter((game) => {
    const matchesKeyword = game.name.toLowerCase().includes(keyword.trim().toLowerCase());
    const matchesStatus = statusFilter === "ทั้งหมด" || game.status === statusFilter;
    return matchesKeyword && matchesStatus;
  });

  const notStartedHours = gameList
    .filter((game) => game.status === "ยังไม่เริ่ม")
    .reduce((total, game) => total + game.hours, 0);

  const editingGame = gameList.find((game) => game.id === editingId) ?? null;

  return (
    <div>
      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      <div className="gameTools">
        <label htmlFor="game-search">ค้นหาเกม</label>
        <input
          id="game-search"
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="ค้นหาชื่อเกม"
        />

        <label htmlFor="game-status-filter">กรองตามสถานะ</label>
        <select
          id="game-status-filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as GameStatus | "ทั้งหมด")}
        >
          {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>

        <p>จำนวนชั่วโมงรวมของเกมที่ยังไม่เริ่ม: {notStartedHours} ชั่วโมง</p>
      </div>

      {visibleGames.length === 0 ? (
        <p>ไม่พบเกมที่ตรงกับเงื่อนไข</p>
      ) : (
        <section className="gameGrid">
          {visibleGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={() => setEditingId(game.id)}
              onDelete={() => setDeleteId(game.id)}
              onStatusChange={() => handleStatusChange(game.id)}
            />
          ))}
        </section>
      )}

      {deleteId && (
        <div className="deleteConfirm">
          <p>ต้องการลบเกมนี้หรือไม่?</p>
          <button type="button" onClick={handleDelete}>ยืนยันการลบ</button>
          <button type="button" onClick={() => setDeleteId(null)}>ยกเลิก</button>
        </div>
      )}
    </div>
  );
}
