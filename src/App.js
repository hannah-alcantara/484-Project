import * as React from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

//Tiles
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

export default function gameUI() {
  return (
    <div className='container'>

      <div className='heading'>
        <h1>2048</h1>
        <div className='scores'>
          <div className='current-score'>
              0
          </div>
          <div className='best-score'>
            2048
          </div>
        </div>
        </div>

        <div className='sub-heading'>
          <p>Join the tiles, get to <b>2048!</b></p>
          <ColorButton variant="contained">New Game</ColorButton>

        </div>
      {/* <p>Join the tiles, get to <b>2048!</b></p>
      <p>SCORE</p> */}

    <div className='box-game'>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        

        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>


        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>


        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>0</Item>
        </Grid>
      </Grid>
      </div>

      <div>
        <p><b>How to Play:</b> Use your arrow keys to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach <b>2048!</b></p>
      </div>
    </div>
  );
}
