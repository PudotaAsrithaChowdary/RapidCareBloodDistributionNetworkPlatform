// Rapid Care Blood Distribution - DSA Version (Status 3)
// Uses: Array/List, Stack, Queue, Linear Search, Sorting

const bloodGroupInput = document.getElementById('bloodGroup');
const unitsInput = document.getElementById('units');
const hospitalInput = document.getElementById('hospital');
const addBtn = document.getElementById('addBtn');
const requestList = document.getElementById('requestList');
const emptyMsg = document.getElementById('emptyMsg');
const searchBtn = document.getElementById('searchBtn');
const sortBtn = document.getElementById('sortBtn');
const clearBtn = document.getElementById('clearBtn');
const undoBtn = document.getElementById('undoBtn');
const processNextBtn = document.getElementById('processNextBtn');
const searchResult = document.getElementById('searchResult');

let requests = [];
let undoStack = [];

function logDSA(tag, message, data) {
    var line = '[DSA] ' + tag + ': ' + message;
    if (data !== undefined) line += ' → ' + JSON.stringify(data);
    console.log(line);
}

function formatRequest(bloodGroup, units, hospital) {
    return bloodGroup + ' | ' + units + ' units | ' + hospital;
}

function showEmptyMessage() {
    if (requests.length === 0) {
        emptyMsg.style.display = 'block';
        requestList.innerHTML = '';
    } else {
        emptyMsg.style.display = 'none';
    }
}

function renderRequests() {
    requestList.innerHTML = '';
    requests.forEach(function (req, index) {
        var li = document.createElement('li');
        li.innerHTML = '<span>' + req + '</span>' +
            '<button type="button" data-index="' + index + '">Remove</button>';
        requestList.appendChild(li);
    });
    bindRemoveButtons();
    showEmptyMessage();
    logDSA('Array', 'Current blood distribution requests', requests);
}

function bindRemoveButtons() {
    var removeBtns = requestList.querySelectorAll('button[data-index]');
    removeBtns.forEach(function (btn) {
        btn.onclick = function () {
            var index = parseInt(btn.getAttribute('data-index'), 10);
            requests.splice(index, 1);
            renderRequests();
        };
    });
}

function addRequest() {
    var bloodGroup = bloodGroupInput.value.trim();
    var units = unitsInput.value.trim();
    var hospital = hospitalInput.value.trim();
    if (!bloodGroup || !units || !hospital) {
        alert('Please fill Blood Group, Units, and Hospital/Location.');
        return;
    }
    var record = formatRequest(bloodGroup, units, hospital);
    requests.push(record);
    undoStack.push(record);
    logDSA('Stack', 'Pushed request for undo', record);
    bloodGroupInput.value = '';
    unitsInput.value = '';
    hospitalInput.value = '';
    renderRequests();
}

function undoLast() {
    if (undoStack.length === 0) {
        alert('Nothing to undo.');
        logDSA('Stack', 'Undo stack is empty');
        return;
    }
    var lastAdded = undoStack.pop();
    var idx = requests.lastIndexOf(lastAdded);
    if (idx !== -1) requests.splice(idx, 1);
    logDSA('Stack', 'Undo: removed request', lastAdded);
    renderRequests();
}

function processNext() {
    if (requests.length === 0) {
        alert('No requests in queue.');
        logDSA('Queue', 'Distribution queue is empty');
        return;
    }
    var next = requests.shift();
    logDSA('Queue', 'Processed next request (FIFO)', next);
    renderRequests();
}

function searchRequest() {
    var query = prompt('Search by Blood Group, Hospital, or Units:');
    if (query === null) return;
    var q = query.trim().toLowerCase();
    searchResult.classList.remove('show', 'found', 'not-found');
    logDSA('Search', 'Linear search for: ' + q);
    for (var i = 0; i < requests.length; i++) {
        if (requests[i].toLowerCase().indexOf(q) !== -1) {
            logDSA('Search', 'Found at index ' + i, requests[i]);
            searchResult.textContent = 'Found: "' + requests[i] + '" at position ' + (i + 1);
            searchResult.classList.add('show', 'found');
            return;
        }
    }
    logDSA('Search', 'Not found', q);
    searchResult.textContent = 'No request found for: "' + query + '"';
    searchResult.classList.add('show', 'not-found');
}

function sortRequests() {
    if (requests.length === 0) {
        alert('No requests to sort.');
        return;
    }
    var arr = requests.slice();
    var n = arr.length;
    var i, j, temp;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j].localeCompare(arr[j + 1], undefined, { sensitivity: 'base' }) > 0) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    requests = arr;
    logDSA('Sort', 'Bubble sort applied to requests', requests);
    renderRequests();
}

function clearAll() {
    if (requests.length === 0) {
        alert('Request list is already empty.');
        return;
    }
    if (confirm('Remove all blood distribution requests?')) {
        requests = [];
        undoStack = [];
        renderRequests();
        searchResult.classList.remove('show');
        logDSA('Array', 'Cleared all requests');
    }
}

addBtn.addEventListener('click', addRequest);
hospitalInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addRequest();
});
undoBtn.addEventListener('click', undoLast);
processNextBtn.addEventListener('click', processNext);
searchBtn.addEventListener('click', searchRequest);
sortBtn.addEventListener('click', sortRequests);
clearBtn.addEventListener('click', clearAll);

console.log('[DSA] Rapid Care Blood Distribution - DSA Version loaded.');
console.log('[DSA] Concepts: Array/List, Stack (Undo), Queue (Process Next), Linear Search, Bubble Sort');
showEmptyMessage();
