export function getRecursiveDivisionMaze(grid, startNode, finishNode) {
  const walls = [];
  recursiveDivision(grid, 2, grid.length - 3, 2, grid[0].length - 3, 'horizontal', false, walls);
  return walls;
}

function recursiveDivision(grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls, walls) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }

  if (!surroundingWalls) {
    // Add outer walls
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (row === 0 || row === grid.length - 1 || col === 0 || col === grid[0].length - 1) {
          walls.push(grid[row][col]);
        }
      }
    }
    surroundingWalls = true;
  }

  if (orientation === 'horizontal') {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (r === currentRow && c >= colStart - 1 && c <= colEnd + 1 && c !== colRandom) {
           // Don't overwrite start/finish nodes
           if (!grid[r][c].isStart && !grid[r][c].isFinish) {
             walls.push(grid[r][c]);
           }
        }
      }
    }
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivision(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls, walls);
    } else {
      recursiveDivision(grid, rowStart, currentRow - 2, colStart, colEnd, 'vertical', surroundingWalls, walls);
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivision(grid, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls, walls);
    } else {
      recursiveDivision(grid, currentRow + 2, rowEnd, colStart, colEnd, 'vertical', surroundingWalls, walls);
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (c === currentCol && r >= rowStart - 1 && r <= rowEnd + 1 && r !== rowRandom) {
            if (!grid[r][c].isStart && !grid[r][c].isFinish) {
              walls.push(grid[r][c]);
            }
        }
      }
    }
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivision(grid, rowStart, rowEnd, colStart, currentCol - 2, 'horizontal', surroundingWalls, walls);
    } else {
      recursiveDivision(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls, walls);
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivision(grid, rowStart, rowEnd, currentCol + 2, colEnd, 'horizontal', surroundingWalls, walls);
    } else {
      recursiveDivision(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls, walls);
    }
  }
}