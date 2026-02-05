# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kali Consulting is a Next.js 15 marketing website for data consulting services targeting Australian businesses. This is a static marketing site with a blog - there is no authentication system or admin dashboard in use.

- **Framework**: Next.js 15.3.2 with React 19.1.0, TypeScript 5.8.3
- **Styling**: Tailwind CSS v4 + DaisyUI v5
- **Database**: MongoDB with Mongoose (contact form only)
- **URL**: https://www.kalisoftware.io/

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Development server (http://localhost:3000)
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## Architecture

### Route Groups
- `src/app/(public)/` - **Active** - Public marketing pages (landing, blog, about, services)
- `src/app/(admin)/` - **Unused** - Inherited from Nexus template, no auth system exists
- `src/app/auth/` - **Unused** - Inherited from Nexus template, no auth system exists
- `src/app/api/` - API routes (contact form endpoint only)

### Key Directories
- `src/app/lib/` - Server utilities, MongoDB connection, Mongoose models
- `src/components/` - Shared reusable components
- `src/contexts/` - React Context providers (theme configuration)
- `src/hooks/` - Custom React hooks
- `src/styles/` - Global and component styles
- `src/content/blog/` - Blog post markdown files

### Data Flow
- Server Components are default; add `"use client"` for interactivity
- Blog posts are markdown files processed with remark/rehype pipeline
- Contact form uses API route (`/api/landing/contact`) with Zod validation and MongoDB storage
- n8n webhook integration for automation (non-blocking)

## Code Style

- Path alias: `@/*` maps to `src/*`
- 4-space indentation (Prettier configured)
- Import order: assets → third-party → react → project → relative
- DaisyUI theming via `data-theme` attribute
- ESLint rules relaxed for `@typescript-eslint/no-explicit-any`

## Environment Variables

Required:
- `MONGODB_URI` - MongoDB connection string

Optional:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics (defaults to "G-RWYV9J31R6")
- `N8N_WEBHOOK_URL` - n8n automation webhook
- `N8N_WEBHOOK_SECRET` - n8n webhook auth

## Notes

- **No auth system**: The `(admin)` and `auth` directories are unused template code from Nexus Admin - ignore them
- MongoDB connection is cached globally for serverless (Vercel) deployments
- Contact form has rate limiting: 5 submissions per 5 minutes per email/IP
- No test framework configured
- Based on Nexus Admin template from DaisyUI (most admin features stripped/unused)
