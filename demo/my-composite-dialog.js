
import { html, css } from '@dreamworld/pwa-helpers/lit.js';
import { DwCompositeDialog } from '../dw-composite-dialog.js';
import './my-popover-dialog.js';


export class MyCompositeDialog extends DwCompositeDialog {

  constructor() {
    super();
    this.type = 'modal';
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          --dw-popover-width: 500px;
        }

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
    return html`
      <button id="child-anchor" @click=${this._openChildPopover}>Open Nested Popover.</button>
      <my-popover-dialog></my-popover-dialog>
    `
  }

  _openChildPopover() {
    const triggerEl = this.renderRoot.querySelector('#child-anchor');
    const dialog = this.renderRoot.querySelector('my-popover-dialog');
    dialog.showTrigger = true;
    dialog.popoverPlacement = 'right-start';
    dialog.open(triggerEl);
  }

  get _footerTemplate() {
    return html`<button @click=${this.close}>Action button</button>`
  }

}

window.customElements.define('my-composite-dialog', MyCompositeDialog);