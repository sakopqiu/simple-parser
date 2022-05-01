# simple-parser

https://www.bilibili.com/video/BV1Z34y1C77r?p=1
的代码，自己照着写了一遍

支持面向对象语法

```
 class Point {
   def constructor(x,y){
      this.x = x;
      this.y = y;
   }
   
   calc(){
      return this.x + this.y;
   }
 }
 
 class Point3 extends Point{
   def constructor(x,y,z){
      super(x,y);
      this.z = z;
   }
   
   calc(){
      return super.calc() + this.z;
   }
 }

```
