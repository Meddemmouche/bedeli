
```
bedeli
├─ app
│  ├─ about
│  ├─ actions
│  │  ├─ auth.ts
│  │  ├─ products.ts
│  │  └─ proposals.ts
│  ├─ api
│  │  └─ auth
│  │     └─ [...nextauth]
│  │        └─ route.ts
│  ├─ category
│  │  ├─ page.tsx
│  │  └─ [slug]
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ footer.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ navbarClient.tsx
│  │  ├─ prod-box.tsx
│  │  ├─ ProductGrid.tsx
│  │  ├─ ProductGridSugg.tsx
│  │  ├─ ProductSkeleton.tsx
│  │  ├─ ProposeTradeButton.tsx
│  │  ├─ ProposeTradeModal.tsx
│  │  ├─ search.tsx
│  │  ├─ sideBar.tsx
│  │  └─ suggestion.tsx
│  ├─ connection
│  │  ├─ layout.tsx
│  │  ├─ log-in
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  └─ sign-in
│  │     └─ page.tsx
│  ├─ favicon.ico
│  ├─ Gifts
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ post
│  │  ├─ page.tsx
│  │  └─ PostProductForm.tsx
│  ├─ product
│  │  └─ [slug]
│  │     └─ page.tsx
│  ├─ profile
│  │  └─ page.tsx
│  ├─ proposal
│  │  └─ [id]
│  │     ├─ page.tsx
│  │     └─ ProposalActions.tsx
│  ├─ proposals
│  │  └─ page.tsx
│  └─ settings
│     ├─ layout.tsx
│     ├─ page.tsx
│     ├─ profile
│     │  └─ page.tsx
│     └─ security
│        └─ page.tsx
├─ docs
│  └─ .project_structure_ignore
├─ eslint.config.mjs
├─ lib
│  ├─ auth-helpers.ts
│  ├─ auth.ts
│  ├─ products.ts
│  ├─ proposals.ts
│  └─ slugify.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ proxy.ts
├─ public
│  ├─ back-form.jpg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ logob.png
│  ├─ next.svg
│  ├─ placeholder.svg
│  └─ window.svg
├─ README.md
├─ scripts
└─ tsconfig.json

```


## Overview

Bedeli is a Next.js web application for product trading and proposals. Users can browse products, create listings, propose trades, and manage their profile and settings.

## Key Features

- **Product Catalog**: Browse products by category with search and filtering
- **Product Posting**: Create and list new products for trade
- **Trade Proposals**: Send and manage trade proposals with other users
- **User Authentication**: Secure login/signup with NextAuth
- **User Profile**: Manage profile information and view trading history
- **Product Suggestions**: Get personalized product recommendations

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: CSS (globals.css)
- **Authentication**: NextAuth.js
- **Database**: Connected via lib utilities
- **State Management**: Server actions for data mutations

## Project Structure

- `/app` - Next.js app directory with pages and routes
- `/components` - Reusable React components
- `/lib` - Utility functions for auth, products, proposals, and database operations
- `/public` - Static assets

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables for NextAuth and database
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)
