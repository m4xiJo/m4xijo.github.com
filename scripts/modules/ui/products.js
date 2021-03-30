import UI from "./ui.js";
import {config} from "../../config.js";
import Loader from "../loader.js";

export default class Products extends UI {
    constructor(appendTo) {
        super(appendTo);
        window.addEventListener("click", async (e) => {
            if (e.target.className == "add-to-cart-btn") this.addToCart(e);
        });
    }

    async loadProducts() {
        let productList = JSON.parse(await Loader.loadFile("https://fakestoreapi.com/products"));
        this.products = document.createElement("div");

        for (let i = 0; i < productList.length; i++) {
            let article = document.createElement("article");
            let image = document.createElement("img");
            image.setAttribute("src", productList[i].image);
            let title = document.createElement("h4");
            title.innerHTML = productList[i].title;
            let desc = document.createElement("p");
            desc.innerHTML = productList[i].description;
            let cat = document.createElement("a");
            cat.innerHTML = "Category: " +  productList[i].category;
            let price = document.createElement("a");
            price.innerHTML = productList[i].price + " $";
            let addToCartBtn = document.createElement("input");
            addToCartBtn.setAttribute("type", "submit");
            addToCartBtn.setAttribute("value", "Add To Cart");
            addToCartBtn.setAttribute("class", "add-to-cart-btn");
            addToCartBtn.dataset.id = productList[i].id;
            article.appendChild(image);
            article.appendChild(title);
            article.appendChild(desc);
            article.appendChild(cat);
            article.appendChild(price);
            article.appendChild(addToCartBtn);
            this.products.appendChild(article);
        }
        super.container.innerHTML = this.products.innerHTML;
    }

    addToCart(e) {
        let items = JSON.parse(localStorage.getItem('cart'));
        let store = items || {};
        if (!store[e.target.dataset.id]) store[e.target.dataset.id] = 1;
        else store[e.target.dataset.id] ++;
        localStorage.setItem('cart', JSON.stringify(store));
    }
}