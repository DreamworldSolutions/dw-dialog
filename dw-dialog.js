/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';
import { MDCDialog } from './component';
import { Style } from './mwc-dialog-css';
  
export class DwDialog extends LitElement {
  static get styles() {
    return [
      Style,
      css`
        :host {
          display: block;
          outline:none;
          color: var(--mdc-theme-text-primary);
        }

        :host[hidden] {
          display: none;
        }

        /* STARTS dialog container style */
        :host(:not([_hasHeader])) .mdc-dialog.mdc-dialog--scrollable .mdc-dialog__surface{
          padding-top: 8px;
        }

        :host(:not([_hasFooter])) .mdc-dialog.mdc-dialog--scrollable .mdc-dialog__surface{
          padding-bottom: 8px;
        }

        .mdc-dialog .mdc-dialog__surface{
          min-width: var(--dw-dialog-min-width, 280px);
          max-width: var(--dw-dialog-max-width, calc(100% - 32px));
          min-height: var(--dw-dialog-min-height);
          max-height: var(--dw-dialog-max-height, calc(100% - 32px));
          border-radius: var(--dw-dialog-border-radius, 4px);
          box-shadow: 0px 2px 6px #ccc;
        }
        /* ENDS dialog container style */

        /* STARTS dialog header style */
        .mdc-dialog__title{
          background: var(--dw-dialog-header-background);
          padding: var(--dw-dialog-header-padding, 0px 24px 9px);
        }

        .mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title{
          border-color: var(--dw-dialog-divider-color, rgba(0, 0, 0, 0.12));
        }
         /* ENDS dialog header style */

        /* STARTS dialog footer style */
        .mdc-dialog__actions{
          background: var(--dw-dialog-footer-background);
          padding: var(--dw-dialog-footer-padding, 8px);
        }
         /* ENDS dialog footer style */


        .mdc-dialog .mdc-dialog__content {
          color: var(--mdc-theme-text-secondary, rgba(0, 0, 0, 0.6));
        }

        :host(:not([scrolled-down])) .mdc-dialog footer {
          box-shadow:  0 -1px 3px 0 rgba(0,0,0,0.12), 0 1px 2px 0 rgba(0,0,0,0.24);
        }

        :host(:not([scrolled-up])) .mdc-dialog .mdc-dialog__title {
          box-shadow: 0 1px 3px 0 rgba(0,0,0,0.12), 0 1px 2px 0 rgba(0,0,0,0.24);
        }

        .mdc-dialog .mdc-dialog__title {
          color: var(--mdc-theme-text-primary, rgba(0, 0, 0, 0.87));
          border-bottom: none !important;
        }

        .mdc-dialog footer {
          border-top: 1px solid  var(--dw-dialog-divider-color, rgba(0, 0, 0, 0.12)) !important;
        }

        /* Style for 'withoutBackdrop' */
        :host([withoutBackdrop]) .mdc-dialog--open .mdc-dialog__scrim {
          opacity: 0
        }

        /* STARTS: style for bottom placement */
        :host([placement="bottom"]) .mdc-dialog__container{
          align-items: flex-end;
        }

        :host([placement="bottom"]) .mdc-dialog--opening .mdc-dialog__container .mdc-dialog__surface{
          animation: slideInUp 0.2s forwards;
        }

        :host([placement="bottom"]) .mdc-dialog .mdc-dialog__surface{
          width: 100%;
          min-width: var(--dw-dialog-min-width, 100%);
          max-width: var(--dw-dialog-max-width, 100%);
          max-height: var(--dw-dialog-max-height, 100%);
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }

        :host([placement="bottom"]) .mdc-dialog .mdc-dialog__container{
          width: 100%;
        }
        :host([opened][placement="bottom"][fit-height]),
        :host([opened][placement="bottom"][fit-height]) .mdc-dialog__surface {
          position: fixed;
          top: 0;
          bottom: 0;
        }

        :host(:not([_hasFooter])) .mdc-dialog .mdc-dialog__content {
          padding-bottom: 12px;
        }

        :host([opened][placement="bottom"][full-height]) .mdc-dialog__surface {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }

        @keyframes slideInUp {
          from {
            transform: translate3d(0, 100%, 0);
          }

          to {
            transform: translate3d(0, 0, 0);
          }
        }
        /* ENDS: style for bottom placement */


        /* STARTS: style for center placement */
        :host([placement="center"]) .mdc-dialog--opening .mdc-dialog__container {
          transition: opacity 75ms linear, transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);
        }
        /* ENDS: style for center placement */
      `
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
        reflect: true
      },
      
      /**
       * True when dialog has header
       */
      _hasHeader: {
        type: Boolean,
        reflect: true
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
    
    if (window.visualViewport) {
      this._visualViewPortHandler = this._viewportHandler.bind(this);
    }
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.updateComplete.then(() => {
      this._initDialog();
      this._listenEvents();
      this._checkAvailableSlot();
    })
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', this._visualViewPortHandler);
    }
  }

  disconnectedCallback() {
    this._unlistenEvents();

    if (this._mdcDialogInstance) {
      this._mdcDialogInstance.destroy();
      this._mdcDialogInstance = null;
    }
  }

  updated(changedProp) {
    if (changedProp.has('opened')) { 
      this._manageFullHeight(); 
      this._onOpenedChanged();
    }
  }

