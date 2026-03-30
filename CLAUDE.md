# Roatan Rent

A vacation and long-term property rental website for Roatan, Honduras. Built with React 19, TypeScript, Vite, Tailwind CSS v3, and shadcn/ui components.

## What This Site Does

- Lists residential and commercial rental properties in Roatan
- Features neighborhood guides and an interactive map view
- Provides tools for both tenants (search, contact) and property owners (listing management)
- Showcases featured properties with a modern, responsive UI

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite 7
- **Styling:** Tailwind CSS v3 with shadcn/ui component library
- **Animations:** GSAP
- **Forms:** React Hook Form + Zod validation

## Project Structure

```
src/
  sections/     Page sections (Hero, Featured listings, Neighborhoods, etc.)
  components/   Reusable UI components (shadcn/ui + custom)
  hooks/        Custom React hooks
  lib/          Utility functions
  App.tsx       Root component
  main.tsx      Entry point
```

## Development

```bash
npm run dev      # Start dev server
npm run build    # Type-check and build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Git Workflow

- **Never push directly to `main`.** The `main` branch is protected and represents production.
- All development happens on feature branches or the `dev` branch.
- Open a pull request to merge changes into `main`.
- Branch naming: `feature/<description>`, `fix/<description>`, or `dev`.
