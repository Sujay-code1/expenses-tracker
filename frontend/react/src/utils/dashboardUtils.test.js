import test from 'node:test';
import assert from 'node:assert/strict';
import { getTodayTopEntries, getTodaySummary } from './dashboardUtils.js';

test('returns top three today entries sorted by amount desc', () => {
  const entries = [
    { amount: 2500, date: '2026-08-15T08:00:00.000Z', category: 'Food' },
    { amount: 1200, date: '2026-08-15T10:00:00.000Z', category: 'Fuel' },
    { amount: 6000, date: '2026-08-15T12:00:00.000Z', category: 'Rent' },
    { amount: 3500, date: '2026-08-14T07:00:00.000Z', category: 'Old' },
  ];

  const result = getTodayTopEntries(entries, 'expense');
  assert.equal(result.length, 3);
  assert.equal(result[0].category, 'Rent');
  assert.equal(result[1].amount, 2500);
});

test('returns empty summary when there is no data for today', () => {
  const summary = getTodaySummary([], 'income');
  assert.deepEqual(summary, { total: 0, items: [], label: 'No data available for today' });
});
