// === DRAG SYSTEM BLOCK ===

let selectedBlock = null;
let offsetX = 0;
let offsetY = 0;

// ambil semua block
document.querySelectorAll(".block").forEach(block => {
  block.addEventListener("mousedown", (e) => {
    selectedBlock = block;

    offsetX = e.clientX - block.offsetLeft;
    offsetY = e.clientY - block.offsetTop;

    block.style.cursor = "grabbing";
  });
});

// gerakkan block
document.addEventListener("mousemove", (e) => {
  if (!selectedBlock) return;

  selectedBlock.style.left = (e.clientX - offsetX) + "px";
  selectedBlock.style.top = (e.clientY - offsetY) + "px";
});

// lepas block
document.addEventListener("mouseup", () => {
  if (selectedBlock) {
    selectedBlock.style.cursor = "grab";
    selectedBlock = null;
  }
});
