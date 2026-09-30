import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">หน้าแรก</Link>{" "}
      <Link href="/courses">ชื่อรายวิชา</Link>{" "}
      <Link href="/about">เกี่ยวกับเว็บไซต์</Link>{" "}
      <Link href="/favorite-bands">Favorite Bands</Link>{" "}
      <Link href="/products">Products</Link>{" "}
      <Link href="/games">Game Backlog</Link>
    </nav>
  );
}
