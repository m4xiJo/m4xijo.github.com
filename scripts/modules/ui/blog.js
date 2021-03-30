import UI from "./ui.js";
import {config} from "../../config.js";

export default class Blog extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.blog = document.createElement("div");
        for (let i = 0; i < config.blog.entries.length; i++) {
            let article = document.createElement("article");
            let image = document.createElement("img");
            image.setAttribute("src", config.blog.entries[i].image);
            let title = document.createElement("h4");
            title.innerHTML = config.blog.entries[i].title;
            let content = document.createElement("p");
            content.innerHTML = config.blog.entries[i].content;
            let author = document.createElement("a");
            author.innerHTML = config.blog.entries[i].author;
            let date = document.createElement("a");
            date.innerHTML = config.blog.entries[i].date;
            article.appendChild(image);
            article.appendChild(title);
            article.appendChild(content);
            article.appendChild(author);
            article.appendChild(date);
            this.blog.appendChild(article);
        }
        super.container.innerHTML = this.blog.innerHTML;
    }
}