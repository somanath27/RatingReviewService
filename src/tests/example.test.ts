// tests/example.test.ts

describe('Simple Test', () => {
  it('should add two numbers', () => {
    const sum = (a: number, b: number) => a + b;
    expect(sum(1, 2)).toBe(3);
  });
});
