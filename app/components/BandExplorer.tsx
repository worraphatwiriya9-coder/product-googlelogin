"use client";

import { useState, type ChangeEvent } from "react";
import BandCard from "./BandCard";
import type { Band } from "../types/band";

type Props = {
  bands: Band[];
};

export default function BandExplorer({ bands }: Props) {
  const [keyword, setKeyword] = useState("");
  const [followingIds, setFollowingIds] = useState<number[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFollow(id: number) {
    setFollowingIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((followingId) => followingId !== id)
        : [...prevIds, id]
    );
  }

  function handleLike(id: number) {
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] ?? 0) + 1,
    }));
  }

  const searchText = keyword.trim().toLowerCase();

  const visibleBands = bands.filter((band) =>
    band.name.toLowerCase().includes(searchText)
  );

  return (
    <div>
      <div className="bandTools">
        <input
          type="search"
          aria-label="ค้นหาชื่อวงดนตรี"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวงดนตรี"
        />
        <p>กำลังติดตาม {followingIds.length} วง</p>
      </div>

      {visibleBands.length === 0 ? (
        <p>ไม่พบวงดนตรีที่ตรงกับคำค้นหา</p>
      ) : (
        <div className="bandList">
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowing={followingIds.includes(band.id)}
              likeCount={likeCounts[band.id] ?? 0}
              onToggleFollow={handleToggleFollow}
              onLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}
