# another-astar
Yet another javascript library with implementations of A* and IDA* algorithms.

## Usage

npm install git://github.com/miguelcarrasco/another-astar.git#0.1.1

Use findPathAstar method to get a path from start to goal using A* algorithm, it will return
an optimal path if the heuristic cost estimate is admissible for every evaluated node.

```javascript
let astar = require('another-astar');

let path = astar.findPathAstar(
    {
        // start and goal can be any object
        start: start,
        goal: goal,
        heuristicCostEstimate: function (node) {
            // it should return a heuristic estimate
            // of the cost from node to goal, for example:           
            return someHeuristicCostEstimateNumber;
            // This heuristic should be "admissible" 
            // i.e. the estimate must not be greater than the real cost 
            // to guarantee an optimal path.
        },
        getNodeIndex: function (node) {
            // it should return a string representing the
            // node object for indexing purposes, for example:
            return node.toString();
        },
        getNeighbors: function (node) {
            // it should return an array that contain all the neighbors nodes from the
            // specified node.
            return [node1, node2, ..., etc]; 
        },
        getDistance: function (node1, node2) {
            // it should return the real cost from node1 to node2
            // note that node2 is always a neighbor of node1
            return realCostNumber;
        }
    });
```
If you want to use IDA* algorithm instead, you can use the method findPathIDAstar instead, it expects
the same object as in findPathAstar:

```javascript
let path = astar.findPathIDAstar({ ... });
```

## Notes
IDA* algorithm memory usage is lower than in A*, but unlike ordinary iterative deepening
search, it concentrates on exploring the most promising nodes and thus does not go to the
same depth everywhere in the search tree. 

Unlike A*, IDA* does not utilize dynamic programming and therefore often ends up exploring 
the same nodes many times.

This is a work in progress, performance will be improved in future versions.

