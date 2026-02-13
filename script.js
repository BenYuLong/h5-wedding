// CloudBase 初始化
const app = tcb.init({
    env: 'h5-wedding-7g6a8i0v082fc28c' // 替换为你的 CloudBase 环境 ID
});

// 获取存储引用
const storage = app.storage();

// 页面加载完成后执行
 document.addEventListener('DOMContentLoaded', function() {
    // 初始化tab切换
    initTabSwitch();
    
    // 初始化留言提交
    initMessageSubmit();
    
    // 初始化相册
    initAlbum();
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

// 初始化相册
function initAlbum() {
    const photoGrid = document.querySelector('.photo-grid');
    if (!photoGrid) return;
    
    // 清空现有照片
    photoGrid.innerHTML = '';
    
    // 显示加载中
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.textContent = '加载照片中...';
    photoGrid.appendChild(loading);
    
    // 列出存储中的照片文件
    storage.getFileList({"prefix": "photo/"})
        .then(res => {
            if (res.fileList && res.fileList.length > 0) {
                // 清空加载提示
                photoGrid.innerHTML = '';
                
                // 遍历照片文件
                res.fileList.forEach(file => {
                    // 获取文件访问URL
                    storage.getTempFileURL({"fileList": [file.fileID]})
                        .then(urlRes => {
                            if (urlRes.fileList && urlRes.fileList.length > 0) {
                                const fileUrl = urlRes.fileList[0].tempFileURL;
                                
                                // 创建照片元素
                                const photoItem = document.createElement('div');
                                photoItem.className = 'photo-item';
                                photoItem.innerHTML = `
                                    <img src="${fileUrl}" alt="${file.name}">
                                `;
                                
                                // 添加到相册
                                photoGrid.appendChild(photoItem);
                            }
                        })
                        .catch(err => {
                            console.error('获取文件URL失败:', err);
                        });
                });
            } else {
                // 没有照片
                photoGrid.innerHTML = '<div class="no-photo">暂无照片</div>';
            }
        })
        .catch(err => {
            console.error('获取文件列表失败:', err);
            photoGrid.innerHTML = '<div class="error">加载照片失败</div>';
        });
}
