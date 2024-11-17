Here are JavaScript/ES6 implementations for these problems:

---

### **31. Generating Pascal’s Triangle**

```javascript
function generatePascalsTriangle(rows) {
  const triangle = [];
  for (let i = 0; i < rows; i++) {
    const row = Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) {
      row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    triangle.push(row);
  }
  return triangle.map((row) => row.join(" ")).join("\n");
}

console.log(generatePascalsTriangle(4));
```

---

### **32. Finding the Median of an Array**

```javascript
function findMedian(array) {
  const sorted = array.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

console.log(findMedian([3, 1, 2, 4, 5])); // 3
```

---

### **33. Calculating the Power of a Number**

```javascript
const power = (base, exponent) => base ** exponent;

console.log(power(2, 3)); // 8
```

---

### **34. Checking for an Anagram**

```javascript
function areAnagrams(string1, string2) {
  const normalize = (str) => str.split("").sort().join("");
  return normalize(string1) === normalize(string2);
}

console.log(areAnagrams("listen", "silent")); // true
```

---

### **35. Finding the Sum of Prime Numbers in a Range**

```javascript
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function sumOfPrimes(range) {
  const [start, end] = range;
  let sum = 0;
  for (let i = start; i <= end; i++) {
    if (isPrime(i)) sum += i;
  }
  return sum;
}

console.log(sumOfPrimes([1, 10])); // 17
```

---

### **36. Finding the N-th Triangular Number**

```javascript
const triangularNumber = (n) => (n * (n + 1)) / 2;

console.log(triangularNumber(4)); // 10
```

---

### **37. Checking for Perfect Squares**

```javascript
const isPerfectSquare = (number) => Number.isInteger(Math.sqrt(number));

console.log(isPerfectSquare(16)); // true
```

---

### **38. Finding the Sum of Squares of Digits**

```javascript
function sumOfSquares(number) {
  return String(number)
    .split("")
    .reduce((sum, digit) => sum + Math.pow(Number(digit), 2), 0);
}

console.log(sumOfSquares(123)); // 14
```

---

### **39. Generating a Square Matrix**

```javascript
function generateMatrix(size) {
  let num = 1;
  return Array.from({ length: size }, () => Array.from({ length: size }, () => num++));
}

console.log(generateMatrix(3));
```

---

### **40. Sum of Digits Until Single Digit**

```javascript
function sumUntilSingleDigit(number) {
  while (number > 9) {
    number = String(number)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return number;
}

console.log(sumUntilSingleDigit(9875)); // 2
```

---

### **41. Count Specific Digits**

```javascript
function countDigit(number, digit) {
  return String(number)
    .split("")
    .filter((d) => Number(d) === digit).length;
}

console.log(countDigit(122333, 3)); // 3
```

---

### **42. Generating Fibonacci Sequence Using Recursion**

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(Array.from({ length: 5 }, (_, i) => fibonacci(i))); // [0, 1, 1, 2, 3]
```

---

### **43. Finding All Divisors**

```javascript
function findDivisors(number) {
  return Array.from({ length: number }, (_, i) => i + 1).filter((i) => number % i === 0);
}

console.log(findDivisors(12)); // [1, 2, 3, 4, 6, 12]
```

---

### **44. Finding the Average of Numbers**

```javascript
const average = (array) => array.reduce((sum, num) => sum + num, 0) / array.length;

console.log(average([1, 2, 3, 4, 5])); // 3
```

---

### **45. Finding the Mode**

```javascript
function findMode(array) {
  const freqMap = array.reduce((map, num) => ((map[num] = (map[num] || 0) + 1), map), {});
  const maxFreq = Math.max(...Object.values(freqMap));
  return +Object.keys(freqMap).find((key) => freqMap[key] === maxFreq);
}

console.log(findMode([1, 2, 2, 3, 4, 4, 4])); // 4
```

---

### **46. String Length Without Built-In Functions**

```javascript
function stringLength(str) {
  let length = 0;
  for (let char of str) length++;
  return length;
}

console.log(stringLength("hello")); // 5
```

---

### **47. Generating a Number Pyramid**

```javascript
function generatePyramid(rows) {
  return Array.from({ length: rows }, (_, i) => Array.from({ length: i + 1 }, (_, j) => j + 1).join("")).join("\n");
}

console.log(generatePyramid(4));
```

---

### **48. Sum of Prime Factors**

```javascript
function sumOfPrimeFactors(number) {
  const factors = [];
  for (let i = 2; i <= number; i++) {
    while (number % i === 0) {
      factors.push(i);
      number /= i;
    }
  }
  return [...new Set(factors)].reduce((sum, factor) => sum + factor, 0);
}

console.log(sumOfPrimeFactors(12)); // 5
```

---

### **49. Finding the Second Largest Number**

```javascript
function secondLargest(array) {
  const unique = [...new Set(array)];
  unique.sort((a, b) => b - a);
  return unique[1];
}

console.log(secondLargest([10, 20, 4, 45, 99])); // 45
```

---

### **50. Longest Substring Without Repeating Characters**

```javascript
function longestUniqueSubstring(string) {
  let max = 0,
    start = 0,
    seen = {},
    longest = "";
  for (let end = 0; end < string.length; end++) {
    const char = string[end];
    if (char in seen && seen[char] >= start) {
      start = seen[char] + 1;
    }
    seen[char] = end;
    if (end - start + 1 > max) {
      max = end - start + 1;
      longest = string.slice(start, end + 1);
    }
  }
  return longest;
}

console.log(longestUniqueSubstring("abcabcbb")); // "abc"
```

---

Let me know if you'd like explanations for any of these!
