import Blog from "./modules/ui/blog.js";
import Carousel from "./modules/ui/carousel.js";
import Navbar from "./modules/ui/navbar.js";
import Products from "./modules/ui/products.js";
import Cart from "./modules/ui/cart.js";

var navbar = new Navbar("navbar");

window.addEventListener("load", async (e) => {

    if (!window.location.hash) window.location.hash = "home";
    await navbar.updatePage(window.location.hash);
    await main();


});

window.addEventListener("hashchange", async (e) => {

    await navbar.updatePage(window.location.hash);
    await main();

});

async function main() {

  try {
    new Blog("news-articles");
    new Carousel("img-carousel");
    await products.loadProducts();
  } catch (e) {
    console.log(e);
  }

  try {
    var products = new Products("product-list");
    await products.loadProducts();
  } catch (e) {
    console.log(e);
  }

  try {
    var cart = new Cart("cart");
    await cart.loadCart();
  } catch (e) {
    console.log(e);
  }

} 
