const converter = require('./converter');
// const process = require('process');
// const cp = require('child_process');
// const path = require('path');

test('throws required semver', () => {
  expect(() => converter()).toThrow('semver is required');
});

test('throws required zero_pad', () => {
  expect(() => converter('1.0.0', null)).toThrow('zero_pad is required');
});

test('throws zero_pad number', () => {
  expect(() => converter('1.0.0', 'test')).toThrow('zero_pad must be a number');
});

test('throws zero_pad positive number', () => {
  expect(() => converter('1.0.0', -1)).toThrow('zero_pad must be a number');
});

test('1.0.0 should be 1000000999999', () => {
  const semver = '1.0.0';
  const result = converter(semver);
  expect(result).toBe(1000000999999);
});

test('1.2.3 should be 1002003999999', () => {
  const semver = '1.2.3';
  const result = converter(semver);
  expect(result).toBe(1002003999999);
});

test('12.34.567 should be 12034567999999', () => {
  const semver = '12.34.567';
  const result = converter(semver);
  expect(result).toBe(12034567999999);
});

test('1.2.0-1 should be 1002000000001', () => {
  const semver = '1.2.0-1';
  const result = converter(semver);
  expect(result).toBe(1002000000001);
});

test('1.2.0-alpha should be 1002000100000', () => {
  const semver = '1.2.0-alpha';
  const result = converter(semver);
  expect(result).toBe(1002000100000);
});

test('1.2.0-alpha.2 should be 1002000100002', () => {
  const semver = '1.2.0-alpha.2';
  const result = converter(semver);
  expect(result).toBe(1002000100002);
});

test('1.2.0-alpha.beta should be 1002000100200', () => {
  const semver = '1.2.0-alpha.beta';
  const result = converter(semver);
  expect(result).toBe(1002000100200);
});

test('1.2.0-beta.2 should be 1002000200002', () => {
  const semver = '1.2.0-beta.2';
  const result = converter(semver);
  expect(result).toBe(1002000200002);
});

test('1.2.0-rc.2 should be 1002000300002', () => {
  const semver = '1.2.0-rc.2';
  const result = converter(semver);
  expect(result).toBe(1002000300002);
});

test('12.34.56 with zero_pad to 2 should be 10 length', () => {
  const semver = '12.34.56';
  const result = converter(semver, 2);
  expect(String(result)).toHaveLength(10);
});

test('1.0.0-alpha < 1.0.0-alpha.1', () => {
  const resultFirst = converter('1.0.0-alpha');
  const resultSecond = converter('1.0.0-alpha.1');
  expect(resultFirst).toBeLessThan(resultSecond);
});

test('1.0.0-alpha.1 < 1.0.0-alpha.beta', () => {
  const resultFirst = converter('1.0.0-alpha.1');
  const resultSecond = converter('1.0.0-alpha.beta');
  expect(resultFirst).toBeLessThan(resultSecond);
});

test('1.0.0-alpha.beta < 1.0.0-beta', () => {
  const resultFirst = converter('1.0.0-alpha.beta');
  const resultSecond = converter('1.0.0-beta');
  expect(resultFirst).toBeLessThan(resultSecond);
});

test('1.0.0-beta < 1.0.0-beta.2', () => {
  const resultFirst = converter('1.0.0-beta');
  const resultSecond = converter('1.0.0-beta.2');
  expect(resultFirst).toBeLessThan(resultSecond);
});

test('1.0.0-beta.2 < 1.0.0-beta.11', () => {
  const resultFirst = converter('1.0.0-beta.2');
  const resultSecond = converter('1.0.0-beta.11');
  expect(resultFirst).toBeLessThan(resultSecond);
});

test('1.0.0-beta.11 < 1.0.0-rc.1', () => {
  const resultFirst = converter('1.0.0-beta.11');
  const resultSecond = converter('1.0.0-rc.1');
  expect(resultFirst).toBeLessThan(resultSecond);
});

test('1.0.0-rc.1 < 1.0.0', () => {
  const resultFirst = converter('1.0.0-rc.1');
  const resultSecond = converter('1.0.0');
  expect(resultFirst).toBeLessThan(resultSecond);
});

test('1.0.0 < 2.0.0', () => {
  const resultFirst = converter('1.0.0');
  const resultSecond = converter('2.0.0');
  expect(resultFirst).toBeLessThan(resultSecond);
});

test('2.0.0 < 2.1.0', () => {
  const resultFirst = converter('2.0.0');
  const resultSecond = converter('2.1.0');
  expect(resultFirst).toBeLessThan(resultSecond);
});

test('2.1.0 < 2.1.1', () => {
  const resultFirst = converter('2.1.0');
  const resultSecond = converter('2.1.1');
  expect(resultFirst).toBeLessThan(resultSecond);
});
