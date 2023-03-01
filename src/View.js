class View {
    constructor(name, rootEl, displayStyle = "block") {
        this.name = name
        this.rootEl = rootEl
        // What to set as the value for the css `display` property
        this.displayStyle = displayStyle;
        this.elements = {}
        this.state = {}
    }

    focus() {
        this.rootEl.focus();
    }

    show() {
        this.rootEl.style.display = this.displayStyle;
    }

    hide() {
        this.rootEl.style.display = "none";
    }

    pushHistory() {
        history.pushState({
            view: {
                name: this.name,
                data: this.state
            }
        }, document.title)
    }
}