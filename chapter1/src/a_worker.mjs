class Worker {
    constructor(health) {
      this._health = health ?? 10;
    }
  
    getHealth() {
      return this._health;
    }
  
    work() {
      this._health--;
    }
  }
  
  export { Worker };