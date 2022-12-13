const ver = document.querySelector('.vertical');
const hor = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

//이미지와 리소스가 준비가 다 된 상태에서 로드가 되도록
//이미지를 불러오기 전에 getBoundingClientRect()함수가 호출되지 않도록 구현
addEventListener('load', () => {
  const targetRect = target.getBoundingClientRect();

  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.height / 2;
  
  document.addEventListener('mousemove', (e) => {
    const targetX = e.clientX;
    const targetY = e.clientY;
    
    tag.innerHTML = targetX + ", " + targetY;

    //transform을 이용하면 composite만 발생해서 성능 개선됨
    hor.style.transform = `translateY(${targetY}px)`;
    ver.style.transform = `translateX(${targetX}px)`;

    target.style.transform = `translate(${targetX - targetHalfWidth}px, ${targetY - targetHalfHeight}px)`;
    tag.style.transform = `translate(${targetX + 20}px, ${targetY + 20}px)`;
  })
})