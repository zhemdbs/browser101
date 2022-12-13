const ver = document.querySelector('.vertical');
const hor = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

document.addEventListener('mousemove', (e) => {
  const targetX = e.clientX;
  const targetY = e.clientY;
  
  tag.innerHTML = targetX + ", " + targetY;

  hor.style.top = `${targetY}px`;
  ver.style.left = `${targetX}px`;

  target.style.top = `${targetY}px`;
  target.style.left = `${targetX}px`;

  tag.style.top = `${targetY}px`;
  tag.style.left = `${targetX}px`;
})