$(".form").submit(function(e) {
        e.preventDefault();          
                  });

$('#start').click(function(){
    var a = $("#size_1")["0"].value;
    var b = $("#size_2")["0"].value;
    var c = $("#click_num")["0"].value;
    if((a%1==0)&&(parseInt(a)<=$("#size_1")["0"].max)&&(parseInt(a)>=$("#size_1")["0"].min)){
       if((b%1==0)&&(parseInt(b)<=$("#size_2")["0"].max)&&(parseInt(b)>=$("#size_2")["0"].min)){
           if((c%1==0)&&(parseInt(c)<=$("#click_num")["0"].max)&&(parseInt(c)>=$("#click_num")["0"].min)){
               trial++;
               datum.push({"trial": trial+1, "clicks":[]});
                count = parseInt(c)*2;
                mincount = parseInt(c);
                updatePattern();
                select_random();   
           } } 
    }
   
    //name in index.html 'start'
});



var width = 500,
    height = 500,
    s,
    rows,
    columns,
    count=20,
    mincount=10,
    trial=0,
    datum = [{"trial": trial+1, clicks:[]}];

var svg = d3.select("body")
            .append("svg")
            .attr("width",width)
            .attr("height",height);


//var squarepath = "M " + 0 + " " + 0 + " L " + s + " " + 0 + " L " + s + " " + s + " L " + 0  + " " + s + " Z" ;

var squarepaths;
var previous, present="nothing";
var squares = function(width, height, s){
    squarepaths=[];
    rows = (Math.floor(width/s));
    columns = (Math.floor(height/s));
    //console.log(columns);
    for(i = 0; i < rows; i++){
        for(j=0; j<columns; j++){
            temp= [i , j];
            temp.push("M " + (s*i) + " " + (s*j) + " L " + (s+(s*i)) + " " + (s*j) + " L " + (s+(s*i)) + " " + (s+(s*j)) + " L " + (s*i)  + " " + (s+(s*j)) + " Z");
            squarepaths.push(temp);
        }
    }          
}

squares(width, height,s);
updatePattern();
select_random();

function updatePattern(){
    
    if(count>mincount){
    squares(width,height,parseInt($("#size_1")["0"].value));
    }
    else if(count==mincount){
    squares(width,height,parseInt($("#size_2")["0"].value));    
    }
   
    
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
    
    $(".square").click(function(){
    if(this.classList.contains("present")){
        var t = new Date;
        
        if (count>=mincount){
            datum[trial].clicks[(mincount*2)-count-1] = {};
            datum[trial].clicks[(mincount*2)-count-1]["size"] = parseInt($("#size_1")["0"].value);
        }
        
        else if (count>0){
            datum[trial].clicks[(mincount*2)-count-1] = {};
            datum[trial].clicks[(mincount*2)-count-1]["size"] = parseInt($("#size_2")["0"].value);
        }
        
        datum[trial].clicks[(mincount*2)-count-1]["absTime"] = t.getTime();
        datum[trial].clicks[(mincount*2)-count-1]["previous"] = previous;
        datum[trial].clicks[(mincount*2)-count-1]["present"] = present;
        
        console.log(datum);
        
        if(count==mincount){
            updatePattern();
            select_random(); 
        
        }
        else if(count>=0){
            select_random(); 
        
        }
}
});
        

}

<!-- ----------------- -->

function select_random(){
    console.log(count);
    if(count!=0){
    if((previous!="nothing") && (previous!="undefined")){
      $("#"+previous).removeClass("previous");
    }
    
    previous=present;
    temp = Math.floor(Math.random()*rows)+ "_" + Math.floor(Math.random()*columns);
    if(temp==previous){
        var first = parseInt(temp.split('_')[0]);
        var second = parseInt(temp.split('_')[1]);
        second = (second == columns - 1) ? (second - 1) : (second + 1);
        console.log("true");
        temp = first + "_" + second;
    }
    present = temp;
    if((previous!="nothing") && (previous!="undefined")){
      $("#"+previous).removeClass("present"); 
      $("#"+previous).addClass("previous");         
    }
    console.log("previous:" + previous + ",present: " + present);
    count--;
    $("#"+present).addClass("present");
    }
    else{
        $("#" + present).removeClass("present");
    }
}