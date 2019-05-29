let expect = require('chai').expect;
let astar = require('../src/main');
let nPuzzleUtils = require('./n-puzzle-utils');

describe('n-puzzle tests', function () {
    let testNPuzzle = function (searchAlgorithm, expectedPath, start, goal, baseSize) {
        let path = searchAlgorithm({
            start: start,
            goal: goal,
            heuristicCostEstimate: function (node) {
                return nPuzzleUtils.manhattanHeuristic(node, goal, baseSize);
            },
            getNodeIndex: function (node) {
                return node.toString();
            },
            getNeighbors: function (node) {
                return nPuzzleUtils.getNeighbors(node, baseSize);
            },
            getDistance: function (node1, node2) {
                return 1;
            }

        });
        expect(path).to.eql(expectedPath);
    };
    describe('nPuzzleUtils tests', function () {

        it('should calculate the manhattan heuristic', function () {
            expect(nPuzzleUtils.manhattanHeuristic([
                1, 2, 3,
                5, 6, 8,
                4, 7, 0
            ], [
                1, 2, 3,
                4, 5, 6,
                7, 8, 0
            ], 3)).to.eq(6);

        });

        it('should generate neighbors from blank space in central position', function () {
            expect(nPuzzleUtils.getNeighbors([
                1, 2, 3,
                4, 0, 5,
                6, 7, 8
            ], 3)).to.eql([
                [
                    1, 0, 3,
                    4, 2, 5,
                    6, 7, 8
                ],
                [
                    1, 2, 3,
                    0, 4, 5,
                    6, 7, 8
                ],
                [
                    1, 2, 3,
                    4, 5, 0,
                    6, 7, 8
                ],
                [
                    1, 2, 3,
                    4, 7, 5,
                    6, 0, 8
                ],
            ]);

        });

        it('should generate neighbors from blank space in a corner position', function () {
            expect(nPuzzleUtils.getNeighbors([
                1, 2, 0,
                3, 4, 5,
                6, 7, 8
            ], 3)).to.eql([
                [
                    1, 0, 2,
                    3, 4, 5,
                    6, 7, 8
                ],
                [
                    1, 2, 5,
                    3, 4, 0,
                    6, 7, 8
                ],
            ]);
        });
    });

    describe('optimal paths on an easy 8-puzzle', function () {
        let start = [
            1, 2, 3,
            5, 6, 8,
            4, 7, 0
        ];

        let goal = [
            1, 2, 3,
            4, 5, 6,
            7, 8, 0
        ];

        let expectedPath = [
            [
                1, 2, 3,
                5, 6, 8,
                4, 7, 0,
            ],
            [
                1, 2, 3,
                5, 6, 0,
                4, 7, 8,
            ],
            [
                1, 2, 3,
                5, 0, 6,
                4, 7, 8,
            ],
            [
                1, 2, 3,
                0, 5, 6,
                4, 7, 8,
            ],
            [
                1, 2, 3,
                4, 5, 6,
                0, 7, 8,
            ],
            [
                1, 2, 3,
                4, 5, 6,
                7, 0, 8,
            ],
            [
                1, 2, 3,
                4, 5, 6,
                7, 8, 0,
            ]
        ];

        it('should find the optimal path on an easy 8-puzzle using A-star algorithm', function () {
            testNPuzzle(astar.findPathAstar, expectedPath, start, goal, 3);
        });

        it('should find the optimal path on an easy 8-puzzle using IDA-star algorithm', function () {
            testNPuzzle(astar.findPathIDAstar, expectedPath, start, goal, 3);
        });
    });

    describe('optimal paths on an difficult 8-puzzle', function () {
        let start = [
            3, 7, 5,
            2, 6, 8,
            4, 1, 0
        ];

        let goal = [
            1, 2, 3,
            4, 5, 6,
            7, 8, 0
        ];

        let expectedPathAstar = [
            [
                3, 7, 5,
                2, 6, 8,
                4, 1, 0,
            ],
            [
                3, 7, 5,
                2, 6, 0,
                4, 1, 8,
            ],
            [
                3, 7, 5,
                2, 0, 6,
                4, 1, 8,
            ],
            [
                3, 0, 5,
                2, 7, 6,
                4, 1, 8,
            ],
            [
                0, 3, 5,
                2, 7, 6,
                4, 1, 8,
            ],
            [
                2, 3, 5,
                0, 7, 6,
                4, 1, 8,
            ],
            [
                2, 3, 5,
                4, 7, 6,
                0, 1, 8,
            ],
            [
                2, 3, 5,
                4, 7, 6,
                1, 0, 8,
            ],
            [
                2, 3, 5,
                4, 0, 6,
                1, 7, 8,
            ],
            [
                2, 3, 5,
                0, 4, 6,
                1, 7, 8,
            ],
            [
                2, 3, 5,
                1, 4, 6,
                0, 7, 8,
            ],
            [
                2, 3, 5,
                1, 4, 6,
                7, 0, 8,
            ],
            [
                2, 3, 5,
                1, 4, 6,
                7, 8, 0,
            ],
            [
                2, 3, 5,
                1, 4, 0,
                7, 8, 6,
            ],
            [
                2, 3, 0,
                1, 4, 5,
                7, 8, 6,
            ],
            [
                2, 0, 3,
                1, 4, 5,
                7, 8, 6,
            ],
            [
                0, 2, 3,
                1, 4, 5,
                7, 8, 6,
            ],
            [
                1, 2, 3,
                0, 4, 5,
                7, 8, 6,
            ],
            [
                1, 2, 3,
                4, 0, 5,
                7, 8, 6,
            ],
            [
                1, 2, 3,
                4, 5, 0,
                7, 8, 6,
            ],
            [
                1, 2, 3,
                4, 5, 6,
                7, 8, 0,
            ]
        ];

        it('should find the optimal path on a difficult 8-puzzle using A-star algorithm', function () {
            testNPuzzle(astar.findPathAstar, expectedPathAstar, start, goal, 3);
        });

        let expectedPathIDAstar = [

            [
                3, 7, 5,
                2, 6, 8,
                4, 1, 0,
            ],
            [
                3, 7, 5,
                2, 6, 0,
                4, 1, 8,
            ],
            [
                3, 7, 5,
                2, 0, 6,
                4, 1, 8,
            ],
            [
                3, 0, 5,
                2, 7, 6,
                4, 1, 8,
            ],
            [
                0, 3, 5,
                2, 7, 6,
                4, 1, 8,
            ],
            [
                2, 3, 5,
                0, 7, 6,
                4, 1, 8,
            ],
            [
                2, 3, 5,
                7, 0, 6,
                4, 1, 8,
            ],
            [
                2, 3, 5,
                7, 1, 6,
                4, 0, 8,
            ],
            [
                2, 3, 5,
                7, 1, 6,
                0, 4, 8,
            ],
            [
                2, 3, 5,
                0, 1, 6,
                7, 4, 8,
            ],
            [
                2, 3, 5,
                1, 0, 6,
                7, 4, 8,
            ],
            [
                2, 3, 5,
                1, 4, 6,
                7, 0, 8,
            ],
            [
                2, 3, 5,
                1, 4, 6,
                7, 8, 0,
            ],
            [
                2, 3, 5,
                1, 4, 0,
                7, 8, 6,
            ],
            [
                2, 3, 0,
                1, 4, 5,
                7, 8, 6,
            ],
            [
                2, 0, 3,
                1, 4, 5,
                7, 8, 6,
            ],
            [
                0, 2, 3,
                1, 4, 5,
                7, 8, 6,
            ],
            [
                1, 2, 3,
                0, 4, 5,
                7, 8, 6,
            ],
            [
                1, 2, 3,
                4, 0, 5,
                7, 8, 6,
            ],
            [
                1, 2, 3,
                4, 5, 0,
                7, 8, 6,
            ],
            [
                1, 2, 3,
                4, 5, 6,
                7, 8, 0,
            ]
        ];

        it('should find the optimal path on a difficult 8-puzzle using IDA-star algorithm', function () {
            testNPuzzle(astar.findPathIDAstar, expectedPathIDAstar, start, goal, 3);
        });
    });

    describe('optimal paths on an easy 15-puzzle', function () {
        let start = [
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            0, 14, 15, 13
        ];

        let goal = [
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 0
        ];

        let expectedPath = [
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 11, 12,
                0, 14, 15, 13,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                0, 10, 11, 12,
                9, 14, 15, 13,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                10, 0, 11, 12,
                9, 14, 15, 13,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                10, 14, 11, 12,
                9, 0, 15, 13,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                10, 14, 11, 12,
                9, 15, 0, 13,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                10, 14, 11, 12,
                9, 15, 13, 0,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                10, 14, 11, 0,
                9, 15, 13, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                10, 14, 0, 11,
                9, 15, 13, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                10, 0, 14, 11,
                9, 15, 13, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                10, 15, 14, 11,
                9, 0, 13, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                10, 15, 14, 11,
                9, 13, 0, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                10, 15, 0, 11,
                9, 13, 14, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                10, 0, 15, 11,
                9, 13, 14, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                0, 10, 15, 11,
                9, 13, 14, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 15, 11,
                0, 13, 14, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 15, 11,
                13, 0, 14, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 15, 11,
                13, 14, 0, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 0, 11,
                13, 14, 15, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 11, 0,
                13, 14, 15, 12,
            ],
            [
                1, 2, 3, 4,
                5, 6, 7, 8,
                9, 10, 11, 12,
                13, 14, 15, 0,
            ]
        ];

        it('should find the optimal path on an easy 15-puzzle using A-star algorithm', function () {
            testNPuzzle(astar.findPathAstar, expectedPath, start, goal, 4);
        });

        it('should find the optimal path on an easy 15-puzzle using IDA-star algorithm', function () {
            testNPuzzle(astar.findPathIDAstar, expectedPath, start, goal, 4);
        });
    });
})
;