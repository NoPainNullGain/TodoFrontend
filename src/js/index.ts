import axios, {
    AxiosResponse,
    AxiosError,
    Axios
} from "../../node_modules/axios/index";

class Todo {
    id: number;
    todoName: string;
    isComplete: boolean
}


// API Endpoints
var GetAllTodos_Endpoint = 'https://michaeltodoapi.azurewebsites.net/api/Todo/GetAllTodos';
var SetComplete_Endpoint = 'https://michaeltodoapi.azurewebsites.net/api/Todo/SetTodoComplete';
var CreateTodo_Endpoint = 'https://michaeltodoapi.azurewebsites.net/api/Todo/CreateTodo'

// Local Todo Storage List
let TodoList: Todo[] = [];


// Initialize & run when DOM is ready
$(document).ready(function(){

    // Initialize list of todos
    GetAllTodos();

    // Access all event listeners
    EventListeners();
    
});

// API Functions
function CreateTodo(input: string | number | string[]){
        
    if(input === ""){
        alert("You must write something!");
    } 
    else{

        var todo = new Todo
        todo.todoName = input.toString();

        axios.post<Todo>(CreateTodo_Endpoint, todo)
        .then(function(response){

            //GetAllTodos(); 
            AddTodoToList(todo);
            console.log('Todo Created Successfully');
            (<HTMLInputElement>document.getElementById('input')).value = '';

        }).catch(function(response){
            
            console.log('Todo Created Failed')
        });
    }
}

function SetTodoComplete(todoId:Number){
    
    var todo: Todo;
    
    TodoList.forEach( result => {
        if(result.id == todoId)
            todo = result;
    }); 

    axios.put(SetComplete_Endpoint, todo).then((result) => {
        
        console.log("axios Updated Todo with Id: " + todo.id + " to " + !todo.isComplete)
        SetCompleteInTodoToList(todo);
        //GetAllTodos();
    })

}

function GetAllTodos(){
    
    $('ul').empty();
    TodoList = []
    
    axios.get<Todo[]>(GetAllTodos_Endpoint).then((result)=>{
        console.log(result.data);

        result.data.forEach(element => {

            TodoList.push(element)
           
        });
        drawTodoList();
    })
}

// Helper Klasser
function drawTodoList(){
    
    $('ul').empty();
    
    TodoList.forEach(element => {

        $("ul").append('<li class="todoItem" id="'+ element.id +'">' + element.todoName + '<i class="fas fa-trash"></i> </li>')
        
        if(element.isComplete){
            $('#' + element.id).toggleClass('checked');
            
        };
    });

}

function FilterGlobalListIsComplete(){
    
    TodoList  = TodoList.sort((a, b) =>{
        return ( (a.isComplete ? 1:-1 ) - ( b.isComplete ? 1 : -1 ));
    }); 
    drawTodoList();
}

function FilterGlobalListId(){
    
    TodoList  = TodoList.sort((a, b) => ( (a.id - b.id) ));
    drawTodoList();
}

function AddTodoToList(todo: Todo){
    
    var lastIdInList: number;
    todo.id = lastIdInList = TodoList[TodoList.length - 1].id + 1;
    //console.log(lastIdInList)

    TodoList.push(todo)

    drawTodoList();
}

function SetCompleteInTodoToList(todo: Todo){
    
    var lastIdInList: number;
    todo.id = lastIdInList = TodoList[TodoList.length - 1].id + 1;
    
    var objIndex = TodoList.findIndex(((obj:Todo) => obj.id == todo.id));

    if(todo.isComplete){
        
        TodoList[objIndex].isComplete = false;
    }
    else{

        TodoList[objIndex].isComplete = true;
    }

    drawTodoList();
}

// Event Listeners
function EventListeners(){
   
    // Inputfield event listner
    $('#input').change(function(){
        var input = $(this).val();
        CreateTodo(input);
    });

    // Trashcan icon
    $('ul').on('click','.fa-trash', function(){
        $(this).parent('li').fadeOut(200);
    })
    
    $('ul').on('click','.todoItem', function(this){    
        var itemIdString = $(this).attr('id');
        var itemIdNum: number = +itemIdString;
        
        SetTodoComplete(itemIdNum);
    })

    // On click filter items
    $('#filterCompleted').on('click', function(){
        FilterGlobalListIsComplete();
    });

    // On click filter items
    $('#filterId').on('click', function(){
        FilterGlobalListId();
    });
}

// TODO
// 
// Minimer kald til databasen ved at updatere global Liste af objecter
// Lav en UpdateLocalStorage Liste function
// Udsplit program med Axios API connector + Controller + Helper klasse
// Adskil GetAllTodos og Append To global List, DrawFunction()