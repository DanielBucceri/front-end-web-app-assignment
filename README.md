# Pokémon Team Builder – Front-End Web Application

---

## 1. Project Overview & Features

Pokémon Team Builder is a modern, responsive web application enabling users to create, manage, and customize competitive Pokémon teams. The platform allows authenticated users to:

- Search for Pokémon and build custom pokemon builds with moves, stats, nature, items and abilities.
- Group builds into teams (up to 6 Pokémon per team), supporting competitive planning.
- Edit, update, or delete builds and teams at any time.
- Register/login securely (JWT-based auth), with protected routes and session persistence.
- Browse featured/random Pokémon for inspiration.

**Key Features:**

- **Custom Build Creation:** Search Pokémon, select moves (up to 4), abilities, nature, and items.
- **Team Assembly:** Combine existing builds into teams, visually manage slots.
- **User Authentication:** Register, login, logout; routes protected via JWT and React context.
- **Error Boundaries:** Implemented to catch and display issues gracefully during runtime
- **Responsive Design:** Full mobile and desktop support.
- **Testing:** Tests cover API error handling in the Builds page, showing appropriate user feedback on network failures.

---

## 2. Tech Stack

| Technology / Library         | Purpose                                          | Alternatives         | Industry Relevance / Reason                  | License           |
|-----------------------------|--------------------------------------------------|----------------------|----------------------------------------------|-------------------|
| **React 19 (Vite)**         | Front-end library for building the UI as a SPA   | Vue, Angular, Svelte | Widely adopted with a large ecosystem        | MIT (React, Vite) |
| **Vite**                    | Fast build/dev tool, HMR, code splitting         | CRA, Parcel, Webpack | Modern tool, used in production apps         | MIT               |
| **React Router v7**         | Declarative routing for SPAs                     | Reach Router, Wouter | Industry standard for React navigation       | MIT               |
| **Axios**                   | HTTP client, cleaner than fetch for API calls    | fetch, Superagent    | Popular, wide adoption, promise-based        | MIT               |
| **ESLint (Airbnb, plugins)**| Linting, style enforcement, accessibility, React | StandardJS, Prettier | Enforces robust code conventions             | MIT               |
| **Jest, Testing Library**   | Unit/integration testing for UI & logic          | Vitest, Mocha, Cypress | Popular and well-supported testing tools     | MIT               |
| **identity-obj-proxy**      | CSS modules mocking for tests                    | N/A                  | Solves CSS imports for Jest                  | MIT               |

### System Requirements
- Compatible with modern desktop and mobile browsers (e.g Chrome, Firefox, Safari).
- Supports screen widths from 320px.
- The application is client-side but requires access to its backend API for full functionality.

---

## 3. Development Approach & Quality Focus

This project emphasizes clean code and a good user experience.

- **Coding Style:** ESLint with the Airbnb configuration to maintain consistent code style. The codebase follows modern React practices using function components and Hooks.

