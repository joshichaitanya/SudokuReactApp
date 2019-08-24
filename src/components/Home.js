import React from 'react';
import Game from './Game';
import { getSudukuProblem } from '../utils';


class Home extends React.Component {
    constructor() {
        super()
        this.state = {
          timer: {
            min: 0,
            sec: 0
          },
          gameStarted: false,
          isFinishedSuccess: false
        }
      }
    difficulties = [{
        caption: "Very Easy",
        number: 5
        }, {
            caption: "Easy",
            number: 10
        }, {
            caption: "Medium",
            number: 15
        }, {
            caption: "Moderate",
            number: 20
        }, {
            caption: "Hard",
            number: 25
        }, {
            caption: "Hardest",
            number: 30
        }]

    difficulty = 5

    startGame() {
        this.interval = setInterval(() => {
          let {min, sec} = this.state.timer
          sec++;
          if (sec >= 60) {
            sec = 0
            min++
          }
          this.setState({timer: { min, sec }})
        }, 1000)
        this.setState({gameStarted: true})

        const arr = getSudukuProblem(this.difficulty)
        this.initialArr = JSON.parse(JSON.stringify(arr))
    }
    difficultySelected(event) {
        this.difficulty = event.target.value
    }
    sudukuFinishedSuccess() {
        this.setState({isFinishedSuccess: true})
        clearInterval(this.interval)
    }

    render() {
        return <div>
            <h1>Welcome to Suduku App</h1>
            {this.state.isFinishedSuccess && <h2> Congratulations, You have successfully finished the Suduku </h2> }
            <div className="timer">
                Time: {(this.state.timer.min < 10 ? '0' : '') + this.state.timer.min} : {(this.state.timer.sec < 10 ? '0' : '') + this.state.timer.sec}
            </div>
            {!this.state.gameStarted && <div className="selectBox">
                    <select onChange={this.difficultySelected.bind(this)}>
                        {this.difficulties.map(obj => (
                            <option key={obj.number} value={obj.number}>{obj.caption}</option>
                        ))}
                    </select>
            </div>}
            <button className='start-button' onClick={this.startGame.bind(this)} >
                { this.state.gameStarted && !this.state.isFinishedSuccess ? 'Restart' : 'Start New' }
            </button>
            {this.state.gameStarted &&
                <Game initialArr={this.initialArr} sudukuFinishedSuccess={this.sudukuFinishedSuccess.bind(this)}/>
                }
        </div>
    }
}

export default Home
