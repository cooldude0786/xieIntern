
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, set, child, get, remove, update, push } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAV7eZVlKbVzJgF0Leq1CzQZriJVwW9GO4",
    authDomain: "xieresource.firebaseapp.com",
    databaseURL: "https://xieresource-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "xieresource",
    storageBucket: "xieresource.appspot.com",
    messagingSenderId: "624733959118",
    appId: "1:624733959118:web:e1d19e5d58c0184c32b19f",
    measurementId: "G-YT3MV5GCBY"
};
const app = initializeApp(firebaseConfig);
const db = ref(getDatabase(app));
document.addEventListener('DOMContentLoaded', async function () {
    // let re = await makeGrantedStudentEntry('khizarshaikh2922@gmail.com','khizar shaikh','asdasdasd',true)
    // console.log(re);
});
async function makeGrantedStudentEntry(email, name, hascode) {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    const sanitizedEmail = replaceInvalidCharsAndBeyond(email);
    const userRef = ref(db, `users/granted/${sanitizedEmail}`);

    try {
        // Check if the user already exists
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            return { success: false, message: "User already exists" };
        } else {
            // If the user does not exist, proceed with setting the record
            await set(userRef, {
                name: name,
                email: email,
                hascode: hascode,
                status: true
            });
            return { success: true, message: "Record set successfully" };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
}

function getAllUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            get(child(db, 'users/granted'))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        resolve({ data: snapshot.val() });
                    } else {
                        resolve({ err: "no data found" });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    reject(error); // Reject the promise if there's an error
                });
        }, 2000)
    });
}
function getAllTeachersDetails() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            get(child(db, 'testuser/'))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        resolve({ data: snapshot.val() });
                    } else {
                        resolve({ err: "no data found" });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    reject(error); // Reject the promise if there's an error
                });
        }, 0)
    });
}
document.getElementById('RegisterUserBtn').addEventListener("click", async () => {
    document.getElementById('loadercontain').classList.remove('d-none')
    try {
        let result = await getAllUser();
        result = result.data
        const tableBody = document.getElementById('registerUserTable')
        tableBody.innerHTML = ''; // Clear tbody before populating
        let n = 1
        for (let i in result) {
            let j = result[i]
            insertDataRegisterUser(j.name, j.email, i, j.status, 'registerUserTable', n)
            n++
        }
        // for(i of result.data){
        //     addRecords()
        // }
    } catch (error) {
        console.error(error);
    }
    document.getElementById('loadercontain').classList.add('d-none')
});


// const tbody = document.getElementById("requestedTable");
const addBtn = document.getElementById("addRequestedUser");


let data = [
    { srno: 1, username: "Hello1", email: "hello@xavier.ac.in", status: null },
    { srno: 2, username: "Hello2", email: "hello2@xavier.ac.in", status: null },
    { srno: 3, username: "Hello3", email: "hello3@xavier.ac.in", status: null },
];
for (let i of data) {
    // console.log(i.srno,i.username,i.email);
    addRecords(i.srno, i.username, i.email, "requestedTable");
}

function addRecords(srno, username, email, table_id) {
    const tbody = document.getElementById(table_id);


    const row = document.createElement("tr");
    row.setAttribute("id", srno);

    const th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.textContent = srno;
    row.appendChild(th);

    const tdUsername = document.createElement("td");
    tdUsername.textContent = username;
    row.appendChild(tdUsername);

    const tdEmail = document.createElement("td");
    tdEmail.textContent = email;
    row.appendChild(tdEmail);

    const tdButtons = document.createElement("td");
    const btnGroup = document.createElement("div");
    btnGroup.setAttribute("class", "btn-group");
    btnGroup.setAttribute("role", "group");
    btnGroup.setAttribute("aria-label", "Basic example");
    const acceptBtn = document.createElement("button");
    acceptBtn.setAttribute("type", "button");
    acceptBtn.setAttribute("class", "btn btn-success btn-sm acceptBtn");
    acceptBtn.textContent = "Accept";
    const rejectBtn = document.createElement("button");
    rejectBtn.setAttribute("type", "button");
    rejectBtn.setAttribute("class", "btn btn-danger btn-sm rejectBtn");
    rejectBtn.textContent = "Reject";
    btnGroup.appendChild(acceptBtn);
    btnGroup.appendChild(rejectBtn);
    tdButtons.appendChild(btnGroup);
    row.appendChild(tdButtons);

    const tdNull = document.createElement("td");
    const pNull = document.createElement("p");
    pNull.textContent = "null";
    tdNull.appendChild(pNull);
    row.appendChild(tdNull);

    tbody.appendChild(row);
}

