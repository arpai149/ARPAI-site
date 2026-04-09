import test from 'node:test';
import assert from 'node:assert/strict';
import { determineFollowupStage } from '../services/followup-service';

const isoDaysAgo = (days: number): string => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

test('followup stage day1 for recent contact', () => {
  assert.equal(determineFollowupStage(isoDaysAgo(1)), 'day1');
});

test('followup stage reengage for older contact', () => {
  assert.equal(determineFollowupStage(isoDaysAgo(10)), 'reengage');
});
