import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { exactProp } from '@mui/utils';
import Modal from '@mui/material/Modal';
import { ConstructionOutlined, GamesOutlined, SecurityUpdateRounded } from '@mui/icons-material';

//Tiles
let tempScore = 0;
let tempHighScore = 0;
const App = () => {

const Item = styled(Paper)(() => ({
  padding: 16,
  fontSize: 50,
  fontWeight: 700,
  color: "#776e65",
  backgroundColor: "#EEE4DA",
  textAlign: 'center',
}));

//Button
const ColorButton = styled(Button)(() => ({
  backgroundColor: "#8F7A66",
  '&:hover': {
    backgroundColor: "#a59484",
  },
}));

// let board = [
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
// ];

//useState storing the board as a 2d array of 0s
const [board, setBoard] = useState(Array.from({length: 4},()=> Array.from({length: 4}, () => 0)));

//score and highScore
const [score, setScore] = useState(0);
const [highScore, setHighScore] = useState(0);

//generates a random tile
function generateRandom() {
  let row = Math.floor(Math.random() * 4);
  let col = Math.floor(Math.random() * 4);

  if (board[row][col] == 0) {
    let temp = [...board];
    temp[row][col] = 2;
    setBoard(temp);
  } else {
    //if the random tile is taken, just fill the first open tile
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 4; j++) {
        if(board[i][j] == 0) {
          let temp = [...board];
          temp[i][j] = 2;
          setBoard(temp);
          return;
        }
      }
    }
  }
}

//checks if the game is won
function gameWon() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] == 2048) {
        return true;
      }
    }
  }
  return false;
}

//checks if the game is lost
function gameLost() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (
        board[i][j] == 0 ||
        (i + 1 < 4 && board[i + 1][j] == board[i][j]) ||
        (i - 1 >= 0 && board[i - 1][j] == board[i][j]) ||
        (j + 1 < 4 && board[i][j + 1] == board[i][j]) ||
        (j - 1 >= 0 && board[i][j - 1] == board[i][j])
      ) {
        return false;
      }
    }
  }
  return true;
}

//moves the tiles down
function moveDown() {
  for(let z = 0; z < 4; z++) {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 4; j++) {
      let temp = [...board];
      if (temp[i][j] != 0 && temp[i][j] == temp[i + 1][j]) {
        temp[i + 1][j] = temp[i + 1][j] * 2;
        let currScore = tempScore + board[i + 1][j];
        setScore(currScore);
        tempScore = currScore;
        temp[i][j] = 0;
        setBoard(temp);
      } else if (temp[i][j] != 0 && temp[i+1][j] == 0) {
        temp[i+1][j] = temp[i][j];
        temp[i][j] = 0;
        setBoard(temp);
      }
    }
    }
  }
}

//moves the tiles up
function moveUp() {
  for(let z = 0; z < 4; z++) {
  for (var i = 3; i > 0; i--) {
    for (var j = 0; j < 4; j++) {
      let temp = [...board];
      if (temp[i][j] != 0 && temp[i - 1][j] == temp[i][j]) {
        temp[i - 1][j] = temp[i - 1][j] * 2;
        let currScore = tempScore + temp[i-1][j];
        setScore(currScore);
        tempScore = currScore;
        temp[i][j] = 0;
        setBoard(temp);
      } else if (temp[i][j] != 0 && temp[i-1][j] == 0) {
        temp[i-1][j] = temp[i][j];
        temp[i][j] = 0;
        setBoard(temp);
      }
    }
  }
  }
}

//move the tiles left
function moveLeft() {
  for(let z = 0; z < 4; z++) {
  for (var i = 0; i < 4; i++) {
    for (var j = 3; j > 0; j--) {
      let temp = [...board];
      if (temp[i][j] != 0 && temp[i][j - 1] == temp[i][j]) {
        temp[i][j - 1] = temp[i][j - 1] * 2;
        let currScore = tempScore + temp[i][j - 1];
        setScore(currScore);
        tempScore = currScore;
        temp[i][j] = 0;
        setBoard(temp);
      } else if (temp[i][j] != 0 && temp[i][j-1] == 0) {
        temp[i][j-1] = temp[i][j];
        temp[i][j] = 0;
        setBoard(temp);
      }
    }
  }
  }
}

