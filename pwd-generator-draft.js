const credentials = {
    "API_KEY": "kHcXg10w4UqVqbPNlNLVOg==HU1veIoxUfBxKFwB",
    "API_URL": "https://api.api-ninjas.com/v1/passwordgenerator"
};

const apiKey = credentials.API_KEY;
const apiUrl = credentials.API_URL;

const lengthElement = document.getElementById("length");
const generateElement = document.getElementById("generate");
const passwordElement = document.getElementById("password");

let length = 16;

lengthElement.addEventListener('change', () => {

    if (!lengthElement || isNaN(Number(lengthElement.value) || lengthElement.value > 16 || lengthElement.value <= 0)) {
        length = 16;
    } else {
        length = Number(lengthElement.value);
    }

})

generateElement.addEventListener("click", () => {

    if (length > 16 || length <= 0) {
        passwordElement.innerHTML = 'Length must be between 1 and 16';
        generateElement.addProp('display', false);
    }

    const url = `${apiUrl}?length=${length}`;

    fetch(url, {
        headers: {
            "X-API-KEY": apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
            passwordElement.innerHTML = `${data.random_password}`;
        })
        .catch(error => {
            console.log('Request failed', error);
            passwordElement.innerHTML = 'An error occurred. Please try again later';
        })
})
