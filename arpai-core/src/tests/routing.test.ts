import test from 'node:test';
import assert from 'node:assert/strict';
import { routeLead } from '../services/routing-service';

test('routing prevents duplicate touch when AI and human already contacted', () => {
  const routed = routeLead('price', true, true);
  assert.equal(routed.conflict_prevented, true);
  assert.equal(routed.assigned_rep, 'none');
});
