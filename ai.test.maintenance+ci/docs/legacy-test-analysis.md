# Legacy Test Analysis

## Scope
This report reviews `tests/main.navigation.spec.ts` against the manual test case in `docs/manual-test-case.md`.

Manual source of truth:
- `Docs`, `API`, and `Community` must be visible
- each item must be accessible as a navigation link by role and name
- each item must navigate to the correct destination

Chapter note:
- No code changes applied in Chapter 2.
- The degraded spec is intentionally left in place for repair in Chapter 3.

## Prioritized Checklist Of Issues

### 1. Critical: brittle selector in navigation flow
Category:
- selector quality
- flakiness
- maintenance cost

Issue:
- `tests/main.navigation.spec.ts` uses `page.locator('#docs').click()` instead of the existing role-based Page Object method.

Impact:
- ID selectors are tightly coupled to markup details and can break after small DOM changes.
- The spec bypasses the Page Object Model and duplicates locator knowledge in the test.
- The selector does not validate accessibility intent, because it ignores role and accessible name.

Recommended fix category:
- move the interaction back into the Page Object
- use `getByRole('link', { name: 'Docs' })`

### 2. Critical: fixed wait introduces flaky synchronization
Category:
- synchronization
- flakiness

Issue:
- `tests/main.navigation.spec.ts` uses `await page.waitForTimeout(2000)`.

Impact:
- fixed waits slow the suite on fast runs and still fail on slow runs
- timing-based sync is brittle under network or CI variance
- the test no longer reflects a web-first Playwright style

Recommended fix category:
- replace the hard wait with state-based assertions such as URL and heading checks

### 3. High: test bypasses reusable page-object actions
Category:
- readability/reuse
- duplication risk

Issue:
- the spec mixes direct page actions with `PlaywrightHomePage` methods instead of using one pattern consistently.

Impact:
- maintenance becomes harder because behavior is split across the spec and the page class
- future locator changes must be updated in more than one place

Recommended fix category:
- keep selectors and actions inside `src/pages/PlaywrightHomePage.ts`
- let the spec call page methods only

### 4. Medium: accessibility coverage is indirect rather than explicit
Category:
- accessibility
- coverage

Issue:
- the test relies on role-based locators inside the Page Object for most checks, but it does not explicitly verify that the navigation elements remain accessible by role and name after changes.

Impact:
- regressions in accessible naming could be missed if the test is later weakened further
- the manual test case explicitly includes accessibility expectations

Recommended fix category:
- keep role-based locators
- add clear assertions or clearly named page-object methods that reflect accessible navigation expectations

### 5. Medium: navigation coverage is uneven across the two tests
Category:
- coverage
- readability

Issue:
- the first test checks visibility and href targets, while the second test checks actual navigation.
- coverage is split in a way that can make failures less obvious during maintenance.

Impact:
- reviewers must inspect both tests together to understand complete requirement coverage
- future edits can accidentally remove part of the requirement without noticing

Recommended fix category:
- clarify the responsibility of each test
- keep one test for presence/accessibility and one test for navigation, but make the separation explicit and consistent

### 6. Low: unused import adds noise
Category:
- readability

Issue:
- `expect` is imported in `tests/main.navigation.spec.ts` but not used directly.

Impact:
- minor readability issue
- can hide larger cleanup problems over time

Recommended fix category:
- remove unused imports during refactor

## Additional Findings AI Might Miss

### Missing explicit assertion that all three links are in the main navigation area
The manual test case mentions the page header navigation area, but the current spec only checks link visibility. It does not assert that the links belong to a navigation landmark or header region.

Impact:
- a link could move to another section of the page and still satisfy the current assertions

### Accessibility intent is partially delegated to implementation details
Because the Page Object uses role locators, the current test looks accessibility-friendly, but the spec itself does not make that requirement obvious. A weaker future change could bypass accessibility checks without triggering review attention.

Impact:
- accessibility coverage can erode silently during future maintenance

### Duplication risk between destination assertions and page navigation assertions
The suite checks link `href` values in one test and actual loaded pages in another. This is useful, but it can drift if one side is updated and the other is not.

Impact:
- duplicated intent can create inconsistent maintenance updates

### The spec no longer follows the project rule "tests call methods only"
This is a maintainability concern beyond selector quality. The direct locator usage is not just brittle, it also breaks the framework convention established for this project.

Impact:
- reduces consistency across the test suite
- makes AI-generated updates more likely to mix styles

## Summary
The most urgent issues are:
1. brittle raw selector usage
2. fixed wait synchronization
3. mixed spec/Page Object responsibilities

These issues increase flakiness, maintenance cost, and inconsistency with the project’s Playwright standards. The spec should remain degraded for Chapter 3, where the actual repair and refactor will be performed.
