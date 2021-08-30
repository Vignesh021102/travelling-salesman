class City {
    constructor(x,y,name,radius){
        this.x = x;
        this.y = y;
        this.name = name;
        this.radius = radius
    }
    draw(){
        stroke(0);
        strokeWeight(1);
        fill(0);
        circle(this.x,this.y,this.radius*2);
    }
}