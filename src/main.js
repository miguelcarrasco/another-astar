var utils = require('./utils');

module.exports = {
    findPath: function (start, goal, heuristicCostEstimate, getNodeIndex, getNeighbors, getDistance) {
        var startIndex = getNodeIndex(start);
        var goalIndex = getNodeIndex(goal);

        var nodesMap = {};
        nodesMap[startIndex] = start;
        nodesMap[goalIndex] = goal;

        var closedSet = new Set([]);
        var openSet = new Set([startIndex]);

        var cameFrom = {};
        var gScore = {};
        gScore[startIndex] = 0;

        var fScore = {};
        fScore[startIndex] = heuristicCostEstimate(start);

        while (openSet.size > 0) {
            var openSetFScores = utils.filterByKeys(fScore, Array.from(openSet));
            var currentNodeIndex = utils.getMinElementKey(openSetFScores);

            if (currentNodeIndex === goalIndex) {
                return utils.getObjectsPath(cameFrom, currentNodeIndex, nodesMap);
            }

            openSet.delete(currentNodeIndex);

            closedSet.add(currentNodeIndex);

            var neighbors = getNeighbors(nodesMap[currentNodeIndex]);
            for (var i = 0; i < neighbors.length; i++) {
                var currentNeighborIndex = getNodeIndex(neighbors[i]);
                nodesMap[currentNeighborIndex] = neighbors[i];

                if (closedSet.has(currentNeighborIndex)) continue;

                var tentativeGScore = gScore[currentNodeIndex] + getDistance(nodesMap[currentNodeIndex], neighbors[i]);

                if (!openSet.has(currentNeighborIndex)) {
                    openSet.add(currentNeighborIndex);
                } else if (typeof gScore[currentNeighborIndex] !== 'undefined'
                    && tentativeGScore >= gScore[currentNeighborIndex]) {
                    continue;
                }

                cameFrom[currentNeighborIndex] = currentNodeIndex;
                gScore[currentNeighborIndex] = tentativeGScore;
                fScore[currentNeighborIndex] = gScore[currentNeighborIndex] +
                    heuristicCostEstimate(nodesMap[currentNeighborIndex]);
            }
        }
    }
};