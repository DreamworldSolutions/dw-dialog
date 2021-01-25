
import { html, css } from 'lit-element';
import { DwCompositeDialog } from '../dw-composite-dialog.js';


export class MyCompositeDialog extends DwCompositeDialog {

  constructor() {
    super();
    this.type = 'modal';
  }

  static get styles() {
    return [
      super.styles,
      css`
        #dialog-header {
          color: red;
          padding: 24px;
          display: flex;
          justify-content: space-between;
        }

        #dialog-header::before {
          display: none;
        }
      `
    ]
  }

  get _headerTemplate() {
    return html`<div>Header</div><button @click=${this.close}>Close</button>`
  }

  get _contentTemplate() {
    return html`<h2>My Composite Content</h2><h2>My Composite Content</h2><h2>My Composite Content</h2><h2>My Composite Content</h2><h2>My Composite Content</h2><h2>My Composite Content</h2><h2>My Composite Content</h2><h2>My Composite Content</h2><h2>My Composite Content</h2><h2>My Composite Content</h2><h2>My Composite Content</h2><h2>My Composite Content</h2><h2>My Composite Content</h2><h2>My Composite Content</h2>`
  }

  get _footerTemplate() {
    return html`<button @click=${this.close}>Action button</button>`
  }

}

window.customElements.define('my-composite-dialog', MyCompositeDialog);