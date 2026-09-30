"use client";

import { useEffect, useState } from "react";
import type { Game, GameStatus } from "../types/game";

export type GameDraft = {
  name: string;
  platform: string;
  hours: string;
  status: GameStatus;
};

type GameFormProps = {
  initialGame?: Game | null;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

const emptyDraft: GameDraft = {
  name: "",
  platform: "",
  hours: "",
  status: "ยังไม่เริ่ม",
};

export default function GameForm({ initialGame, onSave, onCancel }: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(emptyDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialGame) {
      setDraft({
        name: initialGame.name,
        platform: initialGame.platform,
        hours: String(initialGame.hours),
        status: initialGame.status,
      });
    } else {
      setDraft(emptyDraft);
    }
    setErrors({});
  }, [initialGame]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const nextErrors: Record<string, string> = {};

    if (!draft.name.trim()) nextErrors.name = "กรุณากรอกชื่อเกม";
    if (!draft.platform) nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
    if (!draft.hours) {
      nextErrors.hours = "กรุณากรอกจำนวนชั่วโมง";
    } else if (!/^\d+$/.test(draft.hours) || Number(draft.hours) <= 0) {
      nextErrors.hours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validate()) onSave(draft);
  }

  return (
    <form className="gameForm" onSubmit={handleSubmit} noValidate>
      <h2>{initialGame ? "แก้ไขเกม" : "เพิ่มเกม"}</h2>

      <label htmlFor="game-name">ชื่อเกม</label>
      <input
        id="game-name"
        name="name"
        value={draft.name}
        onChange={handleChange}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? "game-name-error" : undefined}
      />
      {errors.name && <p id="game-name-error" className="formError">{errors.name}</p>}

      <label htmlFor="game-platform">แพลตฟอร์ม</label>
      <select
        id="game-platform"
        name="platform"
        value={draft.platform}
        onChange={handleChange}
        aria-invalid={!!errors.platform}
        aria-describedby={errors.platform ? "game-platform-error" : undefined}
      >
        <option value="">-- เลือกแพลตฟอร์ม --</option>
        <option value="PC">PC</option>
        <option value="PS5">PS5</option>
        <option value="Xbox">Xbox</option>
        <option value="Nintendo Switch">Nintendo Switch</option>
      </select>
      {errors.platform && <p id="game-platform-error" className="formError">{errors.platform}</p>}

      <label htmlFor="game-hours">จำนวนชั่วโมงที่คาดว่าจะเล่น</label>
      <input
        id="game-hours"
        name="hours"
        type="number"
        min="1"
        step="1"
        value={draft.hours}
        onChange={handleChange}
        aria-invalid={!!errors.hours}
        aria-describedby={errors.hours ? "game-hours-error" : undefined}
      />
      {errors.hours && <p id="game-hours-error" className="formError">{errors.hours}</p>}

      <label htmlFor="game-status">สถานะ</label>
      <select id="game-status" name="status" value={draft.status} onChange={handleChange}>
        <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
        <option value="กำลังเล่น">กำลังเล่น</option>
        <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
      </select>

      <button type="submit">{initialGame ? "บันทึกการแก้ไข" : "เพิ่มเกม"}</button>
      {initialGame && <button type="button" onClick={onCancel}>ยกเลิก</button>}
    </form>
  );
}
