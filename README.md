# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## Deployment

- GitHub Actions deploys on pushes to `main` using `peaceiris/actions-gh-pages` to the `gh-pages` branch.
- The site is configured for the custom domain `zuice.in` via the action’s `cname` setting.
- Vite production `base` is set to `/` in `vite.config.js` to support root-domain hosting.
- If hosting under a repository subpath (e.g., GitHub Pages without a custom domain), set `config.base = '/<repo-name>/'` and remove the `cname` from the workflow.
- External map data is fetched from `raw.githubusercontent.com` and `gist.githubusercontent.com` over HTTPS. When unavailable, boundary controls are disabled gracefully to avoid broken UI.
- To verify locally:
  - `npm ci && npm run build`
  - Serve `dist` (e.g., `npm run preview`) and check routes and assets load correctly.
