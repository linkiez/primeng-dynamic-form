/** Dependency chain validation for planning initiatives. */

/** A node in the dependency graph. */
export interface DependencyNode {
  id: string;
  /** IDs of initiatives this one depends on (must be completed first). */
  dependsOn: string[];
}

/** Result of a dependency chain validation. */
export interface DependencyChainValidationResult {
  /** Whether the dependency graph is valid (no cycles). */
  valid: boolean;
  /** Cycle paths found, each as an ordered list of initiative IDs. */
  cycles: string[][];
  /** IDs that are referenced as dependencies but not present in the node list. */
  missingDependencies: string[];
}

/**
 * Detects cycles in a directed dependency graph using DFS.
 *
 * @param id - Current node.
 * @param nodes - Map of all nodes keyed by ID.
 * @param visited - Nodes fully processed.
 * @param inStack - Nodes on the current DFS stack.
 * @param path - Current traversal path.
 * @param cycles - Accumulator for detected cycle paths.
 */
function detectCycles(
  id: string,
  nodes: Map<string, DependencyNode>,
  visited: Set<string>,
  inStack: Set<string>,
  path: string[],
  cycles: string[][],
): void {
  if (inStack.has(id)) {
    const cycleStart = path.indexOf(id);
    cycles.push(path.slice(cycleStart));
    return;
  }
  if (visited.has(id)) {
    return;
  }

  visited.add(id);
  inStack.add(id);
  path.push(id);

  const node = nodes.get(id);
  if (node) {
    for (const dep of node.dependsOn) {
      detectCycles(dep, nodes, visited, inStack, path, cycles);
    }
  }

  path.pop();
  inStack.delete(id);
}

/**
 * Validates that a set of dependency nodes forms a valid DAG
 * (no cycles, no references to unknown nodes).
 *
 * @param nodes - List of dependency nodes to validate.
 * @returns Validation result with cycle paths and missing references.
 */
export function validateDependencyChain(
  nodes: DependencyNode[],
): DependencyChainValidationResult {
  const nodeMap = new Map<string, DependencyNode>(nodes.map((n) => [n.id, n]));
  const visited = new Set<string>();
  const cycles: string[][] = [];
  const missingDependencies: string[] = [];

  for (const node of nodes) {
    for (const dep of node.dependsOn) {
      if (!nodeMap.has(dep) && !missingDependencies.includes(dep)) {
        missingDependencies.push(dep);
      }
    }
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      detectCycles(node.id, nodeMap, visited, new Set<string>(), [], cycles);
    }
  }

  return {
    valid: cycles.length === 0 && missingDependencies.length === 0,
    cycles,
    missingDependencies,
  };
}
