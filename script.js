const button = document.querySelector('.button-add');
const input = document.querySelector('.input-task');
const fullList = document.querySelector('.task-list');
const deleteBtn = document.querySelector('.delete-all');
const icon = document.getElementById('mode-icon');

let ItenList = []



function removeAll(){
    
    ItenList =[];

    ShowTask()

}



function AddTask(){
    
    if(input.value != ''){
    
    ItenList.push({
        task : input.value,
        checked: false
    })
} else{
    alert('Não é permitido inserir campos vazios')
}

    ShowTask();

    input.value = ''
}


function ShowTask (){

    
    let newLi = ''
    ItenList.forEach((item, position) =>{
        newLi = newLi +  `
            <li class="task ${item.checked && "done"}">
             <img src="imgs/checked.png" alt="check-na-tarefa" onclick = "checkTask(${position})">
             <p>${item.task}</p>
             <img src="imgs/trash.png" alt="tarefa-descartada" onclick = "deletItem(${position})">
            </li>

        `
    })

    fullList.innerHTML = newLi;
     
    localStorage.setItem('List', JSON.stringify(ItenList));
}

function checkTask(position){
    ItenList[position].checked = !ItenList[position].checked;

    ShowTask();
}


function deletItem(position) {
    ItenList.splice(position,1);
    
    ShowTask();
}

function reload(){
    const localTask = localStorage.getItem('List')

    if(localTask){

    ItenList = JSON.parse(localTask);
    }
    
    ShowTask();
}

document.addEventListener('keydown', (event) =>{
    var key = event.key;
    if(key == 'Enter'){
        AddTask();
    }
})

icon.addEventListener('click', ()=>{
    const container = document.querySelector('.container');
    const body = document.querySelector('.body');

    if(icon.classList.contains('fa-moon')){
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        container.classList.add('darkContainer');
        body.classList.add('darkBody');
        icon.classList.add('darkIcon');
        input.classList.add('darkInput');
        


        return;
    }

  
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        container.classList.remove('darkContainer');
        body.classList.remove('darkBody');
        icon.classList.remove('darkIcon');
        input.classList.remove('darkInput');


    
    
})






reload();
button.addEventListener('click', AddTask)
deleteBtn.addEventListener('click', removeAll)