var table1Data = [{ 'NAME' : 'Europe', 'PLAN' : '$10,525,200', 'FORECAST': '$12,700,200',
'BEST CASE': ['$12,700,200', '$11,700,400'], 'MONTHLY PLAN': '$17,425,200','COMMIT': ['$12,700,200', '$11,700,400'], 'COMMENTS': 'COMMENT1' },
{ 'NAME' : 'Belgium', 'PLAN' : '$2,525,200',  'FORECAST': '$3,125,200',
'BEST CASE': ['$2,900,450', '$2,890,120'],  'MONTHLY PLAN': '$16,525,200','COMMIT': ['$2,900,450', '$2,890,120'], 'COMMENTS': 'COMMENT2'  },
{ 'NAME' : 'England', 'PLAN' : '$4,600,400', 'FORECAST': '$2,500,600',
'BEST CASE': ['$3,900,300', '$2,900,300'], 'MONTHLY PLAN': '$12,678,200','COMMIT': ['$3,900,300', '$2,900,300'], 'COMMENTS': 'COMMENT3' },
{ 'NAME' : 'Sweden', 'PLAN' : '$2,425,200', 'FORECAST': '$5,425,200',
'BEST CASE': ['$6,200,200', '$2,400,900'], 'MONTHLY PLAN': '$1,234,200','COMMIT': ['$6,200,200', '$2,400,900'], 'COMMENTS': 'COMMENT4' },
{ 'NAME' : 'Finland', 'PLAN' : '$1,700,200', 'FORECAST': '$4,700,200',
'BEST CASE': ['$4,702,120', '$4,300,200'], 'MONTHLY PLAN': '$4,123,200','COMMIT': ['$4,702,120', '$4,300,200'], 'COMMENTS': 'COMMENT5' }
];





// Creating Div elements to get the table Headers from above array with JSON objects
var colHeaders = [];
for(var i=0; i < Object.keys(table1Data[0]).length; i++)
{
	console.log("colHeaders inside",colHeaders);

	for(var key in table1Data[i]) {
		if(colHeaders.indexOf(key) === -1) {
			colHeaders.push(key);
		}
	}
}


var myDivTable = document.createElement('div');
myDivTable.id = "divTable";
myDivTable.className = "divTable";

for(var key in table1Data[0]) {
	var i = 1;
document.body.appendChild(myDivTable);
var myDivHead = document.createElement('div');
myDivHead.id = "divHead" + key;
myDivHead.className = "divHead";
	myDivHead.innerHTML = key;
	i++;
	var keyName = myDivHead.innerHTML;
  
 

//Function to order the columns either Descending or Ascending

var descOrder = true;
Array.prototype.sortOn = function(p,desc){
descOrder = desc;
//condition for chnaging it from ascending to descending order and viceversa
var mul = descOrder ? -1 : 1;
	if(p === "NAME") {
    return this.sort(function(a, b){
    	console.log("a b", a,b);
    	    return (a[p] > b[p]) ? 1 * mul : (a[p] < b[p]) ? -1 * mul : 0;
 
    });
} else if(p !== "NAME") {
	 return this.sort(function(a, b){

	 	//formating the inputs using regex to avoid $
	 	if((typeof a[p] !== 'string') && (typeof b[p] !== 'string')) {
	 	 	return (a[p][0].slice(1).replace(/[^0-9\.]+/g, "") * mul) - (b[p][0].slice(1).replace(/[^0-9\.]+/g, "") * mul);
        }
        else {
        	return (a[p].slice(1).replace(/[^0-9\.]+/g, "") *  mul) - (b[p].slice(1).replace(/[^0-9\.]+/g, "") * mul);
        }	
         });
}
};

myDivHead.onclick = function(){
	if(descOrder === true) {
		descOrder = false;
	} else if(descOrder === false) {
		descOrder = true;
	}
	table1Data =  table1Data.sortOn(this.innerHTML,descOrder);
	checkValue();

	return table1Data;
}
document.getElementById('divTable').append(myDivHead);
}


//Creating elements for select button
	 var myDivSelect = document.createElement('select');
		myDivSelect.id = "divTable";
myDivSelect.setAttribute("onclick", 'addOptions()');
     document.body.lastElementChild.appendChild(myDivSelect);



	 var myDivSelectInput = document.createElement('div');
		myDivSelectInput.id = "divSelectInput";
		myDivSelectInput.class = "divSelectInput";
          document.getElementById("divTable").appendChild(myDivSelectInput);


		for(var i=0; i< colHeaders.length; i++)
		{
					console.log("myDivSelect inside");

			    var myDivOption = document.createElement("label");
			    myDivOption.id = "option" +i;
                myDivOption.class =  "option" +i;
			    myDivOption.innerHTML =  colHeaders[i];

			   var myDivCheck =  document.createElement("input") ;
			   myDivCheck.type = "checkbox";
			   myDivCheck.id = "checkbox" +colHeaders[i];
			   myDivCheck.className = "checkBoxClass";
			   myDivCheck.value =  colHeaders[i];
               myDivCheck.setAttribute("onchange", 'testChecked()');
			   console.log("test select", myDivCheck);

          myDivOption.insertBefore(myDivCheck, myDivOption.childNodes[0]);
   

			    document.getElementById("divSelectInput").appendChild(myDivOption);

         }
          var myDivApply= document.createElement("button");
			    myDivApply.id = "divApply";
                myDivApply.type =  "button";
			    myDivApply.innerHTML =  "Apply";
             	myDivApply.setAttribute("onclick", 'hideColumn()');
		 document.getElementById("divSelectInput").appendChild(myDivApply);




