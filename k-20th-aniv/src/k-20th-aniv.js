window.addEventListener('load', init);

const HTML = `
<div class="k20th" aria-hidden="true">
    <p>k20th</p>
</div>
`

const MODAL = `
<div class="k20th-modal">
  <div class="k20th-modal__overlay"></div>
  <div class="k20th-modal__container">
    <p>I AM MODAL</p>
  </div>
</div>
`

class Modal {
    constructor(option = {}) {
        this.option = Object.assign({}, this._default, option)
        this.wrapper = document.createElement('div')
        this.wrapper.className = `${this.option.namespace}-modal`
        this.wrapper.setAttribute('aria-hidden', 'true');
        this.wrapper.innerHTML = this._createInnerHTML(this.option.namespace)
        document.body.appendChild(this.wrapper);

        this.wrapper.addEventListener('click', () => {
          this.close();
        })
    }

    get _default() {
        return {
            namespace: 'k20th',
        }
    }

    /**
     * 
     * @param {string} ns namespace
     */
    _createInnerHTML(ns) {
        return `
            <div class="${ns}-modal__overlay"></div>
            <div class="${ns}-modal__container">
                <p>contents</p>
            </div>
        `
    }

    open() {
      this.wrapper.setAttribute('aria-hidden', 'false');
    }

    close() {
      this.wrapper.setAttribute('aria-hidden', 'true');
    }
}

function init() {
    const banner = document.getElementById('k-20th-aniv')
    if (!banner) {
        console.error('not found #k-20th-aniv element')
        return
    }
    banner.innerHTML = HTML
    const modal = new Modal()

    const wrapper = document.querySelector('.k20th');
    wrapper.addEventListener('click', () => {
        modal.open();
    })
}