"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SORT_FIELDS,
  SearchQuerySchema,
  defaultQuery,
} from "../lib/products";
import type { SearchQuery } from "../lib/products";

type ProductSearchFormProps = {
  onSearch: (query: SearchQuery) => Promise<void>;
};

export default function ProductSearchForm({ onSearch }: ProductSearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchQuery>({
    resolver: zodResolver(SearchQuerySchema),
    mode: "onTouched",
    defaultValues: defaultQuery,
  });

  return (
    <form className="productSearchForm" onSubmit={handleSubmit(onSearch)} noValidate>
      <div>
        <label htmlFor="product-query">คำค้น</label>
        <input id="product-query" {...register("q")} placeholder="phone" />
      </div>

      <div>
        <label htmlFor="product-limit">จำนวนรายการ</label>
        <input
          id="product-limit"
          type="number"
          required
          {...register("limit", { valueAsNumber: true })}
          aria-invalid={!!errors.limit}
          aria-describedby="product-limit-error"
        />
        <span id="product-limit-error" className="formError" role="alert">
          {errors.limit?.message}
        </span>
      </div>

      <div>
        <label htmlFor="product-sort">เรียงตาม</label>
        <select id="product-sort" {...register("sortBy")}>
          {SORT_FIELDS.map((field) => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "กำลังค้นหา" : "ค้นหา"}
      </button>
    </form>
  );
}
