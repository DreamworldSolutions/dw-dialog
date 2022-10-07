

import { LitElement, html } from '@dreamworld/pwa-helpers/lit.js';
import { MDCDialog } from './component';
import { ModalDialogStyles } from './mwc-dialog-css';
  
export const DwModalDialogMixin = (baseElement) => class DwModalDialog extends baseElement {
  static get styles() {
    return [
      ModalDialogStyles
    ];
  }

  static get properties() {
    return {
      
      /**
       * Set to true to disable canceling the overlay with the ESC key.
       */
      noCancelOnEscKey: { type: Boolean },
      
      /**
       * Set to true to disable canceling the overlay by clicking outside it.
       */
      noCancelOnOutsideClick: { type: Boolean },

      /**
       * Set to true to hide dialog backdrop(dialog__scrim)
       */
      withoutBackdrop: { type: Boolean, reflect: true },

      /**
       * Sets the placement of the dialog
       * Possible value: `center`(Default) and `bottom`
       */
      placement: { type: String, reflect: true },

      /**
       * Sets dialog height to viewport height.
       * It's applicable only when `placement` is set to `bottom`
       */
      fitHeight: { type: Boolean, reflect: true, attribute: 'fit-height' },

      /**
       * Opens dialog if true.
       * Close dialog if false
       */
      opened: { type: Boolean, reflect: true },

      /**
       * CSS selector used to focus an element when dialog is open.
       */
      autoFocusSelector: { type: String },

      /**
       * Output property. True when user scrolled to bottom of dialog content.
       */
      scrolledDown: { type: Boolean, reflect: true, attribute: 'scrolled-down' },

      /**
       * Output property.  True when user scrolled to top of dialog content.
       */
      scrolledUp: { type: Boolean, reflect: true, attribute: 'scrolled-up' },
       
      /**
       * This property is used to separate style of this dialog.
       * It's mainly used when this dialog is used as a `dw-composite-dialog`
       */
      type: { type: String, reflect: true },

      /**
       * Instance of `MDCDialog` class
       */
      _mdcDialogInstance: {
        type: Object
      },

      /**
       * True when dialog has footer
       */
      _hasFooter: {
        type: Boolean,
        reflect: true,
        attribute: 'has-footer'
      },
      
      /**
       * True when dialog has header
       */
      _hasHeader: {
        type: Boolean,
        reflect: true,
        attribute: 'has-header'
      },

      /**
       * True when dialog height is equal to viewport.
       */
      _fullHeight: {
        type: Boolean,
        reflect: true,
        attribute: 'full-height'
      }
    };
  }

  render() {
    if (this.type !== 'modal') {
      return html`${super.render()}`
    }

    return html`
      <div id="dialogContainer" class="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content">
        <div class="mdc-dialog__container">
          <div class="mdc-dialog__surface">

            <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->

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
        </div>

        <div class="mdc-dialog__scrim"></div>

      </div>
    `;
  }

  constructor() { 
    super();
    this.type = 'modal';
    this._hasHeader = false;
    this._hasFooter = false;
    this.noCancelOnEscKey = false;
    this.noCancelOnOutsideClick = false;
    this.withoutBackdrop = false;
    this.placement = 'center';
    this.scrolledDown = true;
    this.scrolledUp = true;
    
    this._onDialogOpened = this._onDialogOpened.bind(this);
    this._onDialogClosed = this._onDialogClosed.bind(this);
    this._onDialogScroll = this._onDialogScroll.bind(this);
  }

  disconnectedCallback() {
    if (this.type === 'modal') {
      this._unlistenEvents();

      if (this._mdcDialogInstance) {
        this._mdcDialogInstance.destroy();
        this._mdcDialogInstance = null;
      }
    }
    super.disconnectedCallback();
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (this.type !== 'modal') {
      return;
    }
    if (changedProps.has('opened') && this.type === 'modal') {
      this._manageFullHeight();
      this._onOpenedChanged(this.opened);
    }
  }

  /**
   * Opens the dialog.
   */
  open(triggerEl) { 
    if (this.type !== 'modal') {
      super.open(triggerEl)
      return;
    }
    this.updateComplete.then(() => {
      if (this._mdcDialogInstance) {
        return;
      }
      this._initDialog();
      this._listenEvents();
      this._checkAvailableSlot();
      this._mdcDialogInstance.open();
      if (this.autoFocusSelector) { 
        this._setFocusToElement();
      }
    })
      
  }

  /**
   * Closes the dialog
   */
  close() { 
    if (this.type !== 'modal') {
      super.close();
      return;
    }
    this._mdcDialogInstance && this._mdcDialogInstance.close();
  }

  /**
   * Recalculates layout and automatically adds/removes modifier classes e.g. --scrollable.
   */
  layout() { 
    if (this.type !== 'modal') {
      super.layout && super.layout()
      return;
    }
    this._mdcDialogInstance && this._mdcDialogInstance.layout();
    this._manageFullHeight();
  }

  get _contentTemplate() { 
    return html`${this.type !== 'modal' ? html`${super._contentTemplate}` : html`<slot></slot>`}`
  }

  /**
   * used when this element is used by `Composition`
   */
  get _defaultHeaderTemplate() { 
    if (!this._hasHeader) { 
      return '';
    }

    return html`
      <div class="mdc-dialog__title" id="dialog-header">
        <slot name="header"></slot>
      </div>
    `;
  }

  /**
   * used when this element is used by `Extension`
   */
  get _customHeaderTemplate() { 
    return html`
      <div class="mdc-dialog__title" id="dialog-header">
        ${this._headerTemplate}
      </div>
    `;
  }

  /**
   * used when this element is used by `Composition`
   */
  get _defaultFooterTemplate() { 
    if (!this._hasFooter) { 
      return '';
    }

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

  /**
   * Creates `MDCDialog` class instances 
   * Sets `scrimClickAction` and `escapeKeyAction` based on user setting.
   */
  _initDialog() { 
    if (this.type !== 'modal') {
      return;
    }
    const el = this.renderRoot.querySelector('.mdc-dialog');
    this._mdcDialogInstance = new MDCDialog(el);
    this._mdcDialogInstance.scrimClickAction = this.noCancelOnOutsideClick ? '' : 'close';
    this._mdcDialogInstance.escapeKeyAction = this.noCancelOnEscKey ? '' : 'close';
  }

  /**
   * Sets `_hasHeader` and `_hasFooter` 
   * Based on these properties dom rendering happens
   */
  _checkAvailableSlot() {
    if (this.type !== 'modal') {
      super._checkAvailableSlot && super._checkAvailableSlot();
      return;
    }
    let elHeader = this.querySelector('[slot="header"]') || this.renderRoot.querySelector('#dialog-header');
    let elFooter = this.querySelector('[slot="footer"]') || this.renderRoot.querySelector('#dialog-footer');

    this._hasHeader = !!elHeader;
    this._hasFooter = !!elFooter;
  }

  /**
   * Listens `MDCDialog:closed`, `MDCDialog:opened` and scroll events
   */
  _listenEvents() { 
    this._unlistenEvents();
    if (this.type !== 'modal') {
      super._listenEvents();
      return;
    }
    let el = this.renderRoot.querySelector('#dialogContainer');
    el.addEventListener('MDCDialog:opened', this._onDialogOpened);
    el.addEventListener('MDCDialog:closed', this._onDialogClosed);

    //Bind scroll event of dialog content.
    let scrollEl = this.renderRoot.querySelector('#dialog-content');
    scrollEl.addEventListener('scroll', this._onDialogScroll);
  }

  /**
   * Unlistens `MDCDialog:closed`, `MDCDialog:opened` and scroll events
   */
  _unlistenEvents() { 
    if (this.type !== 'modal') {
      super._unlistenEvents && super._unlistenEvents();
      return;
    }
    let el = this.renderRoot.querySelector('#dialogContainer');
    if (!el) {
      console.warn('dw-dialog : Somehow dialog is disconnected already before "_unlistenEvents" execution.');
    }
    el && el.removeEventListener('MDCDialog:closed', this._onDialogClosed);
    el && el.removeEventListener('MDCDialog:opened', this._onDialogOpened);

    //Unbind scroll event of dialog content.
    let scrollEl = this.renderRoot.querySelector('#dialog-content');
    if (!scrollEl) {
      console.warn('dw-dialog : Somehow dialog is disconnected already before "_unlistenEvents" execution.');
    }
    scrollEl && scrollEl.removeEventListener('scroll', this._onDialogScroll);
  }

  /**
   * Tirggers `dw-dialog-closed` event when dialog is closed
   */
  _onDialogClosed(e) { 
    if (this.type !== 'modal') {
      super._onDialogClosed();
      return;
    }
    this.opened = false;
    let event = new CustomEvent('dw-dialog-closed', {
      detail: e.detail,
      bubbles: true,
      composed: true
    });
    
    this.dispatchEvent(event);
    this._unlistenEvents();

    if (this._mdcDialogInstance) {
      this._mdcDialogInstance.destroy();
      this._mdcDialogInstance = null;
    }
  }

   /**
   * Tirggers `dw-dialog-opened` event when dialog is opened
   */
  _onDialogOpened(e) { 
    if (this.type !== 'modal') {
      super._onDialogOpened();
      return;
    }
    this.opened = true;
    let event = new CustomEvent('dw-dialog-opened', {
      detail: e.detail,
      bubbles: true,
      composed: true
    });
    
    this.dispatchEvent(event);
  }

  /**
   * Manage `_fullHeight` property.
   * If dialog height and viewport is equal then set `_fullHeight` as a true. otherwise set false.
   * @protected
   */
  _manageFullHeight() {
    if (this.type !== 'modal') {
      super._manageFullHeight && super._manageFullHeight();
      return;
    }
    let el = this.renderRoot.querySelector('.mdc-dialog__surface');
    this._fullHeight = el && window.innerHeight == el.offsetHeight;
  }
  
  /**
   * Invoked when user scroll in dialog content.
   * Manage `scrollUp` or `scrollDown` property based on dialog content scroll position.
   * @protected
   */
  _onDialogScroll() {
    if (this.type !== 'modal') {
      super._onDialogScroll && super._onDialogScroll();
      return;
    }
    let scrollEl = this.renderRoot.querySelector('#dialog-content');
    if(!scrollEl) {
      this.scrolledDown = true;
      this.scrolledUp = true;
      return;
    }

    let scrollLength = scrollEl.offsetHeight + scrollEl.scrollTop;
    this.scrolledUp = scrollEl.scrollTop < 15;
    this.scrolledDown = (scrollEl.scrollHeight - 15) <= scrollLength;
  }

  /**
   * When user has set the CSS property `--dw-dialog-content-padding` to customize the 
   * padding & if the dialog has no footer then it causes issue with the bottom padding.
   * To fix it, this sets an attribute on the host. (and remaining rules are handled
   * from the CSS)
   */
  _fixCustomContentPadding() {
    let customContentPaddingValue = getComputedStyle(this).getPropertyValue('--dw-dialog-content-padding').trim();
    if(customContentPaddingValue) {
      this.setAttribute('custom-content-padding-applied', '');
    } else {
      this.removeAttribute('custom-content-padding-applied');
    }
  }

  _onOpenedChanged(opened) { 
    if (this.type !== 'modal') {
      super._onOpenedChanged(opened);
      return;
    }
    this._fixCustomContentPadding();
    this.updateComplete.then(() => {
      if (opened) { 
        this.open();
        return;
      }
  
      if (!opened) { 
        this.close();
        return;
      }
    })
  }

  _setFocusToElement() { 
    if (this.type !== 'modal') {
      super._setFocusToElement && super._setFocusToElement();
      return;
    }
    let el = this.renderRoot.querySelector(this.autoFocusSelector);

    if (!el) { 
      el = this.querySelector(this.autoFocusSelector);
    }

    el && el.focus && el.focus();
  }

}

export const DwDialog = DwModalDialogMixin(LitElement);

window.customElements.define('dw-dialog', DwDialog);