module.exports = {
    calculateManhattanDistance: function (originX, originY, finalX, finalY) {
        return Math.abs((originX - finalX)) + Math.abs((originY - finalY));
    },

    manhattanHeuristic: function (origin, goal, baseSize) {
        let manhatanSum = 0;
        for (let i = 0; i < origin.length; i++) {
            let currentValue = origin[i];
            if (currentValue !== 0) {
                let finalPosition = goal.indexOf(currentValue);
                manhatanSum += this.calculateManhattanDistance(i % baseSize, Math.floor(i / baseSize),
                    finalPosition % baseSize, Math.floor(finalPosition / baseSize));
            }
        }
        return manhatanSum;
    },

    swap: function (array, originIndex, goalIndex) {
        let temp = array[goalIndex];
        array[goalIndex] = array[originIndex];
        array[originIndex] = temp;
    },

    getNeighbors: function (node, baseSize) {
        let zeroIndex = node.indexOf(0);
        let zeroX = zeroIndex % baseSize;
        let zeroY = Math.floor(zeroIndex / baseSize);

        let neighbors = [];

        if (zeroY - 1 >= 0) {
            let nodeCopy = node.slice(0);
            let elementX = zeroX;
            let elementY = zeroY - 1;

            let elementIndex = elementY * baseSize + elementX;
            this.swap(nodeCopy, zeroIndex, elementIndex);

            neighbors.push(nodeCopy)
        }

        if (zeroX - 1 >= 0) {
            let nodeCopy = node.slice(0);
            let elementX = zeroX - 1;
            let elementY = zeroY;

            let elementIndex = elementY * baseSize + elementX;
            this.swap(nodeCopy, zeroIndex, elementIndex);

            neighbors.push(nodeCopy)
        }

        if (zeroX + 1 < baseSize) {
            let nodeCopy = node.slice(0);
            let elementX = zeroX + 1;
            let elementY = zeroY;

            let elementIndex = elementY * baseSize + elementX;
            this.swap(nodeCopy, zeroIndex, elementIndex);

            neighbors.push(nodeCopy)
        }

        if (zeroY + 1 < baseSize) {
            let nodeCopy = node.slice(0);
            let elementX = zeroX;
            let elementY = zeroY + 1;

            let elementIndex = elementY * baseSize + elementX;
            this.swap(nodeCopy, zeroIndex, elementIndex);

            neighbors.push(nodeCopy)
        }

        return neighbors;
    },

    // used for debugging
    printPath: function (path, baseSize) {
        for (let currentNodeIndex = 0; currentNodeIndex < path.length; currentNodeIndex++) {
            console.log("[");
            for (let y = 0; y < baseSize; y++) {
                let row = "";
                for (let x = 0; x < baseSize; x++) {
                    row += path[currentNodeIndex][y * baseSize + x] + ", ";
                }
                console.log(row);
            }
            console.log("],");
        }
    }
}