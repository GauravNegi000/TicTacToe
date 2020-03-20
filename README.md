# TicTacToe
It is a tictactoe game comp vs player build with HTML,CSS,JS with minimax algorithm.

![TicTacToe preview](https://github.com/GauravNegi000/TicTacToe/blob/master/tictactoe_giphy.gif)
### Demo Link
[Click here to view demo site.](https://tictactoe-g.netlify.com)

### A brief Tutorial on how to make a TicTacToe.

#### HTML
* First of all create a HTML skeleton of a tictactoe board and other neccessary buttons or divisons.
* Board can be created with the help of table having 3 rows and 3 table data in each row.
* Provide neccessary classes and id to the elements.
* Distinct all the cells(table data) of baord with distinct id such as from 0-8.

#### CSS
* To give a real look of a tictactoe game we will apply CSS.
* So, to remove borders of differernt cells from particular sides use proper css selectors and use properties like border-left,top,down,right to 0.
* And do other needed styling.

#### Scripting(JS)
* Now here comes the main part to construct and implement the game logic.
* First of all create a originalboard array variable where we will store the real value.
* Assign variable for humanplayer and aiPlayer.
* Now make a winning combination array of array where fill it with all the possible winning combinations of the game.
* With the Help of DOM select all the cells in a table and other elements time to time and use it to fulfill the need.
* Now add click event listener on the cells and make function to call on clicking it.
* On that function ,now use it to change the display on the UI side(HTML) to the one's symbol who clicked with the help of DOM.
* Along with that add that clicked cell to the originalboard array at appropriate index with that symbol if not already clicked.
* Also after that check at every click whether the game is won or not ot check for tie also.And if these conditions are not true go for the aiplayer chance(algo).
* We can make checkwin function by collecting all the places where the current player is and after that by checking it with every winning cominations.
* To make the checktie function we can check it by checking the no. if empty spaces if they are ) means it is tie.
* Now for Ai player chance we will make algo to find the best spot in the remaining board and before that we need to know the empty places in the board.
* Bestspot algo can be made acc. to diiferernt difficulty level,for easy one just return the next spot which were collected through the method to find empty places.
* Other algo can be made to find the next spot for ai player.
* Here we have used minimax algorithm to find bestspot for aiplayer for unbeatable level.
* You can learn to implement it from [here.](https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/)
* Finish it with neccessary DOM manipulations and stylings.
***
> Thank You
