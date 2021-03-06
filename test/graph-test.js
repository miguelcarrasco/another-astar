let expect = require('chai').expect;
let astar = require('../src/main');

describe('Search algorithms on graphs', function () {

    let testGraph = function (searchAlgorithm, graphNodes, expectedPath) {
        let path = searchAlgorithm({
            start: "a",
            goal: "n",
            heuristicCostEstimate: function (node) {
                return graphNodes[node]["heuristicCost"];
            },
            getNodeIndex: function (node) {
                return node;
            },
            getNeighbors: function (node) {
                return Object.keys(graphNodes[node]["neighbors"]);
            },
            getDistance: function (node1, node2) {
                return graphNodes[node1]["neighbors"][node2];
            }
        });
        expect(path).to.eql(expectedPath);
    };

    describe('find path on a simple graph', function () {
        let simpleGraph = {
            "a": {
                "heuristicCost": 8,
                "neighbors": {
                    "b": 1.5
                }
            },
            "b": {
                "heuristicCost": 7.5,
                "neighbors": {
                    "a": 1.5,
                    "c": 1,
                    "g": 3.4
                }
            },
            "c": {
                "heuristicCost": 6.2,
                "neighbors": {
                    "b": 1,
                    "e": 1,
                    "f": 2.6,
                    "d": 2.9
                }
            },
            "d": {
                "heuristicCost": 4.7,
                "neighbors": {
                    "c": 2.9,
                    "h": 1.6,
                    "g": 1.8
                }
            },
            "e": {
                "heuristicCost": 5.4,
                "neighbors": {
                    "c": 1,
                    "m": 3.5
                }
            },
            "f": {
                "heuristicCost": 5.3,
                "neighbors": {
                    "c": 2.6,
                    "j": 4.5
                }
            },
            "g": {
                "heuristicCost": 6.5,
                "neighbors": {
                    "b": 3.4,
                    "d": 1.8,
                    "h": 2.5
                }
            },
            "h": {
                "heuristicCost": 4.6,
                "neighbors": {
                    "g": 2.5,
                    "d": 1.6,
                    "i": 1,
                    "j": 1.6
                }
            },
            "i": {
                "heuristicCost": 5.5,
                "neighbors": {
                    "h": 1,
                    "k": 3
                }
            },
            "j": {
                "heuristicCost": 3,
                "neighbors": {
                    "h": 1.6,
                    "f": 4.5,
                    "k": 2
                }
            },
            "k": {
                "heuristicCost": 3.2,
                "neighbors": {
                    "j": 2,
                    "i": 3,
                    "l": 3.5
                }
            },
            "l": {
                "heuristicCost": 1.5,
                "neighbors": {
                    "k": 3.2,
                    "n": 1.5
                }
            },
            "m": {
                "heuristicCost": 2.6,
                "neighbors": {
                    "e": 3.5
                }
            },
            "n": {
                "heuristicCost": 0,
                "neighbors": {
                    "l": 1.5
                }
            }
        };

        it('should find path form start to goal on a graph using a-star algorithm', function () {
            testGraph(astar.findPathAstar, simpleGraph, ["a", "b", "c", "d", "h", "j", "k", "l", "n"]);
        });

        it('should find path form start to goal on a graph using ida-star algorithm', function () {
            testGraph(astar.findPathIDAstar, simpleGraph, ["a", "b", "c", "d", "h", "j", "k", "l", "n"]);
        });
    });
    describe('find path using astar on a directed graph', function () {
        let directedGraph = {
            "a": {
                "heuristicCost": 8,
                "neighbors": {
                    "b": 1.5
                }
            },
            "b": {
                "heuristicCost": 7.5,
                "neighbors": {
                    "c": 1,
                    "g": 3.4
                }
            },
            "c": {
                "heuristicCost": 6.2,
                "neighbors": {
                    "e": 1,
                    "f": 2.6,
                    "d": 2.9
                }
            },
            "d": {
                "heuristicCost": 4.7,
                "neighbors": {
                    "h": 1.6,
                    "g": 1.8
                }
            },
            "e": {
                "heuristicCost": 5.4,
                "neighbors": {
                    "m": 3.5
                }
            },
            "f": {
                "heuristicCost": 5.3,
                "neighbors": {
                    "j": 4.5
                }
            },
            "g": {
                "heuristicCost": 6.5,
                "neighbors": {
                    "d": 1.8,
                    "h": 2.5
                }
            },
            "h": {
                "heuristicCost": 4.6,
                "neighbors": {
                    "i": 1,
                    "j": 1.6
                }
            },
            "i": {
                "heuristicCost": 5.5,
                "neighbors": {
                    "k": 3
                }
            },
            "j": {
                "heuristicCost": 3,
                "neighbors": {
                    "k": 2
                }
            },
            "k": {
                "heuristicCost": 3.2,
                "neighbors": {
                    "l": 3.5
                }
            },
            "l": {
                "heuristicCost": 1.5,
                "neighbors": {
                    "n": 1.5
                }
            },
            "m": {
                "heuristicCost": 2.6,
                "neighbors": {}
            },
            "n": {
                "heuristicCost": 0,
                "neighbors": {}
            }
        };

        it('should find path form start to goal on a directed graph using a-star', function () {
            testGraph(astar.findPathAstar, directedGraph, ["a", "b", "c", "d", "h", "j", "k", "l", "n"]);
        });

        it('should find path form start to goal on a directed graph using ida-star', function () {
            testGraph(astar.findPathIDAstar, directedGraph, ["a", "b", "c", "d", "h", "j", "k", "l", "n"]);
        });
    });
});
