const candies = ['Blue', 'Orange', 'Green', 'Yellow',]
const board = [];
const [rows, columns] = [9, 9]
let score = 0;
let currCandy;
let otherCandy;
const candyBoard = document.querySelector('#board')

window.onload = () => {
  startGame();
  if (crushCandy() === true) {
    candyScale()
  }
}

randomCandy = () => {
  return candies[Math.floor(Math.random() * candies.length)]
}

startGame = () => {
  for (let r = 0; r < rows; r += 1) {
    let row = [];
    for (let c = 0; c < columns; c += 1) {
      // <img id="0-0" src="./image/Red.png">
      const candy = document.createElement('img');
      candy.src = "./images/" + randomCandy() + ".png";
      candy.draggable = true
      candy.addEventListener("dragstart", dragStart) //剛點擊時候
      candy.addEventListener("dragover", dragOver)//移動時候
      candy.addEventListener("dragenter", dragEnter)//放到別的地方時候
      candy.addEventListener("dragleave", dragLeave)//離開時候
      //candy.addEventListener("drop", dragDrop)// 降落
      candy.addEventListener("dragend", dragEnd)//移動結束 交換
      candyBoard.append(candy);
      candy.style.top = `${r * candy.getBoundingClientRect().width}px`
      candy.style.left = `${c * candy.getBoundingClientRect().width}px`
      row.push(candy)
    }
    board.push(row)
  }
  //crushCandy()
}

dragStart = (e) => {
  e.dataTransfer.effectAllowed = "all";
  currCandy = e.target;
}
dragEnter = (e) => {

}
dragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "none"
}
dragLeave = (e) => {

  otherCandy = e.target;

}
dragEnd = (e) => {

  const currColIndex = Math.round(currCandy.style.left.split('px')[0] / currCandy.getBoundingClientRect().width)
  const currRowIndex = Math.round(currCandy.style.top.split('px')[0] / currCandy.getBoundingClientRect().width)
  const otherColIndex = Math.round(otherCandy.style.left.split('px')[0] / otherCandy.getBoundingClientRect().width)
  const otherRowIndex = Math.round(otherCandy.style.top.split('px')[0] / otherCandy.getBoundingClientRect().width)
  const [currRow, currCol] = [currRowIndex, currColIndex]
  const [otherRow, otherCol] = [otherRowIndex, otherColIndex]
  console.log(currRow, currCol, otherRow, otherCol)
  const moverLeft = otherCol === currCol - 1 && currRow === otherRow;
  const moverRight = otherCol === currCol + 1 && currRow === otherRow;
  const moveUp = otherCol === currCol && otherRow === currRow - 1;
  const moveDown = otherCol === currCol && otherRow === currRow + 1;
  const isAdjacent = moverLeft || moverRight || moveUp || moveDown
  const [currPrevRow, currPrevCol, otherPrevRow, otherPrevCol] = [currRow, currCol, otherRow, otherCol]
  if (moverLeft) {
    currCandy.style.transition = "all 1s ease-in-out"
    otherCandy.style.transition = "all 1s ease-in-out"
    const tmp = otherCandy.style.left
    otherCandy.style.left = currCandy.style.left
    currCandy.style.left = tmp
  }
  if (moverRight) {
    currCandy.style.transition = "all 1s ease-in-out"
    otherCandy.style.transition = "all 1s ease-in-out"
    const tmp = otherCandy.style.left
    otherCandy.style.left = currCandy.style.left
    currCandy.style.left = tmp
  }
  if (moveUp) {
    currCandy.style.transition = "all 1s ease-in-out"
    otherCandy.style.transition = "all 1s ease-in-out"
    const tmp = otherCandy.style.top
    otherCandy.style.top = currCandy.style.top
    currCandy.style.top = tmp
  }
  if (moveDown) {
    currCandy.style.transition = "all 1s ease-in-out"
    otherCandy.style.transition = "all 1s ease-in-out"
    const tmp = otherCandy.style.top
    otherCandy.style.top = currCandy.style.top
    currCandy.style.top = tmp
  }
  if (isAdjacent) {
    //更新 board
    [board[currRow][currCol], board[otherRow][otherCol]] = [board[otherRow][otherCol], board[currRow][currCol]]

    if (crushCandy()) {
      setTimeout(() => {
        console.log("連線")
        candyScale()
      }, 300)
    }
    else {
      setTimeout(() => {
        console.log("沒有連線")
        if (moverLeft) {
          currCandy.style.transition = "all 1s ease-in-out"
          otherCandy.style.transition = "all 1s ease-in-out"
          const tmp = otherCandy.style.left
          otherCandy.style.left = currCandy.style.left
          currCandy.style.left = tmp
        }
        if (moverRight) {
          currCandy.style.transition = "all 1s ease-in-out"
          otherCandy.style.transition = "all 1s ease-in-out"
          const tmp = otherCandy.style.left
          otherCandy.style.left = currCandy.style.left
          currCandy.style.left = tmp
        }
        if (moveUp) {
          currCandy.style.transition = "all 1s ease-in-out"
          otherCandy.style.transition = "all 1s ease-in-out"
          const tmp = otherCandy.style.top
          otherCandy.style.top = currCandy.style.top
          currCandy.style.top = tmp
        }
        if (moveDown) {
          currCandy.style.transition = "all 1s ease-in-out"
          otherCandy.style.transition = "all 1s ease-in-out"
          const tmp = otherCandy.style.top
          otherCandy.style.top = currCandy.style.top
          currCandy.style.top = tmp
        }
        [board[currRow][currCol], board[otherRow][otherCol]] = [board[otherRow][otherCol], board[currRow][currCol]]
      }, 1000)
    }
  }

}

