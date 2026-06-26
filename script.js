let selected = null;
let offsetX = 0;
let offsetY = 0;

document.querySelectorAll(".block").forEach(block => {
  block.addEventListener("mousedown", (e) => {
    selected = block;

    offsetX = e.clientX - block.offsetLeft;
    offsetY = e.clientY - block.offsetTop;

    block.style.cursor = "grabbing";
  });
});

document.addEventListener("mousemove", (e) => {
  if (!selected) return;

  selected.style.left = (e.clientX - offsetX) + "px";
  selected.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
  if (selected) {
    selected.style.cursor = "grab";
    selected = null;
  }
});
