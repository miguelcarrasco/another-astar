module.exports = {
    getMinElementKey: function (map) {
        var minimumValue = null;
        var minKey = null;
        for (var key in map) {
            var currentMin = map[key];
            if (minKey == null) {
                minKey = key;
                minimumValue = currentMin;
            } else {
                if (currentMin < minimumValue) {
                    minKey = key;
                    minimumValue = currentMin;
                }
            }
        }

        return minKey;
    },
    filterByKeys: function (object, keys) {
        var filtered = {};
        var keysLenght = keys.length;
        for (var i = 0; i < keysLenght; i++) {
            if (typeof object[keys[i]] !== 'undefined') {
                filtered[keys[i]] = object[keys[i]];
            }
        }

        return filtered;
    },
    reconstructPath: function (cameFrom, nodeIndex) {
        var totalPath = [nodeIndex];
        var currentNodeIndex = nodeIndex;

        while (currentNodeIndex in cameFrom) {
            currentNodeIndex = cameFrom[currentNodeIndex];
            totalPath.unshift(currentNodeIndex);
        }

        return totalPath;
    },
    getObjectsPath: function (cameFrom, nodeIndex, nodesMap) {
        return this.reconstructPath(cameFrom, nodeIndex).map(function (index) {
            return nodesMap[index];
        });
    }
};