crushCandy = () => {
  let isConnect = false
  const imgAll = document.querySelectorAll("img")
  imgAll.forEach((img) => {
    img.style.pointerEvents = "none";
  })
  //列相符
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < columns - 2; c += 1) {
      const candy1 = board[r][c];
      const candy2 = board[r][c + 1];
      const candy3 = board[r][c + 2];
      if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy1.src) {
        isConnect = true
        board[r][c].classList.add("boom")
        board[r][c + 1].classList.add("boom")
        board[r][c + 2].classList.add("boom")

      }
    }
  }
  for (let c = 0; c < columns; c += 1) {
    for (let r = 0; r < rows - 2; r += 1) {
      const candy1 = board[r][c];
      const candy2 = board[r + 1][c];
      const candy3 = board[r + 2][c];
      if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy1.src) {
        isConnect = true
        board[r][c].classList.add("boom")
        board[r + 1][c].classList.add("boom")
        board[r + 2][c].classList.add("boom")
      }
    }
  }
  if (!isConnect) {
    setTimeout(() => {
      const imgAll = document.querySelectorAll("img")
      imgAll.forEach((img) => {
        img.style.pointerEvents = "auto";
      })
    }, 1000)
  }
  return isConnect
}

candyScale = () => {
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < columns; c += 1) {
      if (board[r][c].classList.contains("boom")) {
        board[r][c].style.transition = "all 0.5s ease-in-out"
        board[r][c].style.opacity = 0
        board[r][c].classList.remove("boom")
        board[r][c].classList.add("empty")
      }
    }
  }
  clearTimeout()
  setTimeout(() => candySlide(), 500)
  //candySlide()
}
candySlide = () => {
  const lowJection = [[], [], [], [], [], [], [], [], []]
  const dropD = [[], [], [], [], [], [], [], [], []]
  //找最低交界處
  for (let c = 0; c < columns; c += 1) {
    let prevIndex = 100
    for (let r = rows - 1; r >= 0; r -= 1) {
      if (board[r][c].classList.contains("empty")) {

        if (prevIndex - r > 1) {
          lowJection[c].push(r)
        }
        prevIndex = r
      }
    }
  }
  console.log(lowJection)
  //消除的球移動到上方
  for (let c = 0; c < columns; c += 1) {
    let baseIndex = 1
    for (let r = rows - 1; r >= 0; r -= 1) {
      if (board[r][c].classList.contains("empty")) {
        board[r][c].style.top = `${-board[r][c].getBoundingClientRect().width * baseIndex}px`
        baseIndex += 1


      }
    }
  }
  //更新 board
  for (let c = 0; c < columns; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      if (board[r][c].classList.contains("empty")) {
        let i = r
        while (i >= 1) {
          if (!board[i - 1][c].classList.contains("empty")) {
            const tmp = board[i][c]
            board[i][c] = board[i - 1][c]
            board[i - 1][c] = tmp
          }
          i -= 1
        }
      }
    }
  }


  // 球降落距離
  const dropDis = [[], [], [], [], [], [], [], [], []]
  for (let c = 0; c < columns; c += 1) {
    let baseIndex = 100;
    for (let r = rows - 1; r >= 0; r -= 1) {
      const boardCol = Math.round(board[r][c].style.top.split('px')[0] / board[r][c].getBoundingClientRect().width)
      for (let i = lowJection[c].length - 1; i >= 0; i -= 1) {
        if (boardCol < lowJection[c][i] && baseIndex !== i) {
          const prevDis = dropDis[c].length ? dropDis[c][dropDis[c].length - 1] : 0
          const dist = lowJection[c][i] - boardCol + prevDis
          dropDis[c].push(dist)
          baseIndex = i;
          break;
        }
        else if (boardCol < lowJection[c][i] && baseIndex === i) {
          dropDis[c].push(dropDis[c][dropDis[c].length - 1])
          break;
        }
        else if (boardCol > lowJection[c][i] && i === 0) {
          dropDis[c].push(0)
          break;
        }
      }
    }
  }
  console.log(dropDis)
  //球下落
  clearTimeout()
  setTimeout(() => ballFall(), 700)
  const ballFall = () => {
    for (let c = 0; c < columns; c += 1) {
      for (let r = rows - 1; r >= 0; r -= 1) {
        if (dropDis[c].length) {
          if (board[r][c].classList.contains("empty")) {
            board[r][c].style.transition = "all 1s ease-in-out"
            board[r][c].style.opacity = 1
            board[r][c].src = "./images/" + randomCandy() + ".png";
            board[r][c].classList.remove("empty")
          }
          board[r][c].style.transition = "all 1s ease-in-out"
          console.log(Math.round(board[r][c].style.top.split('px')[0] / board[r][c].getBoundingClientRect().width), dropDis[c][8 - r])
          const newTop = Math.round(board[r][c].style.top.split('px')[0] / board[r][c].getBoundingClientRect().width) + dropDis[c][8 - r]
          const newIndex = board[r][c].getBoundingClientRect().width * newTop
          //console.log(Number(board[r][c].style.top.split('px')[0]) + board[r][c].getBoundingClientRect().width, (board[r][c].style.top.split('px')[0]) + board[r][c].getBoundingClientRect().width)
          board[r][c].style.top = `${newIndex}px`
        }
      }
    }
    if (crushCandy()) candyScale()
  }
}


  // const dropDis = [[], [], [], [], [], [], [], [], []]
  // //球降落
  // for (let c = 0; c < columns; c += 1) {
  //   for (let r = rows - 1; r >= 0; r -= 1) {
  //     if (board[r][c].classList.contains("empty")) {
  //       board[r][c].style.top = 0
  //     }
  //   }
  // }
  // console.log(dropDis)



