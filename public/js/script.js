let addContentsBtn = document.getElementById("addContentsBtn");
let contentList = document.querySelector(".contentList");
let contentDiv = document.querySelectorAll('.contentDiv')[0];

addContentsBtn.addEventListener('click',function(){
    let newContents = contentDiv.cloneNode(true);
    let input = newContents.getElementByTagName('input')[0];
    input.value = '';
    contentList.appendChild(newContents);
});