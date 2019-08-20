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
          --mdc-theme-surface: var('--dw-dialog-bg-color', #fff);
          
          display: block;
          outline:none;
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
          min-height: var(--dw-dialog-min-height);
          max-height: var(--dw-dialog-max-height, calc(100% - 32px));
          border-radius: var(--dw-dialog-border-radius, 4px);
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


        /* Style for 'withoutBackdrop' */
        :host([withoutBackdrop]) .mdc-dialog--open .mdc-dialog__scrim {
          opacity: 0
        }
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
      }
    };
  }

  render() {
    return html`
      <div id="dialogContainer" class="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content">
        <div class="mdc-dialog__container">
          <div class="mdc-dialog__surface">

            <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
            ${this._hasHeader ?
              html`
                <h2 class="mdc-dialog__title" id="my-dialog-title"><slot name="header"></slot></h2>
              ` : html``
              }

            <!-- Dialog content -->
            <div class="mdc-dialog__content" id="my-dialog-content">
              <slot></slot>
            </div>

            <!-- Dialog footer -->
            ${this._hasFooter ?
            html`
              <footer class="mdc-dialog__actions">
                <slot name="footer"></slot>
              </footer>
            ` : html``
            }
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
  }

  firstUpdated() {
    this._initDialog();
    this._checkAvailableSlot();
    this._listenEvents();
  }

  disconnectedCallback() {
    this._unlistenEvents();

    if (this._mdcDialogInstance) {
      this._mdcDialogInstance.destroy();
      this._mdcDialogInstance = null;
    }
  }

  /**
   * Opens the dialog.
   */
  open() { 
    this._mdcDialogInstance.open();
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
    let elHeader = this.querySelector('[slot="header"]');
    let elFooter = this.querySelector('[slot="footer"]');

    this._hasHeader = !!elHeader;
    this._hasFooter = !!elFooter;
  }

  /**
   * Listens `MDCDialog:closed` and `MDCDialog:opened` events
   */
  _listenEvents() { 
    let el = this.shadowRoot.querySelector('#dialogContainer');
    el.addEventListener('MDCDialog:opened', this._onDialogOpened);
    el.addEventListener('MDCDialog:closed', this._onDialogClosed);
  }

  /**
   * Unlistens `MDCDialog:closed` and `MDCDialog:opened` events
   */
  _unlistenEvents() { 
    let el = this.shadowRoot.querySelector('#dialogContainer');
    el.removeEventListener('MDCDialog:closed', this._onDialogClosed);
    el.removeEventListener('MDCDialog:opened', this._onDialogOpened);
  }

  /**
   * Tirggers `dw-dialog-closed` event when dialog is closed
   */
  _onDialogClosed(e) { 
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
    let event = new CustomEvent('dw-dialog-opened', {
      detail: e.detail,
      bubbles: true,
      composed: true
    });
    
    this.dispatchEvent(event);
  }

}

window.customElements.define('dw-dialog', DwDialog);