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

test('1.2.0-1 should be 1002000999001', () => {
  const semver = '1.2.0-1';
  const result = converter(semver);
  expect(result).toBe(1002000999001);
});

test('1.2.0-alpha.2 should be 1002000001002', () => {
  const semver = '1.2.0-alpha.2';
  const result = converter(semver);
  expect(result).toBe(1002000001002);
});

test('1.2.0-beta.2 should be 1002000002002', () => {
  const semver = '1.2.0-beta.2';
  const result = converter(semver);
  expect(result).toBe(1002000002002);
});

test('1.2.0-rc.2 should be 1002000003002', () => {
  const semver = '1.2.0-rc.2';
  const result = converter(semver);
  expect(result).toBe(1002000003002);
});

test('1.2.3 with zero_pad to 2 should be 102039999', () => {
  const semver = '1.2.3';
  const result = converter(semver, 2);
  expect(result).toBe(102039999);
});

test('1.2.3-4 with zero_pad to 2 should be 102039904', () => {
  const semver = '1.2.3-4';
  const result = converter(semver, 2);
  expect(result).toBe(102039904);
});


test('1.2.3-alpha.4 with zero_pad to 2 should be 102030104', () => {
  const semver = '1.2.3-alpha.4';
  const result = converter(semver, 2);
  expect(result).toBe(102030104);
});
