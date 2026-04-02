# AI Test Maintenance

Standalone Playwright project for the "test maintenance" learning path.

## Purpose
- keep this project separate from `ai.assist.framew.gen+test.code.gen`
- practice AI-assisted test repair and modernization in its own workspace
- use Chromium only, Page Object Model, and stable role-based locators

## Included setup
- `.github/prompts/outdated.test.case.prompt.md` for Copilot Agent mode
- `.github/workflows/playwright-tests.yml` for pull request CI in GitHub Actions
- `playwright.config.ts` configured for Chromium only
- `.gitignore` excluding `node_modules`, `test-results`, and `playwright-report`
- `src/pages/PlaywrightHomePage.ts` as the shared page object
- `tests/main.navigation.spec.ts` as the canonical active navigation suite
- archived chapter snapshots in `tests/main.navigation.refactored.spec.ts` and `tests/main.navigation.professional.spec.ts`
- `docs/manual-test-case.md` with the manual test case version
- `docs/legacy-test-analysis.md`, `docs/refactoring-summary.md`, `docs/professional-review.md`, and `docs/suite-maintenance-summary.md` for the maintenance chapters

## Suggested flow
1. Run the Playwright MCP server in your IDE.
2. Open Copilot in Agent mode and choose Claude Sonnet.
3. Use `.github/prompts/outdated.test.case.prompt.md` as context.
4. Ask Copilot to explore `https://playwright.dev/` and generate or maintain tests in this project.
5. Run `yarn playwright test` locally and review the HTML report with `yarn playwright show-report`.
6. Open a pull request to trigger `.github/workflows/playwright-tests.yml`.

## Commands
```bash
corepack enable
yarn install --immutable --immutable-cache --check-cache
yarn playwright install --with-deps
yarn playwright test
yarn playwright show-report
```

## Notes
- The active suite validates the current `Docs`, `API`, and `Community` navigation links on `https://playwright.dev/`.
- The active spec includes traceability (`TC-NAV-001`), accessibility checks, destination checks, and uniqueness/enabled-state coverage for the required links.
- CI runs only on pull requests targeting `main`, uses `ubuntu-latest`, installs dependencies with Yarn, and uploads the Playwright HTML report and traces as artifacts.
