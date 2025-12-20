// Depth First Search (DFS)
// It explores as far as possible along each branch before backtracking.
// It uses a STACK (Last In, First Out) approach.

export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const stack = [];
  
  stack.push(startNode);

  while (stack.length) {
    const currentNode = stack.pop();

    // If we hit a wall, skip
    if (currentNode.isWall) continue;

    // If we already visited this node, skip
    if (currentNode.isVisited) continue;

    // Mark as visited
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    // If we reached the end, we are done!
    if (currentNode === finishNode) return visitedNodesInOrder;

    // Get neighbors
    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    
    // Add neighbors to stack
    for (const neighbor of neighbors) {
      neighbor.previousNode = currentNode;
      stack.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  // Check Up, Down, Left, Right
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
  // Only return ones that aren't visited yet
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

// Same backtracking function as Dijkstra
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}