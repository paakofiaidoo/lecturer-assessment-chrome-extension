//loop through document and extract inputs with id which increases by increment
//if input is not empty, add to array  
//if input is empty, remove from array
//if array is empty, return empty string
//if array is not empty, return array.join(',')
console.log("is running");

function getInputs() {
    let inputs = [];
    let i = 0;
    let input = (i) => document.querySelectorAll(`#ChoiceQuestions_${i}__Answer`);
    while (input(i).length != 0) {
        //console.log(input(i), i);
        inputs.push(input(i));
        i++;
    }
    if (inputs.length == 0) { return false; }
    return inputs;
}
// [11,13,14,15,16,17,18,19,20,21,22,29] subtract 1 from each element
let studentIndex = [10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 28]
//filter getInputs() to only return inputs with index that is a member of studentIndex
//
function getStudentInputs() {
    let inputs = getInputs();
    let studentInputs = inputs.filter((input, i) => studentIndex.includes(i));
    return studentInputs;
}

function getLectureInputs() {
    let inputs = getInputs();
    let studentInputs = inputs.filter((input, i) => !studentIndex.includes(i));
    return studentInputs;
}


//loop through getInputs() and for each array of inputs, loop through each input and set the check if value is num
function setChecked(num, inputs) {
    for (let i = 0; i < inputs.length; i++) {
        if (i = 14) {
            inputs[i][4].checked = true;
            return;
        }
        for (let j = 0; j < inputs[i].length; j++) {

            if (inputs[i][j].value == num) {
                inputs[i][j].checked = true;
            }
        }
    }
}

//ask user if they want which number from 1 to 5
//if yes, setChecked()
//if no, return
function askUser(entities, inputs) {
    setTimeout(() => {
        let answer = prompt(`Which number from 1 to 5 do you want to select for the ${entities}?
    where 1=Very-Good  2=Good  3=Average  4=Poor  5=Very-Poor
    `);
        //if answer is not a number and is not a number between 1 and 5, ask again
        while (isNaN(answer) || answer < 1 || answer > 5) {
            answer = prompt(`Please enter a number between 1 and 5`);
        }
        if (answer == null) {
            return;
        }
        setChecked(answer, inputs);
    }, 3000);
}

//function to click submit button
function clickSubmit() {
    //get button with type submit
    let submit = document.querySelector('button[type="submit"]');
    submit.click();
}
//ask user if they want to submit
//if yes, clickSubmit()
//if no, return
function askUserSubmit() {
    setTimeout(() => {
        let answer = prompt(`Do you want to submit? (type yes or y to continue)`);
        if (answer == 'yes' || answer == 'y') {
            clickSubmit();
        }
    }, 3000);


}

let askAboutLecture = () => askUser('Lecture', getLectureInputs());
let askAboutStudent = () => askUser('Student', getStudentInputs());


let formRun = () => {
    askAboutLecture()
    askAboutStudent()
    askUserSubmit()
}

//get all buttons
//
//loop through buttons and check if it innerHTML is equal to "Assess Lecturer <span class=\"label label-danger\"><small>Not Done</small></span>"
//if yes, push to array and click on the first element in the array
//if no, return
function getAssessLecturerButtons() {
    let buttons = document.querySelectorAll('button');
    let button = [...buttons].filter((button) => button.innerHTML == 'Assess Lecturer <span class="label label-danger"><small>Not Done</small></span>');
    if (button.length == 0) {
        return false;
    }
    return button;
}
function clickAssessLecturer() {
    let buttons = document.querySelectorAll('button');
    let button = [...buttons].filter((button) => button.innerHTML == 'Assess Lecturer <span class="label label-danger"><small>Not Done</small></span>');
    if (button.length == 0) {
        return;
    }
    getAssessLecturerButtons()[0].click();
}

//ask user if they want to start assessment
function askUserAssessment() {
    let answer = prompt(`Do you want to start assessment? (type yes or y to continue)`);
    if (answer == 'yes' || answer == 'y') {
        clickAssessLecturer();
    }
}
let firstRun = false
let secondRun = false

const runFirst = () => {
    let button = getAssessLecturerButtons();
    if (button !== false && !firstRun) {
        askUserAssessment()
        clickAssessLecturer();
        console.log("Running2")
        firstRun = true
        secondRun = false
    }
}
const runSecond = () => {
    let inputs = getInputs();
    if (inputs !== false && !secondRun) {
        askUserAssessment()
        formRun();
        console.log("Running3")
        firstRun = false
        secondRun = true
    }
}

export { runFirst, runSecond }


