export default function ImportantFunctions() {
  return {
    getRandomInt: (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomArray: (min, max, n) => {
      let arr = Array(n).fill(0);
      arr.forEach((item, index) => {
        arr[index] = Math.floor(Math.random() * (max - min)) + min;
      });
      return arr;
    },
    calcWidth: (screenWidth, numOfCol) => {
      let x = screenWidth / numOfCol;
      if (x < 30) {
        return 20;
      } else {
        return x - 10;
      }
    },
    calcHeight: (screenHeight) => {
      let x = screenHeight * 0.5;
      if (x > 400) {
        return 400;
      } else {
        return x;
      }
    },
  };
}
