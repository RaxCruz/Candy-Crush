const candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
const board = [];
const [rows, columns] = [9, 9];
let score = 0;
let currCandy;
let otherCandy;
const candyBoard = document.querySelector("#board");
window.onload = () => {
  startGame();
  if (crushCandy() === true) {
    setTimeout(() => candyScale(), 500);
  }
};

randomCandy = () => {
  return candies[Math.floor(Math.random() * candies.length)];
};

startGame = () => {
  for (let r = 0; r < rows; r += 1) {
    let row = [];
    for (let c = 0; c < columns; c += 1) {
      const candy = document.createElement("img");
      candy.src = "./images/" + randomCandy() + ".png";
      const particle = document.createElement("div");
      particle.classList.add("particle", "none");
      candy.src = "./images/" + randomCandy() + ".png";
      //mouse event
      candy.addEventListener("touchstart", touchStart);
      candy.addEventListener("touchend", touchEnd);
      candy.addEventListener("touchcancel", touchCancel);
      candy.addEventListener("touchmove", touchMove);
      //touch event
      candy.addEventListener("mousedown", touchStart);
      candy.addEventListener("mouseup", touchEnd);
      candy.addEventListener("mouseenter", mouseEnter);
      candy.addEventListener("mousemove", touchMove);
      candyBoard.append(candy, particle);
      particle.style.top = `${r * candy.getBoundingClientRect().width}px`;
      particle.style.left = `${c * candy.getBoundingClientRect().width}px`;
      candy.style.top = `${r * candy.getBoundingClientRect().width}px`;
      candy.style.left = `${c * candy.getBoundingClientRect().width}px`;
      row.push(candy);
    }
    board.push(row);
  }
};
let startx, starty;
//獲得角度
function getAngle(angx, angy) {
  return Math.atan2(angy, angx) * 180 / Math.PI;
};

