const Notification = (function () {
    const container = document.querySelector('.task-wrap .container');
    const show = function (setting) {
        hide();
        const alert = `<div class="alert notification-alert ${setting.cssClass}">${setting.text}</div>`;
        container.insertAdjacentHTML('afterbegin', alert);
        setTimeout(() => hide(),setting.timeout || 1000);
    }
    const hide = function () {
        const alert = document.querySelector('.notification-alert');
        if(alert) {
            alert.remove();
        }
    }
    return {
        show,
    }
}());