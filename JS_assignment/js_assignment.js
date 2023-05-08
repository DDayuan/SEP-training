const ques1 = (x) => {
    let rev = 0;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    while (x != 0) {
        let digit = x % 10;
        rev = rev * 10 + digit;
        x = Math.floor(x / 10);
    }
    let res = rev * sign;
    return res;
}
console.log(ques1(32243))
console.log("------ ------")

const ques2 = (s) => {
    s = s.toLowerCase().replace(/[^a-z0-9]/gi, "");
  for (let i = 0, j = s.length - 1; i <= j; i++, j--) {
    if (s.charAt(i) !== s.charAt(j)) return false;
  }
  return true;
}
console.log(ques2("nurses run"))
console.log("------ ------")

const ques3 = (s) => {
    let set = [];
    let ans = [];
    const dfs = (cur) => {
        if (cur == s.length) {
            set.push(ans.slice());
            return;
        }
        ans.push(s[cur]);
        dfs(cur+1);
        ans.pop();
        dfs(cur+1);
    }
    dfs(0);
    return set;
}
console.log(ques3("dog"))
console.log("------ ------")

const ques4 = (s) => {
    return s.split('').sort().join('');
}
console.log(ques4('webmaster'));
console.log("------ ------")

const ques5 = (str) => {
    var words = str.split(' ');

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var firstLetter = word.charAt(0);
    var capitalizedFirstLetter = firstLetter.toUpperCase();
    var restOfWord = word.slice(1);
    words[i] = capitalizedFirstLetter + restOfWord;
  }

  var capitalizedString = words.join(' ');
  return capitalizedString;
}
console.log(ques5("the quick brown fox"));
console.log("------ ------")

const ques6 = (s) => {
    let words = s.split(' ');
    maxLen = 0;
    idx = 0;
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > maxLen) {
            maxLen = words[i].length;
            idx = i;
        }
    }
    return words[idx];
}
console.log(ques6("Web Development Tutorial"))
console.log("------ ------")

const ques7 = (s) => {
    let set = new Set(['a', 'e', 'i', 'o', 'u']);
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        if (set.has(s[i])) {
            count++;
        }
    }
    return count;
}
console.log(ques7('The quick brown fox'));
console.log("------ ------")

const ques8 = (num) => {
    if (num == 2) return "is prime";
    for (let i = 2; i < num; i++) {
        if (Number.isInteger(num / i)) {
            return "not prime";
        }
    }
    return "is prime";
}
console.log(ques8(21));
console.log("------ ------")

const ques9 = (s) => {
    type = typeof(s);
    return type;
}
console.log(ques9());

const ques10 = (n) => {
    let matrix = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (i != j) matrix[i][j] = 1;
        }
    }
    return matrix;
}
console.log(ques10(3));
console.log("------ ------")

const ques11 = (arr) => {
    arr.sort();
    return [arr[1], arr[arr.length - 2]];
}
console.log(ques11([1,3,2,4,5]));
console.log("------ ------")

const ques12 = (num) => {
    if (num === 1) {
        return false;
    }

    let sum = 1;
    for (let d = 2; d * d <= num; d++) {
        if (num % d === 0) {
            sum += d;
            if (d*d < num) {
                sum += Math.floor(num/d);
            }
        }
    }
    //console.log(sum);
    return sum === num;
}
console.log(ques12(28));
console.log("------ ------")

const ques13 = (num) => {

    let ans = [];
    for (let d = 2; d * d <= num; d++) {
        if (num % d === 0) {
            ans.push(d);
            if (d*d < num) {
                ans.push(Math.floor(num/d));
            }
        }
    }
    //console.log(sum);
    return ans;
}
console.log(ques13(28));
console.log("------ ------")

const ques14 = (amount, coins) => {
    let minCoins = new Array(amount + 1).fill(Infinity);
    minCoins[0] = 0;
  
    for (let i = 1; i <= amount; i++) {
      for (let j = 0; j < coins.length; j++) {
        if (coins[j] <= i && minCoins[i - coins[j]] + 1 < minCoins[i]) {
          minCoins[i] = minCoins[i - coins[j]] + 1;
        }
      }
    }
    let result = [];
    let i = amount;
    while (i > 0) {
      for (let j = 0; j < coins.length; j++) {
        if (coins[j] <= i && minCoins[i - coins[j]] + 1 === minCoins[i]) {
          result.push(coins[j]);
          i -= coins[j];
          break;
        }
      }
    }
  
    return result;
}
console.log(ques14(45, [25, 10, 5, 2]));
console.log("------ ------")

