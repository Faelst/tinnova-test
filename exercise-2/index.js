const bubbleSort = (array) => {
  let n = array.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (array[j] > array[j + 1]) {
        let t = array[j];
        array[j] = array[j + 1];
        array[j + 1] = t;
      }
    }
  }
  return array;
};

const originalArray = [5, 3, 2, 4, 7, 1, 0, 6];
const ordinateArray = bubbleSort(originalArray);
console.log(ordinateArray);
