# Learnings

## Challenges Faced

- **Port conflicts on macOS**: AirPlay Receiver silently occupies port 5000, returning a misleading `403 Forbidden` instead of a clear "port in use" error. Resolved by moving the backend to port 5001.
- **Tailwind CSS v4 migration**: `npm install tailwindcss` now installs v4 by default, which uses `@import "tailwindcss"` and `@theme inline` CSS blocks instead of the old `@tailwind base/components/utilities` directives and JS-based `tailwind.config.js` theme extension. Mixing v3-style config with v4 silently produced zero styling with no error, which was the hardest issue to diagnose.
- **Incomplete ShadCN CSS variable set**: Initially only defined `background`, `card`, `primary`, etc., and missed `--input` and `--ring`, causing form inputs to render with invisible borders. The fix was mapping the full standard ShadCN token set, not just the visually obvious ones.
- **`shadcn` CLI dependency resolution**: A missing `tslib` transitive dependency broke the CLI's codemod tool (`recast`), requiring an explicit `npm install -D tslib` and in one case a full `node_modules` reinstall.
- **TypeScript `verbatimModuleSyntax` + Vite**: Importing interfaces as regular (non-type) imports caused runtime `SyntaxError: does not provide an export named X`, since interfaces don't exist at runtime — fixed with `import type` everywhere types are imported.
- **zsh URL parsing**: Unquoted curl URLs with `?` and `&` get interpreted as glob patterns and background-job operators by zsh, requiring all test URLs to be quoted.

## Pain Points

- Tooling churn (Tailwind v4, newer Node versions) means copy-paste tutorials/configs from older sources break silently rather than with clear errors — required careful diagnosis from screenshots rather than stack traces alone.
- Coordinating two separate dev servers (backend + frontend) in separate terminal tabs is easy to forget, especially mid-debugging.

## Key Learnings

- Soft delete (`isDeleted` + `deletedAt`) combined with unique constraints on email/Aadhaar/PAN needs care: a soft-deleted user's email is still "taken" at the DB level unless queries explicitly filter `isDeleted: false`, which we did consistently in the repository layer.
- Centralizing Prisma error translation (e.g., `P2002` → 409 Conflict, `P2025` → 404) in one global error handler avoids repeating try/catch boilerplate in every service method.
- Defining Zod schemas once and mirroring them between backend (`validators/`) and frontend (`schemas/`) keeps validation rules in sync, though a shared package would be cleaner for a larger project.

## Future Improvements

- Add JWT-based authentication and route protection (currently the API is unauthenticated).
- Add a shared `types`/`schemas` package between backend and frontend to eliminate validation-rule duplication.
- Add React Testing Library tests for the frontend (currently only backend has automated tests).
- Add optimistic UI updates in React Query mutations instead of full refetch-on-success.
- Add audit logging (who created/updated/deleted each user) using the existing `version` field as a foundation.
- Containerize with Docker Compose (MySQL + backend + frontend) for one-command local setup.