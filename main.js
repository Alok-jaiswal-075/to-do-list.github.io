
var index=0;
window.addEventListener('load',(e)=>{
    
    let localTasks=localStorage.getItem('tasks');
    if(localTasks!=null){
        let localTasksObj=JSON.parse(localTasks);
        localTasksObj.forEach(element => {
        showItem(element,index++);
    });
    }
})

document.getElementById("input-form").addEventListener("submit",(e)=>{
    e.preventDefault();

    let task=document.getElementById("new-entry").value;
    // console.log(task)
    if(task==""){
        return;
    }
    showItem(task,index);
    addToLocalStorage(task,index);
    index++;
    let text=document.getElementById("new-entry");
    text.value="";

})


function showItem(element,index){
    let tasksContainer=document.getElementById("task-list");
    let newTask=document.createElement('div');
    newTask.classList.add('task');

    let formcontainer=document.createElement('form');
    
    let inputTag=document.createElement('input');
    
    inputTag.value=element;
    inputTag.setAttribute('readonly','readonly');
    inputTag.autocomplete="off"
    inputTag.classList.add('task-input')
    formcontainer.appendChild(inputTag);
    
    // console.log(inputTag.placeholder)
    newTask.appendChild(formcontainer)

    let buttons=document.createElement('div');
    buttons.classList.add('buttons');
    let button1=document.createElement('button');
    let button2=document.createElement('button');
    button1.innerHTML="Edit";
    button2.innerHTML="Delete";

    buttons.appendChild(button1)
    buttons.appendChild(button2)
    button1.classList.add('button1')
    button2.classList.add('button2')

    newTask.appendChild(buttons);

    tasksContainer.appendChild(newTask);

    
    
    
    button1.addEventListener('click',()=>{
        if(button1.innerText.toLowerCase()=='edit'){
            inputTag.focus();
            inputTag.removeAttribute('readonly');
            button1.innerHTML="Save";
        }
        else{
            
            inputTag.setAttribute('readonly','readonly');
            button1.innerHTML='Edit';
            // console.log(inputTag.value)
            if(inputTag.value==""){
                deleteElement(index);
            }
            
            modifyElement(inputTag.value,index);
        }
    })

    button2.addEventListener('click',()=>{
        tasksContainer.removeChild(newTask);
        deleteElement(index);
    })
}


function addToLocalStorage(element,index){
    let items=localStorage.getItem('tasks');
    let itemObj;
    if(items==null){
        itemObj=[];
    }
    else{
        itemObj=JSON.parse(items);
    }
    itemObj.push(element);
    localStorage.setItem('tasks',JSON.stringify(itemObj));
}


function modifyElement(element,index){
    let items=localStorage.getItem('tasks');
    let itemObj=JSON.parse(items)
    itemObj[index]=element;
    localStorage.setItem('tasks',JSON.stringify(itemObj));
}

function deleteElement(index){
    let items=localStorage.getItem('tasks');
    let itemObj=JSON.parse(items)
    itemObj.splice(index,1);
    localStorage.setItem('tasks',JSON.stringify(itemObj));
}