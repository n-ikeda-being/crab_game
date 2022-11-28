#!/usr/bin/env node
'use strict'

const { Select } = require('enquirer')

const janken = ['グー', 'チョキ', 'パー']
let cpu_hand = Math.floor(Math.random() * 3) // ランダムな数字を出す

if (cpu_hand === 0) {
  cpu_hand = 'グー'
} else if (cpu_hand === 1) {
  cpu_hand = 'チョキ'
} else if (cpu_hand === 2) {
  cpu_hand = 'パー'
}

function main () {
  const janken = new Janken()
  janken.firstMessage()
  janken.selectHand()
}

class Janken {

  firstMessage () {
    console.log(
      '                                             ----------------------------------------- \n',
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
        console.log('カニくんは', cpu_hand, 'を選びました \n')
        if (answer === cpu_hand) {
          console.log('あいこです')
        } else if (answer === rock && cpu_hand === scissors) {
          console.log(win)
        } else if (answer === rock && cpu_hand === paper) {
          console.log(lose)
        } else if (answer === scissors && cpu_hand === rock) {
          console.log(lose)
        } else if (answer === scissors && cpu_hand === paper) {
          console.log(win)
        } else if (answer === paper && cpu_hand === rock) {
          console.log(win)
        } else if (answer === paper && cpu_hand === scissors) {
          console.log(lose)
        }

        console.log(
          '                                             ------------------------------------------ \n',
          '(ｶ)|・||・|(ﾆ)　(ｶ)|-||-|(ﾆ)　(ｶ)|^||^|(ﾆ)  <遊んでくれてありがとう！また来てね！    | \n',
          ' ≡(　　　)≡   ≡(　　　)≡  ≡(　　　)≡  ------------------------------------------ \n'
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
