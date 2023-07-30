# SGC Music team platform

### Folder structure

- /src
  - /assets
  - /auth
    - RequireAuth.tsx
  - /constants
  - /hooks
  - /models
  - /modules (features)
    - /auth
    - /availability
    - /calendar
    - /dashboard
    - /planner
    - /serviceList
    - /settings
    - /songs
    - /users
  - App.tsx

#### Access

Open `http://localhost:5173` (the page `<DashboardPage />`)
All pages (except `<LoginPage />`) is warpped in `withRequireAuth()`, which will fetch current user session by using `useAuth()` and determine the redirection.

- If user is not `null`, stay in current page.
- If user is `null`, redirect to `<LoginPage />`.

The logic is defined in `RequireAuth.ts`.
