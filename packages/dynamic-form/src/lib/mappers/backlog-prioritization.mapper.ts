import type { InitiativeForPrioritization } from '../models/initiative.model';
import type { PrioritizedEntry } from '../models/roadmap.types';
import { computePriorityScore } from './priority-score.mapper';

/** Sorted and ranked backlog output. */
export interface PrioritizedBacklog {
  entries: PrioritizedEntry[];
}

/**
 * Transforms a list of initiatives into a sorted, ranked backlog.
 *
 * Sorting is deterministic: entries are ordered by `priorityScore` descending.
 * When two initiatives share the same score, the original list order is preserved
 * (stable sort).
 *
 * @param initiatives - List of initiatives with priority and risk data.
 * @returns Backlog with entries ranked 1..n.
 */
export function prioritizeBacklog(initiatives: InitiativeForPrioritization[]): PrioritizedBacklog {
  const scored = initiatives.map((initiative) => {
    const { score } = computePriorityScore({
      priority: initiative.priority,
      risk: initiative.risk,
      dependantCount: initiative.dependantCount,
    });
    return { id: initiative.id, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const entries: PrioritizedEntry[] = scored.map((item, index) => ({
    initiativeId: item.id,
    priorityScore: item.score,
    rank: index + 1,
  }));

  return { entries };
}
