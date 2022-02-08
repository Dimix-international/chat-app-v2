export const goToBottom = (className: string) => {
    const el = document.querySelector(className);
    if(el) {
        el.scrollTop = el.scrollHeight;
    }
}