var dropDownClicked = false;

 var unChecked = [];
var checkedCount = 5;
var restrictCount = (checkedCount <= 5) ? checkedCount : 5;

// Function to test the number of checkboxes are checked 
function testChecked() {
	checkedCount = 0;
  unChecked.length = 0;
for(var i = 0; i < colHeaders.length; i++) 
{
    console.log("item colheaders test",colHeaders[i]);

if(document.getElementById("checkbox" +colHeaders[i]).checked === false)
{ if(unChecked.indexOf(colHeaders[i]) === -1) {
unChecked.push(colHeaders[i]);
}
console.log("check checked after",unChecked);

}

// Counting the number of chekboxes selected to restrict by 5
if(document.getElementById("checkbox" +colHeaders[i]).checked === true)
{
checkedCount ++;
}

if(checkedCount > 5) {
document.getElementById('divApply').disabled=true;
} else {
	document.getElementById('divApply').disabled=false;

}

}
 }

 // Function to add options frm the column headers to the Dropdown menu Button

function addOptions() {
	console.log("dropDownClicked");
       if (!dropDownClicked) {

     document.getElementById("divSelectInput").style.display = "block";

    dropDownClicked = true;
           		console.log("dropDownClicked after",dropDownClicked);

  } else {
  	       		console.log("dropDownClicked not yes");

     document.getElementById("divSelectInput").style.display = "none";
    dropDownClicked = false;
  }

     };




// Function to hide or show the columns based on the cehckboxes checked
function hideColumn() {	
  
  	for(var k = 0; k < colHeaders.length; k++) 
{
  document.getElementById('divHead'+colHeaders[k]).style.display = 'table-cell';


for(var i = 0; i < table1Data.length; i++) 
{
document.getElementById('divCol'+colHeaders[k]+i).style.display = 'table-cell';
}
 
} 
var elms = [];
	for(var k = 0; k < unChecked.length; k++) 
{
  var headerIndex = colHeaders.indexOf(unChecked[k]); 
  if(headerIndex !== -1)
document.getElementById('divHead'+unChecked[k]).style.display ="none";


var itemSelected = 'divCol'+unChecked[k];

// Putting all the unchecked elements in an array
for(var i = 0; i < table1Data.length; i++) 
{
elms.push(document.getElementById('divCol'+unChecked[k]+i));
}
console.log("check headerIndex",'divCol'+unChecked[k],elms,headerIndex);

for(var j = 0; j < elms.length; j++) 
  elms[j].style.display='none';

}
}



// Creating row and columns in DIV tags to the table
for(var i=0; i < table1Data.length; i++)
{
var myDivRow = document.createElement('div');
myDivRow.id = "divRow" + [i];
myDivRow.className = "divRow";
document.getElementById('divTable').appendChild(myDivRow);
}
for(var i=0; i < table1Data.length; i++)
{ 
for(var each in table1Data[i])
    {
var myDivCol = document.createElement('div');
myDivCol.id = "divCol"+each+i;
myDivCol.className = "divCol";
var eachStr = each;
if(table1Data[i][each].length !== 2)
{
myDivCol.innerHTML = table1Data[i][each];
}

if(table1Data[i][each].length === 2)
{
	myDivCol.innerHTML = table1Data[i][each][0] + '\n' + table1Data[i][each][1] ;
}
document.getElementById('divRow'+[i]).appendChild(myDivCol);
     }
 }



// Function to check More or Less value selected
var checkValue = function() {

for(var i=0; i < table1Data.length; i++)
{ 
	var myDivRow = document.getElementById("divRow"+[i]);
myDivRow.innerHTML = '';
for(var each in table1Data[i])
    {
var myDivCol = document.createElement('div');
myDivCol.id = "divCol" + each+i;
myDivCol.className = "divCol";
var eachStr = each;

// Identifying More radio button click
if(document.getElementById('YesID').checked)
{
if(table1Data[i][each].length !== 2)
{
myDivCol.innerHTML = table1Data[i][each];
}

if(table1Data[i][each].length === 2)
{
	myDivCol.innerHTML = table1Data[i][each][0] + '\n' + table1Data[i][each][1] ;
}
}

// Identifying Less radio button click
if(document.getElementById('NoID').checked){
if(table1Data[i][each].length !== 2)
{
myDivCol.innerHTML = table1Data[i][each];
}
if(table1Data[i][each].length === 2)
{
myDivCol.innerHTML = table1Data[i][each][0];
}
}
document.getElementById('divRow'+[i]).appendChild(myDivCol);
     }
 }


//Restricting the table to  not have more than 5 elements
  	for(var k = checkedCount; k < colHeaders.length; k++) 
{
	console.log("checkedCount check",checkedCount);
  document.getElementById('divHead'+colHeaders[k]).style.display = 'none';


for(var i = 0; i < table1Data.length; i++) 
{	console.log("table1Data.length ",table1Data.length,colHeaders.length);
document.getElementById('divCol'+colHeaders[k]+i).style.display = 'none';
}
 
} }


//Restricting the table to  not have more than 5 elements
  	for(var k = checkedCount; k < colHeaders.length; k++) 
{
		console.log("checkedCount check out",checkedCount);

  document.getElementById('divHead'+colHeaders[k]).style.display = 'none';


for(var i = 0; i < table1Data.length; i++) 
{	console.log("table1Data.length ",table1Data.length,colHeaders.length);
document.getElementById('divCol'+colHeaders[k]+i).style.display = 'none';
}
 
} 
