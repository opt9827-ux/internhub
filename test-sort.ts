import { test } from 'node:test';
import * as assert from 'node:assert';

const mockInternships = [
  { slug: 'job-1', title: 'Old Job', company: 'Corp A', deadline: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() },
  { slug: 'job-2', title: 'Future Job', company: 'Corp B', deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() },
  { slug: 'job-3', title: 'Expiring Soon', company: 'Corp C', deadline: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString() },
  { slug: 'job-4', title: 'No Deadline', company: 'Corp D', deadline: null },
];

function sortInternships(internships: any[]) {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const expiringInternships = internships.filter(job => {
    if (!job.deadline) return false;
    const deadline = new Date(job.deadline);
    return deadline >= now && deadline <= tomorrow;
  });

  const otherInternships = internships.filter(job => {
    if (!job.deadline) return true;
    const deadline = new Date(job.deadline);
    return deadline < now || deadline > tomorrow;
  });

  return [...expiringInternships, ...otherInternships];
}

test('Expiring internships appear first', () => {
    const sorted = sortInternships(mockInternships);
    assert.strictEqual(sorted[0].slug, 'job-3');
    assert.strictEqual(sorted.length, 4);
    console.log("Sort test passed.");
});
