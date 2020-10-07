
import { html, css } from 'lit-element';
import { DwFitDialog } from '../dw-fit-dialog.js';
export class ChildFitDialog extends DwFitDialog {

  get _headerTemplate() {
    return html`
      <h2>child Fit Dialog</h2>
      <button @click=${this.close}>Close</button>`;
  }

  get _contentTemplate() {
    return html`
      <input placeholder="First Input">
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <input placeholder="Middle Input">
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <h2>child Dialog Content</h2><h2>child Dialog Content</h2><h2>child Dialog Content</h2>
      <input placeholder="Last Input">
      
    `
  }

  get _footerTemplate() {
    return html`<h2>child Dialog Footer</h2>`
  }
}

window.customElements.define('child-fit-dialog', ChildFitDialog);