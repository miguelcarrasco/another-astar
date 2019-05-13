var utils = require('./utils');

module.exports = {

    findPathIDAstar: function (astarImpl) {
        var bound = astarImpl.heuristicCostEstimate(astarImpl.start);
        var startIndex = astarImpl.getNodeIndex(astarImpl.start);
        var goalIndex = astarImpl.getNodeIndex(astarImpl.goal);
        var pathIndexes = [startIndex];
        var nodesMap = {};
        nodesMap[startIndex] = astarImpl.start;
        nodesMap[goalIndex] = astarImpl.goal;

        var search = function (pathIndexes, gScore, bound) {
            var currentNode = pathIndexes[pathIndexes.length - 1];
            var currentFScore = gScore + astarImpl.heuristicCostEstimate(currentNode);
            if (currentFScore > bound) {
                return {
                    "isGoalFound": false,
                    "isGoalNotFound": false,
                    "minScore": currentFScore
                }
            }
            if (astarImpl.getNodeIndex(currentNode) === astarImpl.getNodeIndex(astarImpl.goal)) {
                return {
                    "isGoalFound": true,
                    "isGoalNotFound": false,
                    "minScore": currentFScore
                }
            }

            var minScore = null;
            var neighbors = astarImpl.getNeighbors(currentNode);
            for (var i = 0; i < neighbors.length; i++) {
                var currentNeighbor = neighbors[i];
                var currentNeighborIndex = astarImpl.getNodeIndex(currentNeighbor);
                nodesMap[currentNeighborIndex] = currentNeighbor;

                if (pathIndexes.indexOf(currentNeighborIndex) === -1) {
                    pathIndexes.push(currentNeighborIndex);
                    var result = search(pathIndexes, gScore
                        + astarImpl.getDistance(currentNode, currentNeighbor), bound);

                    if (result.isGoalFound) {
                        return {
                            "isGoalFound": true,
                            "isGoalNotFound": false,
                            "minScore": result.minScore
                        }
                    }

                    if (minScore == null || result.minScore < minScore) {
                        minScore = result.minScore;
                    }
                    pathIndexes.pop();
                }
            }
            return {
                "isGoalFound": false,
                "isGoalNotFound": false,
                "minScore": minScore
            }
        };

        while (true) {
            var result = search(pathIndexes, 0, bound);
            if (result.isGoalFound) {
                var path = [];
                for (var i = 0; i < pathIndexes.length; i++) {
                    path.push(nodesMap[pathIndexes[i]]);
                }
                return path;
            }
            if (result.isGoalNotFound) {
                return null;
            }
            bound = result.minScore;
        }


    },

    findPathAstar: function (astarImpl) {
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