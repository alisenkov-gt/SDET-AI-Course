# Playwright + TypeScript QA Starter

Minimal Playwright + TypeScript + Faker scaffold with page objects and shared fixtures.

## Prerequisites
- Node.js 18+
- Browsers installed via Playwright: `npx playwright install`

## Install
```bash
npm install
```

## Run tests
```bash
npm run test
```

## Debug tests
```bash
npm run test:debug
```

## Structure
- `src/pages` — page objects (`BasePage`, `HomePage`).
- `src/utils` — shared fixtures/utilities (`BaseTest`).
- `tests/e2e` — end-to-end specs.
- `playwright.config.ts` — Playwright project configuration.

