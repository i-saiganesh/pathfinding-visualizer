import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra';
import { dfs } from './algorithms/dfs';
import { bfs } from './algorithms/bfs';
import { astar } from './algorithms/astar';
import { getRecursiveDivisionMaze } from './algorithms/mazeGenerator';
import './Node/Node.css';

// --- HELPERS DEFINED AT TOP TO PREVENT ERRORS ---
const getInitialGrid = (startRow, startCol, finishRow, finishCol) => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row, startRow, startCol, finishRow, finishCol));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row, startRow, startCol, finishRow, finishCol) => {
  return {
    col,
    row,
    isStart: row === startRow && col === startCol,
    isFinish: row === finishRow && col === finishCol,
    distance: Infinity,
    totalDistance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

// --- MAIN COMPONENT ---
export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  // Start/Finish Node Positions
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [startNodeCol, setStartNodeCol] = useState(15);
  const [finishNodeRow, setFinishNodeRow] = useState(10);
  const [finishNodeCol, setFinishNodeCol] = useState(35);

  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingFinish, setIsDraggingFinish] = useState(false);

  useEffect(() => {
    console.log("Initializing Grid..."); // DEBUG LOG
    const grid = getInitialGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    setGrid(grid);
  }, [startNodeRow, startNodeCol, finishNodeRow, finishNodeCol]);

  // --- MOUSE HANDLERS ---
  const handleMouseDown = (row, col) => {
    if (isRunning) return;
    if (row === startNodeRow && col === startNodeCol) {
      setIsDraggingStart(true);
      setMouseIsPressed(true);
      return;
    }
    if (row === finishNodeRow && col === finishNodeCol) {
      setIsDraggingFinish(true);
      setMouseIsPressed(true);
      return;
    }
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (isRunning || !mouseIsPressed) return;
    if (isDraggingStart) {
      if (grid[row][col].isWall || grid[row][col].isFinish) return;
      setStartNodeRow(row);
      setStartNodeCol(col);
      return;
    }
    if (isDraggingFinish) {
      if (grid[row][col].isWall || grid[row][col].isStart) return;
      setFinishNodeRow(row);
      setFinishNodeCol(col);
      return;
    }
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setIsDraggingStart(false);
    setIsDraggingFinish(false);
  };

  // --- ANIMATIONS ---
  const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node) {
            const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
            if (nodeElement && !node.isStart && !node.isFinish) {
                nodeElement.className = 'node node-visited';
            }
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node) {
            const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
            if (nodeElement && !node.isStart && !node.isFinish) {
                nodeElement.className = 'node node-shortest-path';
            }
        }
      }, 50 * i);
    }
    setTimeout(() => {
      setIsRunning(false);
    }, 50 * nodesInShortestPathOrder.length);
  };

  const runAlgorithm = (algorithmName) => {
    if (isRunning) return;
    setIsRunning(true);
    clearPath();
    
    setTimeout(() => {
        try {
            const startNode = grid[startNodeRow][startNodeCol];
            const finishNode = grid[finishNodeRow][finishNodeCol];
            let visitedNodesInOrder;

            switch (algorithmName) {
                case 'dijkstra': visitedNodesInOrder = dijkstra(grid, startNode, finishNode); break;
                case 'astar': visitedNodesInOrder = astar(grid, startNode, finishNode); break;
                case 'bfs': visitedNodesInOrder = bfs(grid, startNode, finishNode); break;
                case 'dfs': visitedNodesInOrder = dfs(grid, startNode, finishNode); break;
                default: break;
            }
            
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
        } catch (error) {
            console.error("Algorithm Error:", error);
            setIsRunning(false);
        }
    }, 10);
  };

  const generateRecursiveMaze = () => {
    if (isRunning) return;
    setIsRunning(true);
    const cleanGrid = getInitialGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    setGrid(cleanGrid);
    
    setTimeout(() => {
        const startNode = cleanGrid[startNodeRow][startNodeCol];
        const finishNode = cleanGrid[finishNodeRow][finishNodeCol];
        const wallsToAnimate = getRecursiveDivisionMaze(cleanGrid, startNode, finishNode);
        
        for (let i = 0; i < wallsToAnimate.length; i++) {
            setTimeout(() => {
                const wall = wallsToAnimate[i];
                const newGrid = cleanGrid.slice();
                if (newGrid[wall.row] && newGrid[wall.row][wall.col]) {
                     const node = newGrid[wall.row][wall.col];
                     if (!node.isStart && !node.isFinish) {
                         const newNode = { ...node, isWall: true };
                         newGrid[wall.row][wall.col] = newNode;
                         setGrid(newGrid);
                     }
                }
                if (i === wallsToAnimate.length - 1) setIsRunning(false);
            }, 10 * i);
        }
    }, 10);
  };

  const clearBoard = () => {
    if (isRunning) return;
    const newGrid = getInitialGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    setGrid(newGrid);
    resetCSS();
  };

  const clearPath = () => {
    const newGrid = grid.slice();
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        const node = newGrid[row][col];
        const newNode = { ...node, distance: Infinity, totalDistance: Infinity, isVisited: false, previousNode: null };
        newGrid[row][col] = newNode;
        const elem = document.getElementById(`node-${row}-${col}`);
        if (elem && !node.isWall && !node.isStart && !node.isFinish) {
            elem.className = 'node';
        }
      }
    }
    setGrid(newGrid);
  };

  const resetCSS = () => {
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        const nodeID = `node-${row}-${col}`;
        const extraClass = (row === startNodeRow && col === startNodeCol) ? 'node-start' : (row === finishNodeRow && col === finishNodeCol) ? 'node-finish' : '';
        const elem = document.getElementById(nodeID);
        if (elem) elem.className = `node ${extraClass}`;
      }
    }
  };

  return (
    <div style={{ margin: '30px', textAlign: 'center' }}>
      <div className="button-container" style={{ marginBottom: "15px" }}>
        <button onClick={() => runAlgorithm('dijkstra')} disabled={isRunning} style={{background: "#0d6efd", margin: "5px", padding: "10px", color: "white"}}>Dijkstra</button>
        <button onClick={() => runAlgorithm('astar')} disabled={isRunning} style={{background: "#6f42c1", margin: "5px", padding: "10px", color: "white"}}>A* Search</button>
        <button onClick={() => runAlgorithm('bfs')} disabled={isRunning} style={{background: "#ffc107", margin: "5px", padding: "10px", color: "black"}}>BFS</button>
        <button onClick={() => runAlgorithm('dfs')} disabled={isRunning} style={{background: "#dc3545", margin: "5px", padding: "10px", color: "white"}}>DFS</button>
        <button onClick={() => generateRecursiveMaze()} disabled={isRunning} style={{background: "#198754", margin: "5px", padding: "10px", color: "white"}}>Maze</button>
        <button onClick={() => clearBoard()} disabled={isRunning} style={{background: "#212529", margin: "5px", padding: "10px", color: "white"}}>Clear</button>
      </div>
      
      {/* THE GRID CONTAINER */}
      <div className="grid" style={{ display: 'inline-block' }}>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} style={{ height: '25px', display: 'flex' }}>
              {row.map((node, nodeIdx) => {
                const { row, col, isStart, isFinish, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}