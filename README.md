## Next Steps:

* Valid moves per piece - `pawnValidMoves`

* Chess move notation - coordinates instead of just row / col numbers. This abstracts away the rows and cols / 
* Zero indexing this would be a-h is cols / 8-1 rows
* Interim interactive version in pure js
* React version for presentation and interaction
* Know which player is which

* OOP version 

* Mouse inteaction for the UI
* Click to drag and move pieces by mouse interaction

* Fix all pieces for being able to take king or not take king in a normal move
* Include rook logic for 'castling' - the rook also participates, with the king, in a special move called castling.

### Latest Ideas:

* Solve the immutable / mutable debate:
  1. Could only store the position that hold a piece then re-render these over the table each time something changes
  2. Have the new board as one array, old board as separate array and loop over the boards and mark the changes. 
  Also need a map of all the table cells with their current corresponding position. 
  The td would always remain on the screen