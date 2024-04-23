import Item from "./ClassItem";

import { compareAsc, format, formatISO } from "date-fns";

export default function CreateGen() {
  let listnum = 0;

  return function Createlist(pro) {
    listnum++;
    const number = listnum;
    const project = pro;
    let items = [];

    function addItem(title, notes, date, important) {
      const newItem = new Item(title);
      newItem.setDate(date);
      newItem.setNotes(notes);
      newItem.setPrior(important);

      items.push(newItem);
      sortItems();
    }
    function getItems() {
      return items;
    }

    function removeItem(id) {
      let result = items.findIndex((item) => item.id === id);

      if (result === -1) {
        return 1;
      }
      items.splice(result, 1);
    }

    function itemDone(id, done) {
      let result = items.findIndex((item) => item.id === id);
      if (result === -1) {
        return 1;
      }
      items[result].setDone(done);
    }

    function sortItems() {
      items.sort((a, b) => compareAsc(b.date, a.date));
    }

    return {
      addItem,
      removeItem,
      getItems,
      items,
      sortItems,
      number,
      itemDone,
      project,
    };
  };
}
