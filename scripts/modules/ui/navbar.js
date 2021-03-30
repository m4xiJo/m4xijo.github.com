import UI from "./ui.js";
import {config} from "../../config.js";
import Loader from "../loader.js";

export default class Navbar extends UI {
    constructor(appendTo) {
      super(appendTo);
      this.pageMap = config.pages.pagemap;
      this.navbar = this.createNavbar(this.pageMap);
      super.container.appendChild(this.navbar);
      
    }

    createNavbar(pagemap) {
      let ul = document.createElement("ul");
      if (!pagemap) throw new Error("A pagemap was not provided, cannot construct navbar!");
      for (let i = 0; i < pagemap.length; i++) {
        if (!pagemap[i].hidden) {
          let li = document.createElement("li");
          let a = document.createElement("a");
          if (pagemap[i].title) a.innerHTML = pagemap[i].title;
          if (pagemap[i].route) a.href = pagemap[i].route;
          li.appendChild(a);
          ul.appendChild(li);
          if (this.pageMap[i].subpages) {
             let subpages = this.createNavbar(pagemap[i].subpages);
             li.appendChild(subpages);
             li.setAttribute("class", "subpages");
          }
        }
      }
      return ul;
    }

    async updatePage(route, pagemap) {
      if (!pagemap) pagemap = this.pageMap;
        return await new Promise(async (resolve, reject) => {
            let main = document.getElementsByTagName("main")[0];
            for (let i = 0; i < pagemap.length; i++) {
              if (pagemap[i].route == route) main.innerHTML = await Loader.loadFile(config.pages.pagedir + pagemap[i].target);
              else if (pagemap[i].subpages) this.updatePage(window.location.hash, pagemap[i].subpages);
            }
            resolve();
        });
    }
}
