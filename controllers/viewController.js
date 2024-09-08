const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Path to the Excel file
const excelFilePath = path.join(process.cwd(), 'data', 'data.xlsx');

// Function to read data from Excel
function readExcelData() {
    if (fs.existsSync(excelFilePath)) {
        const workbook = xlsx.readFile(excelFilePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        return xlsx.utils.sheet_to_json(worksheet);
    }
    return [];
}

// Function to write data to Excel
function writeExcelData(data) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    xlsx.writeFile(workbook, excelFilePath);
}

const viewData = (req, res) => {
    const data = readExcelData();
    res.render('viewData', { data });
};

const deleteRecord = (req, res) => {
    const index = parseInt(req.params.index, 10);
    let data = readExcelData();

    if (index >= 0 && index < data.length) {
        data.splice(index, 1); // Remove the record at the specified index
        writeExcelData(data); // Write the updated data back to Excel
        res.render('viewData', { data });
    } else {
        res.status(400).send('Invalid record index');
    }
};

const downloadExcel = (req, res) => {
    const data = readExcelData();

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    // Create a buffer and send it as a file
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
};

module.exports = {
    viewData,
    deleteRecord,
    downloadExcel
};
