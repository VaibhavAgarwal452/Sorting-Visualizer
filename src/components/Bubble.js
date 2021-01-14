import React, { useState } from 'react';
import Column from './widgets/Column';
import './widgets/Columns.css';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import LinearProgress from '@material-ui/core/LinearProgress';

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let swapped = [];
let currentColumn = 0;
let numOfCol = 20;
let timer;
const Bubble = (props) => {
  const getRandomArray = (min, max, n) => {
    let arr = Array(n).fill(0);
    arr.forEach((item, index) => {
      arr[index] = Math.floor(Math.random() * (max - min)) + min;
    });
    return arr;
  };
  const calcWidth = (screenWidth, numOfCols) => {
    let x = screenWidth / numOfCols;
    if (x > 30) {
      return 20;
    } else {
      return x - 10;
    }
  };
  const calcHeight = (screenHeight) => {
    let x = screenHeight * 0.5;
    if (x > 400) {
      return 400;
    } else {
      return x;
    }
  };
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [numOfCols, setNumOfCols] = useState(numOfCol);
  const width = calcWidth(screenWidth, numOfCols);
  const height = calcHeight(screenHeight);
  const [columnsArray, setColumnsArray] = useState(
    getRandomArray(height, 1, numOfCols)
  );

  const getNewArray = () => {
    setColumnsArray(getRandomArray(height, 1, numOfCols));
    swapped = [];
    currentColumn = 0;
    setStart(false);
  };

  const handleColumnsChange = (t) => {
    if (start) return false;
    if (numOfCols + t > 10 && numOfCols + t < 141) {
      setNumOfCols(numOfCols + t);
      getNewArray();
    }
  };
  const handleSpeedChange = (t) => {
    console.log(t, ' is changed');
  };
  const renderCols = () => {
    return columnsArray.map((c, index) => {
      let current =
        index === currentColumn || index === currentColumn + 1 ? true : false;
      return (
        <Column
          key={index}
          id={index}
          height={c}
          width={width}
          current={current}
        />
      );
    });
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
          onClick={() => {
            if (speed + 50 < 1000) {
              setSpeed(speed + 50);
            } else {
              console.log('Loop is at max speed');
            }
          }}
        >
          <FastRewindIcon />
          Speed Down
        </button>
      </div>
    );
  };
  const swap = (left, right) => {
    let newArray = [...columnsArray];
    if (columnsArray[left] > columnsArray[left + 1]) {
      let leftItem = columnsArray[left];
      let rightItem = columnsArray[left + 1];
      columnsArray[left] = rightItem;
      columnsArray[right] = leftItem;
      newArray = [...columnsArray];
    }
    if (currentColumn >= columnsArray.length - swapped.length) {
      currentColumn = 0;
      swapped.push(right);
      console.log('added to swapped', right);
    } else {
      currentColumn++;
    }
    setColumnsArray(newArray);
    if (swapped.length === columnsArray.length - 1) {
      currentColumn = -2;
      setStart(false);
      stop();
    }
  };

  const bubbleSort = () => {
    swap(currentColumn, currentColumn + 1);
  };

  function startSort() {
    if (start) {
      timer = setTimeout(bubbleSort, speed);
    }
  }

  function stop() {
    setStart(false);
    clearTimeout(timer);
  }
  startSort();
  return (
    <div className='conatiner-fluid'>
      <h1 className='bg-light p-1'>Bubble Sort</h1>

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
        <div>{renderCols()}</div>
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
export default Bubble;
