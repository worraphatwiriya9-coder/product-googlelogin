"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CATEGORIES, ProductDraftSchema } from "../lib/products";
import type { Product, ProductDraft } from "../lib/products";

type ProductFormProps = {
  editing: Product | null;
  onSave: (draft: ProductDraft) => void;
  onCancel: () => void;
};

export default function ProductForm({ editing, onSave, onCancel }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ProductDraft>({
    resolver: zodResolver(ProductDraftSchema),
    mode: "onTouched",
    defaultValues: editing
      ? {
          title: editing.title,
          price: editing.price,
          stock: editing.stock,
          category: editing.category,
        }
      : { title: "", price: undefined, stock: undefined, category: undefined },
  });

  function saveProduct(values: ProductDraft) {
    onSave(values);
    reset();
  }

  return (
    <form className="productForm" onSubmit={handleSubmit(saveProduct)} noValidate>
      <h2>{editing ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}</h2>

      <label htmlFor="product-title">ชื่อสินค้า</label>
      <input
        id="product-title"
        required
        {...register("title")}
        aria-invalid={!!errors.title}
        aria-describedby="product-title-error"
      />
      <span id="product-title-error" className="formError" role="alert">
        {errors.title?.message}
      </span>

      <label htmlFor="product-price">ราคา</label>
      <input
        id="product-price"
        type="number"
        step="0.01"
        required
        {...register("price", { valueAsNumber: true })}
        aria-invalid={!!errors.price}
        aria-describedby="product-price-error"
      />
      <span id="product-price-error" className="formError" role="alert">
        {errors.price?.message}
      </span>

      <label htmlFor="product-stock">จำนวนคงเหลือ</label>
      <input
        id="product-stock"
        type="number"
        step="1"
        required
        {...register("stock", { valueAsNumber: true })}
        aria-invalid={!!errors.stock}
        aria-describedby="product-stock-error"
      />
      <span id="product-stock-error" className="formError" role="alert">
        {errors.stock?.message}
      </span>

      <label htmlFor="product-category">หมวดหมู่</label>
      <select
        id="product-category"
        required
        {...register("category")}
        aria-invalid={!!errors.category}
        aria-describedby="product-category-error"
      >
        <option value="">กรุณาเลือกหมวดหมู่</option>
        {CATEGORIES.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <span id="product-category-error" className="formError" role="alert">
        {errors.category?.message}
      </span>

      <div className="formActions">
        <button type="submit" disabled={!isDirty || !isValid}>
          {editing ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
        </button>
        {editing && (
          <button type="button" onClick={onCancel}>ยกเลิก</button>
        )}
      </div>
    </form>
  );
}
