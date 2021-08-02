/** Export Toast to represent notifications functionality. */
export const Toast = {

    /**
     * @function init
     * Start to init components with notifications.
     */
    init() {
        this.hideTimeout = null;
        this.el = document.getElementsByClassName("notification-container")[0];
    },

    /**
     * @function show
     * Show notification with options for different situations.
     * @param {Object} options - Options to represent notification.
     */
    show(options) {
        clearTimeout(this.hideTimeout);
        let div = document.createElement('div');
        div.className = 'notification-block';
        let divNot = document.createElement('div');
        divNot.className = 'notification-info-image';
        let imgeNot = document.createElement('img');
        let textBlock = document.createElement('div');
        textBlock.className = 'notification-info-text';
        let text = document.createElement('p');
        let closeDiv = document.createElement('div');
        closeDiv.className = 'notification-info-cancel';
        let imageClose = document.createElement('img');
        imageClose.src = '/images/close-modal2.svg';
        this.imageNot(options, imgeNot, text, div);
        closeDiv.append(imageClose);
        textBlock.append(text);
        divNot.append(imgeNot);
        div.append(divNot, textBlock, closeDiv);
        this.el.append(div);

        this.hideTimeout = setTimeout(() => {
            this.el.innerHTML = '';

        }, options.showTime);
    },

    /**
     * @function closeNotify
     * Close notification by pressing on the button.
     */
    closeNotify() {
        console.log("close");
    },

    /**
     * @function imegeNot
     * Start to init components with routes.
     * @param {Object} options - Options to represent notification.
     * @param {String} image - Tag image block to represent notification.
     * @param {String} textNotify - Text of the notification.
     * @param {String} classColor - Tag to add class color to block.
     */
    imageNot(options, image, textNotify, classColor) {
        if (options.type === "info") {
            image.src = '/images/success-notification.png'
            textNotify.innerHTML = options.text
            classColor.classList.add('notification-info')

        } else if (options.type === "success") {
            image.src = '/images/success-notification.png'
            textNotify.innerHTML = options.text
            classColor.classList.add('notification-success')

        } else if (options.type === "error") {
            image.src = '/images/error-notification.png'
            textNotify.innerHTML = options.text
            classColor.classList.add('notification-error')

        } else {
            image.src = '/images/warning-notification.png'
            textNotify.innerHTML = options.text
            classColor.classList.add('notification-warning')
        }
    }
};