/* Parse Data with PapaParse
*/

function parseData(graph){
  
  Papa.parse("r2_strategic_noise_mapping.csv", {

  	download: true,
  	complete: function(results){
      
      graph(results.data);

  	}
});
 
 }
 //plot graph with this function now that we the csv data in results in the function above, we'll pass 
 //it as data value in the graph function below.

 function graph(data){
 	var Location = [];
 	var Road_Pop_Lden55db = ["Road_Pop_Lden>=55dB"];
 	var Road_Pop_Lden60db =["Road_Pop_Lden>=60dB"];
 	var Road_Pop_Lden65db =["Road_Pop_Lden>=65dB"];
 	var Road_Pop_Lden70db =["Road_Pop_Lden>=70dB"];
 	var Road_Pop_Lden75db =["Road_Pop_Lden>=75dB"];
 	var cut = data.slice(0,20)

 	for (i = 1; i < cut.length; i++){
 		Location.push(cut[i][0]); 
 		Road_Pop_Lden55db.push(cut[i][2]);
 		Road_Pop_Lden60db.push(cut[i][3]);
 		Road_Pop_Lden65db.push(cut[i][4]);
 		Road_Pop_Lden70db.push(cut[i][5]);
 		Road_Pop_Lden75db.push(cut[i][6]);
 	}

 	//console.log(Location);
 	//console.log(Road_Pop_Lden55db);

 	var chart = c3.generate({
 		bindto: '#chart',
    data: {
        columns: [
            Road_Pop_Lden55db,
            Road_Pop_Lden60db
        ]
    },
   
    axis: {
        x: {
            type: 'category',
            categories: Location
        }
    },
    legend:{
    	position: 'right'
    }
});


 	//combined plot
 	
var chart = c3.generate({
	bindto:"#scatter",
    data: {
        columns: [
            Road_Pop_Lden55db,
            Road_Pop_Lden60db,
            Road_Pop_Lden65db,
            Road_Pop_Lden70db,
            Road_Pop_Lden75db
        ]
    }
});

setTimeout(function () {
    chart.transform('pie');
}, 1000);

setTimeout(function () {
    chart.transform('line');
}, 2000);

setTimeout(function () {
    chart.transform('pie');
}, 3000);

}



//Parse second data
function parseDatatwo(graph){
  
  Papa.parse("website_trends-air-emissions_2013.csv", {

  	download: true,
  	complete: function(results){
  		//console.log(results.data);
      
      graphtwo(results.data);

  	}
});
 
 }

 function graphtwo(data){
 	var year = ["Years"];
 	var ammonia_index = ["Ammonia Index"];
 	var nitrogen = ["Nitrogen Oxides Index"];
 	var sulphur = ["Sulphur Dioxide Index"];
 	var cut = data.slice(0,20)

 	for (i = 1; i < cut.length; i++){
 		year.push(cut[i][0]); 
 		ammonia_index.push(cut[i][2]);
 		nitrogen.push(cut[i][4]);
 		sulphur.push(cut[i][6]);
 	}
    	console.log(year);
 	console.log(ammonia_index);

 	var chart = c3.generate({
 		bindto: '#chart-two',
    data: {
        columns: [
           ammonia_index,
           nitrogen,
           sulphur
        ],
        type: 'bar'
    },
    bar: {
        width: {
            width: 100// this makes bar width 50% of length between ticks
        }
        
    },
    legend:{
    	position: 'right'
    },
    axis: {
        x: {
            type: 'category',
            categories: year
        }
    }
});

setTimeout(function () {
    chart.load({
        columns: [
            nitrogen
        ]
    });
}, 1000);

 }
 


//call functions
 parseDatatwo(graphtwo);
 parseData(graph);