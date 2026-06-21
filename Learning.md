# Learnings

## Challenges Faced

- **Port problem on Mac**: Port 5000 was already used by Apple's AirPlay Receiver on Mac. It gave a confusing `403 Forbidden` error instead of saying "port already in use". Fixed it by changing backend port to 5001.

- **Tailwind CSS v4 problem**: When we installed Tailwind, it installed the new v4 version by default. This version works differently from v3 — it uses `@import "tailwindcss"` instead of the old `@tailwind base/components/utilities` lines, and theme colors are set in CSS using `@theme inline` instead of `tailwind.config.js`. Because we used old v3 style code with new v4, the whole UI looked unstyled (like plain HTML) and there was no error message at all. This was the hardest bug to find because nothing told us what was wrong.

- **Missing ShadCN color variables**: We forgot to add `--input` and `--ring` CSS variables. Because of this, input boxes in forms had no visible border — they looked "invisible" or transparent. Fixed it by adding the complete set of ShadCN color variables, not just the obvious ones like background and primary.

- **shadcn CLI install error**: While adding ShadCN components, the CLI command failed because of a missing package called `tslib`. Had to install it manually, and one time even had to delete `node_modules` completely and reinstall everything fresh.

- **TypeScript import error**: We were importing TypeScript interfaces (types) the normal way, but this caused a runtime error saying the export doesn't exist. This happens because interfaces only exist at compile time, not at runtime. Fixed by using `import type` instead of normal `import` for all type-only imports.

- **zsh terminal URL issue**: On Mac terminal (zsh), if you write a curl command with `?` and `&` in the URL without quotes, zsh thinks they are special symbols (like background job operators) and the command fails. Fixed by always putting URLs in quotes.

- **Switched database from MySQL to PostgreSQL (Supabase)**: We had to move from local MySQL to Supabase because we needed a free database for deployment. Good news — Prisma made this easy, we just had to change one line (`provider = "postgresql"`) and nothing else in the schema needed to change.

- **Supabase connection pooler confusion**: Supabase gives you different ways to connect to the database — Direct, Transaction Pooler, and Session Pooler. Using the wrong one (Transaction Pooler) gave errors like `prepared statement already exists`. The Direct connection also didn't work because it needs IPv6, which many home/college networks in India don't have. The fix was using the **Session Pooler** connection, which works on normal internet and doesn't break Prisma.

- **Render used a very new Node.js version by default**: Render picked Node 24 automatically, which broke Prisma (`Cannot find module` errors). We had to add a `.node-version` file to force Render to use Node 20 instead.

- **Prisma CLI and Prisma Client version mismatch**: We accidentally updated only the `prisma` CLI package without updating `@prisma/client` to the same version. Both packages need to be on the exact same version or Prisma breaks. Fixed by installing both together with the same version number.

- **Production mode skips dev dependencies**: When `NODE_ENV=production` is set, `npm install` skips installing devDependencies. This caused two problems — the `prisma` CLI wasn't available, and later `typescript`/`@types/node` weren't available for the build. Fixed by using `npm ci --include=dev` in the Render build command so dev packages get installed too.

- **Render cache kept old broken files**: Even after clicking "clear cache", Render sometimes kept old broken installs. Switching from `npm install` to `npm ci` fixed this because `npm ci` always deletes `node_modules` and installs fresh every time.

- **Wrong files inside tsconfig.json**: Our `tsconfig.json` had some extra wrong file paths in the `include` list (pointing to frontend files by mistake), which caused build errors on Render. Fixed by cleaning up the `include` list to only have backend `src` files.

- **TypeScript baseUrl deprecation warning**: Newer TypeScript versions show a warning that `baseUrl` (used for `@/` style imports) is getting old. Since we still need it for our import style, we added `"ignoreDeprecations": "6.0"` to silence the warning.

## Pain Points

- New tools keep changing fast (like Tailwind v4, new Node versions), so old tutorials and configs break silently without giving clear error messages. We had to debug using screenshots and trial-and-error a lot.
- Running two servers (backend and frontend) in two different terminal tabs is easy to forget, especially while debugging something else.
- Deploying to free hosting services (Render, Vercel, Supabase) needed a lot of small config changes that aren't obvious from their documentation alone.

## Key Learnings

- Soft delete (`isDeleted` + `deletedAt`) needs extra care with unique fields like email, Aadhaar, PAN. Even after "deleting" a user, their email is still counted as "used" in the database unless we filter `isDeleted: false` properly in every query. We handled this correctly in the repository layer.
- Putting all Prisma error handling in one place (global error handler) — like converting error code `P2002` to 409 Conflict and `P2025` to 404 — saves us from writing the same try/catch code again and again in every service function.
- Writing the same validation rules (Zod schemas) in both backend and frontend keeps things consistent, but it means writing the same rules twice. A shared package between both would be better for bigger projects.
- For deployment, always check which Node.js version the hosting platform uses by default — don't assume it matches your local machine.
- When using Prisma with a pooled/serverless database connection (like Supabase), always check which pooling mode you're using — it can break things in ways that are hard to understand from the error message alone.

## Future Improvements

- Add JWT login/authentication so the API isn't open to everyone.
- Create one shared `types`/`schemas` folder used by both backend and frontend, instead of writing validation twice.
- Add frontend tests using React Testing Library (only backend has tests right now).
- Make the UI update instantly after add/edit/delete (optimistic update) instead of waiting for a full refetch.
- Add a log of who created, updated, or deleted each user, using the `version` field as a starting point.
- Add Docker Compose so the whole project (database + backend + frontend) can start with one command.
- Move backend off Render's free tier since it sleeps after 15 minutes and takes 30-50 seconds to wake up — not good for real use.
- Split the frontend JavaScript bundle into smaller chunks since it's currently bigger than the recommended size (529 KB).