class ProgressBar {
  constructor(el) {
    this.el = el;
    this.fragmentEl = this.el.querySelector(".progress-bar__fragment")
  }

  setProgress(progress) {
    progress === 100 ?
      this.el.classList.remove("visible") :
      this.el.classList.add("visible");
      this.fragmentEl.style.width = progress + "%";
  }
}
export default ProgressBar;