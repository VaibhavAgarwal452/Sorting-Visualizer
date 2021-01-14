import React from 'react';
import columns from './widgets/Columns';
import Column from './widgets/Column';

let timer;
let currentColumn = 1;
let currentCompare = 0;
const insertion = () => {
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
          width={width}
          height={c}
          current={current}
        />
      );
    });
  };
  const insertionSort = () => {
    const currentColumnValue = columnsArray[currentColumn];
    for (
      currentCompare = currentColumn - 1;
      currentCompare >= 0 && columnsArray[currentCompare] > currentColumnValue;
      currentCompare--
    ) {
      columnsArray[currentCompare + 1] = columnsArray[currentCompare];
    }
    columnsArray[currentCompare + 1] = currentColumnValue; //columnsArray[currentColumn];
    setColumnsArray([...columnsArray]);
    currentColumn += 1;
    if (currentColumn === columnsArray.length) {
      stop();
      return true;
    }
  };
  const startSort = () => {
    if (start) {
      timer = setTimeout(insertionSort, speed);
    } else {
      stop();
    }
  };
  const stop = () => {
    clearTimeout(timer);
    start && setStart(false);
  };
  startSort();
  return (
    <div>
      <div className='bg-light p-1'>
        <h1>Insertion Sort</h1>
      </div>
      {display(renderCols(currentCompare + 1, currentColumn))}
    </div>
  );
};

export default insertion;
