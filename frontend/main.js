let addTodo = async () => {
    let title = document.querySelector("#title").value;
    let description = document.querySelector("#desc").value;

    let response = await axios.post("http://localhost:1337/api/todos", {
        //body
        data:{
            title,
            description,
        }
    },
    {
        //config
        headers: {
            Authorization:`Bearer ${sessionStorage.getItem("token")}`
        }
    });
    getTodos()
}

let getTodos = async () => {
    let {data} = await axios.get("http://localhost:1337/api/todos", {
        //config
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    });
    render(data);
}

let deleteTodo = async (id) => {
    await axios.delete(`http://localhost:1337/api/todos/${id}`, {
        //config
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    });
    getTodos()
}

let updateTodo = async (id) => {
    let title=document.querySelector(`[data-title-id="${id}"]`).value;
    let description= document.querySelector(`[data-desc-id="${id}"]`).value;

    await axios.put(`http://localhost:1337/api/todos/${id}`,{
        data:{
            title,
            description
        }
    },
    {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    }
    )
    getTodos()
}; 

let render = (todos) => {
    document.querySelector("#completedList").innerHTML = "";
    document.querySelector("#todolist").innerHTML = "";
   todos.data.forEach(todo => {
        let todoLi = document.createElement("li");
        todoLi.style.border = "1px solid black";
        todoLi.innerHTML = `
        <strong>Title:</strong> ${todo.attributes.title}
        <br>
        <strong>Description</strong>:${todo.attributes.description}
        <button onclick="deleteTodo(${todo.id})">Delete</button>
        <button class="editBtn" data-id="${todo.id}">Edit</button>
        <button onclick="completeTodo(${todo.id})">Complete</button>`
        if(!todo.attributes.completed){
            document.querySelector("#todolist").append(todoLi);
        } else {
            document.querySelector("#completedList").append(todoLi);
        }


        document.querySelector(`[data-id="${todo.id}"`).addEventListener("click", (e) => {
            e.target.parentNode.innerHTML = `
            <strong>Title:</strong> <input type="text" data-title-id=${todo.id} value="${todo.attributes.title}">
            <br>
            <strong>Description</strong>:<input type="text" data-desc-id=${todo.id} value="${todo.attributes.description}">
            <button class="editBtn" onclick="updateTodo(${todo.id})">Update Todo</button>` 
        })
        

    })
}

document.querySelector("#addTodo").addEventListener("click",addTodo)

let login = async () => {
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let response = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: username,
        password,
    });

    let token = response.data.jwt;
    sessionStorage.setItem("token", token);
    getTodos();
}

let toggleEdit = (e) => {
    console.log(e.target);
}

let completeTodo = async (id) => {
    await axios.put(`http://localhost:1337/api/todos/${id}`,{
        data:{
            completed:true
        }
    },
    {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    }
    )
    getTodos();
}

document.querySelector("#login").addEventListener("click", login);

getTodos();