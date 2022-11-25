#!/usr/bin/env node
'use strict'

const { Select } = require('enquirer')

const janken = ['グー', 'チョキ', 'パー']
let jankenRandom = Math.floor(Math.random() * 3) // ランダムな数字を出す

if (jankenRandom === 0) {
  jankenRandom = 'グー'
} else if (jankenRandom === 1) {
  jankenRandom = 'チョキ'
} else if (jankenRandom === 2) {
  jankenRandom = 'パー'
}

function main () {
  const janken = new Janken()
  janken.firstMessage()
  janken.selectHand()
}

class Janken {

  firstMessage () {
    console.log(
      '                                            ------------------------------------------ \n',
      '(ｶ)|^||^|(ﾆ)　(ｶ)|・||・|(ﾆ)　(ｶ)|-||-|(ﾆ)  <こんにちは！僕たちとじゃんけんで遊ぼう！| \n',
      '≡(　　　)≡   ≡(　　　)≡   ≡(　　　)≡  ------------------------------------------ \n'
    )
  }

  selectHand () {
    const message = '最初はグー！じゃんけん…？'
    const hand = janken
    const prompt = this.#selectPrompt(message, hand)
    const lose = '残念、あなたの負けです…'
    const win = 'おめでとう！あなたの勝ちです！'
    const rock = 'グー'
    const scissors = 'チョキ'
    const paper = 'パー'

    prompt.run()
      .then((answer) => {
        console.log('カニくんは', jankenRandom, 'を選びました \n')
        if (answer === jankenRandom) {
          console.log('あいこです')
        } else if (answer === rock && jankenRandom === scissors) {
          console.log(win)
        } else if (answer === rock && jankenRandom === paper) {
          console.log(lose)
        } else if (answer === scissors && jankenRandom === rock) {
          console.log(lose)
        } else if (answer === scissors && jankenRandom === paper) {
          console.log(win)
        } else if (answer === paper && jankenRandom === rock) {
          console.log(win)
        } else if (answer === paper && jankenRandom === scissors) {
          console.log(lose)
        }

        console.log(
          '                                            ------------------------------------------ \n',
          '(ｶ)|・||・|(ﾆ)　(ｶ)|-||-|(ﾆ)　(ｶ)|^||^|(ﾆ)  <遊んでくれてありがとう！また来てね！    | \n',
          '≡(　　　)≡   ≡(　　　)≡   ≡(　　　)≡  ------------------------------------------ \n'
        )
      })
      .catch(console.error)
  }

  #selectPrompt (message, hand) {
    return new Select({
      type: 'select',
      message,
      choices: hand
    })
  }
}
main()