//moves the tiles right
function moveRight() {
  for(let z = 0; z < 4; z++) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      let temp = [...board];
      if(temp[i][j] != 0 && temp[i][j + 1] == temp[i][j]) {
        temp[i][j + 1] = temp[i][j + 1] * 2;
        let currScore = tempScore + temp[i][j + 1];
        setScore(currScore);
        tempScore = currScore;
        temp[i][j] = 0;
        setBoard(temp);
      } else if (temp[i][j] != 0 && temp[i][j+1] == 0) {
        temp[i][j+1] = temp[i][j];
        temp[i][j] = 0;
        setBoard(temp);
      }
    }
  }
  }
}

//keyboard detection
const handleKeyDown = event => {
   switch (event.key) {
     case "ArrowLeft":
       moveLeft();
       turnHandler();
       break;
     case "ArrowUp":
       moveUp();
       turnHandler();
       break;
     case "ArrowRight":
       moveRight();
       turnHandler();
       break;
     case "ArrowDown":
       moveDown();
       turnHandler();
       break;
  }
  //console.log(event.key);
};

//handles the turn
function turnHandler() {
  //updates high score if needed
  let high = Math.max(tempScore, tempHighScore);
  setHighScore(high);
  tempHighScore = high;
  //checks if the game is over, otherwise continues
  if (gameWon()) {
    console.log("WON");
    changeWinScreen(true)
    return;
  } else if (gameLost()) {
    console.log("LOST");
    changeLoseScreen(true)
    return;
  } else {
    generateRandom();
  }
  
  //updateVisuals();
}

//makes a new game
const newGame = () => {
  //resets score
  setScore(0);
  updateTempScore();
  let temp = [...board];
  //replaces board with 0s
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      if(temp[i][j] != 0) {
        temp[i][j] = 0;
      }
    }
  }
  setBoard(temp);
  //fills board with 2 random tiles
  generateRandom();
  generateRandom();

  //updateVisuals();
}

//updates the score
function updateTempScore() {
  tempScore = 0;
}

//calls the newGame method on initial render, and adds event listener for button downs
useEffect(() => {
  newGame();
  document.addEventListener('keydown', handleKeyDown);
},[])

//debugging useEffect
useEffect(() => {
  console.log(board);
  console.log(tempScore)
},[board])

//win/lose screen booleans
const [winScreen, changeWinScreen] = useState(false);
const [loseScreen, changeLoseScreen] = useState(false);

//handles close of the modals
const handleClose = () => {
  changeWinScreen(false)
  changeLoseScreen(false)
}
  return (
    <div className='container'>
      <div className='heading'>
        <h1>2048</h1>
        <div className='scores'>
          <div className='current-score'>
              {score}
          </div>
          <div className='best-score'>
            {highScore}
          </div>
        </div>
        </div>

        <div className='sub-heading'>
          <p>Join the tiles, get to <b>2048!</b></p>
          <ColorButton variant="contained" onClick={newGame}>New Game</ColorButton>

        </div>
      {/* <p>Join the tiles, get to <b>2048!</b></p>
      <p>SCORE</p> */}
    
    {/*MUI Grid for the board*/}
    <div className='box-game'>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={3}>
          <Item id="00">{board[0][0]}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item id="01">{board[0][1]}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item id="02">{board[0][2]}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item id="03">{board[0][3]}</Item>
        </Grid>
        

        <Grid item xs={3}>
          <Item id="10">{board[1][0]}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item id="11">{board[1][1]}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item id="12">{board[1][2]}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item id="13">{board[1][3]}</Item>
        </Grid>


        <Grid item xs={3}>
          <Item id="20">{board[2][0]}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item id="21">{board[2][1]}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item id="22">{board[2][2]}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item id="23">{board[2][3]}</Item>
        </Grid>


        <Grid item xs={3}>
          <Item id="30">{board[3][0]}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item id="31">{board[3][1]}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item id="32">{board[3][2]}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item id="33">{board[3][3]}</Item>
        </Grid>
      </Grid>
      </div>

      <div>
        <p><b>How to Play:</b> Use your arrow keys to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach <b>2048!</b></p>
      </div>
      {/*Modals for the win/lose screen*/}
      <Modal aria-labelledby="modal-title" aria-describedby="modal-description" open = {winScreen} onClose={handleClose}>
        <h2 id="modal-title">You Won!</h2>
      </Modal>
      <Modal aria-labelledby="modal-title" aria-describedby="modal-description" open = {loseScreen} onClose={handleClose}>
        <h2 id="modal-title">You Lost!</h2>
      </Modal>
    </div>
  );
};

export default App;