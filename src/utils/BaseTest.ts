import { test as base, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

type TestData = {
  email: string;
  fullName: string;
};

export const test = base.extend<{ testData: TestData }>({
  testData: async ({}, use) => {
    const generated: TestData = {
      email: faker.internet.email(),
      fullName: faker.person.fullName(),
    };

    await use(generated);
  },
});

export class BaseTest {
  readonly test = test;
  readonly expect = expect;

  createPageObject<T>(PageObject: new (page: Page) => T, page: Page): T {
    return new PageObject(page);
  }
}

export { expect };
