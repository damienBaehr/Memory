const RowCount = 6;
const ColCount = 7;

for (let i = 0; i < array.length; i++) {
    const table = array[i];
    array[i] = document.createElement("table");

    if (array[i]!= RowCount) {
        let CreateRow = document.createElement("tr");
    }   
    if (array[i] != ColCount) {
        let CreateColumn = document.createElement("td");
    }
}