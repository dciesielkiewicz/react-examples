import { generateId } from './utils';

describe('TodoList utils', () => {
  test('generateId', () => {
    expect(generateId([])).toBe(1);
    expect(generateId([{ id: 1, title: '1', checked: false }])).toBe(2);
    expect(generateId([{ id: 2, title: '2', checked: false }])).toBe(3);
    expect(generateId([{ id: 3, title: '3', checked: false }, { id: 1, title: '1', checked: false }])).toBe(4);
  });
});
