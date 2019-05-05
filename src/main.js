var utils = require('./utils');


module.exports = {
    findPath: function (start, goal, heuristicCostEstimate, getNodeIndex, getNeighbors, getDistance) {
        var startIndex = getNodeIndex(start);
        var goalIndex = getNodeIndex(goal);

        var nodesMap = {};
        nodesMap[startIndex] = start;
        nodesMap[goalIndex] = goal;

        var closedSet = [];
        var openSet = [startIndex];
        var cameFrom = {};
        var gScore = {};
        gScore[startIndex] = 0;

        var fScore = {};
        fScore[startIndex] = heuristicCostEstimate(start);

        var counter = 0;

        while (openSet.length > 0) {
            counter++;

            var currentNodeIndex = utils.getMinElementKey(utils.filterByKeys(fScore, openSet));

            if (currentNodeIndex === goalIndex) {
                return utils.getObjectsPath(cameFrom, currentNodeIndex, nodesMap);
            }

            utils.arrayRemove(openSet, currentNodeIndex);

            closedSet.push(currentNodeIndex);

            var neighbors = getNeighbors(nodesMap[currentNodeIndex]);
            for (var i = 0; i < neighbors.length; i++) {
                var currentNeighborIndex = getNodeIndex(neighbors[i]);
                nodesMap[currentNeighborIndex] = neighbors[i];

                if (typeof closedSet[currentNeighborIndex] !== 'undefined') {
                    continue;
                }

                var tentativeGScore = gScore[currentNodeIndex] + getDistance(nodesMap[currentNodeIndex], neighbors[i]);

                if (typeof openSet[currentNeighborIndex] === 'undefined') {
                    openSet.push(currentNeighborIndex);
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