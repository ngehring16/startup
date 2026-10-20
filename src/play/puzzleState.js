export class PuzzleState {
  static Solved = new PuzzleState('Solved');
  static UnSolved = new PuzzleState('UnSolved');

  constructor(name) {
    this.name = name;
  }
}
