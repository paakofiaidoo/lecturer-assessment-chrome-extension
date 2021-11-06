function getInputs() {
    let inputs = [];
    let i = 0;
    let input = (i) => document.querySelectorAll(`#ChoiceQuestions_${i}__Answer`);
    while (input(i).length != 0) {
        //console.log(input(i), i);
        inputs.push(input(i));
        i++;
    }
    if (inputs.length == 0) {
        return false;
    }
    return inputs;
}
let studentIndex = [10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 28];
function getStudentInputs() {
    let inputs = getInputs();
    studentIndex = [10, 12, 13, 15, 16, 17, 18, 19, 20, 21, 28];
    let studentInputs = inputs.filter((input, i) => studentIndex.includes(i));
    return studentInputs;
}
function getLectureInputs() {
    let inputs = getInputs();
    let studentInputs = inputs.filter((input, i) => !studentIndex.includes(i));
    return studentInputs;
}
function setChecked(num, inputs) {
    for (let i = 0; i < inputs.length; i++) {
        for (let j = 0; j < inputs[i].length; j++) {
            if (inputs[i][j].value == num) {
                inputs[i][j].checked = true;
            }
        }
    }
}
function askUser(entities, inputs) {
    setTimeout(() => {
        let answer = prompt(`Which number from 1 to 5 do you want to select for the ${entities}?
    where 1=Very-Good  2=Good  3=Average  4=Poor  5=Very-Poor
    `);
        if (answer == null) {
            return;
        }
        while (isNaN(answer) || answer < 1 || answer > 5) {
            answer = prompt(`Please enter a number between 1 and 5`);
        }
        setChecked(answer, inputs);
    }, 1000);
}
function clickSubmit() {
    let submit = document.querySelector('button[type="submit"]');
    submit.click();
}

function askUserSubmit() {
    setTimeout(() => {
        let answer = prompt(`Do you want to submit? (type yes or y to continue)`);
        if (answer == "yes" || answer == "y") {
            clickSubmit();
        }
    }, 1000);
}
let askAboutLecture = () => askUser("Lecture", getLectureInputs());
let askAboutStudent = () => askUser("Student", getStudentInputs());
let formRun = () => {
    askAboutLecture();
    askAboutStudent();
    (() => { getInputs()[14][4].checked = true })()
    askUserSubmit();
};

function getAssessLecturerButtons() {
    let buttons = document.querySelectorAll("button");
    let button = [...buttons].filter(
        (button) => button.innerHTML == 'Assess Lecturer <span class="label label-danger"><small>Not Done</small></span>'
    );
    if (button.length == 0) {
        return false;
    }
    return button;
}
function clickAssessLecturer() {
    let buttons = document.querySelectorAll("button");
    let button = [...buttons].filter(
        (button) => button.innerHTML == 'Assess Lecturer <span class="label label-danger"><small>Not Done</small></span>'
    );
    if (button.length == 0) {
        return;
    }
    getAssessLecturerButtons()[0].click();
}

function askUserAssessment() {
    let answer = prompt(`Do you want to start assessment? (type yes or y to continue)`);
    if (answer == "yes" || answer == "y") {
        clickAssessLecturer();
    }
}
let firstRun = false;
let secondRun = false;
const runFirst = () => {
    let button = getAssessLecturerButtons();
    if (button !== false && !firstRun) {
        askUserAssessment();
        console.log("Running2");
        firstRun = true;
        secondRun = false;
    }
};
const runSecond = () => {
    let inputs = getInputs();
    if (inputs !== false && !secondRun) {
        formRun();
        firstRun = false;
        secondRun = true;
    }
};

var url = window.location.href;

if (url.indexOf("https://apps.knust.edu.gh/students/LecturerAssessment/AssessmentForm?CourseCode=") > -1) {
    //wait for page to load
    setTimeout(() => {
        runSecond();
    }, 3000);
} else if (url.indexOf("https://apps.knust.edu.gh/students/LecturerAssessment") > -1) {
    setTimeout(() => {
        runFirst();
    }, 3000);
}
