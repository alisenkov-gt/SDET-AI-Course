export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
} as const;

export const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'] as const;

export const prices: Record<(typeof items)[number], number> = {
  'Sauce Labs Backpack': 29.99,
  'Sauce Labs Bike Light': 9.99,
};
