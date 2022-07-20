function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const cate = event.target.category.value;

    const obj = {
            name,
            email,
            cate
        }
        // localStorage.setItem(obj.email, JSON.stringify(obj))
    showNewUserOnScreen(obj)
    axios.post("https://crudcrud.com/api/59a57fb2e18e4032945ce8b1bddc4581/appointmentdata", obj)
        .then((respose) => {
            showNewUserOnScreen(respone.data)
            console.log(respone)
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something Went Wrong </h4>"
            console.log(err)
        })
}

window.addEventListener("DOMContentLoaded", () => {
    const data = axios.get("https://crudcrud.com/api/59a57fb2e18e4032945ce8b1bddc4581/appointmentdata")
        .then((response) => {
            console.log(response)
            for (var i = 0; i < response.data.length; i++) {
                showNewUserOnScreen(response.data[i])
            }
        })
        .catch((error) => {
            console.log(error)
        })
    console.log(data)
})

function showNewUserOnScreen(user) {
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('category').value = '';

    if (localStorage.getItem(user.email) !== null) {
        removeUserFromScreen(user.email)
    }

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user.email}> ${user.name} - ${user.email}
                    <button onclick=deleteUser('${user.email}')> Delete Expense </button>
                    <button onclick=editUserDetails('${user.email}','${user.name}','${user.cate}')>Edit Expense </button>
                 </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User

function editUserDetails(emailId, name, cate) {

    document.getElementById('email').value = emailId;
    document.getElementById('username').value = name;
    document.getElementById('category').value = cate;


    deleteUser(emailId)
}

// deleteUser('abc@gmail.com')

function deleteUser(emailId) {
    console.log(emailId)
    localStorage.removeItem(emailId);
    removeUserFromScreen(emailId);

}

function removeUserFromScreen(emailId) {
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(emailId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}