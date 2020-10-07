
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
          display: none;
        }  

        :host([opened]) {
          display: block;
        }

        .mdc-dialog__container{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          min-height: 100vh;
          z-index: 100;
        }

        :host([scroll-locked]) .mdc-dialog__container{
          position: fixed;
        }

       
      `
    ];
  }

  render() {
    return html`
      <div class="mdc-dialog__container">
        <!-- This is for to prevent header's dom rendering  when header is not available in light dom -->
      ${this._headerTemplate ? html`${this._customHeaderTemplate}` : html`${this._defaultHeaderTemplate}`}

      <!-- Dialog content -->
      <div class="mdc-dialog__content" id="dialog-content">
        ${this._contentTemplate}
      </div>

      <!-- Dialog footer -->

      <!-- This is for to prevent footer's dom rendering  when footer is not available in light dom -->
      ${this._footerTemplate ? html`${this._customFooterTemplate}` : html`${this._defaultFooterTemplate}`}
      </div>
    `;
  }

  get _contentTemplate() { 
    return html`
      <slot name="footer"></slot>
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
    window.openedDwFitDialogsInstances = window.openedDwFitDialogsInstances || []
  }

  static get properties() {
    return {
      /**
       * Opens dialog if true.
       * Close dialog if false
       */
      opened: { type: Boolean, reflect: true },

      /**
       * When it's `true`, scroll is locked.
       */
      scrollLocked: { type: Boolean, reflect: true, attribute: 'scroll-locked'}


    };
  }

  /**
   * Creates & appends `renderRoot` element into `body`
   * Note: `renderRoot` is created here because `createRenderRoot` is called from `constructor`.
   */
  createRenderRoot() {
    let el = document.createElement('div');
    document.body.appendChild(el);
    return el.attachShadow({ mode: 'open' });
  }

  /**
   * Destroys `renderRoot` instance which is created on `connectedCallback`.
   * Removes` dialog instance from `window.openedDwFitDialogsInstances` & Unlocks last instance.
   */
  disconnectedCallback() {
    this.renderRoot && this.renderRoot.remove();
    super.connectedCallback && super.connectedCallback();
  }

  /**
   * Opens the dialog.
   * Sets `opened` to `true`
   */
  open() { 
    this.opened = true;
  }

  /**
   * Closes the dialog
   * Sets `opened` to `false`
   */
  close() { 
    this.opened = false;
  }

  /**
   * Locks scroll for current dialog.
   */
  lockScroll() {
    this.scrollLocked = true;
  }

  /**
   * Unlocks scroll for current dialog.
   * Restores last scroll position from `window.
   */
  unlockScroll() {
    this.scrollLocked = false;
  }

  /**
   * Dispatches non bubbling `dialog-opened` or `dialog-closed` event based on `value`
   * On `opened` pushes instance into `window.openedDwFitDialogsInstances`.
   * On `closed` removes instance from `window.openedDwFitDialogsInstances` & unlocks last instance.
   * Unlocks scroll for last opened dialog & locks scroll for all other opened dialogs.
   * @param {Boolean} opened Opened
   */
  _onOpenedChanged(opened) {
    
  }

  


}

window.customElements.define('dw-fit-dialog', DwFitDialog);