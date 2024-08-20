import {HostListener, Component} from '@angular/core';

class Game {
  board: GameBoard;
  constructor() {
    this.board = new GameBoard();
  }
}

class GameBoard {
  size = 4;
  cells: number[][];

  constructor() {
    this.cells = [];
    for (let i = 0; i < this.size; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.cells[i][j] = 0;
      }
    }
    this.addRandomValue();
  }


  addRandomValue() {
    let value = 0;
    while (true) {
      value++;
      const i = Math.floor(Math.random() * this.size);
      const j = Math.floor(Math.random() * this.size);
      if (this.cells[i][j] === 0) {
        this.cells[i][j] = 2;
        break;
      }
    }
    console.log(value);
  }

  hasEmptyCell() {
    let isEmpty = false;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.cells[i][j] === 0) {
          isEmpty = true;
        }
      }
    }

    return isEmpty;
  }

  mergeRow(i: number) {
    for (let j = 0; j < this.size - 1; j++) {
      if (this.cells[i][j] !== 0 && this.cells[i][j] === this.cells[i][j + 1]) {
        this.cells[i][j] *= 2;
        this.cells[i][j + 1] = 0;
        j++;
      }
    }
  }

  mergeColumn(j: number) {
    for (let i = 0; i < this.size - 1; i++) {
      if (this.cells[i][j] !== 0 && this.cells[i][j] === this.cells[i + 1][j]) {
        this.cells[i][j] *= 2;
        this.cells[i + 1][j] = 0;
        i++;
      }
    }
  }

  shiftRowRight(i: number) {
    for (let j = 0; j < this.size - 1; j++) {
      if (this.cells[i][j] !== 0 && this.cells[i][j + 1] === 0) {
        for (let k = j + 1; k > 0; k--) {
          this.cells[i][k] = this.cells[i][k - 1];
        }
        this.cells[i][0] = 0;
      }
    }
  }

  shiftRowLeft(i: number) {
    for (let j = this.size - 1; j > 0; j--) {
      if (this.cells[i][j] !== 0 && this.cells[i][j - 1] === 0) {
        for (let k = j - 1; k < this.size - 1; k++) {
          this.cells[i][k] = this.cells[i][k + 1];
        }
        this.cells[i][this.size - 1] = 0;
      }
    }
  }

  shiftColumnUp(j: number) {
    for (let i = this.size - 1; i > 0; i--) {
      if (this.cells[i][j] !== 0 && this.cells[i - 1][j] === 0) {
        for (let k = i - 1; k < this.size - 1; k++) {
          this.cells[k][j] = this.cells[k + 1][j];
        }
        this.cells[this.size - 1][j] = 0;
      }
    }
  }

  shiftColumnDown(j: number) {
    for (let i = 0; i < this.size - 1; i++) {
      if (this.cells[i][j] !== 0 && this.cells[i + 1][j] === 0) {
        for (let k = i + 1; k > 0; k--) {
          this.cells[k][j] = this.cells[k - 1][j];
        }
        this.cells[0][j] = 0;
      }
    }
  }

  moveUp() {
    for (let j = 0; j < this.size; j++) {
      this.shiftColumnUp(j);
      this.mergeColumn(j);
      this.shiftColumnUp(j);
    }
    if (this.hasEmptyCell()) {
      this.addRandomValue();
    }
  }

  moveRight() {
    for (let i = 0; i < this.size; i++) {
      this.shiftRowRight(i);
      this.mergeRow(i);
      this.shiftRowRight(i);
    }
    if (this.hasEmptyCell()) {
      this.addRandomValue();
    }
  }

  moveDown() {
    for (let j = 0; j < this.size; j++) {
      this.shiftColumnDown(j);
      this.mergeColumn(j);
      this.shiftColumnDown(j);
    }
    if (this.hasEmptyCell()) {
      this.addRandomValue();
    }
  }

  moveLeft() {
    for (let i = 0; i < this.size; i++) {
      this.shiftRowLeft(i);
      this.mergeRow(i);
      this.shiftRowLeft(i);
    }
    if (this.hasEmptyCell()) {
      this.addRandomValue();
    }
  }
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    game: Game;

    constructor() {
        this.game = new Game();
    }

  getCellClass(value) {
      switch (Math.log2(value) % 4) {
        case 1: return 'level-1';
        case 2: return 'level-2';
        case 3: return 'level-3';
        case 0: return 'level-4';
        default: return 'empty';
      }
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
      switch (event.code) {
        case 'ArrowUp':
          console.log('Move Up');
          this.game.board.moveUp();
          console.log(this.game.board.cells);
          break;
        case 'ArrowDown':
          console.log('Move Down');
          this.game.board.moveDown();
          console.log(this.game.board.cells);
          break;
        case 'ArrowLeft':
          console.log('Move Left');
          this.game.board.moveLeft();
          console.log(this.game.board.cells);
          break;
        case 'ArrowRight':
          console.log('Move Right');
          this.game.board.moveRight();
          console.log(this.game.board.cells);
          break;
      }
    }
}
