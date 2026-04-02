import { test as base, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

type TestData = {
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  postalCode: string;
};

export const test = base.extend<{ testData: TestData }>({
  testData: async ({}, use) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const generated: TestData = {
      email: faker.internet.email({ firstName, lastName }),
      fullName: `${firstName} ${lastName}`,
      firstName,
      lastName,
      postalCode: faker.location.zipCode(),
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
