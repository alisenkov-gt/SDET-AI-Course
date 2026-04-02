# AI Test Maintenance

## Goal
Extend the existing Playwright framework without creating duplicate files:
- add support for a new UI element in an existing Page Object
- update an existing test to use it
- keep the same project conventions

## What I did

### 1. Checked the project structure
I first reviewed the existing repository to understand what was already available.

My thought:
"I should reuse the current page objects and tests instead of adding parallel files."

Small feedback:
The project structure made it clear where page objects and specs belonged.

### 2. Reviewed the existing pattern
I opened the current Page Objects and test files to see how locators and reusable methods were written.

What I noticed:
- locators are defined inside page classes
- reusable actions are exposed as methods
- tests rely on page objects
- selectors use stable `data-test` attributes

My thought:
"The new element needs to follow the same style so it fits into the framework cleanly."

Small feedback:
This review avoided mismatched naming and duplicate patterns.

### 3. Chose the new UI element
I used the inventory sort dropdown as the new element.

Why:
- it already exists in SauceDemo
- it fits the exercise
- it can be added by extending an existing Page Object

Element used:
- `data-test="product-sort-container"`

### 4. Extended the existing Page Object
I updated `src/pages/InventoryPage.ts`.

I added:
- a locator for the sort dropdown
- a reusable `sortBy()` method
- a reusable `assertSortValue()` method
- reusable verification methods for inventory assertions

My thought:
"Selectors should stay inside the page class, and the test should call methods only."

Small feedback:
Reusing the existing page object kept the change small and consistent.

### 5. Updated the test
I updated the existing spec in `tests/e2e/swag.spec.ts`.

What changed:
- the test logs in with shared test data
- selects the sort value `lohi`
- verifies the selected dropdown value
- verifies the first visible item after sorting

I also added the required comments:
- `// Initialization`
- `// User actions`
- `// Verification`

My thought:
"The test should express user behavior clearly and avoid direct selectors."

Small feedback:
The comments made the scenario easier to read and review.

### 6. Aligned the code with quality rules
I reviewed the implementation against the maintenance standards and made small fixes.

What I improved:
- moved shared SauceDemo users/items/prices into `src/fixtures/sauceDemoData.ts`
- removed page object locator usage from the test body
- kept web-first assertions and avoided hard waits

My thought:
"The exercise should not only work, it should also match the repo standards for reuse and maintainability."

Small feedback:
These small cleanup steps made the final result stronger without changing the framework shape.

## Files involved

```ts
// path: src/pages/InventoryPage.ts
// path: src/fixtures/sauceDemoData.ts
// path: tests/e2e/swag.spec.ts
```

## Result
The framework was extended through the existing files, with no duplicate page objects, stable selectors inside classes, shared data moved into fixtures, and tests written against reusable methods.
