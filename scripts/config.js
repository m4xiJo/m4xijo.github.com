export const config = {
  "pages": {
    "pagedir": "/pages",
    "errorpage": "/notfound.html",
    "pagemap": [
      {
        "title": "Home",
        "route": "#home",
        "target": "/home.html"
      },

      {
        "title": "Products",
        "route": "#products",
        "target": "/products.html"
      },

      {
        "title": "Cart",
        "route": "#cart",
        "target": "/cart.html"
      },

      {
        "title": "Confirm",
        "route": "#confirm",
        "target": "/confirm.html",
        "hidden": true
      }
    ]
  },
  "blog": {
    "blogpage": "/blog.html",
    "container": "news-articles",
    "entries" : [
      {
        "title": "Test blog entry",
        "content": "Some text",
        "image": "https://icons-for-free.com/iconfiles/png/512/article+data+document+file+files+newspaper+office+paper-1320185653273206420.png",
        "author": "Some author",
        "date": new Date(2018, 11, 24, 10, 33, 30)
      },
      {
        "title": "Test blog entry 2",
        "content": "Some text",
        "image": "https://icons-for-free.com/iconfiles/png/512/article+data+document+file+files+newspaper+office+paper-1320185653273206420.png",
        "author": "Some author",
        "date": new Date(2016, 11, 24, 10, 33, 30)
      }
    ]
  },
  "carousel": {
    "container": "carousel",
    "delay": 5,
    "entries" : [
      {
        "image": "https://ze-robot.com/dl/4k/4k-desktop-wallpaper.-2560%C3%971440.jpg",
        "caption": "Some text",
        "link": "Some link"
      },
      {
        "image": "https://i.pinimg.com/originals/43/3a/81/433a815b8313453ee2edae5f7c91de73.jpg",
        "caption": "Some text 2",
        "link": "Some link 2"
      },
      {
        "image": "https://img.favpng.com/4/12/5/mountain-desktop-wallpaper-4k-resolution-png-favpng-6ptkc4nPsWqUmYtTxEr1d5QSB.jpg",
        "caption": "Some text 2",
        "link": "Some link 2"
      }
    ]
  }
}
