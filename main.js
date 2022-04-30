const {Parser} = require("./Parser");
const parser = new Parser();

// playground
function exec() {
    let ast = parser.parse(` 
       let a = 10,b, c = (a+"b") * 3,d;
    `);
    console.log(JSON.stringify(ast, null, 2));
}

exec();
