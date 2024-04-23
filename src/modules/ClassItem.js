let id_currnet = 0;

import { compareAsc, format, formatISO } from "date-fns";

export default class Item {
  constructor(name) {
    this.name = name;
    this.madeDate = Date().toLocaleString();
    this.id = id_currnet + 1;
    id_currnet++;
    this.done = false;
    this.date = false;
  }

  setNotes(notes) {
    return (this.note = notes);
  }
  setDate(date1) {
    let date = false;
    try {
      date = format(new Date(date1), "dd/MM/yyyy");
    } catch (error) {
      return 0;
    }
    return (this.date = date);
  }
  setPrior(kind) {
    return (this.important = kind);
  }
  setDone(kind) {
    if (kind === true) {
      return (this.done = true);
    }
    return (this.done = false);
  }
}
