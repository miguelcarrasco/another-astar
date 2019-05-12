var utils = require('./utils');

module.exports = {
    findPath: function (astarImpl) {

        var startIndex = astarImpl.getNodeIndex(astarImpl.start);
        var goalIndex = astarImpl.getNodeIndex(astarImpl.goal);

        var nodesMap = {};
        nodesMap[startIndex] = astarImpl.start;
        nodesMap[goalIndex] = astarImpl.goal;

        var closedSet = new Set([]);
        var openSet = new Set([startIndex]);

        var cameFrom = {};
        var gScore = {};
        gScore[startIndex] = 0;

        var fScore = {};
        fScore[startIndex] = astarImpl.heuristicCostEstimate(astarImpl.start);

        while (openSet.size > 0) {
            var openSetFScores = utils.filterByKeys(fScore, Array.from(openSet));
            var currentNodeIndex = utils.getMinElementKey(openSetFScores);

            if (currentNodeIndex === goalIndex) {
                return utils.getObjectsPath(cameFrom, currentNodeIndex, nodesMap);
            }

            openSet.delete(currentNodeIndex);

            closedSet.add(currentNodeIndex);

            var neighbors = astarImpl.getNeighbors(nodesMap[currentNodeIndex]);
            for (var i = 0; i < neighbors.length; i++) {
                var currentNeighborIndex = astarImpl.getNodeIndex(neighbors[i]);
                nodesMap[currentNeighborIndex] = neighbors[i];

                if (closedSet.has(currentNeighborIndex)) continue;

                var tentativeGScore = gScore[currentNodeIndex] + astarImpl.getDistance(nodesMap[currentNodeIndex],
                    neighbors[i]);

                if (!openSet.has(currentNeighborIndex)) {
                    openSet.add(currentNeighborIndex);
                } else if (typeof gScore[currentNeighborIndex] !== 'undefined'
                    && tentativeGScore >= gScore[currentNeighborIndex]) {
                    continue;
                }

                cameFrom[currentNeighborIndex] = currentNodeIndex;
                gScore[currentNeighborIndex] = tentativeGScore;
                fScore[currentNeighborIndex] = gScore[currentNeighborIndex] +
                    astarImpl.heuristicCostEstimate(nodesMap[currentNeighborIndex]);
            }
        }
    }
};