
import { html, css } from 'lit-element';
import { DwPopoverDialog } from '../dw-popover-dialog.js'
export class MyPopoverDialog extends DwPopoverDialog {

  constructor() {
    super();
    this.popoverPlacement = 'bottom-start';
  }

  static get styles() {
    return [
      super.styles,
      css`
        #dialog-header {
          color: red;
        }

        #dialog-content {
          padding: 16px;
        }
      `
    ]
  }

  get _headerTemplate() {
    return html`
      <div>Popover Header</div>`
  }

  get _contentTemplate() {
    return html` <div>My Popover Content</div>`
  }

  get _footerTemplate() {
    return html`<div>Popover Footer</div>`
  }

}

window.customElements.define('my-popover-dialog', MyPopoverDialog);