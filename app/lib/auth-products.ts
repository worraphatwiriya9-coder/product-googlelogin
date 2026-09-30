export type AuthProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
};

const initialProducts: AuthProduct[] = [
  { id: "p001", name: "Mechanical Keyboard", price: 2590, description: "คีย์บอร์ด Mechanical สำหรับทำงานและเล่นเกม" },
  { id: "p002", name: "Wireless Mouse", price: 1290, description: "เมาส์ไร้สาย น้ำหนักเบา" },
  { id: "p003", name: "USB-C Hub", price: 1890, description: "USB-C Hub พร้อม HDMI และ Card Reader" },
];

declare global {
  // eslint-disable-next-line no-var
  var demoAuthProducts: AuthProduct[] | undefined;
}

const products = globalThis.demoAuthProducts ?? structuredClone(initialProducts);
if (process.env.NODE_ENV !== "production") globalThis.demoAuthProducts = products;

export function getProducts() { return products; }
export function getProduct(id: string) { return products.find((product) => product.id === id); }

export function updateProduct(id: string, values: Pick<AuthProduct, "name" | "price" | "description">) {
  const product = getProduct(id);
  if (!product) throw new Error("Product not found");
  Object.assign(product, values);
}

export function deleteProduct(id: string) {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) throw new Error("Product not found");
  products.splice(index, 1);
}
