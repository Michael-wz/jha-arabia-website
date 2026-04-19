
// 滚动到包含证书卡片的区域
const certSection = document.querySelector(.document-grid);
if (certSection) {
  certSection.scrollIntoView({ behavior: smooth, block: start });
  console.log(已滚动到证书卡片区域);
} else {
  console.log(未找到证书卡片区域);
}

