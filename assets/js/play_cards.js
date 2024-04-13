const game = document.getElementById("cards")
const startBtn = document.getElementById("startBtn")

const cardsNumberArray = []
  const firstCard = null
  const secondCard = null
  const cardCount = 4;

//const startGame  = () =>{
  
// Создание массива чисел
  for (let i = 1; i <= cardCount; i++) {
    cardsNumberArray.push(i, i)
    console.log(cardsNumberArray)
  }

  // Перемешивание массива чисел
  for (let i = 0; i < cardsNumberArray.length; i++) {
    const randomIndex = Math.floor(Math.random() * cardsNumberArray.length)
    const temp = cardsNumberArray[i]
    cardsNumberArray[i] = cardsNumberArray[randomIndex]
    cardsNumberArray[randomIndex] = temp
    console.log(cardsNumberArray)
  }

 // Создание карточек
  for (const cardNumber of cardsNumberArray) {
    const card = document.createElement("div")
    card.textContent = cardNumber
    card.classList.add("card")
    console.log(card)

    //Клик по карточке
    card.addEventListener("click", function () {
      if (card.classList.contains("open") || card.classList.contains("success")) {
        return
      }

      if (firstCard !== null && secondCard !== null) {
        firstCard.classList.remove("open")
        secondCard.classList.remove("open")
        firstCard = null
        secondCard = null
      }

      card.classList.add("open")

      if (firstCard === null) {
        firstCard = card
      } else {
        secondCard = card
      }

      if (firstCard !== null && secondCard !== null) {
        let firstCardNumber = firstCard.textContent
        let secondCardNumber = secondCard.textContent

        if (firstCardNumber === secondCardNumber) {
          firstCard.classList.add("success")
          secondCard.classList.add("success")
        }
       }})}

    //   // Проверка финала игры
    //   if (cardsNumberArray.length === document.querySelectorAll(".success").length) {
    //     setTimeout(function () {
    //       game.innerHTML = ""
    //       alert("Try again")
    //       startGame(game)
    //     }, 400)
    //   }

  //  })
   //   }
//}
//}

//startBtn.addEventListener('click', startGame);
