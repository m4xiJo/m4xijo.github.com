import {config} from "../../config.js";

export default class UI {
  container = null;
  constructor(appendTo) {
    if(this.constructor === UI) {
      throw new Error("This class is meant to be abstract!");
    }
    
    this.container = document.getElementById(appendTo);
    if(!this.container) throw new Error ("Target container was not found!");
  }

  get container() {
    return this.container;
  }
}
