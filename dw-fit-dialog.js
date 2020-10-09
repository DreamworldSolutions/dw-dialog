
import { html, css } from 'lit-element';
import { LitElement } from '@dreamworld/pwa-helpers/lit-element.js';
import isEmpty from 'lodash-es/isEmpty';
import findIndex from 'lodash-es/findIndex';

/**
 * Behaviours:
 *  - Renders `header`, `content` & `footer` provided by user.
 *  
 *  - On connected, 
 *    - Creates instance DOM, appneds it in `body` directly & renders content into it.
 *    
 *  - On dialog opened,
 *    - Locks scroll for all other dialogs & unlocks scroll for last opened dialog.
 * 
 *  - On dialog closed,
 *    - When any other dialog is opened then restores it's previous scroll.
 * 
 *  - Usage pattern:
 *    - Note: This dialog can be used only by extention.
 *        `<my-fit-dialog></my-fit-dialog>`
 *       - Override `_headerTemplate`, `_contentTemplate` & `_footerTemplate`
 * 
 *    - CSS variables
 *      - `--dw-fit-dialog-header-height`: Height of header. Default is `56px`
 *      - `--dw-fit-dialog-footer-height`: Height of footer. Default is `56px`
 *      - `--dw-fit-dialog-header-background`: Background color of Header
 * *    - `--dw-fit-dialog-content-background`: Background color of Content
 *      - `--dw-fit-dialog-footer-background`: Background color of Footer
 *  
 */
export class DwFitDialog extends LitElement {
  static get styles() {
    return [
      css`
        /* START Container */
        .mdc-dialog__container{
          display: none;
        }  

        .mdc-dialog__container[opened]{
          display: block;
        }

        /* END Container  */     

        

        /* START Header & Footer */
        header, .header, footer{
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: fixed !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 101;
          box-sizing: border-box;
          padding: 0px 16px;
        }

        header, .header {
          background: var(--dw-fit-dialog-header-background, #FFF);
          top: 0 !important;
          height: var(--dw-fit-dialog-header-height, 56px);
          color: var(--mdc-theme-text-primary, rgba(0, 0, 0, 0.87));
          border-bottom: none !important;
        }

        .mdc-dialog__container:not([scrolled-up]) header {
          box-shadow: 0 1px 3px 0 rgba(0,0,0,0.12), 0 1px 2px 0 rgba(0,0,0,0.24);
        }

        footer{
          background: var(--dw-fit-dialog-footer-background, #FFF);
          bottom: 0 !important;
          height: var(--dw-fit-dialog-footer-height, 56px);
          border-top: 1px solid  var(--dw-fit-dialog-divider-color, rgba(0, 0, 0, 0.12));
        }

        footer kerika-button {
          flex: 1 1 1e-09px;
        }

        .mdc-dialog__container:not([scrolled-down]) footer {
          box-shadow:  0 -1px 3px 0 rgba(0,0,0,0.12), 0 1px 2px 0 rgba(0,0,0,0.24);
        }  
        /* END Header & Footer */

        /* START Content */
        #dialog-content {
          box-sizing: border-box;
          color: var(--mdc-theme-text-secondary, rgba(0, 0, 0, 0.6));
          min-height: 100vh;
          z-index: 100;
        }

        .mdc-dialog__container[opened] .mdc-dialog__content{
          box-sizing: border-box;
          background: var(--dw-fit-dialog-content-background, #FFF);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          min-height: 100vh;
          padding: 12px 16px;
          z-index: 100;
        }

        .mdc-dialog__container[has-header] .mdc-dialog__content {
          padding-top: 56px;
        }

        .mdc-dialog__container[has-footer] .mdc-dialog__content {
          padding-bottom: 56px;
        }

        .mdc-dialog__container[opened][scroll-locked] .mdc-dialog__content{
          position: fixed;
        }

        .mdc-dialog__container:not([has-footer]) .mdc-dialog__content {
          padding-bottom: 12px;
        }
        /* END Content */

        /* START Animation */
        @keyframes slideInUp {
          from {
            transform: translate3d(0, 100%, 0);
          }

          to {
            transform: translate3d(0, 0, 0);
          }
        }
        /* END Animation */
      `
    ];
  }

  render() {
    return html`
      <div class="mdc-dialog__container" ?opened=${this.opened} ?scroll-locked="${this.scrollLocked}"
        ?has-header=${this._hasHeader} ?has-footer=${this._hasFooter} ?scrolled-down=${this.scrolledDown}
        ?scrolled-up=${this.scrolledUp}>
        ${this._customHeaderTemplate}
      
        <div class="mdc-dialog__content" id="dialog-content">
          ${this._contentTemplate}
        </div>
      
        ${this._customFooterTemplate}
      </div>
      
    `;
  }

