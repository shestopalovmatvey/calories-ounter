const genderSelection = document.querySelector(".switcher");
const genderMale = document.querySelector('#gender-male');
const genderFemale = document.querySelector('#gender-female');
const age = document.querySelector("#age");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const radioGroups = document.querySelector(".radios-group");
const submitBtn = document.querySelector(".form__submit-button");
const resetBtn = document.querySelector(".form__reset-button");
const result = document.querySelector(".counter__result");
const caloriesNorm = document.querySelector("#calories-norm");
const caloriesMinimal = document.querySelector("#calories-minimal");
const caloriesMaximal = document.querySelector("#calories-maximal");
let gender = 5;
let activityCoefficients = 1.2;

genderSelection.addEventListener("change", function(event) {
    if (event.target.id === "gender-female") gender = -161;
    else gender = 5;
});


radioGroups.addEventListener("change", function(event) {
    if (event.target.id === "activity-minimal") activityCoefficients = 1.2;
    if (event.target.id === "activity-low") activityCoefficients = 1.375;
    if (event.target.id === "activity-medium") activityCoefficients = 1.55;
    if (event.target.id === "activity-high") activityCoefficients = 1.725;
    if (event.target.id === "activity-maximal") activityCoefficients = 1.9;
});

age.addEventListener("input", () => {
    checkingInput();
});

height.addEventListener("input", () => {
    checkingInput();
});

weight.addEventListener("input", () => {
    checkingInput();
});


submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    let currentRes = Math.round((calculateFormula(age.value, height.value, weight.value) + gender) * activityCoefficients);
    result.classList.remove("counter__result--hidden");
    caloriesNorm.textContent = currentRes;
    caloriesMinimal.textContent = Math.round(currentRes - (currentRes * 15 / 100));
    caloriesMaximal.textContent = Math.round(currentRes + (currentRes * 15 / 100));
});

resetBtn.addEventListener("click", () => {
    checkingInput();
    genderMale.checked = true;
    genderFemale.checked = false;
    age.value = "";
    height.value = "";
    weight.value = "";
    radioGroups.querySelector("#activity-minimal").checked = true;
    for (let i = 1; i < radioGroups.length; i++) {
        radioGroups[i].checked = false
    }
    submitBtn.disabled = true
    resetBtn.disabled = true
    result.classList.add("counter__result--hidden");
});


const checkingInput = function() {
    if (+age.value > 0 && +height.value > 0 && +weight.value > 0) submitBtn.disabled = false
    else submitBtn.disabled = true
    if (+age.value > 0 || +height.value > 0 || +weight.value > 0) resetBtn.disabled = false
    else resetBtn.disabled = true
}


const calculateFormula = function(age, height, weight) {
    return Math.round((10 * weight) + (6.25 * height) - (5 * age));
}