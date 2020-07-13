export class NumericValue {
  constructor(value) {
    this.currentValue = value;
    this.initialValue = value;
  }

  set Value(value) {
    this.currentValue = value;
  }

  get Value() {
    return this.currentValue;
  }

  Add(value) {
    this.currentValue += value;
  }

  get Delta() {
    return this.currentValue - this.initialValue;
  }
}
