//Part 1: Refactoring Old Code
function parseCSV(csvString) {
    let cell = '';
    const rows = [];
    let row = [];
    
    csvString = csvString.replace(/\r\n/g, '\n');

  for (let i = 0; i < csvString.length; i++) {
    const char = csvString[i];
    if (char === ',') {
        row.push(cell);
        cell = '';
      } else if (char === '\n') {
    
        row.push(cell); 
        rows.push(row);
      row = [];
      cell = '';
    } else {
        cell += char;
    }
  }
  if (cell || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  rows.forEach(row => {
    console.log(...row);
  });
}
const csvData1 = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";
const csvData2 = "Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232";

parseCSV(csvData1);
parseCSV(csvData2);

//Part 2: Expanding Functionality
function parseCSVWithDynamicColumns(csvString) {
    const rows = csvString.trim().split('\n');
    const dataArray = rows.map(row => row.split(','));
    
    return dataArray;
  }
  
  const csvData = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";
  const parsedData = parseCSVWithDynamicColumns(csvData);
  console.log(parsedData);

  //Part 3: Transforming Data
  function transformToObjects(dataArray) {
    const [headers, ...rows] = dataArray;
    
    return rows.map(row => {
      return headers.reduce((obj, header, index) => {
        obj[header.toLowerCase()] = row[index];
        return obj;
      }, {});
    });
  }
  
  const dataArray = [["ID", "Name", "Occupation", "Age"], ["42", "Bruce", "Knight", "41"], ["57", "Bob", "Fry Cook", "19"], ["63", "Blaine", "Quiz Master", "58"], ["98", "Bill", "Doctor’s Assistant", "26"]];
  const objectsArray = transformToObjects(dataArray);
  console.log(objectsArray);

  //Code for Part 4: Sorting and Manipulating Data
  function manipulateData(objectsArray) { 
    objectsArray.pop();
    

    objectsArray.splice(1, 0, { id: "48", name: "Barry", occupation: "Runner", age: "25" });
    
    objectsArray.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" });

    const totalAge = objectsArray.reduce((sum, obj) => sum + parseInt(obj.age, 10), 0);
    const averageAge = totalAge / objectsArray.length;
    
    return { updatedArray: objectsArray, averageAge };
  }
  
  const objectsArray = [{ id: "42", name: "Bruce", occupation: "Knight", age: "41" }, { id: "57", name: "Bob", occupation: "Fry Cook", age: "19" }, { id: "63", name: "Blaine", occupation: "Quiz Master", age: "58" }, { id: "98", name: "Bill", occupation: "Doctor’s Assistant", age: "26" }];
  const { updatedArray, averageAge } = manipulateData(objectsArray);
  console.log(updatedArray);
  console.log('Average Age:', averageAge);


//Part 5: Full Circle
function convertToCSV(objectsArray) {

    const headers = Object.keys(objectsArray[0]);
    

    const rows = objectsArray.map(obj => headers.map(header => obj[header]).join(','));
    

    return [headers.join(','), ...rows].join('\n');
  }
  
  const finalArray = [{ id: "42", name: "Bruce", occupation: "Knight", age: "41" }, { id: "48", name: "Barry", occupation: "Runner", age: "25" }, { id: "57", name: "Bob", occupation: "Fry Cook", age: "19" }, { id: "63", name: "Blaine", occupation: "Quiz Master", age: "58" }, { id: "7", name: "Bilbo", occupation: "None", age: "111" }];
  const csvString = convertToCSV(finalArray);
  console.log(csvString);
  