//根據起點終點返回方向 1向上 2向下 3向左 4向右 0未滑動
function getDirection(startx, starty, endx, endy) {
  var angx = endx - startx;
  var angy = endy - starty;
  var result = 0;

  //如果滑動距離太短
  if (Math.abs(angx) < 30 && Math.abs(angy) < 30) {
    return result;
  }

  var angle = getAngle(angx, angy);
  if (angle >= -135 && angle <= -45) {
    result = 1;
  } else if (angle > 45 && angle < 135) {
    result = 2;
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3;
  } else if (angle >= -45 && angle <= 45) {
    result = 4;
  }

  return result;
}
getPageCoor = (e) => {
  let x
  let y
  if (e.touches) {
    x = e.touches[0].pageX
    y = e.touches[0].pageY
  }
  else if (e.changedTouches) {
    x = e.changedTouches[0].pageX
    y = e.changedTouches[0].pageY
  }
  else {
    x = e.pageX
    y = e.pageY
  }
  return [x, y]
}
//touch event handler
let isStart = false
touchStart = (e) => {


  //e.preventDefault();
  currCandy = e.target;
  [startx, starty] = getPageCoor(e)

  isStart = true
  e.preventDefault()
}
mouseEnter = (e) => {

}
touchMove = (e) => {
  //e.preventDefault();
  var endx, endy;
  [endx, endy] = getPageCoor(e)
  var direction = getDirection(startx, starty, endx, endy);
  if (direction === 0 || isStart === false) return;
  isStart = false
  let currRow, currCol, otherRow = -1, otherCol = -1, temp
  let targetLeft = 0
  let targetTop = 0
  switch (direction) {
    case 0:
      break;
    //上方
    case 1:
      targetLeft = currCandy.getBoundingClientRect().left
      targetTop = currCandy.getBoundingClientRect().top - currCandy.getBoundingClientRect().width

      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c].getBoundingClientRect().left === currCandy.getBoundingClientRect().left && board[r][c].getBoundingClientRect().top === currCandy.getBoundingClientRect().top) {

            currRow = r; currCol = c
          }
          if (board[r][c].getBoundingClientRect().left >= targetLeft - 0.05 && board[r][c].getBoundingClientRect().left <= targetLeft + 0.05 && board[r][c].getBoundingClientRect().top >= targetTop - 0.05 && board[r][c].getBoundingClientRect().top <= targetTop + 0.05) {
            otherCandy = board[r][c]

            otherRow = r; otherCol = c;
          }
        }
      }
      if (otherRow === -1 && otherCol === -1) break
      currCandy.style.transition = "all 1s ease-in-out";
      otherCandy.style.transition = "all 1s ease-in-out";
      temp = otherCandy.style.top;
      otherCandy.style.top = currCandy.style.top;
      currCandy.style.top = temp;
      temp = board[currRow][currCol]
      board[currRow][currCol] = board[otherRow][otherCol]
      board[otherRow][otherCol] = temp

      if (crushCandy()) {
        setTimeout(() => {
          candyScale();
        }, 800);
      } else {
        setTimeout(() => {

          currCandy.style.transition = "all 1s ease-in-out";
          otherCandy.style.transition = "all 1s ease-in-out";
          temp = otherCandy.style.top;
          otherCandy.style.top = currCandy.style.top;
          currCandy.style.top = temp;

          temp = board[currRow][currCol]
          board[currRow][currCol] = board[otherRow][otherCol]
          board[otherRow][otherCol] = temp
        }, 1000);
      }
      break;
    //下方
    case 2:
      targetLeft = currCandy.getBoundingClientRect().left
      targetTop = currCandy.getBoundingClientRect().top + currCandy.getBoundingClientRect().width

      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c].getBoundingClientRect().left === currCandy.getBoundingClientRect().left && board[r][c].getBoundingClientRect().top === currCandy.getBoundingClientRect().top) {

            currRow = r; currCol = c
          }
          if (board[r][c].getBoundingClientRect().left >= targetLeft - 0.05 && board[r][c].getBoundingClientRect().left <= targetLeft + 0.05 && board[r][c].getBoundingClientRect().top >= targetTop - 0.05 && board[r][c].getBoundingClientRect().top <= targetTop + 0.05) {
            otherCandy = board[r][c]


            otherRow = r; otherCol = c;
          }
        }
      }

      if (otherRow === -1 && otherCol === -1) break
      currCandy.style.transition = "all 1s ease-in-out";
      otherCandy.style.transition = "all 1s ease-in-out";
      temp = otherCandy.style.top;
      otherCandy.style.top = currCandy.style.top;
      currCandy.style.top = temp;
      temp = board[currRow][currCol]
      board[currRow][currCol] = board[otherRow][otherCol]
      board[otherRow][otherCol] = temp

      if (crushCandy()) {
        setTimeout(() => {
          candyScale();
        }, 800);
      } else {
        setTimeout(() => {

          currCandy.style.transition = "all 1s ease-in-out";
          otherCandy.style.transition = "all 1s ease-in-out";
          temp = otherCandy.style.top;
          otherCandy.style.top = currCandy.style.top;
          currCandy.style.top = temp;

          temp = board[currRow][currCol]
          board[currRow][currCol] = board[otherRow][otherCol]
          board[otherRow][otherCol] = temp
        }, 1000);
      }
      break;
    //左方
    case 3:
      targetLeft = currCandy.getBoundingClientRect().left - currCandy.getBoundingClientRect().width
      targetTop = currCandy.getBoundingClientRect().top

      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c].getBoundingClientRect().left === currCandy.getBoundingClientRect().left && board[r][c].getBoundingClientRect().top === currCandy.getBoundingClientRect().top) {

            currRow = r; currCol = c
          }
          if (board[r][c].getBoundingClientRect().left >= targetLeft - 0.05 && board[r][c].getBoundingClientRect().left <= targetLeft + 0.05 && board[r][c].getBoundingClientRect().top >= targetTop - 0.05 && board[r][c].getBoundingClientRect().top <= targetTop + 0.05) {

            otherCandy = board[r][c]
            otherRow = r; otherCol = c;

          }
        }
      }

      if (otherRow === -1 && otherCol === -1) break
      currCandy.style.transition = "all 1s ease-in-out";
      otherCandy.style.transition = "all 1s ease-in-out";
      temp = otherCandy.style.left;
      otherCandy.style.left = currCandy.style.left;
      currCandy.style.left = temp;
      temp = board[currRow][currCol]
      board[currRow][currCol] = board[otherRow][otherCol]
      board[otherRow][otherCol] = temp


      if (crushCandy()) {
        setTimeout(() => {
          candyScale();
        }, 800);
      } else {
        setTimeout(() => {
          currCandy.style.transition = "all 1s ease-in-out";
          otherCandy.style.transition = "all 1s ease-in-out";
          temp = otherCandy.style.left;
          otherCandy.style.left = currCandy.style.left;
          currCandy.style.left = temp;

          temp = board[currRow][currCol]
          board[currRow][currCol] = board[otherRow][otherCol]
          board[otherRow][otherCol] = temp

        }, 1000);
      }
      break;
    //右方
    case 4:
      targetLeft = currCandy.getBoundingClientRect().left + currCandy.getBoundingClientRect().width
      targetTop = currCandy.getBoundingClientRect().top
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c].getBoundingClientRect().left === currCandy.getBoundingClientRect().left && board[r][c].getBoundingClientRect().top === currCandy.getBoundingClientRect().top) {

            currRow = r; currCol = c
          }
          if (board[r][c].getBoundingClientRect().left >= targetLeft - 0.05 && board[r][c].getBoundingClientRect().left <= targetLeft + 0.05 && board[r][c].getBoundingClientRect().top >= targetTop - 0.05 && board[r][c].getBoundingClientRect().top <= targetTop + 0.05) {
            otherCandy = board[r][c]


            otherRow = r; otherCol = c;
          }
        }
      }
      if (otherRow === -1 && otherCol === -1) break
      currCandy.style.transition = "all 1s ease-in-out";
      otherCandy.style.transition = "all 1s ease-in-out";
      temp = otherCandy.style.left;
      otherCandy.style.left = currCandy.style.left;
      currCandy.style.left = temp;
      temp = board[currRow][currCol]
      board[currRow][currCol] = board[otherRow][otherCol]
      board[otherRow][otherCol] = temp

      if (crushCandy()) {
        setTimeout(() => {
          candyScale();
        }, 800);
      } else {
        setTimeout(() => {

          currCandy.style.transition = "all 1s ease-in-out";
          otherCandy.style.transition = "all 1s ease-in-out";
          temp = otherCandy.style.left;
          otherCandy.style.left = currCandy.style.left;
          currCandy.style.left = temp;

          temp = board[currRow][currCol]
          board[currRow][currCol] = board[otherRow][otherCol]
          board[otherRow][otherCol] = temp
        }, 1000);
      }
      break;
    default:
  }
}
touchEnd = (e) => {

  //e.preventDefault();
}
touchCancel = (e) => {
  e.preventDefault();
}

