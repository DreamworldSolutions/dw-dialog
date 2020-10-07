
import { html, css } from 'lit-element';
import { DwFitDialog } from '../dw-fit-dialog.js';
import './child-fit-dialog.js';
export class ParentFitDialog extends DwFitDialog {

  get _headerTemplate() {
    return html`
      <h2>Parent Fit Dialog Header</h2>
      <button @click=${this.close}>Close</button>`;
  }

  get _contentTemplate() {
    return html`
      <input placeholder="First Input">
      <h2>Parent Dialog Content</h2><h2>Parent Dialog Content</h2><h2>Parent Dialog Content</h2><h2>Parent Dialog Content</h2>
      <h2>Parent Dialog Content</h2><h2>Parent Dialog Content</h2><h2>Parent Dialog Content</h2>
      <h2>Parent Dialog Content</h2><h2>Parent Dialog Content</h2><h2>Parent Dialog Content</h2>
      <input placeholder="Middle Input"><button @click=${this._openChildDialog.bind(this)}>Open Child Dialog</button>
      <h2>Parent Dialog Content</h2><h2>Parent Dialog Content</h2><h2>Parent Dialog Content</h2>
      <h2>Parent Dialog Content</h2><h2>Parent Dialog Content</h2><h2>Parent Dialog Content</h2>
      <input placeholder="Last Input">
      <child-fit-dialog></child-fit-dialog>
      
      
    `
  }

  get _footerTemplate() {
    return html`<h2>Parent Dialog Footer</h2>`
  }

  _openChildDialog() {
    this.renderRoot.querySelector('child-fit-dialog').open();
  }
}

window.customElements.define('parent-fit-dialog', ParentFitDialog);