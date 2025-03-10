const credentials = {
    API_KEY: "",
    API_URL: "https://api.api-ninjas.com/v1/passwordgenerator"
};

const { API_KEY: apiKey, API_URL: apiUrl } = credentials;

// DOM element references
const lengthElement = document.getElementById("length");
const generateElement = document.getElementById("generate");
const passwordElement = document.getElementById("password");

// Default password length
const DEFAULT_LENGTH = 16;

// Update password length
const updateLength = () => {
    const value = Number(lengthElement?.value);
    return isNaN(value) || value <= 0 || value > DEFAULT_LENGTH ? DEFAULT_LENGTH : value;
};

// Fetch password
const fetchPassword = async (length) => {
    const url = `${apiUrl}?length=${length}`;
    try {
        const response = await fetch(url, {
            headers: { "X-API-KEY": apiKey }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.random_password;
    } catch (error) {
        console.error('Request failed:', error);
        throw new Error('An error occurred while fetching the password');
    }
};

// Display password
const displayPassword = (text) => {
    passwordElement.innerText = text;
};

// Handle generate button click
const handleGenerateClick = async () => {
    const length = updateLength();

    if (length <= 0 || length > DEFAULT_LENGTH) {
        displayPassword('Length must be between 1 and 16');
        return;
    }

    try {
        const password = await fetchPassword(length);
        displayPassword(password);
    } catch {
        displayPassword('An error occurred. Please try again later');
    }
};

// Event listeners
lengthElement?.addEventListener("change", updateLength);
generateElement?.addEventListener("click", handleGenerateClick);
