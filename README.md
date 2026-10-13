# FRAME & FOREVER

A premium photography and cinematography studio website built with React + TypeScript + Vite.

## Local setup

1. Install dependencies:
   npm install
2. Start the local development server:
   npm run dev
3. Open the local URL shown in the terminal.

## Production build

npm run build

## Deployment to Vercel

1. Push the project to GitHub.
2. Sign in to Vercel and import the repository.
3. Keep the default Vite build settings.
4. Set the framework to `Vite` and deploy.
5. Optional: add environment variables in the Vercel dashboard if you later connect a backend or contact integrations.

## Updating brand and contact details

Most editable brand, pricing, portfolio, and contact content lives in `src/siteConfig.ts`.

Key values to update:
- Brand name and tagline
- Portfolio images and labels
- Service descriptions and deliverables
- Package prices and inclusions
- Contact email, phone, and WhatsApp number
- Social URLs
- Photographer bio and studio intro

## WhatsApp configuration

Add your real WhatsApp number in `src/siteConfig.ts` or use environment variables in your deployment environment.

Example:
- `whatsAppNumber: '919876543210'`
- Keep the number in international format without spaces or symbols.

If no valid number is configured, the WhatsApp button stays in setup mode and does not open a wrong number.

## Image replacement

Replace the Unsplash URL values in `src/siteConfig.ts` for each portfolio/service image. Keep the same structure and alt text for consistent layouts.

## Demo notes

- The enquiry form is in demo mode and does not persist submissions yet.
- Demo pricing is clearly marked as sample content.
- The film feature section uses a demo placeholder until a real video URL is configured.
