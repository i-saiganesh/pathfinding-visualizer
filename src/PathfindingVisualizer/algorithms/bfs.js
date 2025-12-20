// Breadth-First Search (BFS)
// It explores neighbors layer by layer (like a ripple in water).
// It guarantees the shortest path in an unweighted grid.

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const queue = []; // BFS uses a QUEUE (First In, First Out)
  
  queue.push(startNode);
  startNode.isVisited = true;

  while (queue.length) {
    const currentNode = queue.shift(); // Take from the front
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      queue.push(neighbor); // Add to the back
    }
  }
  return visitedNodesInOrder;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}