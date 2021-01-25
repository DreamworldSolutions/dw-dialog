
import { html, css } from 'lit-element';
import { LitElement } from '@dreamworld/pwa-helpers/lit-element.js';
import isEmpty from 'lodash-es/isEmpty';
import findIndex from 'lodash-es/findIndex';
import { fitDialogStyles } from './fit-dialog-styles.js';
import { DwCompositeBaseDialogMixin } from './dw-composite-base-dialog-mixin.js';

/**
 * Behaviours:
 *  - Renders `header`, `content` & `footer` provided by user.
 *  
 *  - On connected, 
 *    - Creates instance DOM, appneds it in `body` directly & renders content into it.
 *    
 *  - On dialog opened,
 *    - Locks scroll for all other dialogs & unlocks scroll for last opened dialog.
 *    - When element is provided to be auto focused, focuses into it.
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
 *      - `--dw-fit-dialog-max-width`: Maximum width of dialog. Default is 768px.
 *      - `--dw-fit-dialog-overlay-color`: Overlay color of dialog. Default is rgba(0,0,0,0.4);
 *  
 */
export const DwFitDialogMixin = (baseElement) => class DwFitDialog extends DwCompositeBaseDialogMixin(baseElement) {
  static get styles() {
    return [
      fitDialogStyles
    ];
  }

  render() {
    if (this.type !== 'fit') {
      return html`${super.render()}`;
    }

    return html`
        <div class="mdc-dialog__container" ?opened=${this.opened} ?scroll-locked="${this.scrollLocked}"
          ?has-header=${this._hasHeader} ?has-footer=${this._hasFooter} ?scrolled-down=${this.scrolledDown}
          ?scrolled-up=${this.scrolledUp} ?modal-dialog-opened=${this._modalDialogOpened}>
          <div id="overlay"></div>
        
          <div class="mdc-dialog__content" id="dialog-content">
            ${this._customHeaderTemplate}
            ${this._contentTemplate}
            ${this._customFooterTemplate}
          </div>
        </div>
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
    this.type = 'fit';
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
      scrollLocked: { type: Boolean, reflect: true, attribute: 'scroll-locked' },

      /**
       * Output property. True when user scrolled to bottom of dialog content.
       */
      scrolledDown: { type: Boolean, reflect: true, attribute: 'scrolled-down' },

      /**
       * Output property.  True when user scrolled to top of dialog content.
       */
      scrolledUp: { type: Boolean, reflect: true, attribute: 'scrolled-up' },

      /**
       * `true` when header template is provided.
       */
      _hasHeader: { type: Boolean, reflect: true, attribute: 'has-header' },

      /**
       * `true` when footer template is provided.
       */
      _hasFooter: { type: Boolean, reflect: true, attribute: 'has-footer' },
      /**
       * When it's `true`, then decrease z-index of `header` & `footer`.
       */
      _modalDialogOpened: { type: Boolean, reflect: true, attribute: 'modal-dialog-opened' },

      /**
       * CSS selector used to focus an element when dialog is open.
       */
      autoFocusSelector: { type: String },

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


  updated(changedProps) {
    super.updated && super.updated(changedProps);
    this._hasHeader = !!this._headerTemplate;
    this._hasFooter = !!this._footerTemplate;
  }

  /**
  * Removes` dialog instance from `window.openedDwFitDialogsInstances`.
  * Restore current opened dialog scroll position. 
  * Destroys `renderRootEl` instance which is created in `createRenderRoot`.
  * Unlistens events.
   */
  disconnectedCallback() {
    if (this.type !== 'fit') {
      super.disconnectedCallback && super.disconnectedCallback();
      return;
    }
    const index = findIndex(window.openedDwFitDialogsInstances, (o) => o.element === this);
    if (index >= 0) {
      window.openedDwFitDialogsInstances.splice(index, 1);
    }

    this._restoreScroll();

    this.renderRootEl && this.renderRootEl.remove();

    this._unlistenEvents();
    super.disconnectedCallback && super.disconnectedCallback();
  }

  /**
   * Opens the dialog.
   * Sets `opened` to `true`
   */
  open(triggerEl) {
    if (this.type !== 'fit') {
      super.open(triggerEl);
      return;
    }
    this.opened = true;
    document.body.appendChild(this._renderRootEl);
  }

  /**
   * Closes the dialog
   * Sets `opened` to `false`
   */
  close() {
    if (this.type !== 'fit') {
      super.close();
      return;
    }
    this.opened = false;
    this.shadowRoot.appendChild(this._renderRootEl);
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
    if (this.type !== 'fit') {
      super._onOpenedChanged();
      return;
    }
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
    if (this.type !== 'fit') {
      super._onOpenedChanged();
      return;
    }
    this._listenEvents();

    if (!isEmpty(window.openedDwFitDialogsInstances)) {
      const lastInstance = window.openedDwFitDialogsInstances[window.openedDwFitDialogsInstances.length - 1];
      lastInstance.scrollTop = document.scrollingElement.scrollTop;
      lastInstance.element.lockScroll();
      setTimeout(() => {
        document.scrollingElement.scrollTop = 0;
      })
    }
    window.openedDwFitDialogsInstances.push({ element: this });

    this.dispatchEvent(new CustomEvent('dw-fit-dialog-opened', { bubbles: false, composed: false }));
    if (this.autoFocusSelector) {
      this.updateComplete.then(() => {
        this._setFocusToElement();
      });
    }
  }

  /**
   * Unlistens scroll events.
   * Removes instance of this dialog from `window.openedDwFitDialogsInstances`. 
   * Unlocks scroll for previously opened dialog.
   * Dispatches `dw-fit-dialog-closed` event.
   */
  _onDialogClosed() {
    if (this.type !== 'fit') {
      super._onDialogClosed();
      return;
    }
    this._unlistenEvents();

    window.openedDwFitDialogsInstances.splice(window.openedDwFitDialogsInstances.length - 1, 1);

    this._restoreScroll();

    this.dispatchEvent(new CustomEvent('dw-fit-dialog-closed', { bubbles: false, composed: false }));
  }

  /**
   * Manages `scrolledUp` or `scrolledDown` properties based on scroll position.
   */
  _onScrollHandler() {
    if (this.type !== 'fit') {
      super._onScrollHandler();
      return;
    }
    const scrollEl = document.scrollingElement;
    let scrollLength = scrollEl.clientHeight + scrollEl.scrollTop;
    this.scrolledUp = scrollEl.scrollTop < 15;
    this.scrolledDown = (scrollEl.scrollHeight - 15) <= scrollLength
  }

  /**
   * Listen `scroll` event & `click` event of "dismiss".
   */
  _listenEvents() {
    if (this.type !== 'fit') {
      super._listenEvents();
      return;
    }
    this.updateComplete.then(() => {
      this._onScrollHandler = this._onScrollHandler.bind(this);
      document.addEventListener('scroll', this._onScrollHandler);

      this._dismissEl = this.renderRoot.querySelector('[dismiss]');
      this.close = this.close.bind(this);
      this._dismissEl && this._dismissEl.addEventListener('click', this.close);
    })
  }

  /**
   * Unlistens `scroll` event.
   */
  _unlistenEvents() {
    if (this.type !== 'fit') {
      super._unlistenEvents();
      return;
    }
    document.removeEventListener('scroll', this._onScrollHandler);
    this._dismissEl && this._dismissEl.removeEventListener('click', this.close);
  }

  /**
   * Sets focus into provided auto focusable element.
   * After 400 seconds, scrolls bottom of text field into viewport.
   */
  _setFocusToElement() {
    if (this.type !== 'fit') {
      super._setFocusToElement();
      return;
    }
    setTimeout(() => {
      const el = this.renderRoot.querySelector(this.autoFocusSelector);
      el && el.focus && el.focus();
      setTimeout(() => {
        el && el.scrollIntoView(false);
      }, 400);
    }, 0);
  }
}

export const DwFitDialog = DwFitDialogMixin(LitElement)
window.customElements.define('dw-fit-dialog', DwFitDialog);