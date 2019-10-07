#!/usr/bin/env node

const isEven = num => num % 2 === 0

const arrOf = size => [...Array(size).keys()]

const blackOrWhiteIf = predicate => arg => predicate(arg) ? "⬜️" : "⬛️"

const boardRow = blackOrWhiteIf(isEven)

const displace = row => col => col + (row % 2)

const chessReducer = (acc, row, _i, arr) => {
	return acc + arr.map(displace(row)).map(boardRow).join("") + "\n"
}

const chessboard = (size = 8) => arrOf(size).reduce(chessReducer, "")

console.log(chessboard())
