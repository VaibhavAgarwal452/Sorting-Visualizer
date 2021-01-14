/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import Column from './Column';
import './Columns.css';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import LinearProgress from '@material-ui/core/LinearProgress';
import impfunc from '../useFunctions/ImportantFunctions';

const { getRandomArray, calcHeight, calcWidth } = impfunc();
let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
let numOfCol = 20;

window.addEventListener('resize', () => {
  window.location.reload();
});
export default (props) => {
  const [speed, setSpeed] = useState(50);
  console.log('speed is ', speed);
  const [numOfCols, setNumOfCols] = useState(numOfCol);
  let width = calcWidth(screenWidth, numOfCols);
  let height = calcHeight(screenHeight);
  const [columnsArray, setColumnsArray] = useState(
    getRandomArray(height, 1, numOfCols)
  );
  const [start, setStart] = useState(false);
  const getNewArray = () => {
    setColumnsArray(getRandomArray(height, 1, numOfCols));
  };
  const handleColumnsChange = (t) => {
    if (start) return false;
    if (numOfCols + t > 10 && numOfCols + t < 141) {
      setNumOfCols(numOfCols + t);
      getNewArray();
    }
  };
  const actionCenter = () => {
    return (
      <div className='d-flex justify-content-center bg-warning align-items-baseline'>
        <button
          onClick={() => handleColumnsChange(10)}
          className='btn btn-sm btn-success m-2'
          disabled={start}
        >
          +<ViewWeekIcon />
        </button>
        {numOfCols}
        <button
          onClick={() => handleColumnsChange(-10)}
          className='btn btn-sm btn-danger m-2'
          disabled={start}
        >
          -<ViewWeekIcon />
        </button>

        <button
          className='btn btn-success m-2'
          disbaled={start}
          onClick={() => {
            if (speed - 50 > 50) {
              setSpeed(speed - 50);
            } else {
              alert('Loop is at its max speed');
            }
          }}
        >
          <FastForwardIcon />
          Speed Up
        </button>
        {speed}
        <button
          className='btn btn-danger m-2'
          disabled={start}
          onClick={() => {
            if (speed + 50 < 1000) {
              setSpeed(speed + 50);
            } else {
              console.log('Loop is at min speed');
            }
          }}
        >
          <FastRewindIcon />
          Speed Down
        </button>
      </div>
    );
  };
  const display = (cols) => {
    return (
      <div className='conatiner-fluid'>
        <div className='d-flex justify-content-between mt-2'>
          <button onClick={getNewArray} className='btn btn-outline-warning'>
            {' '}
            Create New Array
          </button>
          <button
            onClick={() => setStart(!start)}
            className='btn btn-outline-success'
          >
            {start ? <span>Pause Sort</span> : <span>Start Sort</span>}
          </button>
        </div>
        <div>{start && <LinearProgress />}</div>
        <div className='row shadow columns-container'>
          <div>{cols}</div>
        </div>
        {actionCenter()}
        <div className='mt-3'>
          <div className='row'>
            <div className='col-6'>
              <div className='alert alert-primary' role='alert'>
                It will take {(numOfCols * (numOfCols - 1)) / 2} moves to sort
              </div>
            </div>
            <div className='col-6'>
              <div className='alert alert-success' role='alert'>
                Number of Columns: {numOfCols}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return {
    display: display,
    columnsArray: columnsArray,
    setColumnsArray: setColumnsArray,
    start: start,
    setStart: setStart,
    speed: speed,
    width: width,
  };
};
