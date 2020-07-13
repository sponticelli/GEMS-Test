export class Counter {
  constructor() {
    this.dictionary = {};
  }

  add(key, time, value) {
    if (!this.dictionary[key]) {
      this.dictionary[key] = [];
    }
    if (!this.dictionary[key][time]) this.dictionary[key][time] = 0;
    this.dictionary[key][time] += value;
  }

  get keys() {
    return this.dictionary.keys();
  }

  getValues(key) {
    if (!this.dictionary[key]) return [];
    return this.dictionary[key];
  }

  getTimedAvgValues(key, size) {
    var elem = this.dictionary[key];
    var result = [];
    for (var i = 0; i < elem.length; i++) {
      result[i] = [i, elem[i] / size];
    }
    return result;
  }

  getTimedValues(key, size) {
    var elem = this.dictionary[key];
    var result = [];
    for (var i = 0; i < elem.length; i++) {
      result[i] = [i, elem[i]];
    }
    return result;
  }
}
