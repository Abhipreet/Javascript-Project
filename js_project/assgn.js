var fs=require('fs');
 fs.readFile("WDI_Data.csv","utf8",function (error,data) {
       var lines=data.split("\n");
       var years=[];//for asgn2
      var values=[];//for asgn2
       var result = [];

       var result2=[];
       var headers=lines[0].split(",");
       for(var i=1;i<lines.length;i++){
            var obj = {};

 	          var currentline=lines[i].split(",");

            obj["Country"]=currentline[0],obj["Indicator"]=currentline[2],obj["Values"]=currentline[49];
            result.push(obj);
           }

       var country=[];
       var gdp=[];
       var gni=[];

      for(var k=0;k<result.length;k++)
      {
      if(result[k].Indicator==="GDP at market prices (constant 2005 US$)" && result[k].Values!=="")
       {
         country.push(result[k].Country);
         gdp.push(parseFloat(result[k].Values));
       }


    }

    for(var q=0;q<country.length;q++)
    {

      for(var f=0;f<result.length;f++)
      {
        if(result[f].Indicator==="GNI (constant 2005 US$)" && result[f].Country === country[q])
        {
          gni.push(parseFloat(result[f].Values));
        }
      }
    }



//for creating object for assignment 2
var result1 = [];
for(var z=0;z<country.length;z++){
  var obj1 = {};
  obj1["x"]=country[z],obj1["GDP"]=gdp[z],obj1["GNI"]=gni[z];
  result1.push(obj1);

  }
  result1.sort(function(a, b) { return b.GDP - a.GDP; });
  console.log(result1[0]);

  var data = JSON.stringify(result1);

//Writing the file to json
       fs.writeFile('./config4.json', data, function (err) {
       if (err) {
         console.log('There has been an error saving your configuration data.');
         console.log(err.message);
         return;
       }
       console.log('Configuration saved successfully.JSON Created')
     });//JSON
     var data = JSON.stringify(result2);



});
