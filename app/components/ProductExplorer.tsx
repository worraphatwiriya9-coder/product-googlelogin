"use client";

import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductSearchForm from "./ProductSearchForm";
import {
  defaultQuery,
  fetchProducts,
  ProductListSchema,
} from "../lib/products";
import type { Product, ProductDraft, ProductList, SearchQuery } from "../lib/products";
import fallback from "../data/products-fallback.json";

type LoadState = "loading" | "error" | "ready";

export default function ProductExplorer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function showResult(list: ProductList) {
    setProducts(list.products);
    setStatus("ready");
  }

  function showError(error: unknown) {
    setErrorMessage(
      error instanceof Error ? error.message : "เรียกข้อมูลไม่สำเร็จ"
    );
    setStatus("error");
  }

  async function loadProducts(query: SearchQuery) {
    setStatus("loading");
    setErrorMessage("");
    try {
      showResult(await fetchProducts(query));
    } catch (error) {
      showError(error);
    }
  }

  useEffect(() => {
    fetchProducts(defaultQuery)
      .then(showResult)
      .catch(() => {
        const parsedFallback = ProductListSchema.safeParse(fallback);
        if (parsedFallback.success) {
          showResult(parsedFallback.data);
        } else {
          showError(new Error("ข้อมูลสำรองไม่ถูกต้อง"));
        }
      });
  }, []);

  function saveProduct(draft: ProductDraft) {
    if (editingId !== null) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingId ? { ...product, ...draft } : product
        )
      );
      setEditingId(null);
      return;
    }

    const newProduct: Product = {
      ...draft,
      id: Date.now(),
    };
    setProducts((current) => [...current, newProduct]);
  }

  function removeProduct(id: number) {
    setProducts((current) => current.filter((product) => product.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  }

  const editingProduct =
    products.find((product) => product.id === editingId) ?? null;

  return (
    <main className="productExplorer">
      <h1>Product Explorer</h1>
      <p>React Hook Form + Zod + External API</p>

      <ProductForm
        key={editingId ?? "new"}
        editing={editingProduct}
        onSave={saveProduct}
        onCancel={() => setEditingId(null)}
      />

      <ProductSearchForm onSearch={loadProducts} />

      <button
        type="button"
        onClick={() => loadProducts(defaultQuery)}
        disabled={status === "loading"}
      >
        {status === "loading" ? "กำลังโหลด" : "โหลดข้อมูลใหม่"}
      </button>

      <section aria-live="polite" className="productResults">
        {status === "loading" && <p>กำลังโหลดข้อมูล...</p>}

        {status === "error" && (
          <p className="formError" role="alert">{errorMessage}</p>
        )}

        {status === "ready" && products.length === 0 && (
          <p>ไม่พบสินค้าที่ตรงกับเงื่อนไข</p>
        )}

        {status === "ready" && products.length > 0 && (
          <div className="productTableWrap">
            <table className="productTable">
              <thead>
                <tr>
                  <th>ชื่อสินค้า</th>
                  <th>ราคา</th>
                  <th>คงเหลือ</th>
                  <th>หมวดหมู่</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td>{item.category}</td>
                    <td>
                      <button type="button" onClick={() => setEditingId(item.id)}>
                        แก้ไข
                      </button>
                      <button type="button" onClick={() => setDeleteId(item.id)}>
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {deleteId !== null && (
        <div className="deleteConfirm" role="dialog" aria-modal="true">
          <p>ต้องการลบสินค้านี้หรือไม่?</p>
          <button
            type="button"
            onClick={() => {
              removeProduct(deleteId);
              setDeleteId(null);
            }}
          >
            ยืนยันการลบ
          </button>
          <button type="button" onClick={() => setDeleteId(null)}>
            ยกเลิก
          </button>
        </div>
      )}
    </main>
  );
}
