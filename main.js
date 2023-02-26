// Copyright (c) 2023 Ivan Teplov

const title = document.querySelector('h1')
let isRunning = false

;["mouseover", "click"].forEach(eventType => {
  title.addEventListener(eventType, () => {
    if (isRunning) return;

    isRunning = true
    hackEffect(title).then(() => {
      isRunning = false
    })
  })
})

/**
 * @param {HTMLElement} element
 */
function hackEffect(element) {
  const originalText = element.textContent
  const iterationsPerLetter = 3
  const framesPerSecond = 33
  let iteration = 0

  return createInterval((stop) => {
    let result = ""

    for (let index = 0; index < originalText.length; ++index) {
      const isSpace = originalText[index] === " "
      const skipLetter = iterationsPerLetter * index < iteration || isSpace
      result += skipLetter ? originalText[index] : getRandomLetter()
    }

    element.textContent = result
    iteration += 1

    if (iteration === iterationsPerLetter * originalText.length) {
      stop()
    }
  }, 1000 / framesPerSecond)
}

function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const randomIndex = Math.floor(Math.random() * alphabet.length)
  return alphabet[randomIndex]
}

/**
 * @param {(stop: () => void) => any} callback
 * @param {number} intervalDuration
 * @returns {Promise<undefined>}
 */
function createInterval(callback, intervalDuration) {
  return new Promise(resolve => {
    const stop = (intervalID) => {
      clearInterval(intervalID)
      resolve()
    }

    const intervalID = setInterval(() => {
      callback(stop.bind(undefined, [intervalID]))
    }, intervalDuration)
  })
}
