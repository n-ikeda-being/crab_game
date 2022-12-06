#!/usr/bin/env node

const { Select } = require('enquirer')

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
    let cpuHand = Math.floor(Math.random() * 3) // ランダムな数字を出す
    if (cpuHand === 0) {
      cpuHand = 'グー'
    } else if (cpuHand === 1) {
      cpuHand = 'チョキ'
    } else if (cpuHand === 2) {
      cpuHand = 'パー'
    }
    const hands = ['グー', 'チョキ', 'パー']
    const prompt = this.#selectPrompt(message, hands)
    const lose = '残念、あなたの負けです…'
    const win = 'おめでとう！あなたの勝ちです！'
    const rock = 'グー'
    const scissors = 'チョキ'
    const paper = 'パー'

    prompt.run()
      .then((answer) => {
        console.log('カニくんは', cpuHand, 'を選びました \n')
        if (answer === cpuHand) {
          console.log('あいこです')
        } else if (answer === rock && cpuHand === scissors) {
          console.log(win)
        } else if (answer === rock && cpuHand === paper) {
          console.log(lose)
        } else if (answer === scissors && cpuHand === rock) {
          console.log(lose)
        } else if (answer === scissors && cpuHand === paper) {
          console.log(win)
        } else if (answer === paper && cpuHand === rock) {
          console.log(win)
        } else if (answer === paper && cpuHand === scissors) {
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

  #selectPrompt (message, hands) {
    return new Select({
      type: 'select',
      message,
      choices: hands
    })
  }
}

const janken = new Janken()
janken.firstMessage ()
janken.selectHand()