const ques15 = (base, exponent) => {
    if (exponent == 0) return 1;
    if (exponent % 2 === 0) {
        let temp = ques15(base, exponent / 2);
        return temp * temp;
    } else {
        let temp = ques15(base, Math.floor(exponent / 2));
        return temp * temp * base;
    }
}
console.log(ques15(4, 3));
console.log("------ ------")

const ques16 = (s) => {
    let set = new Set();
    let ans = "";
    for (let i = 0; i < s.length; i++) {
        if (!set.has(s[i])) {
            set.add(s[i]);
            ans = ans.concat(s[i]);
        }
    }
    return ans;
}
console.log(ques16("thequickbrownfoxjumpsoverthelazydog"));
console.log("------ ------")

const ques17 = (s) => {
    let hash = {};
    for (let i = 0; i < s.length; i++) {
        if (!hash[s[i]]) {
            hash[s[i]] = 0;
        }
        hash[s[i]] += 1;
    }
    return hash;
}
console.log(ques17("apple"));
console.log("------ ------")

const ques18 = (arr, target) => {
    arr.sort((a, b) => a - b);
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        }else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    console.log(arr, arr[mid], mid);
    return -1;
}
console.log(ques18([1, 3, 7, 12, 13, 16, 15, 19, 21], 7));
console.log("------ ------")

const ques19 = (arr, num) => {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > num) {
            res.push(arr[i]);
        }
    }
    return res;
}
console.log(ques19([1, 3, 7, 12, 13, 16, 15, 19, 21], 7));
console.log("------ ------")

const ques20 = (len) => {
    charlist = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    res = "";
    for (let i = 0; i < len; i++) {
        res += charlist[Math.floor(charlist.length * Math.random())];
    }
    return res;
}
console.log(ques20(8))
console.log("------ ------")

const ques21 = (arr, len) => {
    const res = [];

  const dfs = (cur, idx) => {
    if (cur.length === len) {
      res.push(cur.slice());
      return;
    }
    for (let i = idx; i < arr.length; i++) {
      cur.push(arr[i]);
      dfs(cur, i + 1);
      cur.pop();
    }
  };

  dfs([], 0);
  return res;
};
console.log(ques21([1, 2, 3], 2))
console.log("------ ------")

const ques22 = (str, target) => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === target) {
            count++;
        }
    }
    return count;
}
console.log(ques22('microsoft.com', 'o'))
console.log("------ ------")

const ques23 = (str) => {
    let freq = Array(26).fill(0);
    for (let s of str) {
        const idx = s.charCodeAt() - 97;
        freq[idx] += 1;
    }
    for (let i = 0; i < str.length; i++) {
        let idx = str[i].charCodeAt() - 97;
        if (freq[idx] === 1) return str[i];
    }
    return -1;
}
console.log(ques23( 'abacddbec'))
console.log("------ ------")

const ques24 = (arr) => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] < arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    return arr;
}
console.log(ques24([12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]));
console.log("------ ------")

const ques25 = (names) => {
    let target = "";
    for (let i = 0; i < names.length; i++) {
        if (names[i].replace(" ", "").length > target.length) {
            target = names[i];
        }
    }
    return target;
}
console.log(ques25(["Australia", "Germany", "United States of America"]))
console.log("------ ------")

const ques26 = (s) => {
    let left = 0, right = 0;
    let maxLen = 0;
    let maxL = 0, maxR = 0;
    let set = new Set();
    while (right < s.length) {
        //console.log(set);
        while(set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        right++;
        if (right - left + 1 > maxLen) {
            maxLen = right-left+1;
            maxL = left;
            maxR = right;
        }
        //console.log(maxL, maxR);
    }
    //console.log(maxL, maxR);
    return s.slice(maxL, maxR);
}
console.log(ques26("asdfghasd"))
console.log("------ ------")

const ques27 = (s) => {
    let maxLen = 0
    let max = "";
    const helper = (l, r) => {
        while (l>=0 && r < s.length && s[l] === s[r]) {
            l--;
            r++
        }
        const maxStr = s.slice(l+1, r);
        if (maxStr.length > maxLen) {
            max = maxStr;
            maxLen = maxStr.length;
        }
    }
    for (let i = 0; i < s.length; i++){
        helper(i, i);
        helper(i, i+1);
    }
    return max;
}
console.log(ques27("banana"));
console.log("------ ------")

const ques28 = (callback) => {
    callback();
}
const mycallback = () => {
    console.log("this function is passed as parameter");
}
console.log(ques28(mycallback));
console.log("------ ------")

const ques29 = (func) => {
    return func.name;
}
const hello = () => {
    console.log("hello world");
}
console.log(ques29(hello));