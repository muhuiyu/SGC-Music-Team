# SGC Music Team Platform - Frontend

Welcome to the frontend repository of the SGC Music Team Platform. This application serves as the user interface for managing various aspects of the music team's activities.

## Folder Structure

- /src: Main source code for the application.
- /assets: Static files like images, fonts, etc.
- /auth: Authentication related components.
- RequireAuth.tsx: Component to handle route protection based on authentication.
- /constants: Application-wide constant values.
- /hooks: Custom React hooks.
- /models: Data models and types.
- /modules: Feature-specific modules.
- /auth: Authentication module.
- /availability: Availability management.
- /calendar: Calendar functionalities.
- /dashboard: Main dashboard.
- /planner: Event and schedule planning.
- /serviceList: List of services.
- /settings: User settings.
- /songs: Song management.
- /users: User management.
- App.tsx: Main application component.

## Access and Routing

- Access the application at: http://localhost:5173

- The main page is <DashboardPage />. Most pages, except <LoginPage />, are wrapped with withRequireAuth() which utilizes useAuth() hook to manage user sessions and redirection.

- If a user is authenticated (not null), they will stay on the current page.
- If a user is not authenticated (null), they will be redirected to <LoginPage />.
- Authentication flow is defined in RequireAuth.tsx.

## Setup and Installation

To get the frontend up and running:

1. Clone the repository.
2. Navigate to the frontend directory.
3. Run `yarn install` to install dependencies.
4. Start the development server using `yarn dev`.
5. The application will be available at http://localhost:5173.

## Technology Stack

- React
- TypeScript
