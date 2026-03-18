import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
const GET = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (token === "valid-token") {
    return Response.redirect("/assets/lead-magnets/2025%20AI%20Money%20%26%20Productivity%20Vault.zip");
  }
  return new Response("Unauthorized", { status: 401 });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
