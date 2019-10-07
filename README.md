## Next Steps:

-   Valid moves per piece - `pawnValidMoves`
-   Valid en passant capture by a pawn, on the move follow the opponent pawn's double-move
-   Issue where valid king moves are showing as being in check from a pawn move rather than a pawn capture.

-   Promotion for a pawn when reaches all the way to back line
-   UI for player to choose what they want to promote the pawn to
-   Need to keep track of all the pieces that are being taken

-   Chess move notation - coordinates instead of just row / col numbers. This abstracts away the rows and cols /
-   Zero indexing this would be a-h is cols / 8-1 rows
-   Interim interactive version in pure js
-   React version for presentation and interaction
-   Know which player is which

-   OOP version

-   Fix all pieces for being able to take king or not take king in a normal move
-   Include rook logic for 'castling' - the rook also participates, with the king, in a special move called castling.

### Latest Ideas:

-   Solve the immutable / mutable debate:
    1. Could only store the position that hold a piece then re-render these over the table each time something changes
    2. Have the new board as one array, old board as separate array and loop over the boards and mark the changes.
       Also need a map of all the table cells with their current corresponding position.
       The td would always remain on the screen
    Caveat - the UI would never be immutable. (E.g. react just diffs the DOM and shadow DOM)


### Refactoring
-  Could be a series of rules that compose a kingValidMoves() e.g. allDiagonalMoves(Infinity) allowJumping

### Cyclomatic Complexity 
-  Benchmark current complexity using Eslint Rules

### GitHub Pages
-  use https://jekyllrb.com/ 
-  change chessboard.html to index.html
-  can point the DNS to a personal domain
-  remame the repo to chess game