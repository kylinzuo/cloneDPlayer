const defaultApiBackend = require('./api.js');

module.exports = (option) => {
    const isMobile = /mobile/i.test(window.navigator.userAgent);
    // compatibility: some mobile browsers don't suppose autoplay
    if (isMobile) {
        option.autoplay = false;
    }

    // default options
    const defaultOption = {
        element: document.getElementsByClassName('dplayer')[0],
        autoplay: true,
        theme: '#EE453B',
        loop: false,
        lang: navigator.language.indexOf('zh') !== -1 ? 'zh' : 'en',
        // 展示屏幕截图
        screenshot: false,
        // 控制面板样式
        controllBarStyle: 'background: transparent;padding: 0px;',
        // 是否启用快捷键
        hotkey: false,
        preload: 'auto',
        // 启用配置
        type: 'pc',
        h5Config: {
            showRefresh: true,
            showExpand: true,
            showBar: false
        },
        pcConfig: {
            // 展示在线人数
            showOnLine: true,
            onlineNumber: '1111人',
            // 展示弹幕
            showComment: false,
            // 展示时间轴
            showBar: true,
            // 展示设置
            showSetting: false,
            // 是否显示多种分辨率
            showQuality: true,
            // 是否展示刷新按钮
            refreshButton: true,
            // 是否展示动漫库
            showDanmaku: false,
            showContextmenu: false,
        },
        apiBackend: defaultApiBackend,
        contextmenu: [
            {
                text: '菜单',
                link: ''
            }
        ]
    };
    for (const defaultKey in defaultOption) {
        if (defaultOption.hasOwnProperty(defaultKey) && !option.hasOwnProperty(defaultKey)) {
            option[defaultKey] = defaultOption[defaultKey];
        }
    }
    if (Object.prototype.toString.call(option.video.url) !== '[object Array]') {
        option.video.url = [option.video.url];
    }
    if (option.video && !option.video.hasOwnProperty('type')) {
        option.video.type = 'auto';
    }
    if (option.danmaku && !option.danmaku.hasOwnProperty('user')) {
        option.danmaku.user = 'DIYgod';
    }

    if (option.video.quality) {
        option.video.url = [option.video.quality[option.video.defaultQuality].url];
    }

    return option;
};