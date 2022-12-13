const shoppingList = document.querySelector('.shopping_list');
const shoppingInput = document.querySelector('.shopping_input');
const addBtn = document.querySelector('.addBtn');

function onAdd() {
  //1. 사용자가 입력한 텍스트 받아옴
  const addValue = shoppingInput.value;
  if (addValue === '') {
    input.focus();
    return;
  }

  //2. 새로운 아이템을 만듬(텍스트 + 삭제버튼)
  const shoppingItem = document.createElement('li');
  const span = document.createElement('span');
  const delBtn = document.createElement('button');
  delBtn.setAttribute('type', 'button');
  delBtn.setAttribute('class', 'delItem');

  const textNode = document.createTextNode(addValue);
  shoppingItem.appendChild(span);
  shoppingItem.appendChild(delBtn);
  span.appendChild(textNode);
  delBtn.innerText = '❌';
  
  //3. items 컨테이너안에 새로 만든 아이템을 추가
  shoppingList.appendChild(shoppingItem);

  //4. 인풋을 초기화 한다.
  shoppingInput.value = '';
  shoppingInput.focus();

  delBtn.addEventListener('click', (e) => {
    const target = e.target;
    const delLi = target.parentNode;
    shoppingList.removeChild(delLi);
  })
}

addBtn.addEventListener('click', () => {
  onAdd();
})
shoppingInput.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    onAdd();
  }
})

