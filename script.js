// 页面加载完成后执行
 document.addEventListener('DOMContentLoaded', function() {
    // 初始化tab切换
    initTabSwitch();
    
    // 初始化留言提交
    initMessageSubmit();
 });

 // 初始化tab切换
 function initTabSwitch() {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 移除所有tab的active类
            tabItems.forEach(item => item.classList.remove('active'));
            
            // 添加当前tab的active类
            this.classList.add('active');
            
            // 隐藏所有内容
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 显示当前内容
            document.getElementById(tabId).classList.add('active');
        });
    });
 }

 // 初始化留言提交
 function initMessageSubmit() {
    const submitBtn = document.querySelector('.submit-btn');
    const textarea = document.querySelector('textarea');
    const messageList = document.querySelector('.message-list');
    
    submitBtn.addEventListener('click', function() {
        const messageText = textarea.value.trim();
        
        if (messageText) {
            // 创建新留言元素
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item';
            
            // 生成随机头像字母
            const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            
            // 获取当前日期
            const today = new Date();
            const dateString = today.getFullYear() + '-' + 
                              String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                              String(today.getDate()).padStart(2, '0');
            
            // 构建留言HTML
            messageItem.innerHTML = `
                <div class="message-avatar">${randomLetter}</div>
                <div class="message-body">
                    <div class="message-header">
                        <h4>宾客</h4>
                        <p class="message-time">${dateString}</p>
                    </div>
                    <p class="message-text">${messageText}</p>
                </div>
            `;
            
            // 添加到留言列表
            messageList.appendChild(messageItem);
            
            // 清空文本框
            textarea.value = '';
            
            // 显示提交成功提示
            alert('祝福提交成功！');
        } else {
            alert('请输入您的祝福内容');
        }
    });
 }
