"use server";

export async function getPaymentLink(productId: string, priceCents: number, customerEmail: string) {
   "use server";

   let data = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      cache: "no-store",
      body: `success_url=https://example.com/success&line_items[0][price_data][unit_amount]=${priceCents}&line_items[0][price_data][product]=${productId}&line_items[0][price_data][currency]=usd&line_items[0][quantity]=1&mode=payment&customer_email=${customerEmail}`,
      headers: {
         Authorization:
            "Basic c2tfdGVzdF81MU42ZFVURE9ZVHNYeDlRWk9jNWxNVTA3YldYdjJxY0pOaTJXMk5hREtDZkdpa0JTTWhkMm11dGNZaEN4QW42bngyR3E2bVM3U1Z0a3hnZUl5M29GSE1QQzAwZmJaeWFmc3U6",
         "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
   }).then((res) => res.json());

   return data;
}
