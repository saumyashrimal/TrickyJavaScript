const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');


draggables.forEach(draggable => {
    draggable.addEventListener('dragstart',() => {
        draggable.classList.add("dragging")
    })
    draggable.addEventListener("dragend",() => {
        draggable.classList.remove("dragging");
    })
})

containers.forEach(container => {
    container.addEventListener('dragover',(e) => {
        e.preventDefault();
        const draggable = document.querySelector(".dragging");
        container.appendChild(draggable);
    })
})

function getDragAfterElement (container,y){
   const draggableElements= [...container.querySelectorAll('.draggable:not(.dragging)')];
}