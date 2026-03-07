// RapidCare Blood Distribution Network - Main (Status 2)

const navLinks = document.querySelectorAll('.nav-link');
const panels = document.querySelectorAll('.panel');

navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        var tab = link.getAttribute('data-tab');
        if (!tab) return;
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
        panels.forEach(function (panel) {
            if (panel.id === 'panel-' + tab) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    });
});

var loginForm = document.getElementById('loginForm');
var loginMessage = document.getElementById('loginMessage');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = document.getElementById('loginEmail').value.trim();
        var pass = document.getElementById('loginPassword').value;
        if (!email || !pass) {
            loginMessage.textContent = 'Please fill email and password.';
            loginMessage.className = 'form-message show error';
            return;
        }
        loginMessage.textContent = 'Login submitted successfully! (Demo – no backend)';
        loginMessage.className = 'form-message show success';
        loginForm.reset();
    });
}

var registerForm = document.getElementById('registerForm');
var registerMessage = document.getElementById('registerMessage');
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('regName').value.trim();
        var email = document.getElementById('regEmail').value.trim();
        var city = document.getElementById('regCity').value.trim();
        if (!name || !email || !city) {
            registerMessage.textContent = 'Please fill required fields: Name, Email, City.';
            registerMessage.className = 'form-message show error';
            return;
        }
        registerMessage.textContent = 'Registration successful! We will contact you when needed.';
        registerMessage.className = 'form-message show success';
        registerForm.reset();
    });
}

const bloodGroupInput = document.getElementById('bloodGroup');
const unitsInput = document.getElementById('units');
const hospitalInput = document.getElementById('hospital');
const addBtn = document.getElementById('addBtn');
const requestList = document.getElementById('requestList');
const emptyMsg = document.getElementById('emptyMsg');
const searchBtn = document.getElementById('searchBtn');
const sortBtn = document.getElementById('sortBtn');
const clearBtn = document.getElementById('clearBtn');
const searchResult = document.getElementById('searchResult');

let requests = [];

function showEmptyMessage() {
    if (!emptyMsg) return;
    if (requests.length === 0) {
        emptyMsg.style.display = 'block';
        if (requestList) requestList.innerHTML = '';
    } else {
        emptyMsg.style.display = 'none';
    }
}

function formatRequest(bloodGroup, units, hospital) {
    return bloodGroup + ' | ' + units + ' units | ' + hospital;
}

function renderRequests() {
    if (!requestList) return;
    requestList.innerHTML = '';
    requests.forEach(function (req, index) {
        const li = document.createElement('li');
        li.innerHTML = '<span>' + req + '</span>' +
            '<button type="button" data-index="' + index + '">Remove</button>';
        requestList.appendChild(li);
    });
    bindRemoveButtons();
    showEmptyMessage();
}

function bindRemoveButtons() {
    if (!requestList) return;
    const removeBtns = requestList.querySelectorAll('button[data-index]');
    removeBtns.forEach(function (btn) {
        btn.onclick = function () {
            const index = parseInt(btn.getAttribute('data-index'), 10);
            requests.splice(index, 1);
            renderRequests();
        };
    });
}

function addRequest() {
    if (!bloodGroupInput || !unitsInput || !hospitalInput) return;
    const bloodGroup = bloodGroupInput.value.trim();
    const units = unitsInput.value.trim();
    const hospital = hospitalInput.value.trim();
    if (!bloodGroup || !units || !hospital) {
        alert('Please fill Blood Group, Units, and Hospital/Location.');
        return;
    }
    const record = formatRequest(bloodGroup, units, hospital);
    requests.push(record);
    bloodGroupInput.value = '';
    unitsInput.value = '';
    hospitalInput.value = '';
    renderRequests();
}

function searchRequest() {
    const query = prompt('Search by Blood Group, Units, or Hospital name:');
    if (query === null) return;
    const q = query.trim().toLowerCase();
    if (!searchResult) return;
    searchResult.classList.remove('show', 'found', 'not-found');
    for (let i = 0; i < requests.length; i++) {
        if (requests[i].toLowerCase().indexOf(q) !== -1) {
            searchResult.textContent = 'Found: "' + requests[i] + '" at position ' + (i + 1);
            searchResult.classList.add('show', 'found');
            return;
        }
    }
    searchResult.textContent = 'No request found for: "' + query + '"';
    searchResult.classList.add('show', 'not-found');
}

function sortRequests() {
    if (requests.length === 0) {
        alert('No requests to sort.');
        return;
    }
    requests.sort(function (a, b) {
        return a.localeCompare(b, undefined, { sensitivity: 'base' });
    });
    renderRequests();
}

function clearAll() {
    if (requests.length === 0) {
        alert('Request list is already empty.');
        return;
    }
    if (confirm('Remove all blood distribution requests?')) {
        requests = [];
        renderRequests();
        if (searchResult) searchResult.classList.remove('show');
    }
}

if (addBtn) addBtn.addEventListener('click', addRequest);
if (searchBtn) searchBtn.addEventListener('click', searchRequest);
if (sortBtn) sortBtn.addEventListener('click', sortRequests);
if (clearBtn) clearBtn.addEventListener('click', clearAll);
if (hospitalInput) {
    hospitalInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') addRequest();
    });
}

showEmptyMessage();
