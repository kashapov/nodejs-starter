const fs = require("fs");
const http = require("http");
const url = require("url");

const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const laptopData = JSON.parse(json);
//console.log(laptopData);

const server = http.createServer((req, res) => {
  //console.log("Someone did access to the server");
  //console.log(req.url);
  if (req.url === "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();
    return;
  }

  const pathName = url.parse(req.url, true).pathname;
  //console.log(pathName);
  const id = url.parse(req.url, true).query.id;
  //console.log(id);

  if (pathName === "/products" || pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("- products page");
  } else if (pathName === "/laptop" && id < laptopData.length) {
    res.writeHead(200, { "Content-type": "text/html" });
    //res.end(`- laptop page id:${id}`);

    fs.readFile(
      `${__dirname}/templates/template-laptop.html`,
      "utf-8",
      (err, data) => {
        const laptop = laptopData[id];
        let output = data.replace(/{%PRODUCTNAME%}/g, laptop.productName);
        output = output.replace(/{%IMAGE%}/g, laptop.image);
        output = output.replace(/{%PRICE%}/g, laptop.price);
        output = output.replace(/{%SCREEN%}/g, laptop.screen);
        output = output.replace(/{%CPU%}/g, laptop.cpu);
        output = output.replace(/{%STORAGE%}/g, laptop.storage);
        output = output.replace(/{%RAM%}/g, laptop.ram);
        output = output.replace(/{%DESCRIPTION%}/g, laptop.description);

        res.end(output);
      }
    );
  } else {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("- 404 page");
  }
});

server.listen(1337, "127.0.0.1", () => {
  console.log("Listening for request now");
});
