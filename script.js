$(".form").submit(function(e) {
        e.preventDefault();          
                  });

$('#start').click(function(){
    updatePattern();
    select_random(); 
    //name in index.html 'start'
});



var width = 500,
    height = 500,
    a = 100,
    rows,
    columns;

var svg = d3.select("body")
            .append("svg")
            .attr("width",width)
            .attr("height",height);


//var squarepath = "M " + 0 + " " + 0 + " L " + a + " " + 0 + " L " + a + " " + a + " L " + 0  + " " + a + " Z" ;

var squarepaths;
var previous, present="nothing";
var squares = function(width, height, a){
    squarepaths=[];
    rows = (Math.floor(width/a));
    columns = (Math.floor(height/a));
    //console.log(columns);
    for(i = 0; i < rows; i++){
        for(j=0; j<columns; j++){
            temp= [i , j];
            temp.push("M " + (a*i) + " " + (a*j) + " L " + (a+(a*i)) + " " + (a*j) + " L " + (a+(a*i)) + " " + (a+(a*j)) + " L " + (a*i)  + " " + (a+(a*j)) + " Z");
            squarepaths.push(temp);
        }
    }          
}


updatePattern();
select_random();

function updatePattern(){
    
    squares(width,height,parseInt($("#size_1")["0"].value));
    
    d3.selectAll("path").remove();

    svg.selectAll("path")
                .data(squarepaths)
                .enter()
                .append("path")
                .attr("d", function(d){return d[2]; })
                .attr("class", "square")
                .attr("id", function(d){ return d[0] + "_" + d[1] })
                .attr("stroke","black")
                .attr("fill","white")
                
    
    //select_random();
    
    //console.log(present);
        

}

$(".square").click(function(){
    if(this.classList.contains("present")){
     select_random();   
}
});

function select_random(){
    if((previous!="nothing") && (previous!="undefined")){
      $("#"+previous).removeClass("previous");
    }
    
    previous=present;
    present = Math.floor(Math.random()*rows)+ "_" + Math.floor(Math.random()*columns);
    
    if((previous!="nothing") && (previous!="undefined")){
      $("#"+previous).removeClass("present"); 
      $("#"+previous).addClass("previous");         
    }
    console.log("previous:" + previous + ",present: " + present);
    $("#"+present).addClass("present");
    

}