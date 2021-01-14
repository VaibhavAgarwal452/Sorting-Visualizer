import React, { useEffect, useState } from 'react';
import Column from './widgets/Column';
import columns from './widgets/Columns';
let timer;
let currentColumn = 0,
  currentMin = 0;
// eslint-disable-next-line import/no-anonymous-default-export
export default (params) => {
  const {
    display,
    setColumnsArray,
    columnsArray,
    start,
    setStart,
    speed,
    width,
  } = columns();
  const renderCols = (x, y) => {
    return columnsArray.map((c, index) => {
      let current = index === x || index === y ? true : false;
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
  const swap = (current, min) => {
    let x = columnsArray[current];
    columnsArray[current] = columnsArray[min];
    columnsArray[min] = x;
  };

  function startSort() {
    if (start) {
      timer = setTimeout(selectionSort, speed);
    } else {
      stop();
    }
  }
  function stop() {
    clearTimeout(timer);
    start && setStart(false);
  }

  const selectionSort = () => {
    if (columnsArray[currentMin] > columnsArray[currentColumn]) {
      swap(currentMin, currentColumn);
    }
    currentColumn++;
    if (currentColumn === columnsArray.length) {
      currentColumn = currentMin + 1;
      currentMin++;
    }

    setColumnsArray([...columnsArray]);
    if (currentMin === columnsArray.length) {
      stop();
      return true;
    }
  };

  startSort();
  return (
    <div>
      <div className='bg-light p-1'>
        <h1>Selection Sort</h1>
      </div>
      {display(renderCols(currentMin, currentColumn))}
    </div>
  );
};
