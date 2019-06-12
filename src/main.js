let utils = require('./utils');

module.exports = {

    findPathIDAstar: function ({start, goal, heuristicCostEstimate,
                                   getNodeIndex, getNeighbors, getDistance, onNodeVisited}) {
        let bound = heuristicCostEstimate(start);
        let startIndex = getNodeIndex(start);
        let goalIndex = getNodeIndex(goal);
        let pathIndexes = [startIndex];
        let nodesMap = {};
        nodesMap[startIndex] = start;
        nodesMap[goalIndex] = goal;

        let search = function (pathIndexes, gScore, bound) {
            let currentNodeIndex = pathIndexes[pathIndexes.length - 1];
            if(onNodeVisited instanceof Function){
                onNodeVisited(nodesMap[currentNodeIndex]);
            }
            let currentFScore = gScore + heuristicCostEstimate(nodesMap[currentNodeIndex]);
            if (currentFScore > bound) {
                return {
                    "isGoalFound": false,
                    "isGoalNotFound": false,
                    "minScore": currentFScore
                }
            }
            if (currentNodeIndex === getNodeIndex(goal)) {
                return {
                    "isGoalFound": true,
                    "isGoalNotFound": false,
                    "minScore": currentFScore
                }
            }

            let minScore = null;
            let neighbors = getNeighbors(nodesMap[currentNodeIndex]);

            for (let i = 0; i < neighbors.length; i++) {
                let currentNeighbor = neighbors[i];
                let currentNeighborIndex = getNodeIndex(currentNeighbor);
                nodesMap[currentNeighborIndex] = currentNeighbor;

                if (pathIndexes.indexOf(currentNeighborIndex) === -1) {
                    pathIndexes.push(currentNeighborIndex);
                    let result = search(pathIndexes, gScore
                        + getDistance(nodesMap[currentNodeIndex], currentNeighbor), bound);

                    if (result.isGoalFound) {
                        return result;
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
            let result = search(pathIndexes, 0, bound);
            if (result.isGoalFound) {
                let path = [];
                for (let i = 0; i < pathIndexes.length; i++) {
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

    findPathAstar: function ({start, goal, heuristicCostEstimate,
                                 getNodeIndex, getNeighbors, getDistance, onNodeVisited}) {
        let startIndex = getNodeIndex(start);
        let goalIndex = getNodeIndex(goal);

        let nodesMap = {};
        nodesMap[startIndex] = start;
        nodesMap[goalIndex] = goal;

        let closedSet = new Set([]);
        let openSet = new Set([startIndex]);

        let cameFrom = {};
        let gScore = {};
        gScore[startIndex] = 0;

        let fScore = {};
        fScore[startIndex] = heuristicCostEstimate(start);

        while (openSet.size > 0) {
            let openSetFScores = utils.filterByKeys(fScore, Array.from(openSet));
            let currentNodeIndex = utils.getMinElementKey(openSetFScores);
            if(onNodeVisited instanceof Function){
                onNodeVisited(nodesMap[currentNodeIndex]);
            }

            if (currentNodeIndex === goalIndex) {
                return utils.getObjectsPath(cameFrom, currentNodeIndex, nodesMap);
            }

            openSet.delete(currentNodeIndex);

            closedSet.add(currentNodeIndex);

            let neighbors = getNeighbors(nodesMap[currentNodeIndex]);
            for (let i = 0; i < neighbors.length; i++) {
                let currentNeighborIndex = getNodeIndex(neighbors[i]);
                nodesMap[currentNeighborIndex] = neighbors[i];

                if (closedSet.has(currentNeighborIndex)) continue;

                let tentativeGScore = gScore[currentNodeIndex] + getDistance(nodesMap[currentNodeIndex],
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
                    heuristicCostEstimate(nodesMap[currentNeighborIndex]);
            }
        }
    }

};
