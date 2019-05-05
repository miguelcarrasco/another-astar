var expect = require('chai').expect;
var astar = require('../src/main');

describe('Astar algorithm', function () {
    describe('find path using astar', function () {
        it('should find path form start to goal', function () {
            var graphNodes = {
                "a": {
                    "heuristicCost": 10,
                    "neighbors": {
                        "b": 3,
                        "c": 2
                    }
                },
                "b": {
                    "heuristicCost": 7,
                    "neighbors": {
                        "d": 2
                    }
                },
                "c": {
                    "heuristicCost": 7,
                    "neighbors": {
                        "e": 1
                    }
                },
                "d": {
                    "heuristicCost": 5,
                    "neighbors": {
                        "f": 2
                    }
                },
                "e": {
                    "heuristicCost": 5,
                    "neighbors": {
                        "f": 8
                    }
                },
                "f": {
                    "heuristicCost": 3,
                    "neighbors": {
                        "g": 5
                    }
                },
                "g": {
                    "heuristicCost": 0,
                    "neighbors": {}
                }
            };

            var path = astar.findPath("a", "g",
                function (node) {
                    return graphNodes[node]["heuristicCost"];
                }, function (node) {
                    return node;
                }, function (node) {
                    return Object.keys(graphNodes[node]["neighbors"]);
                }, function (node1, node2) {
                    return graphNodes[node1]["neighbors"][node2];
                });

            expect(path).to.eql(["a", "b", "d", "f", "g"]);
        });
    });
});
