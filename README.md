Full-stack Twitter clone app, named Ripples.

## Project Highlights

- Built with **Next.js 16** using the App Router and server components
- **Semantic HTML** for accessibility and structure
- **MongoDB + Mongoose** for data storage with full CRUD operations.
- **Manual JWT authentication** - custom signin/signup, cookie-based sessions, and protected routes via Next.js Proxy
- **Authorization** - ownership checks ensuring users can only edit or delete their own posts.
- Styled with **Tailwind CSS** with light/dark theme support

## Tech Stack

- **Next.js 16** - App Router, server & client components, API routes
- **MongoDB Atlas** - cloud database via Mongoose ODM
- **JWT Authentication** - manual auth using `jose`, httpOnly cookies
- **Tailwind CSS** - utility first styling with custom design

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

# Folder Structure

├── app
| ├── (auth)
| | ├── layout.tsx
| | ├── signin
| | └── signup
| ├── (main)
| | ├── layout.tsx
| | ├── page.tsx
| | ├── profile
| | └── ripples
| ├── api
| | ├── auth
| | ├── comments
| | ├── profile
| | └── ripples
| ├── favicon.ico
| ├── globals.css
| ├── layout.tsx
| └── proxy.ts
├── components
| ├── comments
| | └── CommentsSection.tsx
| ├── header
| | ├── DesktopHeader.tsx
| | ├── Header.tsx
| | └── MobileHeader.tsx
| ├── publicUserProfile
| | └── PublicUserProfile.tsx
| ├── ripple
| | ├── RippleCard.tsx
| | └── RippleList.tsx
| ├── sidebar
| | ├── SidebarNav.tsx
| | └── SidebarTrends.tsx
| └── ui
| ├── Button.tsx
| ├── Input.tsx
| ├── SignoutButton.tsx
| └── ToggleThemeBtn.tsx
├── eslint.config.mjs
├── layouts
| ├── Container.tsx
| └── ThemeContainer.tsx
├── lib
| ├── auth.ts
| ├── comments.ts
| ├── db.ts
| ├── getUsersByUsername.ts
| ├── models
| | ├── Comment.ts
| | ├── Ripple.ts
| | └── User.ts
| └── ripples.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
| ├── ripple-logo-dark.svg
| └── ripple-logo-light.svg
├── README.md
├── store
| ├── authContext
| | ├── AuthContext.tsx
| | └── useAuth.ts
| ├── Providers.tsx
| └── themeContext
| ├── ThemeContext.tsx
| └── useTheme.ts
├── tsconfig.json
├── types
| └── types.ts
└── utils
├── formattedName.ts
├── formattedTimestamp.ts
└── validateForms.ts

## Credits

All the teachers and students from the Full-stack Bootcamp course at ReDi School [ReDiSchool](https://www.redi-school.org/)
