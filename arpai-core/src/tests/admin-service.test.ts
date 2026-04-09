import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTimeseries, mapFollowupQueueItem, paginate } from '../services/admin-service';

test('paginate returns stable metadata', () => {
  const meta = paginate(2, 25, 77);
  assert.equal(meta.page, 2);
  assert.equal(meta.limit, 25);
  assert.equal(meta.total, 77);
  assert.equal(meta.total_pages, 4);
});

test('buildTimeseries creates daily buckets with defaults', () => {
  const today = new Date();
  const day = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const createdAt = day.toISOString();

  const series = buildTimeseries(7, {
    leads: [{ created_at: createdAt }],
    appointments: [],
    followups: [],
    inventory: [],
    duplicates: []
  });

  assert.equal(series.length, 7);
  assert.equal(series[6].leads_created, 1);
  assert.equal(series[6].appointments_set, 0);
});

test('followup queue item includes derived stage and provided message', () => {
  const row = mapFollowupQueueItem({
    id: 'lead-1',
    name: 'Jordan',
    assigned_rep: 'BDC Team',
    stage: 'mid',
    last_contact_date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  }, 'Can we confirm your visit time?');

  assert.equal(row.lead_id, 'lead-1');
  assert.equal(row.recommended_followup_stage, 'day7');
  assert.equal(row.recommended_next_message, 'Can we confirm your visit time?');
});
