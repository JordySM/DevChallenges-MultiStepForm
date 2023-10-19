let currentStep = 1;
let currentStepElement = null;
let totalStepsElement = null;
let stepsRow = null;
let checkboxs = null;
let checkboxSelected = [];
let stepSections = null;
let btnsGoTo = null

window.addEventListener("load", function(){
    currentStepElement = document.querySelectorAll(".step-row .current-step-text")
    totalStepsElement = document.querySelectorAll(".step-row .total-steps")
    stepsRow = document.querySelector(".step-row .step-btns")
    checkboxs = this.document.querySelectorAll(".topics-section .checkbox")
    // Select form sections
    stepSections = this.document.querySelectorAll(".form-section")
    // Buttons go to {{step}}ç
    btnsGoTo = document.querySelectorAll('[id^="btn-go-to-"]')
        // Function for each button
        btnsGoTo.forEach(element => {
            let stepNum = (element.getAttribute("id")).split("-").slice(-1)[0]
            
            if(!isNaN(stepNum))
            {
                stepNum = parseInt(stepNum)
                if(stepNum > 0 && stepNum <= stepSections.length)
                    element.addEventListener("click", function(){
                        event.preventDefault();
                        goToStep(stepNum);
                    })
            }
                
                
        });

    currentStep = 1;
    let sectionsNumber = document.querySelectorAll(".register-form .form-section").length;

    currentStepElement.forEach(element => {
        element.innerHTML = currentStep;
    })

    totalStepsElement.forEach(element => {
        element.innerHTML = sectionsNumber;
    })



    checkboxs.forEach(element => {
        element.addEventListener("click", function(){
            clickTopic(element, element.getAttribute("number"))
        })
    });

    makeBtns(currentStep)

    // Change summare information events
    // Name
    document.querySelector(".register-section .name").addEventListener("change", function(){
        updateSummary()
    })
    // Email
    document.querySelector(".register-section .email").addEventListener("change", function(){
        updateSummary()
    })
    // Topics
    // document.querySelectorAll(".topics-section .section-content .checkbox").forEach(element => {
    //     updateSummary()
    // });
})

/**
 * 
 * @param {Number} currentStep 
 */
function makeBtns(currentStep)
{
    if(isNaN(currentStep))
    return false;

    currentStep = parseInt(currentStep)

    if(currentStep < 1 || currentStep > stepSections.length)
        return false;

    stepsRow.innerHTML = ""

    for (let index = 1; index <= stepSections.length; index++) {
        let stepButton = this.document.createElement("div");
            stepButton.classList.add("btn-step");

        if(index === currentStep)
        {
            stepButton.classList.add("current-step")
        }
        else
        {
            if(index < currentStep)
                stepButton.classList.add("passed-step")

            stepButton.addEventListener("click", function() {
                goToStep(index)
            })
        }

        stepsRow.appendChild(stepButton)
    }/**/
}

/**
 * 
 * @param {Number} stepNumber 
 */
function goToStep(stepNumber)
{
    if(isNaN(stepNumber))
        return false;

    stepNumber = parseInt(stepNumber)

    if(stepNumber < 1 || stepNumber > stepSections.length)
        return false;

    switch(currentStep)
    {
        case 1:
            if(!validateStep1())
                return;
            break;
        
        default:
            // return;
            break;
    }

    stepSections.forEach(element => {
        element.classList.remove("active")        
    });

    let activeStep = document.querySelector('.register-form .form-section:nth-child('+ stepNumber + ')')
        activeStep.classList.add("active")

    currentStepElement.forEach(element => {
        element.innerHTML = stepNumber
    });

    makeBtns(stepNumber)

    currentStep = stepNumber
}



/**
 * 
 * @param {HTMLElement} checkbox 
 * @param {String} numCheckbox 
 * @returns 
 */
function clickTopic(checkbox, numCheckbox)
{
    if(isNaN(numCheckbox))
        return;

    let numberCheckbox = parseInt(numCheckbox)

    if(numCheckbox < 1 || numCheckbox > checkboxs.length)
        return;

    if(checkbox.classList.contains("selected"))
    {
        checkbox.classList.remove("selected")

        let checkboxIndex = checkboxSelected.indexOf(numberCheckbox)
        if(checkboxIndex > -1)
        {   
            checkboxSelected.splice(checkboxIndex, checkboxIndex + 1)    
        }
    }
    else
    {
        checkbox.classList.add("selected")

        if(checkboxSelected.find((element) => element == numberCheckbox) === undefined)
        {
            checkboxSelected.push(numberCheckbox)            
        }
    }
    checkboxSelected.sort()

    updateSummary()
}

function updateSummary()
{
    //? Get elements where put information

    // Name
    let nameElement = document.querySelector(".summary-section .summary-name-text")
    // Email
    let emailElement = document.querySelector(".summary-section .summary-email-text")
    // Topics list
    let topicsList = document.querySelector(".summary-section .topics-list")

    //? Get information

    // Name
    let nameText = document.querySelector(".register-section .name").value;
    // Email
    let emailText = document.querySelector(".register-section .email").value;
    // Topics
    let topicsSelected = []
    checkboxSelected.sort();
    checkboxSelected.forEach(element => {
        topicsSelected.push(document.querySelector(".topics-section .section-content .checkbox:nth-child("+element+")").innerHTML)
    });

    //? Put information inside elements

    // Name
    nameElement.innerHTML = nameText != "" ? nameText : "<em class=\"summary-title\">empty name</em>"
    // Email
    emailElement.innerHTML = emailText != "" ? emailText : "<em class=\"summary-title\">empty email</em>"
    // Topics
    topicsList.innerHTML = topicsSelected.length > 0 ? "" : "<em class=\"summary-title\">No topics selected</em>"

    topicsSelected.forEach(element => {
        let topicElement = document.createElement("li");
            topicElement.classList.add("topic");
            topicElement.innerHTML = element;

        topicsList.appendChild(topicElement)
    });
}

function validateStep1()
{
    // Get input values
    let name = document.querySelector(".register-section .name");
        let nameText = (String) (name.value);
    let email = document.querySelector(".register-section .email");
        let emailText = (String) (email.value);

    let validName = false;
    let validEmail = false;

    // Validate name
    let regexName = "^[a-zA-Z\s]+$";
        if(nameText.match(regexName))
        {
            validName = true;
            name.classList.add("correct");
            name.classList.remove("wrong");
        }
        else
        {
            name.classList.remove("correct");
            name.classList.add("wrong");
        }

    // Validate email
    let regexEmail = "/^\w+@[\d\w\.-]+\w+\.\w{2,}$/";
        if(emailText.match(regexEmail))
        {
            validEmail = true;
            email.classList.add("correct");
            email.classList.remove("wrong");
        }
        else
        {
            email.classList.add("wrong");
            email.classList.remove("correct");
        }
    // alert("Name: " + (String)(validName))
    // alert("Email: " + (String)(validEmail))
    if(!validEmail || !validName)
    {
        return false;
    }

    return true;
}