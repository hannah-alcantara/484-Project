import * as React from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { exactProp } from '@mui/utils';
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

const [board, setBoard] = useState(Array.from({length: 4},()=> Array.from({length: 4}, () => 0)));

const [score, setScore] = useState(0);
const [highScore, setHighScore] = useState(0);

function generateRandom() {
  let row = Math.floor(Math.random() * 4);
  let col = Math.floor(Math.random() * 4);

  if (board[row][col] == 0) {
    let temp = [...board];
    temp[row][col] = 2;
    setBoard(temp);
  } else {
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

function moveDown() {
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

function moveUp() {
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

function moveLeft() {
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
function moveRight() {
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

function turnHandler() {
  let high = Math.max(tempScore, tempHighScore);
  setHighScore(high);
  tempHighScore = high;
  //setHighScore(Math.max(score, highScore));
  if (gameWon()) {
    console.log("WON");
    return;
  } else if (gameLost()) {
    console.log("LOST");
    return;
  } else {
    generateRandom();
  }
  
  //updateVisuals();
}
const newGame = () => {
  setScore(0);
  updateTempScore();
  let temp = [...board];

  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      if(temp[i][j] != 0) {
        temp[i][j] = 0;
      }
    }
  }
  setBoard(temp);
  generateRandom();
  generateRandom();

  //updateVisuals();
}

function updateTempScore() {
  tempScore = 0;
}

useEffect(() => {
  newGame();
  document.addEventListener('keydown', handleKeyDown);
},[])

useEffect(() => {
  console.log(board);
  console.log(tempScore)
},[board])

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
    </div>
  );
};

export default App;