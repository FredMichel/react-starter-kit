/**
 * Basic test to verify test infrastructure is working
 * This file will be replaced with actual component tests
 */

import { describe, it, expect } from 'vitest';

describe('Test Infrastructure', () => {
  it('should be able to run basic tests', () => {
    expect(1 + 1).toBe(2);
  });

  it('should have access to vitest globals', () => {
    expect(describe).toBeDefined();
    expect(it).toBeDefined();
    expect(expect).toBeDefined();
  });
});