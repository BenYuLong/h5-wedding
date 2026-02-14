// 又拍云配置
const upyunConfig = {
    domain: 'wedding-photos.test.upcdn.net', // 又拍云加速域名
    bucket: 'wedding-photos', // 又拍云服务名称
    accessKey: '86211373fbc04094bfd9ff495c135908', // 替换为你的又拍云 AccessKey
    secretAccessKey: '5616ac3a344f01412907dcf0a7795429', // 替换为你的又拍云 SecretAccessKey
    prefix: '/' // 照片存储路径前缀
};

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
async function initAlbum() {
    const photoGrid = document.querySelector('.photo-grid');
    if (!photoGrid) return;
    
    // 清空现有照片
    photoGrid.innerHTML = '';
    
    // 显示加载中
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.textContent = '加载照片中...';
    photoGrid.appendChild(loading);
    
    try {
        // 自动从又拍云获取照片列表
        const photos = await getPhotosFromUpyun();
        
        // 清空加载提示
        photoGrid.innerHTML = '';
        
        if (photos.length > 0) {
            // 遍历照片
            photos.forEach((photoPath, index) => {
                // 生成又拍云照片URL
                const photoUrl = `https://${upyunConfig.domain}/${photoPath}`;
                
                // 创建照片元素
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';
                photoItem.innerHTML = `
                    <img src="${photoUrl}" alt="照片${index + 1}">
                `;
                
                // 添加到相册
                photoGrid.appendChild(photoItem);
            });
        } else {
            // 没有照片
            photoGrid.innerHTML = '<div class="no-photo">暂无照片</div>';
        }
    } catch (err) {
        console.error('加载照片失败:', err);
        photoGrid.innerHTML = '<div class="error">加载照片失败</div>';
    }
}

// 从又拍云获取照片列表
async function getPhotosFromUpyun() {
    try {
        // 静态配置的照片列表
        // 当你上传新照片到又拍云时，只需更新这个列表
        return [
            '7T1A1373-5%20L.jpg',
            '7T1A1399-5%20L.jpg',
            '7T1A1426-8%20L.jpg',
            '7T1A1453-5%20L.jpg',
            '7T1A1475-5%20L.jpg',
            '7T1A1483-5%20L.jpg',
            '7T1A1577-5%20L.jpg',
            '7T1A1585-5%20L.jpg',
            '7T1A1593-5%20L.jpg',
            '7T1A1596-5%20L.jpg',
            '7T1A1614-6%20L.jpg',
            '7T1A1619-6%20L.jpg',
            '7T1A1662-5%20L.jpg',
            '7T1A1718-5%20L.jpg',
            '7T1A1738-6%20L.jpg',
            '7T1A1777-8%20L.jpg',
            '7T1A1826-6%20L.jpg',
            '7T1A1840-8%20L.jpg',
            '7T1A1999-7%20L.jpg',
            '7T1A2004-8%20L.jpg',
            '7T1A2025-8%20L.jpg',
            '7T1A2033-5%20L.jpg',
            '7T1A2036-10%20L.jpg',
            '7T1A2049-6%20L.jpg',
            '7T1A2109-6%20L.jpg',
            '7T1A2168-8%20L.jpg'
        ];
    } catch (err) {
        console.error('获取照片列表失败:', err);
        return [];
    }
}


