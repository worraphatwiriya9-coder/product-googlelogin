import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/app/auth";
import { AuthButtons } from "@/app/auth-buttons";
import { getProducts } from "@/app/lib/auth-products";

export const metadata: Metadata = { title: "Product Explorer | Google OAuth" };

export default async function ProductsPage() {
  const session = await auth();
  const products = getProducts();
  const isLoggedIn = Boolean(session?.user);

  return (
    <main className="productExplorer">
      <header>
        <h1>Product Explorer</h1>
        <p>Google OAuth Authentication</p>
        <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} />
      </header>
      <section className="productResults">
        {products.length === 0 ? <p>ไม่มีสินค้า</p> : (
          <div className="productTableWrap">
            <table className="productTable">
              <thead><tr><th>ชื่อสินค้า</th><th>ราคา</th><th>รายละเอียด</th><th>จัดการ</th></tr></thead>
              <tbody>{products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>฿{product.price.toLocaleString("th-TH")}</td>
                  <td>{product.description}</td>
                  <td>{isLoggedIn ? <>
                    <Link href={`/products/${product.id}/edit`}>แก้ไข</Link>{" "}
                    <Link href={`/products/${product.id}/delete`}>ลบ</Link>
                  </> : <span>เข้าสู่ระบบเพื่อจัดการ</span>}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
