const x = 3;
const y = 5;
const multiples = 10;
let res = 0;

for (let i = 0; i < multiples; i++) {
  if (i % x == 0 || i % y == 0) {
    res += i;
  }
}

console.log(res);