  /**
   * Resize dialog container on viewport resize.
   * @param {Object} e Event
   */
  _viewportHandler(e) {
    const tick = () => {
      const container = this.shadowRoot.querySelector('#dialogContainer');
      container.style.maxHeight = e.target.height + 'px';
      const containerTop = container.getBoundingClientRect().top;
      // This condition required due to behavior of CSS's fixed property. 
      // For reference visit : https://developer.mozilla.org/en-US/docs/Web/CSS/position 
      if (containerTop !== 0) {
        container.style.transform = 'translateY(' + e.target.offsetTop + 'px)';
      } else {
        container.style.transform = 'none';
      }
    }
    window.requestAnimationFrame(tick);
  }

  /**
   * Opens the dialog.
   */
  open() { 
    this.updateComplete.then(() => {
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
    this._mdcDialogInstance.close();
  }

  /**
   * Recalculates layout and automatically adds/removes modifier classes e.g. --scrollable.
   */
  layout() { 
    this._mdcDialogInstance.layout();
    this._manageFullHeight();
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
    const el = this.shadowRoot.querySelector('.mdc-dialog');
    this._mdcDialogInstance = new MDCDialog(el);
    this._mdcDialogInstance.scrimClickAction = this.noCancelOnOutsideClick ? '' : 'close';
    this._mdcDialogInstance.escapeKeyAction = this.noCancelOnEscKey ? '' : 'close';
  }

  /**
   * Sets `_hasHeader` and `_hasFooter` 
   * Based on these properties dom rendering happens
   */
  _checkAvailableSlot() {
    let elHeader = this.querySelector('[slot="header"]') || this.shadowRoot.querySelector('#dialog-header');
    let elFooter = this.querySelector('[slot="footer"]') || this.shadowRoot.querySelector('#dialog-footer');

    this._hasHeader = !!elHeader;
    this._hasFooter = !!elFooter;
  }

  /**
   * Listens `MDCDialog:closed`, `MDCDialog:opened` and scroll events
   */
  _listenEvents() { 
    let el = this.shadowRoot.querySelector('#dialogContainer');
    el.addEventListener('MDCDialog:opened', this._onDialogOpened);
    el.addEventListener('MDCDialog:closed', this._onDialogClosed);

    //Bind scroll event of dialog content.
    let scrollEl = this.shadowRoot.querySelector('#dialog-content');
    scrollEl.addEventListener('scroll', this._onDialogScroll);
  }

  /**
   * Unlistens `MDCDialog:closed`, `MDCDialog:opened` and scroll events
   */
  _unlistenEvents() { 
    let el = this.shadowRoot.querySelector('#dialogContainer');
    if (!el) {
      console.warn('dw-dialog : Somehow dialog is disconnected already before "_unlistenEvents" execution.');
    }
    el && el.removeEventListener('MDCDialog:closed', this._onDialogClosed);
    el && el.removeEventListener('MDCDialog:opened', this._onDialogOpened);

    //Unbind scroll event of dialog content.
    let scrollEl = this.shadowRoot.querySelector('#dialog-content');
    if (!scrollEl) {
      console.warn('dw-dialog : Somehow dialog is disconnected already before "_unlistenEvents" execution.');
    }
    scrollEl && scrollEl.removeEventListener('scroll', this._onDialogScroll);

    //Unbind visualViweport listeners.
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', this._visualViewPortHandler);
    }
  }

  /**
   * Tirggers `dw-dialog-closed` event when dialog is closed
   */
  _onDialogClosed(e) { 
    this.opened = false;
    let event = new CustomEvent('dw-dialog-closed', {
      detail: e.detail,
      bubbles: true,
      composed: true
    });
    
    this.dispatchEvent(event);
  }

   /**
   * Tirggers `dw-dialog-opened` event when dialog is opened
   */
  _onDialogOpened(e) { 
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
    let el = this.shadowRoot.querySelector('.mdc-dialog__surface');
    this._fullHeight = el && window.innerHeight == el.offsetHeight;
  }
  
  /**
   * Invoked when user scroll in dialog content.
   * Manage `scrollUp` or `scrollDown` property based on dialog content scroll position.
   * @protected
   */
  _onDialogScroll() {
    let scrollEl = this.shadowRoot.querySelector('#dialog-content');
    if(!scrollEl) {
      this.scrolledDown = true;
      this.scrolledUp = true;
      return;
    }

    let scrollLength = scrollEl.offsetHeight + scrollEl.scrollTop;
    this.scrolledUp = scrollEl.scrollTop < 15;
    this.scrolledDown = (scrollEl.scrollHeight - 15) <= scrollLength;
  }

  _onOpenedChanged() { 
    this.updateComplete.then(() => {
      if (this.opened && !this._mdcDialogInstance.isOpen) { 
        this.open();
        return;
      }
  
      if (!this.opened && this._mdcDialogInstance.isOpen) { 
        this.close();
        return;
      }
    })
  }

  _setFocusToElement() { 
    let el = this.shadowRoot.querySelector(this.autoFocusSelector);

    if (!el) { 
      el = this.querySelector(this.autoFocusSelector);
    }

    el && el.focus && el.focus();
  }

}

window.customElements.define('dw-dialog', DwDialog);