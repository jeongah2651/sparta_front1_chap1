// juniorEngineer.mjs
import { Worker } from './a_worker.mjs';

class JuniorEngineer extends Worker {
  constructor(health, intelligence) {
    super(health);
    this._intelligence = intelligence ?? 1;
    this._isBornGenius = this._intelligence > 10;
  }

  getIntelligence() {
    return this._intelligence;
  }

  work() {
    super.work();
    this._intelligence++;
  }

  isBornGenius() {
    return this._isBornGenius;
  }
}

export { JuniorEngineer };
