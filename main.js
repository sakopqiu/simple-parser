const {Parser} = require("./Parser");
const parser = new Parser();

// playground
function exec() {
    let ast = parser.parse(` 
  class Point {
              def constructor(x, y){
                 this.x = x;
                 this.y = y;
              }
              
              def calc(){
                 return this.x + this.y;
              }
            }
            
            let point = new Point(1,2);
            console.log(point.calc());
    `);
    console.log(JSON.stringify(ast, null, 2));
}

exec();
