import React from 'react';
import { Helper } from '../utils';

class Game extends React.Component {
  constructor(props) {
    super(props)
    const arr = props.initialArr
    // this.initialArr = JSON.parse(JSON.stringify(arr))
    this.initialArr = arr.map(function(a) { // To deep copy initial array into suduku array
      return a.slice();
    });

    this.state = {
      arr,
      validations: [],
      isValid: true
    }
  }

  render() {
    let trs = [];
    for (let i=0;i<9;i++) {
      let tds = []
      for (let j=0;j<9;j++) {
        const style = {}
        if (i === 2 || i === 5) {
          style.borderBottom = 'solid 4px black'
        }
        if (j === 2 || j === 5) {
          style.borderRight = 'solid 4px black'
        }
        tds.push(<td key={j}>
              <input style={style} type='text' onChange={this.valueChange.bind(this)} onKeyPress={(event)=>(this.validate(event, i, j))} value={this.state.arr[i][j] || ''} maxLength="1" id={`input-${i}-${j}`} disabled={this.initialArr[i][j] !== 0} autoComplete="false"/>
          </td>)
      }
      trs.push(<tr key={i}>{tds}</tr>)
    }
    return (
      <div className="App">
        <h2> { this.state.isValid ? 'Valid Sudo' : 'Invalid Sudo' } </h2>
        <table className={this.state.isSudukuFinished && 'disabled'}>
          <tbody>
            {trs}
          </tbody>
        </table>
      </div>
    );
  }
  validate(theEvent, i, j) {
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
      var regex = /[1-9]|\./;
      if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
      } else {
        let arr = this.state.arr
        let num = Number(key)
        if (num && num > 0 && num < 10) {
          arr[i][j] = num
          let validations = Helper.getValidations(arr)
          const isValid = Helper.isValidSuduku(validations)
          const isSudukuFinished = Helper.checkSudukuFinished(arr)
          if (isValid && isSudukuFinished) {
            this.props.sudukuFinishedSuccess()
          }
          this.setState({arr, validations, isValid})
        }
      }
    }
    valueChange(event) {
    }
}

export default Game;
