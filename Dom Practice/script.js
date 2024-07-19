let add = document.querySelector("#add");
// let remove = document.querySelector("#remove");
let istatus = document.querySelector("h5");

let flag = 0;
add.addEventListener("click",()=>{
    if(flag==0){
    istatus.textContent = "Friends";
    istatus.style.color = "green";
    add.textContent = "Remove Friend";
    flag = 1;
    }
    else if(flag==1){
    istatus.textContent = "Stranger";
    istatus.style.color = "red";
    add.textContent = "ADD FRIENDS";
    flag = 0;
    }
});

// remove.addEventListener("click",()=>{
//     istatus.textContent = "Stranger";
//     istatus.style.color = "red";
// });