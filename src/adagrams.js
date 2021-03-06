const Adagrams = {
  allLetters: {
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    O: 8,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1
  },
  drawLetters() {
    let letterPool = [];

    Object.keys(this.allLetters).forEach(letter => {

      let times = this.allLetters[letter];
      for (let i = 0; i < times; i += 1) {
        letterPool.push(letter);
      }
    });
    letterPool = this.shuffle(letterPool);
    const hand = letterPool.slice(0, 10);
    // console.log(hand);
    return hand;
  },
  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },
  usesAvailableLetters(word, drawn) {
    let drawnCopy = [...drawn];
    for (let i = 0; i < word.length; i += 1) {
      let char = word.charAt(i);

      if (drawnCopy.includes(char)) {
        let index = drawnCopy.indexOf(char);
        drawnCopy.splice(index, 1);
      } else {
        return false;
      }
    }
    return true;
  },
  scoreWord(word) {
    let score = 0;

    if (word === '') {
      return score;
    }

    if (word.length >= 7) {
      score += 8;
    }

    for (let i = 0; i < word.length; i += 1) {
      switch (word.charAt(i).toUpperCase()) {
        case 'A':
        case 'E':
        case 'I':
        case 'O':
        case 'U':
        case 'L':
        case 'N':
        case 'S':
        case 'R':
        case 'T':
          score += 1;
          break;
        case 'D':
        case 'G':
          score += 2;
          break;
        case 'B':
        case 'C':
        case 'M':
        case 'P':
          score += 3;
          break;
        case 'F':
        case 'H':
        case 'V':
        case 'W':
        case 'Y':
          score += 4;
          break;
        case 'K':
          score += 5;
          break;
        case 'J':
        case 'X':
          score += 8;
          break;
        case 'Q':
        case 'Z':
          score += 10;
          break;

      }
    }
    return score;
  },

  highestScoreFrom(words) {
    let winner = {
      word: '',
      score: 0,
    };
    let maxScore = 0;
    let bestWord = '';
    words.forEach(word => {
      let currentScore = this.scoreWord(word)
      if (currentScore > maxScore) {
        maxScore = currentScore;
        bestWord = word;
      } else if (currentScore === maxScore) {

        if (word.length == 10 && bestWord.length != 10) {
          bestWord = word;
        } else if (word.length < bestWord.length && bestWord.length != 10) {
          bestWord = word;
        } 
      }
    })
    winner.word = bestWord;
    winner.score = maxScore;
    return winner;
  }
};


// Do not remove this line or your tests will break!
export default Adagrams;
