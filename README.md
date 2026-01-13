# Runkiez - Berlin Running Community

A marketplace app for Berlin runners to discover local clubs, book sessions with coaches, and join group runs.

## Tech Stack

- Next.js 14 (App Router) with TypeScript
- Tailwind CSS
- Supabase (Database & Auth)
- Leaflet with OpenStreetMap (Coming in Phase 2)
- Stripe Connect (Coming in Phase 3)

## Phase 1 - Completed Features

### Authentication
- Email-based signup and login
- Role selection (Runner or Coach)
- Protected routes with middleware

### User Profiles
- View profile information
- Edit profile with details:
  - Name, bio, neighborhood
  - Pace range (min/max)
  - Preferred distances
  - Strava profile link

### Pages
- Landing page with feature highlights
- Login page
- Signup page with role selection
- Profile page (view/edit)
- Clubs directory (placeholder)

### Database Schema
- **users** table with full profile fields
- **clubs** table ready for Phase 2
- Row Level Security policies configured

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:

The `.env.local` file is already configured with the Supabase credentials.

3. Set up the database:

Run the SQL schema in the Supabase SQL Editor:
```bash
# Copy contents of supabase/schema.sql and run in Supabase SQL Editor
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
runkiez/
├── app/
│   ├── auth/
│   │   ├── login/          # Login page
│   │   ├── signup/         # Signup page with role selection
│   │   └── actions.ts      # Auth server actions
│   ├── profile/
│   │   ├── page.tsx        # Profile page
│   │   ├── ProfileView.tsx # Profile view/edit component
│   │   └── actions.ts      # Profile server actions
│   ├── clubs/
│   │   └── page.tsx        # Clubs directory (placeholder)
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   └── Navigation.tsx      # Navigation component
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Browser client
│   │   ├── server.ts       # Server client
│   │   └── middleware.ts   # Auth middleware
│   └── types/
│       └── database.ts     # TypeScript types
├── supabase/
│   └── schema.sql          # Database schema
└── middleware.ts           # Next.js middleware
```

## Database Setup

Run the following SQL in your Supabase SQL Editor to create the tables:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Open `supabase/schema.sql` and copy the contents
4. Paste and run in the SQL Editor

This will create:
- `users` table with profile fields
- `clubs` table for Phase 2
- Row Level Security policies
- Appropriate indexes and constraints

## Development

### Key Files
- `app/auth/actions.ts` - Authentication server actions
- `app/profile/actions.ts` - Profile update server actions
- `lib/supabase/` - Supabase client configuration
- `components/Navigation.tsx` - Main navigation component

### Adding New Features
1. Create new pages in the `app/` directory
2. Add server actions in `actions.ts` files
3. Update navigation in `components/Navigation.tsx`
4. Add database types to `lib/types/database.ts`

## Next Steps (Phase 2)

- Implement club directory with search and filters
- Add map view with Leaflet
- Allow users to submit new clubs
- Add club detail pages
- Implement neighborhood-based filtering

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js 14:
- Netlify
- Railway
- Render
- AWS Amplify

Make sure to:
1. Set the environment variables
2. Configure the build command: `npm run build`
3. Configure the start command: `npm run start`

## License

MIT