//mouse


//drag
var img = new Image();
img.src =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
dragStart = (e) => {
  e.dataTransfer.setDragImage(img, 0, 0);

  currCandy = e.target;
  e.dataTransfer.effectAllowed;
};
dragEnter = (e) => {
  e.preventDefault();
};
dragOver = (e) => {
  e.preventDefault();

  e.dataTransfer.dropEffect = "move";
};
dragLeave = (e) => { };
dragDrop = (e) => {
  otherCandy = e.target;
};
dragEnd = (e) => {
  currCandy.classList.remove("none");

  const currColIndex = Math.round(
    currCandy.style.left.split("px")[0] /
    currCandy.getBoundingClientRect().width
  );
  const currRowIndex = Math.round(
    currCandy.style.top.split("px")[0] / currCandy.getBoundingClientRect().width
  );
  const otherColIndex = Math.round(
    otherCandy.style.left.split("px")[0] /
    otherCandy.getBoundingClientRect().width
  );
  const otherRowIndex = Math.round(
    otherCandy.style.top.split("px")[0] /
    otherCandy.getBoundingClientRect().width
  );
  const [currRow, currCol] = [currRowIndex, currColIndex];
  const [otherRow, otherCol] = [otherRowIndex, otherColIndex];
  const moverLeft = otherCol === currCol - 1 && currRow === otherRow;
  const moverRight = otherCol === currCol + 1 && currRow === otherRow;
  const moveUp = otherCol === currCol && otherRow === currRow - 1;
  const moveDown = otherCol === currCol && otherRow === currRow + 1;
  const isAdjacent = moverLeft || moverRight || moveUp || moveDown;
  const [currPrevRow, currPrevCol, otherPrevRow, otherPrevCol] = [
    currRow,
    currCol,
    otherRow,
    otherCol,
  ];
  if (moverLeft) {
    currCandy.style.transition = "all 1s ease-in-out";
    otherCandy.style.transition = "all 1s ease-in-out";
    const tmp = otherCandy.style.left;
    otherCandy.style.left = currCandy.style.left;
    currCandy.style.left = tmp;
  }
  if (moverRight) {
    currCandy.style.transition = "all 1s ease-in-out";
    otherCandy.style.transition = "all 1s ease-in-out";
    const tmp = otherCandy.style.left;
    otherCandy.style.left = currCandy.style.left;
    currCandy.style.left = tmp;
  }
  if (moveUp) {
    currCandy.style.transition = "all 1s ease-in-out";
    otherCandy.style.transition = "all 1s ease-in-out";
    const tmp = otherCandy.style.top;
    otherCandy.style.top = currCandy.style.top;
    currCandy.style.top = tmp;
  }
  if (moveDown) {
    currCandy.style.transition = "all 1s ease-in-out";
    otherCandy.style.transition = "all 1s ease-in-out";
    const tmp = otherCandy.style.top;
    otherCandy.style.top = currCandy.style.top;
    currCandy.style.top = tmp;
  }
  if (isAdjacent) {
    //更新 board
    [board[currRow][currCol], board[otherRow][otherCol]] = [
      board[otherRow][otherCol],
      board[currRow][currCol],
    ];

    if (crushCandy()) {
      setTimeout(() => {
        candyScale();
      }, 800);
    } else {
      setTimeout(() => {
        if (moverLeft) {
          currCandy.style.transition = "all 1s ease-in-out";
          otherCandy.style.transition = "all 1s ease-in-out";
          const tmp = otherCandy.style.left;
          otherCandy.style.left = currCandy.style.left;
          currCandy.style.left = tmp;
        }
        if (moverRight) {
          currCandy.style.transition = "all 1s ease-in-out";
          otherCandy.style.transition = "all 1s ease-in-out";
          const tmp = otherCandy.style.left;
          otherCandy.style.left = currCandy.style.left;
          currCandy.style.left = tmp;
        }
        if (moveUp) {
          currCandy.style.transition = "all 1s ease-in-out";
          otherCandy.style.transition = "all 1s ease-in-out";
          const tmp = otherCandy.style.top;
          otherCandy.style.top = currCandy.style.top;
          currCandy.style.top = tmp;
        }
        if (moveDown) {
          currCandy.style.transition = "all 1s ease-in-out";
          otherCandy.style.transition = "all 1s ease-in-out";
          const tmp = otherCandy.style.top;
          otherCandy.style.top = currCandy.style.top;
          currCandy.style.top = tmp;
        }
        [board[currRow][currCol], board[otherRow][otherCol]] = [
          board[otherRow][otherCol],
          board[currRow][currCol],
        ];
      }, 1000);
    }
  }
};

