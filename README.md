Fishin Leads **marketing** site (Next.js).

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Required | Purpose |
|----------|----------|---------|
| `FISHIN_LEADS_MARKETING_SIGNUP_URL` | Yes (prod) | Supabase Edge Function `marketing-crm-signup` URL (used by `/api/signup`). |
| `NEXT_PUBLIC_CRM_APP_URL` | Recommended | CRM app origin (no trailing slash). On successful signup, users are redirected to `{URL}/login?email=...`. If omitted, signup shows the in-panel success screen with webhook + API key. |

`NEXT_PUBLIC_*` vars are baked in at **build** time — set them in Vercel and redeploy after changing.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
