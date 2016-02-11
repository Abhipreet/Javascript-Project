var fs=require('fs');
countrydata=[];

fs.readFile("country-continent.csv","utf8",function (error,data) {
 countrydata=data;

});

 fs.readFile("WDI_Data.csv","utf8",function (error,data) {
       var lines=data.split("\n");
       var years=[];//for asgn2
       var values=[];//for asgn2
       var result = [];
       var fresult=[];
       var result2=[];//for assgn 1.1
       var headers=lines[0].split(",");
       for(var i=1;i<lines.length;i++){
            var obj = {};

 	          var currentline=lines[i].split(",");
            if(currentline[0]==="India" && currentline[2]==="GDP growth (annual %)")//for assgn 2
            {
              for(j=4;j<59;j++)
              {
                if(currentline[j]!="")
                {
                  years.push(headers[j]);
                  values.push(parseFloat(currentline[j]));
                }
              }
            }
            obj["Country"]=currentline[0],obj["Indicator"]=currentline[2],obj["Values"]=currentline[49];//for assgn 1.1 and 1.2
            result.push(obj);
           }

       var country=[];
       var gdp=[];
       var gni=[];

      for(var k=0;k<result.length;k++)
      {
      if(result[k].Indicator==="GDP per capita (constant 2005 US$)" && result[k].Values!=="")
       {
         country.push(result[k].Country);
         gdp.push(parseFloat(result[k].Values));
       }
    }


    for(var q=0;q<country.length;q++)
    {

      for(var f=0;f<result.length;f++)
      {
        if(result[f].Indicator==="GNI per capita (constant 2005 US$)" && result[f].Country === country[q])
        {
          gni.push(parseFloat(result[f].Values));
        }
      }
    }

   var result1 = [];
   for(var z=0;z<country.length;z++){
     var obj1 = {};
 	   obj1["x"]=country[z],obj1["GDP"]=gdp[z],obj1["GNI"]=gni[z];
     result1.push(obj1);


     }
     result1.sort(function(a, b) { return b.GDP - a.GDP; });

     var result5=[];
   for(var p=0;p<15;p++)
   {
     result5[p]=result1[p];
   }

//---------------------------------------------------------------------------------------
//assgn 1.1
var country1=[];
var gdp1=[];
var gni1=[];
console.log(result[0]);
for(var l=0;l<result.length;l++)
{
if(result[l].Indicator==="GDP at market prices (constant 2005 US$)" && result[l].Values!=="")
{
  country1.push(result[l].Country);
  gdp1.push(parseFloat(result[l].Values));
}

}
console.log(gni1[0]);

for(var q=0;q<country1.length;q++)
{

for(var f=0;f<result.length;f++)
{
 if(result[f].Indicator==="GNI (constant 2005 US$)" && result[f].Country === country1[q])
 {
   gni1.push(parseFloat(result[f].Values));
 }
}
}
var result3 = [];
for(var z=0;z<country1.length;z++){
  var obj2 = {};
  obj2["x"]=country1[z],obj2["GDP"]=gdp1[z],obj2["GNI"]=gni1[z];
  result3.push(obj2);

  }
  result3.sort(function(a, b) { return b.GDP - a.GDP; });

  var result6=[];
for(var p=0;p<15;p++)
{
  result6[p]=result3[p];

}

  //Writing the file to json for assgn 1.2
         var data = JSON.stringify(result6);
         fs.writeFile('./config4.json', data, function (err) {
         if (err) {
           console.log('There has been an error saving your configuration data.');
           console.log(err.message);
           return;
         }
         console.log('Configuration saved successfully.JSON Created')
       });//JSON





//----------------------------------------------------------------------------------------//
//for creating object for assignment 2
for(i=0;i<55;i++)
           {
             var obj={};
             obj["year"]=years[i];
            // console.log(years[i]);
             obj["value"]=parseFloat(values[i]);
             result2.push(obj);
           }

  var data = JSON.stringify(result5);

//Writing the file to json for assgn 1.1
       fs.writeFile('./config3.json', data, function (err) {
       if (err) {
         console.log('There has been an error saving your configuration data.');
         console.log(err.message);
         return;
       }
       console.log('Configuration saved successfully.JSON Created')
     });//JSON

     //Writing the file to json for assgn 2
     var data = JSON.stringify(result2);

       fs.writeFile('./india4.json', data, function (err) {
         if (err) {
           console.log('There has been an error saving your configuration data.JSON Created');
           console.log(err.message);
           return;
         }
         console.log('Configuration saved successfully.')
       });//JSON
//-----------------------------------------------------------------------------------------------
//assgn 3
var ctr=0;
var finalObj = [];
var cntCount = [];
var dat=0;
var afSt = "";
for (var i = 4; i < headers.length; i++) {
finalObj[ctr] = { "year" : parseFloat(headers[i]), "Asia" : 0, "Europe" : 0, "Australia" : 0, "Africa" : 0, "SouthAmerica" : 0, "NorthAmerica" : 0};
cntCount[ctr++] = { "year" :parseFloat(headers[i]), "Asia" : 0, "Europe" : 0, "Australia" : 0, "Africa" : 0, "SouthAmerica" : 0, "NorthAmerica" : 0};
}

for (var x = 1; x < lines.length-1 ; x++) {
  var colm = lines[x].split(',');
  if (colm[2] == "GDP per capita (constant 2005 US$)") {
    var conLen = colm[0].length;
    pos = countrydata.indexOf(colm[0]);
    if (pos > 0) {
      if(countrydata.substr((pos+conLen+1), 2)==="AF"){
         selectRow(colm, "Africa");
      }
      else if(countrydata.substr((pos+conLen+1), 2)==="OC")
      {
        selectRow(colm, "Australia");
      }
      else if(countrydata.substr((pos+conLen+1), 2)==="NA")
      {
        selectRow(colm, "NorthAmerica");
      }
      else if(countrydata.substr((pos+conLen+1), 2)==="SA")
      {
        selectRow(colm, "SouthAmerica");
      }
      else if(countrydata.substr((pos+conLen+1), 2)==="EU")
      {
        selectRow(colm, "Europe");
      }
      else
      {
        selectRow(colm, "Asia");
      }

    }
  }
}

function selectRow(colm , cnt) {
  for (var i = 4; i < colm.length; i++) {
    if (colm[i] != "") {
      finalObj[i-4][cnt] += parseFloat(colm[i]);
      cntCount[i-4][cnt] += 1;
    }
  }
}

for (var i = 0; i < finalObj.length; i++) {
  finalObj[i]["Asia"] = finalObj[i]["Asia"] / cntCount[i]["Asia"];
  finalObj[i]["Europe"] = finalObj[i]["Europe"] / cntCount[i]["Europe"];
  finalObj[i]["Australia"] = finalObj[i]["Australia"] / cntCount[i]["Australia"];
  finalObj[i]["Africa"] = finalObj[i]["Africa"] / cntCount[i]["Africa"];
  finalObj[i]["SouthAmerica"] = finalObj[i]["SouthAmerica"] / cntCount[i]["SouthAmerica"];
  finalObj[i]["NorthAmerica"] = finalObj[i]["NorthAmerica"] / cntCount[i]["NorthAmerica"];
}

//console.log(finalObj[4]);
var data = JSON.stringify(finalObj);

  fs.writeFile('continent.json', data, function (err) {
    if (err) {
      console.log('There has been an error saving your configuration data.JSON Created');
      console.log(err.message);
      return;
    }
    console.log('Configuration saved successfully.')
  });//JSON

});
