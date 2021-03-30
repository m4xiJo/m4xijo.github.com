import UI from "./ui.js";
import {config} from "../../config.js";
import Loader from "../loader.js";
import Navbar from "./navbar.js";

export default class Cart extends UI {
    constructor(appendTo) {
        super(appendTo);
        window.addEventListener("click", async (e) => {
            if (e.target.className == "increase-btn") this.increaseAmt(e);
            else if (e.target.className == "decrease-btn") this.decreaseAmt(e);
        });

        window.addEventListener("keyup", async (e) => {
            this.checkForm();
        });

    }

    async loadCart() {
        let productList = JSON.parse(await Loader.loadFile("https://fakestoreapi.com/products"));
        this.products = document.createElement("div");
        let storedCartIds = Object.keys(this.loadCartData());

        for (let i = 0; i < productList.length; i++) {
            for(let j = 0; j < storedCartIds.length; j++) {
                if (productList[i].id == storedCartIds[j]) {
                    let article = document.createElement("article");
                    let image = document.createElement("img");
                    let amt = document.createElement("a");
                    amt.innerHTML = "Amount in cart: " + this.loadCartData()[storedCartIds[j]];
                    image.setAttribute("src", productList[i].image);
                    let title = document.createElement("h4");
                    title.innerHTML = productList[i].title;
                    let cat = document.createElement("a");
                    cat.innerHTML = "Category: " +  productList[i].category;
                    let price = document.createElement("a");
                    price.innerHTML = productList[i].price + " $";
                    let increase= document.createElement("input");
                    increase.setAttribute("type", "submit");
                    increase.setAttribute("value", "+");
                    increase.setAttribute("class", "increase-btn");
                    increase.dataset.id = productList[i].id;
                    let decrease = document.createElement("input");
                    decrease.setAttribute("type", "submit");
                    decrease.setAttribute("value", "-");
                    decrease.setAttribute("class", "decrease-btn");
                    decrease.dataset.id = productList[i].id;
                    article.appendChild(image);
                    article.appendChild(title);
                    article.appendChild(amt);
                    article.appendChild(cat);
                    article.appendChild(price);
                    article.appendChild(decrease);
                    article.appendChild(increase);
                    this.products.appendChild(article);
                }
            }
            

        }
        super.container.innerHTML = this.products.innerHTML;
    }

    loadCartData() {
        return JSON.parse(localStorage.getItem('cart'));
    }

    increaseAmt(e) {
        console.log("lol");
        let items = JSON.parse(localStorage.getItem('cart'));
        let store = items || {};
        if (!store[e.target.dataset.id]) store[e.target.dataset.id] = 1;
        else store[e.target.dataset.id] ++;
        localStorage.setItem('cart', JSON.stringify(store));
        window.location.reload(true);
    }

    decreaseAmt(e) {
        let items = JSON.parse(localStorage.getItem('cart'));
        let store = items || {};
        if (!store[e.target.dataset.id]) store[e.target.dataset.id] = 1;
        else store[e.target.dataset.id] --;
        localStorage.setItem('cart', JSON.stringify(store));
        window.location.reload(true);
    }

    checkForm() {
        let warnings = document.querySelectorAll(".warning")
        for (let i = 0; i < warnings.length; i++) {
            warnings[i].remove();
        }
        
        let orderBtn = document.getElementById("orderBtn");
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let address = document.getElementById("address");
        let zip = document.getElementById("zipcode");

        orderBtn.disabled = false;

        if(!email.value.match(/[@]/g)){
            let warning = document.createElement("a");
            warning.innerHTML = "The email is incorrect";
            warning.setAttribute("class", "warning");
            email.parentNode.insertBefore(warning, email);
            orderBtn.disabled = true;
        }

        if(!zip.value.match(/[0-9]/g)){
            let warning = document.createElement("a");
            warning.innerHTML = "The zip code should be numeric";
            warning.setAttribute("class", "warning");
            zip.parentNode.insertBefore(warning, zip);
            orderBtn.disabled = true;
        }

        if(name.value.length < 2) {
            let warning = document.createElement("a");
            warning.innerHTML = "The name is too short, you should specify full name";
            warning.setAttribute("class", "warning");
            name.parentNode.insertBefore(warning, name);
            orderBtn.disabled = true;
        }

        if(address.value.length < 5) {
            let warning = document.createElement("a");
            warning.innerHTML = "Address is too short";
            warning.setAttribute("class", "warning");
            name.parentNode.insertBefore(warning, address);
            orderBtn.disabled = true;
        }

        console.log();
    }
}