  /**
   * used when this element is used by `Extension`
   */
  get _customHeaderTemplate() {
    return html`
      <header class="mdc-dialog__title" id="dialog-header" ?opened="${this.opened}">
        ${this._headerTemplate}
      </header>
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
    window.openedDwFitDialogsInstances = window.openedDwFitDialogsInstances || [];
    this.scrolledDown = true;
    this.scrolledUp = true;
  }

  static get properties() {
    return {
      /**
       * Opens dialog if true.
       * Close dialog if false
       */
      opened: { type: Boolean },

      /**
       * When it's `true`, scroll is locked.
       */
      scrollLocked: { type: Boolean },

      /**
       * Output property. True when user scrolled to bottom of dialog content.
       */
      scrolledDown: { type: Boolean },

      /**
       * Output property.  True when user scrolled to top of dialog content.
       */
      scrolledUp: { type: Boolean },

      /**
       * `true` when header template is provided.
       */
      _hasHeader: { type: Boolean },

      /**
       * `true` when footer template is provided.
       */
      _hasFooter: { type: Boolean },

    };
  }

  get opened() {
    return this._opened;
  }

  set opened(val) {
    const oldVal = this._opened;
    if (oldVal === val) {
      return;
    }

    this._opened = val;
    this.requestUpdate('opened', oldVal);
    this._onOpenedChanged(val);
  }

  /**
   * Creates & appends `renderRootEl` element into `body`
   * Note: `renderRootEl` is created here because `createRenderRoot` is called from `constructor`.
   */
  createRenderRoot() {
    this.renderRootEl = document.createElement('div');
    document.body.appendChild(this.renderRootEl);
    return this.renderRootEl.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.updateComplete.then(() => {
      this._checkHeaderAndFooter();
    })
  }

  /**
  * Removes` dialog instance from `window.openedDwFitDialogsInstances`.
  * Restore current opened dialog scroll position. 
  * Destroys `renderRootEl` instance which is created in `createRenderRoot`.
  * Unlistens events.
   */
  disconnectedCallback() {
    const index = findIndex(window.openedDwFitDialogsInstances, (o) => o.element === this);
    if (index >= 0) {
      window.openedDwFitDialogsInstances.splice(index, 1);
    }

    this._restoreScroll();

    this.renderRootEl && this.renderRootEl.remove();

    this._unlistenEvents();
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
   */
  unlockScroll() {
    this.scrollLocked = false;
  }

  /**
   * Unlocks currently opened dialog & restore it's scroll position.
   */
  _restoreScroll() {
    if (!isEmpty(window.openedDwFitDialogsInstances)) {
      const lastInstance = window.openedDwFitDialogsInstances[window.openedDwFitDialogsInstances.length - 1];
      lastInstance.element.unlockScroll();
      document.scrollingElement.scrollTop = lastInstance.scrollTop;
    }
  }

  /**
   * Triggers `_onDialogOpened` or `_onDialogClosed` methods.
   * @param {Boolean} opened Opened
   */
  _onOpenedChanged(opened) {
    if (opened) {
      this._onDialogOpened();
    } else {
      this._onDialogClosed();
    }
  }

  /**
   * Listens scroll event.
   * Locks scroll for previous opened dialog. 
   * Pushes instance of this dialog into `window.openedDwFitDialogsInstances`.
   * Dispatches `dw-fit-dialog-opened` event.
   */
  _onDialogOpened() {
    this._listenEvents();

    if (!isEmpty(window.openedDwFitDialogsInstances)) {
      const lastInstance = window.openedDwFitDialogsInstances[window.openedDwFitDialogsInstances.length - 1];
      lastInstance.scrollTop = document.scrollingElement.scrollTop;
      document.scrollingElement.scrollTop = 0;
      lastInstance.element.lockScroll();
    }
    window.openedDwFitDialogsInstances.push({ element: this });

    this.dispatchEvent(new CustomEvent('dw-fit-dialog-opened', { bubbles: false, composed: false }));
  }

  /**
   * Unlistens scroll events.
   * Removes instance of this dialog from `window.openedDwFitDialogsInstances`. 
   * Unlocks scroll for previously opened dialog.
   * Dispatches `dw-fit-dialog-closed` event.
   */
  _onDialogClosed() {
    this._unlistenEvents();

    window.openedDwFitDialogsInstances.splice(window.openedDwFitDialogsInstances.length - 1, 1);

    this._restoreScroll();

    this.dispatchEvent(new CustomEvent('dw-fit-dialog-closed', { bubbles: false, composed: false }));
  }

  /**
   * Sets `_hasHeader` and `_hasFooter` 
   * Based on these properties styling is applied.
   */
  _checkHeaderAndFooter() {
    const headerEl = this.renderRoot.querySelector('#dialog-header');
    const footerEl = this.renderRoot.querySelector('#dialog-footer');
    this._hasHeader = headerEl && headerEl.textContent.trim();
    this._hasFooter = footerEl && footerEl.textContent.trim();
  }

  /**
   * Manages `scrolledUp` or `scrolledDown` properties based on scroll position.
   */
  _onScrollHandler() {
    const scrollEl = document.scrollingElement;
    let scrollLength = scrollEl.offsetHeight + scrollEl.scrollTop;
    this.scrolledUp = scrollEl.scrollTop < 15;
    this.scrolledDown = (scrollEl.scrollHeight - 15) <= scrollLength;
  }

  /**
   * Listen `scroll` event.
   */
  _listenEvents() {
    this._onScrollHandler = this._onScrollHandler.bind(this);
    document.addEventListener('scroll', this._onScrollHandler);
  }

  /**
   * Unlistens `scroll` event.
   */
  _unlistenEvents() {
    document.removeEventListener('scroll', this._onScrollHandler);
  }
}

window.customElements.define('dw-fit-dialog', DwFitDialog);