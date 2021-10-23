class ProgressBar {
  constructor(domNode) {
    this.domNode = domNode;
    this.fragmentDomNode = this.domNode.querySelector(".progress-bar__fragment")
  }

  setProgress(progress) {
    progress === 100 ?
      this.domNode.classList.remove("visible") :
      this.domNode.classList.add("visible");
      this.fragmentDomNode.style.width = progress + "%";
  }
}
export default ProgressBar;