crushCandy = () => {
  let isConnect = false;
  const imgAll = document.querySelectorAll("img");
  imgAll.forEach((img) => {
    img.style.pointerEvents = "none";
  });
  //列相符
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < columns - 2; c += 1) {
      const candy1 = board[r][c];
      const candy2 = board[r][c + 1];
      const candy3 = board[r][c + 2];
      if (
        candy1.src === candy2.src &&
        candy2.src === candy3.src &&
        candy3.src === candy1.src
      ) {
        isConnect = true;
        board[r][c].classList.add("boom");
        board[r][c + 1].classList.add("boom");
        board[r][c + 2].classList.add("boom");
      }
    }
  }
  for (let c = 0; c < columns; c += 1) {
    for (let r = 0; r < rows - 2; r += 1) {
      const candy1 = board[r][c];
      const candy2 = board[r + 1][c];
      const candy3 = board[r + 2][c];
      if (
        candy1.src === candy2.src &&
        candy2.src === candy3.src &&
        candy3.src === candy1.src
      ) {
        isConnect = true;
        board[r][c].classList.add("boom");
        board[r + 1][c].classList.add("boom");
        board[r + 2][c].classList.add("boom");
      }
    }
  }
  if (!isConnect) {
    setTimeout(() => {
      const imgAll = document.querySelectorAll("img");
      imgAll.forEach((img) => {
        img.style.pointerEvents = "auto";
      });
    }, 1000);
  }
  return isConnect;
};

