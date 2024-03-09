const tbody = document.querySelector("tbody");
const addBtn = document.querySelector(".addBtn");

let data = [
    { srno: 1, username: "Hello1", email: "hello@xavier.ac.in", status: null },
    { srno: 2, username: "Hello2", email: "hello2@xavier.ac.in", status: null },
    { srno: 3, username: "Hello3", email: "hello3@xavier.ac.in", status: null },
];
for (let i of data) {
    // console.log(i.srno,i.username,i.email);
    addRecords(i.srno,i.username,i.email,"requestedTable");
}

function addToHTML(srno, username, email) {
    const tbody = document.querySelector('tbody'); // Assuming tbody exists in your HTML structure

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
