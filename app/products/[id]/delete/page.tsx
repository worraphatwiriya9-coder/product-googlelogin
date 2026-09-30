import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { getProduct } from "@/app/lib/auth-products";
import { deleteProductAction } from "@/app/actions";

type Props = { params: Promise<{ id: string }> };

export default async function DeleteProductPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/products");
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  const deleteAction = deleteProductAction.bind(null, product.id);

  return (
    <main className="productExplorer">
      <h1>ยืนยันการลบ</h1>
      <p>ต้องการลบสินค้า “{product.name}” หรือไม่?</p>
      <form action={deleteAction}><button type="submit">ยืนยันการลบ</button></form>{" "}
      <Link href="/products">ยกเลิก</Link>
    </main>
  );
}
