//name section - utilized focus to ensure cursor on name element 
const name=document.getElementById("name");
name.focus();


//job section - Event Listener change event to only reveal fill in box if jobTitle is "other" and remove "other" 
//fill-in box when preselected title is chosen. 
const jobTitle=document.getElementById("title");
const otherTitle=document.getElementById("other-job-role")

otherTitle.style.display="none";

jobTitle.addEventListener("change", (e) => {
    if(e.target.value === "other") {
        otherTitle.style.display = "initial";
    }else{
        otherTitle.style.display = "none"; 
        }
    }); 
    
//t-shirt section - colors displayed for specific design only when one is selected. Part of this was tricky for me 
// which motivated me to ask for help on lines 31-32. Event listenter targets value of design to differentiate
//color options available. 

    const color=document.getElementById("color");
    const pattern=document.getElementById("design");
    const options=color.children;
    
    color.disabled = true;
    
    pattern.addEventListener("change", (e) => {
    color.disabled = false; 
    for (let i=0;i<options.length;i++) {
        let value=e.target.value;
        let dataTheme = options[i].getAttribute("data-theme");
        if(value === dataTheme) {
            options[i].hidden = false;
            options[i].setAttribute("selected",true);
        }else{
            options[i].hidden = true;
            options[i].removeAttribute("selected");
        }
    } 
    });

//activities section - make sure all checked box activities provide accurate sum. Called event listener
//change event to target data cost to add or subtract activity and a template literal to sum cost. 
//Asked for help with plural and sigular variable confusion within my event listener (lines 50 and 60).

const activities=document.getElementById("activities");
const activityCost=document.getElementById("activity-cost");
const activitiesCost=document.getElementById("activities-cost");

let totalCost = 0;
activities.addEventListener("change", (e) => {
    let activityCost = +e.target.getAttribute("data-cost");
    if (e.target.checked){
        totalCost += activityCost;  
    }else{
        totalCost -= activityCost;
    }
    activitiesCost.innerHTML= `Total: $${totalCost}`;
});

//payment information section - ui initially displays cc info. Bitcoin and Paypal info only displayed if chosen and cc info hidden. 

const payment=document.getElementById("payment");
const creditCard=document.getElementById("credit-card");
const paypal=document.getElementById("paypal");
const bitcoin=document.getElementById("bitcoin");

paypal.hidden = true;
bitcoin.hidden = true;
payment.children[1].setAttribute("selected", true);

payment.addEventListener("change", (e) =>
{
    if (e.target.value === "paypal") {
        paypal.hidden = false;
        bitcoin.hidden = true;
        creditCard.hidden = true;
    } else if (e.target.value === "bitcoin") {
        paypal.hidden = true;
        bitcoin.hidden = false;
        creditCard.hidden = true;
    } else {
        paypal.hidden = true;
        bitcoin.hidden = true;
        creditCard.hidden = false;
    }
});

//form validation section - regex set to verify parameters are met else trigger error for user to make applicable corrections prior
//to form resubmission. I asked for so much help on revisions in this segment. 

const form=document.querySelector("form");
const checkbox=document.querySelectorAll('input[type="checkbox"]');
const activitiesBox=document.getElementById("activities-box");
let email=document.getElementById("email");
const emailHint=document.getElementById("email-hint");
const zip=document.getElementById("zip");
const ccNum=document.getElementById("cc-num");
const cvv=document.getElementById("cvv");


function isNameValid() {
    let nameValue = name.value;
    return regexName = /\w+/.test(name);
};
function isEmailValid() {
    let emailValue = email.value;
    return regexEmail = /[^@]+@[^@.]+\.com$/i.test(email);
};
function isActivityChecked() {
    if (totalCost === 0) {
        return false;
    } else {
        return true;
    }
};
function isCCNumValid() {
    return regexCCNum = /^\d{13,16}$/.test(ccNum);
};
function isZipValid() {
    return regexZip = /^\d{5}$/.test(zip);
};
function isCVVValid() {
    return regexCVV = /^\d{3}$/.test(cvv);
};
function notValid(field) {
    field.parentNode.classList.add("not-valid");
    field.parentNode.classList.remove("valid");
    field.parentNode.lastElementChild.style.display = "inherit";
}
function isValid(field) {
    field.parentNode.classList.add("valid");
    field.parentNode.classList.remove("not-valid");
    field.parentNode.lastElementChild.style.display = "none";
}
form.addEventListener("keyup", (e) => {
    if (!isNameValid()) {
        e.preventDefault();
        notValid(name);
    } else {
        isValid(name);
    }
});
form.addEventListener("submit", (e) => {
    if (!isNameValid()) {
        e.preventDefault();
        notValid(name);
    } else {
        isValid(name);
    }
    if (!isEmailValid()) {
        e.preventDefault();
        notValid(email);
    if (email === "") {
        emailHint.textContent = "Email needed. Please enter you email address";
    } else if (/^\w+@\w+.\w+$/.test(email) === false) {
        emailHint.textContent = "Email address must be formatted correctly";
    }
        } else {
        isValid(email);
    }
    if (!isActivityChecked()) {
        e.preventDefault();
        notValid(activitiesBox);
    } else {
        isValid(activitiesBox);
    }
    if (payment.children[1].selected === true) {
        if (!isCCNumValid()) {
            e.preventDefault();
            notValid(ccNum);
        } else {
            isValid(ccNum);
        };
        if (!isZipValid()) {
            e.preventDefault();
            notValid(zip);
        } else {
            isValid(zip);
        };
        if (!isCVVValid()) {
            e.preventDefault();
            notValid(cvv);
        } else {
            isValid(cvv);
        };
    };
});
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("focus", (e) => {
        checkbox[i].parentNode.classList.add("focus");
    });
    checkbox[i].addEventListener("blur", (e) => {
        checkbox[i].parentNode.classList.remove("focus");
    });
};
