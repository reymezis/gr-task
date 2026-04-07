const baseUrl = 'https://api.green-api.com';

const responseOutput = document.getElementById('responseOutput');
const idInstanceInput = document.getElementById('idInstance');
const apiTokenInput = document.getElementById('apiTokenInstance');


function showResponse(data) {
    responseOutput.value = JSON.stringify(data, null, 4);
}

function getAuth() {
    return {
        id: idInstanceInput.value.trim(),
        token: apiTokenInput.value.trim()
    };
}

async function getSettings() {
    const { id, token } = getAuth();
    if (!id || !token) return alert('Введите idInstance и ApiTokenInstance');
    
    try {
        const response = await fetch(`${baseUrl}/waInstance${id}/getSettings/${token}`);
        const data = await response.json();
        showResponse(data);
    } catch (error) {
        showResponse({ error: error.message });
    }
}

async function getStateInstance() {
    const { id, token } = getAuth();
    try {
        const response = await fetch(`${baseUrl}/waInstance${id}/getStateInstance/${token}`);
        const data = await response.json();
        showResponse(data);
    } catch (error) {
        showResponse({ error: error.message });
    }
}

async function sendMessage() {
    const { id, token } = getAuth();
    const phone = document.getElementById('phoneMessage').value.trim();
    const message = document.getElementById('textMessage').value;

    try {
        const response = await fetch(`${baseUrl}/waInstance${id}/sendMessage/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatId: `${phone}@c.us`,
                message: message
            })
        });
        const data = await response.json();
        showResponse(data);
    } catch (error) {
        showResponse({ error: error.message });
    }
}

async function sendFileByUrl() {
    const { id, token } = getAuth();
    const phone = document.getElementById('phoneFile').value.trim();
    const urlFile = document.getElementById('fileUrl').value.trim();
    const fileName = urlFile.split('/').pop() || 'file';

    try {
        const response = await fetch(`${baseUrl}/waInstance${id}/sendFileByUrl/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatId: `${phone}@c.us`,
                urlFile: urlFile,
                fileName: fileName
            })
        });
        const data = await response.json();
        showResponse(data);
    } catch (error) {
        showResponse({ error: error.message });
    }
}

document.getElementById('btnGetSettings').addEventListener('click', getSettings);
document.getElementById('btnGetStateInstance').addEventListener('click', getStateInstance);
document.getElementById('btnSendMessage').addEventListener('click', sendMessage);
document.getElementById('btnSendFileByUrl').addEventListener('click', sendFileByUrl);