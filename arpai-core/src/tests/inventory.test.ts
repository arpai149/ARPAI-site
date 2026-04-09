import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeInventory } from '../services/inventory-service';

test('inventory analysis returns drop for stale and weak pricing', () => {
  const result = analyzeInventory(50000, 49900, 90);
  assert.equal(result.urgency, 'high');
  assert.equal(result.pricing_position, 'weak');
  assert.equal(result.recommended_action, 'drop');
});

test('inventory analysis returns push for medium urgency and strong pricing', () => {
  const result = analyzeInventory(40000, 37000, 50);
  assert.equal(result.urgency, 'medium');
  assert.equal(result.pricing_position, 'strong');
  assert.equal(result.recommended_action, 'push');
});
