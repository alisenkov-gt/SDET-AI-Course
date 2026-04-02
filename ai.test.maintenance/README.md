# AI Test Maintenance

Standalone Playwright project for the "test maintenance" learning path.

## Purpose
- keep this project separate from `ai.assist.framew.gen+test.code.gen`
- practice AI-assisted test repair and modernization in its own workspace
- use Chromium only, Page Object Model, and stable role-based locators

## Included setup
- `.github/prompts/outdated.test.case.prompt.md` for Copilot Agent mode
- `playwright.config.ts` configured for Chromium only
- `.gitignore` excluding `node_modules`, `test-results`, and `playwright-report`
- `src/pages/PlaywrightHomePage.ts` as the first page object
- `tests/main.navigation.spec.ts` as the starter automated test
- `docs/manual-test-case.md` with the manual test case version

## Suggested flow
1. Run the Playwright MCP server in your IDE.
2. Open Copilot in Agent mode and choose Claude Sonnet.
3. Use `.github/prompts/outdated.test.case.prompt.md` as context.
4. Ask Copilot to explore `https://playwright.dev/` and generate or maintain tests in this project.
5. Run `npm test` and review the HTML report with `npm run report`.

## Commands
```bash
npm install
npm test
npm run report
```

## Notes
- The starter exercise validates the current `Docs`, `API`, and `Community` navigation links on `https://playwright.dev/`.
- The extra validation is already included: the links are checked for expected destinations, not only visibility.
