
import { html, css } from 'lit-element';
import { LitElement } from '@dreamworld/pwa-helpers/lit-element.js';

/**
 * Behaviours:
 *  - Shows `header`, `content` & `footer` provided by user.
 *  - Provides a way to render header, content & footer in light DOM as well shadow DOM
 *  
 *  - On connected, 
 *    - Creates instance DOM, appneds it in `body` directly & renders content into it.
 *    
 *  - On dialog opened,
 *    - Unlocks scroll for opened dialog & locks scroll for all other dialogs.
 * 
 *  - Usage pattern:
 *    - By composition
 *      - `<dw-fit-dialog>
 *            <div slot="header">Header template</div>
 *            <div slot="content">Content template</div>
 *            <div slot="foolter">Footer template</div>
 *         </dw-fit-dialog>`
 * 
 *    - By extension
 *        `<my-fit-dialog></my-fit-dialog>`
 *       - Override `_headerTemplate`, `_contentTemplate` & `_footerTemplate`
 * 
 *    - CSS variables
 *      - `dw-fit-dialog-header-height`: Height of header. Default is `56px`
 *      - `dw-fit-dialog-footer-height`: Height of footer. Default is `56px`
 * 
 *  
 */
export class DwFitDialog extends LitElement {
  static get styles() {
    return [
      Style,
      css`
        :host {
          display: block;
        }       

       
      `
    ];
  }

  render() {
    return html`
      <!-- This is for to prevent header's dom rendering  when header is not available in light dom -->
      ${this._headerTemplate ? html`${this._customHeaderTemplate}` : html`${this._defaultHeaderTemplate}`}

      <!-- Dialog content -->
      <div class="mdc-dialog__content" id="dialog-content">
        ${this._contentTemplate}
      </div>

      <!-- Dialog footer -->

      <!-- This is for to prevent footer's dom rendering  when footer is not available in light dom -->
      ${this._footerTemplate ? html`${this._customFooterTemplate}` : html`${this._defaultFooterTemplate}`}
    `;
  }

  get _contentTemplate() { 
    return html`
      <slot></slot>
    `;
  }

  /**
   * used when this element is used by `Composition`
   */
  get _defaultHeaderTemplate() { 
    return html`
      <header class="mdc-dialog__title" id="dialog-header">
        <slot name="header"></slot>
      </header>
    `;
  }

  /**
   * used when this element is used by `Extension`
   */
  get _customHeaderTemplate() { 
    return html`
      <header class="mdc-dialog__title" id="dialog-header">
        ${this._headerTemplate}
      </header>
    `;
  }

  /**
   * used when this element is used by `Composition`
   */
  get _defaultFooterTemplate() { 
    return html`
      <footer class="mdc-dialog__actions" id="dialog-footer">
        <slot name="footer"></slot>
      </footer>
    `;
  }

  /**
   * used when this element is used by `Extension`
   */
  get _customFooterTemplate() { 
    return html`
      <footer class="mdc-dialog__actions" id="dialog-footer">
        ${this._footerTemplate}
      </footer>
    `;
  }

  constructor() { 
    super();
    
  }

  static get properties() {
    return {
      /**
       * Opens dialog if true.
       * Close dialog if false
       */
      opened: { type: Boolean, reflect: true },


    };
  }

  /**
   * Creates & appends `renderRoot` element into `body`.
   */
  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
  }

  /**
   * Creates & appends `renderRoot` element into `body`
   */
  createRenderRoot() {
    //TODO: create `renderRoot`
  }

  /**
   * Destroys `renderRoot` instance which is created on `connectedCallback`.
   * Removes` dialog instance from `window.openedDwFitDialogs` & Unlocks last instance.
   */
  disconnectedCallback() {
    super.connectedCallback && super.connectedCallback();
  }

  /**
   * Opens the dialog.
   * Sets `opened` to `true`
   */
  open() { 

  }

  /**
   * Closes the dialog
   * Sets `opened` to `false`
   */
  close() { 
    
  }

  /**
   * Locks scroll for current dialog.
   */
  lockScroll() {
    
  }

  /**
   * Unlocks scroll for current dialog.
   */
  unlockScroll() {
    
  }

  /**
   * Dispatches non bubbling `dialog-opened` or `dialog-closed` event based on `value`
   * On `opened` pushes instance into `window.openedDwFitDialogs`.
   * On `closed` removes instance from `window.openedDwFitDialogs` & unlocks last instance.
   * Unlocks scroll for last opened dialog & locks scroll for all other opened dialogs.
   * @param {Boolean} opened Opened
   */
  _onOpenedChanged(opened) {
    
  }

  


}

window.customElements.define('dw-fit-dialog', DwFitDialog);