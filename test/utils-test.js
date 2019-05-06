var expect = require('chai').expect;

var utils = require('../src/utils');

describe('Astar utils tests', function () {
    describe('get minimum element key', function () {
        it('should get the minimum element key in a map object', function () {
            expect(utils.getMinElementKey({"a": 5, "b": 3, "c": 8})).to.equal("b");
        });
    });

    describe('filter object by keys', function () {
        it('should filter objects by keys', function () {
            expect(utils.filterByKeys({"a": 5, "b": 3, "c": 2}, ["a", "c", "f"])).to.eql({"a": 5, "c": 2});
        });
    });

    describe('reconstruct path', function () {
        var cameFrom = {
            "d": "c",
            "c": "b",
            "b": "a",
            "z": "f"
        };

        it('should reconstruct path', function () {
            expect(utils.reconstructPath(cameFrom, "d")).to.eql(["a", "b", "c", "d"]);
        });
    });

    describe('get objects path', function () {
        var cameFrom = {
            "d": "c",
            "c": "b",
            "b": "a",
            "z": "f"
        };
        var nodesMap = {
            "a": "A",
            "b": "B",
            "c": "C",
            "d": "D",
            "z": "Z",
            "f": "F"
        };

        it('should get objects path', function () {
            expect(utils.getObjectsPath(cameFrom, "d", nodesMap)).to.eql(["A", "B", "C", "D"]);
        });
    });
});