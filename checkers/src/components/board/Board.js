import React, { Component } from 'react';

import './Board.css';
import blackChecker from '../../images/checker-b.png';

class Board extends Component {
  constructor(props){
    super(props);
    const board = new Array(8).fill(new Array(8).fill(undefined))
      .map((row, y) => row.map((tile, x) => (x + y)%2 ? 'black' : 'red'));
    this.state = {
      pieces: [
        {x:100, y:100},
        {x:200, y:100},
        {x:300, y:100},
        {x:400, y:100}
      ],
      board
    };
  }

  handleClick(X, Y) {
    if(this.state.selectedPiece) {
      // let x = X - (this.state.selectedPiece.width / 2);
      // let y = Y - (this.state.selectedPiece.height / 2);

      let x = X + (Math.random() * 10) - 5;
      let y = Y + (Math.random() * 10) - 5;

      let newState = Object.assign({}, this.state);
      newState.pieces[this.state.selectedPiece.index] = {x, y};
      newState.selectedPiece = undefined;
      this.setState(newState);
    }
  }

  selectPiece(index, event) {
    let newState = Object.assign({}, this.state);
    newState.selectedPiece = {
      index,
      width: event.target.offsetWidth,
      height: event.target.offsetHeight
    };
    this.setState(newState);
  }

  isSelectedPiece(index) {
    return this.state.selectedPiece && this.state.selectedPiece.index === index;
  }

  render() {
    return (
      <div className="Game">
        {
          this.state.board.map((row, y) =>
            <div className="Board-Row" key={y}>
              { row.map((tile, x) =>
                <div
                  key={x}
                  className={ `Board-tile ${tile}` }
                  style={({transform: `translate(${x * 64}px, ${y * 64}px)`})}
                  onClick={ this.handleClick.bind(this, x * 64, y * 64) }
                />)}
            </div> )
        }
        {
          this.state.pieces.map((piece, index) =>
            <GamePiece
              key={ index }
              imageSrc={ blackChecker }
              isSelected={ this.isSelectedPiece(index) }
              x={ piece.x }
              y={ piece.y }
              clickHandler={ this.selectPiece.bind(this, index) }
            />)
        }
      </div>
    )
  }
}

const GamePiece = ({ imageSrc, isSelected, x, y, clickHandler }) =>
  <div
    className={ `Game-Piece ${ isSelected ? 'is-selected' : '' }` }
    style={({transform: `translate(${x}px, ${y}px)`})}
    onClick={ clickHandler }
  >
    <img src={ imageSrc } alt=""/>
  </div>;


export default Board;
