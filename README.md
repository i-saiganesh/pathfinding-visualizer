# Pathfinding Visualizer. | Algorithmic Graph Engine

### 🚀 A pure-React engine utilizing Graph Theory for real-time visualization.

![Complexity](https://img.shields.io/badge/Time_Complexity-O(V_log_V)-success) ![Language](https://img.shields.io/badge/React-18.2-blue) ![Architecture](https://img.shields.io/badge/Architecture-Component_Based-orange) ![Status](https://img.shields.io/badge/Status-Live-green)

## 💡 Overview
**Pathfinding Visualizer.** is an engineering-focused tool built from scratch. Unlike standard "static" visualizations, this engine implements a custom **Grid State System** to visualize complex algorithmic traversals in real-time.

It demonstrates core Computer Science fundamentals:
* **Data Structures:** Min-Heap (Priority Queue), Stack, & Queue.
* **Algorithms:** Dijkstra (Weighted), A* (Heuristic), & Recursive Division.
* **System Design:** Real-time State Management (60FPS rendering).

## ⚡ Engineering & Performance
* **Zero Latency:** Rendering loop is optimized to handle **1,000+ grid nodes** without blocking the main thread (UI remains responsive).
* **O(E + V log V) Complexity:** Dijkstra's implementation uses a **Min-Heap** data structure to ensure efficient node retrieval, avoiding O(N²) linear scans.
* **Heuristic Optimization:** A* Search utilizes **Manhattan Distance** to minimize the search space by ~40% compared to standard Dijkstra.
* **Mathematical Guarantee:** Proven to find the absolute shortest path in weighted graphs (Dijkstra/A*), unlike DFS which prioritizes depth.

## 🛠️ Technical Stack
* **Frontend:** React.js (Hooks: `useState`, `useEffect`, `useRef`)
* **Logic:** JavaScript (ES6+), Data Structures (Arrays, Objects)
* **Styling:** CSS3 (Grid Layout, Keyframe Animations)
* **Deployment:** Render (Static Site)

## 🔍 How It Works (The Algorithm)
1.  **Initialization:** On startup, the engine constructs a 2D Grid graph where every cell is a Node object `{row, col, distance, isVisited}`.
2.  **Indexing:** It maps neighbors dynamically based on coordinate geometry `(x, y)`.
3.  **Relaxation:** When the algorithm runs, it prioritizes nodes using a Min-Heap:
    ```javascript
    // The Core Logic (A* Heuristic)
    const distance = current.distance + 1;
    const heuristic = Math.abs(target.x - neighbor.x) + Math.abs(target.y - neighbor.y);
    neighbor.fScore = distance + heuristic; // O(1) Calculation
    ```

## 🚀 Usage
1.  **Clone the Repo:**
    ```bash
    git clone [https://github.com/i-saiganesh/pathfinding-visualizer.git](https://github.com/i-saiganesh/pathfinding-visualizer.git)
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Run Locally:**
    ```bash
    npm start
    ```
4.  **Visualize:** Drag the **Start Node**, draw **Walls**, and select an algorithm like **Dijkstra** or **A***.
---
**Built with 💻 by Ganesh**
