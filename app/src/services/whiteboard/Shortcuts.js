class Shortcuts {
  listen() {

  }

  forgot() {
    
  }

  bind() {
    window.addEventListener('keyup', this.prcoceed);
  }

  unbind() {
    window.removeEventListener('keyup', this.prcoceed);
  }

  prcoceed(event) {
    console.log(event);
  }
}

export default new Shortcuts();