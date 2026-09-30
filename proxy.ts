export { auth as proxy } from "@/app/auth";

export const config = {
  matcher: ["/products/:id/edit", "/products/:id/delete"],
};