candyScale = () => {
  const particles = document.querySelectorAll("#board div");
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < columns; c += 1) {
      if (board[r][c].classList.contains("boom")) {
        const oldImage = board[r][c].src;
        board[r][c].style.transition = "all 0s ease-in-out";
        board[r][c].style.opacity = 0;
        particles[r * 9 + c].style.backgroundImage = `url(${oldImage})`;
        particles[r * 9 + c].classList.remove("none");

        setTimeout(() => {
          particles[r * 9 + c].classList.add("none");
        }, 800);
        //board[r][c].classList.add("exploding");
        board[r][c].classList.remove("boom");
        board[r][c].classList.add("empty");
      }
    }
  }
  candySlide();

  //candySlide()
};
candySlide = () => {
  const lowJection = [[], [], [], [], [], [], [], [], []];
  const dropD = [[], [], [], [], [], [], [], [], []];
  //找最低交界處
  for (let c = 0; c < columns; c += 1) {
    let prevIndex = 100;
    for (let r = rows - 1; r >= 0; r -= 1) {
      if (board[r][c].classList.contains("empty")) {
        if (prevIndex - r > 1) {
          lowJection[c].push(r);
        }
        prevIndex = r;
      }
    }
  }
  //消除的球移動到上方
  for (let c = 0; c < columns; c += 1) {
    let baseIndex = 1;
    for (let r = rows - 1; r >= 0; r -= 1) {
      if (board[r][c].classList.contains("empty")) {
        board[r][c].style.top = `${-board[r][c].getBoundingClientRect().width * baseIndex
          }px`;
        baseIndex += 1;
      }
    }
  }
  //更新 board
  for (let c = 0; c < columns; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      if (board[r][c].classList.contains("empty")) {
        let i = r;
        while (i >= 1) {
          if (!board[i - 1][c].classList.contains("empty")) {
            const tmp = board[i][c];
            board[i][c] = board[i - 1][c];
            board[i - 1][c] = tmp;
          }
          i -= 1;
        }
      }
    }
  }

  // 球降落距離
  const dropDis = [[], [], [], [], [], [], [], [], []];
  for (let c = 0; c < columns; c += 1) {
    let baseIndex = 100;
    for (let r = rows - 1; r >= 0; r -= 1) {
      const boardCol = Math.round(
        board[r][c].style.top.split("px")[0] /
        board[r][c].getBoundingClientRect().width
      );
      for (let i = lowJection[c].length - 1; i >= 0; i -= 1) {
        if (boardCol < lowJection[c][i] && baseIndex !== i) {
          const prevDis = dropDis[c].length
            ? dropDis[c][dropDis[c].length - 1]
            : 0;
          const dist = lowJection[c][i] - boardCol + prevDis;
          dropDis[c].push(dist);
          baseIndex = i;
          break;
        } else if (boardCol < lowJection[c][i] && baseIndex === i) {
          dropDis[c].push(dropDis[c][dropDis[c].length - 1]);
          break;
        } else if (boardCol > lowJection[c][i] && i === 0) {
          dropDis[c].push(0);
          break;
        }
      }
    }
  }
  //球下落
  clearTimeout();
  setTimeout(() => ballFall(), 0);
  const ballFall = () => {
    for (let c = 0; c < columns; c += 1) {
      for (let r = rows - 1; r >= 0; r -= 1) {
        if (dropDis[c].length) {
          if (board[r][c].classList.contains("empty")) {
            board[r][c].style.transition = "all 1s ease-in-out";
            board[r][c].style.opacity = 1;
            board[r][c].src = "./images/" + randomCandy() + ".png";
            board[r][c].classList.remove("empty");
          }
          board[r][c].style.transition = "all 1s ease-in-out";
          // 
          //   Math.round(
          //     board[r][c].style.top.split("px")[0] /
          //       board[r][c].getBoundingClientRect().width
          //   ),
          //   dropDis[c][8 - r]
          // );
          const newTop =
            Math.round(
              board[r][c].style.top.split("px")[0] /
              board[r][c].getBoundingClientRect().width
            ) + dropDis[c][8 - r];
          const newIndex = board[r][c].getBoundingClientRect().width * newTop;
          //
          board[r][c].style.top = `${newIndex}px`;
        }
      }
    }
    if (crushCandy()) setTimeout(() => candyScale(), 1000);
  };
};

// const dropDis = [[], [], [], [], [], [], [], [], []]
// //球降落
// for (let c = 0; c < columns; c += 1) {
//   for (let r = rows - 1; r >= 0; r -= 1) {
//     if (board[r][c].classList.contains("empty")) {
//       board[r][c].style.top = 0
//     }
//   }
// }
// 