- **Core Principles:**
    - Aims for DRY (Don't Repeat Yourself) by centralizing shared logic, like API interactions and authentication context.
    - Error handling is implemented for API calls, with user-facing messages for clarity, and a global ErrorBoundary for unexpected issues.

- **Testing:** Core functionalities, including API services, authentication utilities, and key components like the Builds page (covering various states like loading, empty, and errors), are tested using Jest and React Testing Library. Test files are located in `/src/__tests__/`, and coverage can be checked with `npm test -- --coverage`.

- **User Interface & Experience:**
    - **Semantic HTML:** Semantic HTML elements (`<header>`, `<nav>`, `<main>`, etc.) to improve structure and accessibility.
    - **Accessibility (a11y):** Key a11y practices include proper labeling of form elements, ensuring sufficient color contrast, keyboard navigability, visible focus indicators, and using ARIA attributes where appropriate to announce dynamic content. `eslint-plugin-jsx-a11y` helps enforce these.
    - **Responsive Design:** The application is designed to be responsive, adapting to various screen sizes from mobile (320px width) to desktop. Layouts like the `.pokedex-grid` and `.team-grid` use CSS Grid and media queries to adjust content flow (e.g., changing column counts at breakpoints like 1200px, 900px, 600px). All features are accessible on mobile without horizontal scrolling.

---

## 4. Alternative Technology Comparisons

- **React vs Vue/Angular:** Chosen for its component model and team familiarity.
- **Vite vs CRA/Webpack:** Chosen because Vite automatically refreshes the app on change, so you see updates right away.
- **Axios vs native fetch:** Chosen for its interceptors and simpler error handling for API calls.
- **Jest vs Vitest/Mocha:** Chosen for its comprehensive and easy to use testing utilities.

## 5. Architecture & File Structure

### Architecture

- Single-page application rendered client-side with React 19.
- Routing hierarchy: `App.jsx → AuthProvider → Routes → Layout → Pages`, keeping routing logic encapsulated.

### Key Directories

```text
src/
 ├─ services/       # Axios instance & endpoints
 ├─ components/     # Reusable UI components
 ├─ provider/       # Global authProvider for JWT
 ├─ pages/          # Route-level screens (Login, Register, Builds, Teams)
 │  routes/         # Registered routes
 ├─ styles/         # Module level CSS
 ├─ public/         # Static images & SVGs
 └─ __tests__/      # Jest test suites
```

### Naming Conventions

- `camelCase` for variables, functions, hooks.
- `PascalCase` for React components and folders.
- `UPPER_SNAKE_CASE` for constants.

### ES Modules

- Entire codebase uses native ES Modules (`import` / `export`); no CommonJS remains.

### Lint Enforcement

```bash
npm run lint      # check code against Airbnb rules
npm run lint:fix  # auto-fix eligible issues
```

### External Assets: Pokémon Sprites

- **Animated Pokémon Sprites:**  
  The application retrieves animated Pokémon sprites from the [Pokémon Showdown](https://play.pokemonshowdown.com/sprites/ani/) CDN. URLs are composed dynamically per build:

  ```js
  const spriteUrl = `https://play.pokemonshowdown.com/sprites/ani/${build.species.toLowerCase()}.gif`;
  ```

Using the CDN helps keep the app lightweight and still shows visually appealing Pokémon images that players will recognize.

  **Personal Note:** Initially used images from PokeAPI, but they didn't render nicely on the page due to white backgrounds not matching the card background. Switching to Pokémon Showdown sprites provided better visual consistency and enhanced the overall user experience.

- **License Note:** While Pokémon Showdown itself is MIT licensed, the licensing for its sprites can be less clear cut due to community contribution. For educational purposes these have been used for educational purposes only locally and should be consdered depending on how this project is used. The primary benefit is access to high-quality, familiar sprites without needing to host them ourselves.

---

## 6. Testing Approach
- All core utilities, providers, and major UI flows are covered with automated tests.

**Components/Functions Tested:**

- **API Service** – Ensures correct baseURL is set, auth header is attached.
- **Auth Utilities** – Local storage operations: save, retrieve, remove token; isAuthenticated.
- **AuthProvider** – Token context: sets/updates toke.
- **Builds Page** – Renders builds, handles loading, empty, and error states.

---

## 7. Error Handling

- **API Layer:** All external/API requests are wrapped in `try/catch`; errors are logged, and UI shows contextual messages.
- **React ErrorBoundary:** All routes wrapped in an ErrorBoundary; unexpected errors show a user-friendly message without crashing.
- **Form Validation:** Client-side validation for all required fields; missing or invalid input is shown inline.
- **Deletion/Mutations:** Confirm dialogs for destructive actions; feedback on failure.
- **Testing:** Tests verify API error handling in the Builds page, showing appropriate user feedback on network failures.
 
---

## 8. Semantic HTML & Accessibility

- **Semantic Elements:**
  - Layout uses `<header>`, `<main>`, labels; ARIA partial.
- **Labels & ARIA:**
  - All inputs have `<label>` with matching `for`/`id` for screen readers.
  - Buttons and links have clear, descriptive text.
  - Error messages and loading indicators use clear text, visually and for screen readers.
- **Keyboard Accessibility:**
  - All controls (inputs, selects, buttons) are focusable, usable via Tab/Shift-Tab.

---

## 9. Responsive Design

- **CSS Grids & Media Queries:** `.pokedex-grid`, `.team-grid` adjust columns by screen width (4 → 3 → 2 → 1 columns).
- **Adaptive Controls:** Buttons, forms, cards resize and stack.
- **Mobile-First Layout:** App is fully usable on phones, tablets, and desktops with no horizontal scroll.
- **Testing:** Manual and automated checks with browser.

---

## 10. Collaboration, Contribution & Workflow

- Development follows the GitHub Flo:
  1. Create a branch from `main` for new features or bug fixes
  2. Make commits to this branch with clear, descriptive messages
  3. Open a pull request to propose changes to `main`
  4. Discuss and review code with team members
  5. Deploy and test changes in the test environment
  6. Merge to `main` after approval

- We use Conventional Commits style (e.g., `feat: add team card`, `fix: handle 404`) for clarity
- Code reviews require at least one approval before merging
- While ESLint and Jest were integrated late in development, the GitHub flow with reviews and PRs was strictly followed throughout

- To contribute:
  1. Fork the repository or create a new branch from `main`
  2. Run `npm install` then `npm run dev` for local development
  3. Ensure new code includes tests and passes lint checks
  4. Open a PR with a clear description and reference any related issues

  - reference the github project for more details and examples

---

## Future Plans 

While the core functionality is in place, potential future enhancements could include:

- **Enhanced Search & Filtering:** More detailed options for Pokémon, builds, and teams (e.g. types for moves and pokemon, stat modification based on  build configuration).
- **Sharing Capabilities:** Allowing users to share or trader their custom builds or team compositions with others.
- **Import/Export for Simulators:** Functionality to import or export team data in formats compatible with popular battle simulators like Pokémon Showdown.

---

## 11. Quickstart

> **Note:** This frontend application requires the [Pokémon Team Builder API](https://github.com/danielbucceri/pokemon-team-builder-api) backend to function properly. Make sure it's running and set up the environment variables accordingly.

### Environment Setup

Create a `.env` file in the project root with:

```
VITE_API_URL=http://localhost:4000
VITE_POKEMON_API_URL=https://pokeapi.co/api/v2/pokemon

```

### Development Commands

```bash
# Install dependencies
npm install

# Create an optimized production build
npm run build

# Start the development server (Vite, hot-reload)
npm run dev

# Run unit/integration tests with coverage
npm test -- --coverage

# Lint code for style and a11y errors
npm run lint
```

---

## 12. Build & Deployment

### Production Build

Typical hosting options:

| Platform  | Command / Action |
|-----------|------------------|
| **Netlify** | Drag-and-drop `dist/`, or connect repo; set build command `npm run build` & publish directory `dist` |
| **Vercel**  | Import repo; framework preset: **Vite**; build `npm run build`; output `dist` |

### Live Deployment

This project is currently deployed and accessible:

- **Front-End (React App):** [https://pokemon-team-builder-front-end.onrender.com](https://pokemon-team-builder-front-end.onrender.com)
  - Hosted on: Render
- **Back-End (API):** [https://pokemon-app-back-end.onrender.com](https://pokemon-app-back-end.onrender.com)
  - Hosted on: Render
  - Database: MongoDB Atlas

### Environment variables in CI

Remember to configure `VITE_API_URL` and any auth secrets in the dashboard.

---

## 13. References

-Facebook. (2025) *React: A JavaScript Library for Building User Interfaces*. Available at: https://react.dev (Accessed: 7 June 2025).

-PokeAPI. (2025) *PokeAPI*. Available at: https://pokeapi.co (Accessed: 13 June 2025).

-Sanjayttg. (2025) ‘JWT Authentication in React with react-router’, *dev.to*. Available at: https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03 (Accessed: 6 June 2025).

-DEV1003 EDstem. (2025) ‘Modules 3-4: React Lessons’. (Accessed: 7–13 June 2025).

-Yu, E. and Vite Contributors. (2025) *Vite: Next Generation Frontend Tooling*. Available at: https://vitejs.dev (Accessed: 8 June 2025).

-Remix Software. (2025) *React Router Documentation*. Available at: https://reactrouter.com (Accessed: 10 June 2025).

-Testing Library Contributors. (2025) *React Testing Library*. Available at: https://testing-library.com (Accessed: 13 June 2025).

-Meta Open Source. (2025) *Jest: Delightful JavaScript Testing*. Available at: https://jestjs.io (Accessed: 13 June 2025).

---

## 14. Licensing

- **Project License:**
  - This project is licensed under the MIT License (see [LICENSE](./LICENSE) for details).
- **Third-Party Licenses:**
  - All dependencies (React, Vite, Axios, Jest, etc..) are MIT licensed. No GPL or commercial-license software.

---

## 15. Environment & Configuration

- **Node Version:** Developed and tested on **Node.js 19 LTS**. Earlier versions are not guaranteed.
- **Browsers:** Chrome, Firefox, Safari, Edge.
- **Environment variables (`.env`):**

  ```env
  # Base URL of the authenticated API backend
  VITE_API_URL=https://api.example.com
  ```

  `VITE_` prefix is required for Vite to expose variables to the front-end code.

---

## 16. External APIs & Data

- **PokeAPI** (https://pokeapi.co) Pokémon species, moves, types, stats, nature, items and abilities used. Public REST API.
- **Pokémon Showdown Sprites** Animated GIF sprites Used for dynamic Pokémon images; see “External Assets” section for details. 
