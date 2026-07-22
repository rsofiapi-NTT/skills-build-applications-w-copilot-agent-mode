# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` in `.env.local` when running from GitHub Codespaces:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API URLs as:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to:

```text
http://localhost:8000/api
```

## Commands

```bash
npm run dev --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
```
