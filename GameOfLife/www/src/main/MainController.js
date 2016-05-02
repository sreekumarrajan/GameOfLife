(function() {
    'use strict';

    angular
        .module('GameOfLife')
        .controller('MainController', MainController);

    function MainController($scope) {
        var vm = this;
        vm.welcomeLine = "Welcome to Game of Life";


        vm.height = 20;
        vm.width = 15;

        vm.board = initializeBoard();
        vm.toggle = toggle;
        vm.clickNext = clickNext;
        vm.start = start;
        vm.stop = stop;
        vm.clear = clear;
        
        return;

        /* functions */
        function initializeBoard() {
            var board = [];
            for (var height = 0; height < vm.height; height++) {
                var row = [];
                for (var width = 0; width < vm.width; width++) {
                    var cell = { "alive": false, "class": "dead" };
                    row.push(cell);
                }
                board.push(row);
            }
            return board;
        }

        function toggle(row, column) {
            var cell = vm.board[row][column];
            cell.alive = !cell.alive;
            if (cell.alive) {
                cell.class = "alive";
            } else {
                cell.class = "dead";
            }
        }


        function clickNext() {
            vm.board = calculateNextStep();
            $scope.$apply();
        }

        function calculateNextStep() {
            var newBoard = [];
            for (var row = 0; row < vm.board.length; row++) {
                var newRow = [];
                for (var column = 0; column < vm.board[row].length; column++) {
                    // newRow.push(willLive(board, r, c) || newCell(board, r, c));
                    var newCell = {};
                    if (shouldContinueLivingInNextStep(vm.board, row, column)) {
                        newCell.alive = true;
                        newCell.class = "alive";
                    } else if (shouldBeNewAliveCell(vm.board, row, column)) {
                        newCell.alive = true;
                        newCell.class = "alive";
                    } else {
                        newCell.alive = false;
                        newCell.class = "dead";
                    }

                    newRow.push(newCell);

                }
                newBoard.push(newRow);
            }
            return newBoard;

        }

        function shouldBeNewAliveCell(board, row, column) {
            if (!isCellValidAndAlive(board,row,column)) {
                if (getNumberOfLiveNeighbours(board, row, column) === 3) {
                    return true;
                }
            }
            return false;
        }


        function shouldContinueLivingInNextStep(board, row, column) {
            return isCellValidAndAlive(board, row, column) && getNumberOfLiveNeighbours(board, row, column) >= 2 && getNumberOfLiveNeighbours(board, row, column) <= 3;
        }

        function getNumberOfLiveNeighbours(board, row, column) {
            var n = 0;
            n += isCellValidAndAlive(board, row - 1, column - 1) ? 1 : 0;
            n += isCellValidAndAlive(board, row - 1, column + 0) ? 1 : 0;
            n += isCellValidAndAlive(board, row - 1, column + 1) ? 1 : 0;
            n += isCellValidAndAlive(board, row + 0, column - 1) ? 1 : 0;
            n += isCellValidAndAlive(board, row + 0, column + 1) ? 1 : 0;
            n += isCellValidAndAlive(board, row + 1, column - 1) ? 1 : 0;
            n += isCellValidAndAlive(board, row + 1, column + 0) ? 1 : 0;
            n += isCellValidAndAlive(board, row + 1, column + 1) ? 1 : 0;
            return n;
        }

        function isCellValidAndAlive(board, row, column) {
            return (row >= 0 && row < board.length &&
                column >= 0 && column < board[row].length &&
                board[row][column].alive);
        }

        function start(){
        	vm.intervalInstance = setInterval(clickNext, 1000);

        }

        function stop(){
        	clearInterval(vm.intervalInstance);
        }

        function clear() {
        	vm.board = initializeBoard();
        }
    }



})();
