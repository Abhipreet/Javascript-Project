var fs=require('fs');
 countrydata=[];

fs.readFile("country-continent.csv","utf8",function (error,data) {
  countrydata=data;

});
fs.readFile("WDI_Data.csv","utf8",function (error,data){

  var lines=data.split("\n");
  var headers=lines[0].split(",");
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
