// 当插件第一次被安装时触发的事件
chrome.runtime.onInstalled.addListener(() => {
  // 创建一个右键菜单选项
  chrome.contextMenus.create({
    id: "cambridgeSearch", // 菜单项的唯一ID
    title: "用剑桥词典查询 '%s'", // 菜单项显示的文字, %s 会被自动替换为选中的文本
    contexts: ["selection"] //只在有选中文本的时候显示
  });
});

// 当右键菜单的某一项被点击时触发
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // 确保是我们创建的那个菜单项被点击了
  if (info.menuItemId === "cambridgeSearch") {
    // info.selectionText 包含了用户选中的文本
    const selectedText = info.selectionText;
    
    // 构建剑桥词典的查询URL
    // encodeURIComponent 用于处理特殊字符，比如空格或者&
    const searchUrl = `https://dictionary.cambridge.org/dictionary/english-chinese-simplified/${encodeURIComponent(selectedText)}`;
    
    // 在新标签页中打开这个URL
    chrome.tabs.create({
      url: searchUrl
    });
  }
});