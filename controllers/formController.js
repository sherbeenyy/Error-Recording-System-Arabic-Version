const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');



const getMachineErrors = () => {
    return {
        "رولينج صينى": {
            "الميكانيكيه": ["واير", "صنفره", "تيرس" , "سير" , "سوسته" , "فرامل" , "كسر أو لحام" , "المندرل"],
            "كهربائية": ["موتور", "مفتاح" , "فيوز" , "حساس" , "ماس كهربا"]
        },
        "رولينج اخضر": {
            "الميكانيكيه": ["واير", "صنفره", "تيرس" , "سير" , "سوسته" , "فرامل" , "كسر أو لحام" , "المندرل" ],
            "كهربائية": ["موتور", "مفتاح" , "فيوز" , "حساس" , "ماس كهربا"]
        },
        "رولينج ازرق": {
            "الميكانيكيه": ["واير", "صنفره", "تيرس" , "سير" , "سوسته" , "فرامل" , "كسر أو لحام" , "المندرل" ],
            "كهربائية":  ["موتور", "مفتاح" , "فيوز" , "حساس" , "ماس كهربا"]
        },
        "كبس ازرق": {
            "الميكانيكيه": ["بيستون", "ترس", "فوهة" ],
            "كهربائية":  ["موتور", "مفتاح" , "فيوز" , "حساس" , "ماس كهربا"]
        },
        "كبس اخضر": {
            "الميكانيكيه": ["بيستون", "ترس", "فوهة" ],
            "كهربائية":  ["موتور", "مفتاح" , "فيوز" , "حساس" , "ماس كهربا"]
        },
         "كبس يدوى": {
            "الميكانيكيه": ["بيستون", "ترس", "فوهة" ],
            "كهربائية":  ["موتور", "مفتاح" , "فيوز" , "حساس" , "ماس كهربا"]
        },
         "مقص حرارة": {
            "الميكانيكيه": ["سير", "تيرس", "بنز" , "سكينه" , "بلى" ],
            "كهربائية": ["موتور", "مفتاح" , "فيوز" , "حساس" , "ماس كهربا"]
        },
          "مقص عينه": {
            "الميكانيكيه": ["سير", "تيرس", "بنز" , "سكينه" , "بلى" ],
            "كهربائية": ["موتور", "مفتاح" , "فيوز" , "حساس" , "ماس كهربا"]
        },
          "شل": {
            "الميكانيكيه": ['الأسطمبه', "فونيه الغاز"],
            "كهربائية": ["موتور", "مفتاح" , "فيوز" , "حساس" , "ماس كهربا"]
        },

    };

};
const machineErrors = getMachineErrors();

// Path to the database file
const dataFilePath = path.join(process.cwd(),'data','database.json');

const renderForm = (req, res) => {
    const selectedMachine = req.query.machineName || '';
    const selectedErrorType = req.query.typeOfError || '';
    const errors = selectedMachine && selectedErrorType 
        ? machineErrors[selectedMachine][selectedErrorType] || [] 
        : [];

    res.render('form', {
        machineErrors,
        selectedMachine,
        selectedErrorType,
        errors
    });
};

const excelFilePath = path.join(process.cwd(), 'data', 'data.xlsx');

function readExcelData() {
    if (fs.existsSync(excelFilePath)) {
        const workbook = xlsx.readFile(excelFilePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        return xlsx.utils.sheet_to_json(worksheet);
    }
    return [];
}

function writeExcelData(data) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    xlsx.writeFile(workbook, excelFilePath);
}

const submitForm = (req, res) => {
    const newData = req.body;

    let data = readExcelData();


    data.push(newData);


    writeExcelData(data);


    res.redirect('/view');
};
module.exports = {
    renderForm,
    submitForm
};
