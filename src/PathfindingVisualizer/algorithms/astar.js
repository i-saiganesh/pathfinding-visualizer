// A* Algorithm (The "Smart" Search)
// It uses a Heuristic (Manhattan Distance) to guess which nodes are promising.
// F = G + H
// G = Distance from start
// H = Distance to finish (Heuristic)

export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0; // G-Score
  startNode.totalDistance = 0; // F-Score
  
  let unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {
    // Sort by Total Distance (F-Score)
    sortByTotalDistance(unvisitedNodes);
    
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) continue;
    
    // If we are trapped
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedNodesInOrder;

    updateUnvisitedNeighbors(closestNode, grid, finishNode);
  }
  return visitedNodesInOrder;
}

function sortByTotalDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance);
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    // Calculate new distance (G-Score)
    const newDistance = node.distance + 1;
    
    // If we found a shorter path to this neighbor
    if (newDistance < neighbor.distance) {
      neighbor.distance = newDistance;
      // Calculate Heuristic (H-Score) -> Manhattan Distance
      const distanceToFinish = Math.abs(neighbor.col - finishNode.col) + Math.abs(neighbor.row - finishNode.row);
      // F-Score = G + H
      neighbor.totalDistance = newDistance + distanceToFinish;
      neighbor.previousNode = node;
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}