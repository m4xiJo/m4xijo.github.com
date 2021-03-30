export default class Loader {
  static async loadFile(url) {
    return await new Promise((resolve, reject) => {
      if (url == null) return reject("URL was NULL!");
      let request = new XMLHttpRequest();
      request.open('GET', url + "?" + Math.random(), true);
      request.setRequestHeader("Content-Type", "text/plain");
      request.onload = function() {
        if (request.status < 200 || request.status > 299) reject("Error: Status " + request.status + " on resource " + url);
        else resolve(request.responseText);
      }
      request.send();
    });
  }
}