function insertDataRegisterUser(name, email, id, status, table_id, count) {
    const table = document.getElementById(table_id);
    if (!table) {
        console.error("Table with provided ID not found");
        return null;
    }

    const tableRow = document.createElement("tr");
    tableRow.id = id;
    tableRow.className = "placeholder-glow";

    const indexCell = document.createElement("th");
    indexCell.scope = "row";
    indexCell.textContent = count;

    const nameCell = document.createElement("td");
    nameCell.textContent = name;

    const emailCell = document.createElement("td");
    emailCell.textContent = email;

    const buttonCell = document.createElement("td");
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "btn-group";
    buttonDiv.setAttribute("role", "group");
    buttonDiv.setAttribute("aria-label", "Basic example");
    const actionButton = document.createElement("button");
    actionButton.type = "button";
    actionButton.className = "btn btn-danger btn-sm acceptBtn";
    actionButton.textContent = "pause";
    buttonDiv.appendChild(actionButton);
    buttonCell.appendChild(buttonDiv);

    const statusCell = document.createElement("td");
    const statusParagraph = document.createElement("p");
    statusParagraph.textContent = status;
    statusCell.appendChild(statusParagraph);

    tableRow.appendChild(indexCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(emailCell);
    tableRow.appendChild(buttonCell);
    tableRow.appendChild(statusCell);

    table.appendChild(tableRow);
    return tableRow;
}


addBtn.addEventListener("click", () => {
    console.log("AddBtn was clicked");
    let srno = data.length + 1;
    let username = prompt("Enter Username: ");
    let email = prompt("Enter Email: ");
    let status = null;
    const row = document.createElement("tr");
    row.setAttribute("id", srno);
    const rowContent = `
            <th scope="row">${srno}</th>
            <td>${username}</td>
            <td>${email}</td>
            <td> 
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-success btn-sm acceptBtn">Accept</button>
                    <button type="button" class="btn btn-danger btn-sm rejectBtn">Reject</button>
                </div>
            </td>
            <td>
                <p>null</p>
            </td>`;
    row.innerHTML = rowContent;
    tbody.append(row);
    addData(srno, username, email, status);
});

//adds the newly added data of respective row in the data(array)
const addData = (srno, username, email, status) => {
    let rowData = { srno: srno, username: username, email: email, status: status };
    data.push(rowData);
    console.log(data);
}

const acceptBtn = document.querySelectorAll(".acceptBtn");
const rejectBtn = document.querySelectorAll(".rejectBtn");

function replaceInvalidCharsAndBeyond(str) {
    // Define a mapping of invalid characters to numbers
    const charMap = {
        ".": "1",
        "#": "2",
        "$": "3",
        "[": "4",
        "]": "5"
    };

    // Replace each invalid character with its corresponding number
    return str.replace(/[.#$\[\]]/g, char => charMap[char]);
}

// Event delegation for accepting or rejecting
tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("acceptBtn")) {
        let acceptRow = e.target.parentElement.parentElement.parentElement;
        let acceptRowId = acceptRow.getAttribute("id");
        let currStatus = e.target.parentElement.parentElement.nextElementSibling.children[0]
        currStatus.innerText = "Accepted";
        updateStatus(acceptRowId, currStatus.innerText);
    } else if (e.target.classList.contains("rejectBtn")) {
        let rejectRow = e.target.parentElement.parentElement.parentElement;
        let rejectRowId = rejectRow.getAttribute("id");
        rejectRow.remove();
        console.log(rejectRowId);
        deleteFromData(rejectRowId);
    }
});


const updateStatus = (id, currStatus) => {
    data.forEach((row) => {
        if (row.srno == id) {
            console.log(`Changed status of ${id} from ${row.status} ==> ${currStatus}`);
            row.status = currStatus;
        }
    });

}
const deleteFromData = (id) => {
    const index = data.findIndex(row => row.srno === parseInt(id));
    if (index !== -1) {
        data.splice(index, 1);
    }
    // console.log(data);
}
