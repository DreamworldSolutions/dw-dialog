

import { html, css } from 'lit-element';
import { LitElement } from '@dreamworld/pwa-helpers/lit-element.js';
import { popoverStyle, externalStyle } from './popover-dialog-css.js';
import tippy from 'tippy.js';
import { DwCompositeBaseDialogMixin } from './dw-composite-base-dialog-mixin.js';


/**
 * 
 * Purpose: 
 *  - Renders content into popover.
 * 
 * Usage: 
 *  - This element can be used by extention only. e.g `<my-popover-dialog></my-popover-dialog>`
 *  - CSS properties:
 *    - `--dw-popover-min-width`: Minimum width of popover dialog.
 *    - `--dw-popover-max-width`: Maximum width of popover dialog.
 *    - `--dw-popover-overlay-background`: Background of popover overlay. Default is `rgba(0, 0, 0, 0.3)`
 *    - `--dw-popover-animation-time`: Animation time of popover. Default is 0.3s
 *  - Events:
 *    - Dispatches `dw-popover-opened` & `dw-popover-closed` events.
 * Implementaiton Notes:
 *  - Extends `DwComposeBaseDialogMixin`
 *  - Renders popover using tippy.js
 *
 * 
 */
export const DwPopoverDialogMixin = (baseElement) => class DwPopoverDialog extends DwCompositeBaseDialogMixin(baseElement) {
  static get styles() {
    return [
      popoverStyle,
    ];
  }

  static get properties() {
    return {
      /**
       * Opens dialog if true.
       * Close dialog if false
       */
      opened: { type: Boolean, reflect: true },

      /**
       * It's trigger element for which `popover` dialog is opened.
       */
      triggerElement: { type: Object },

      /**
       * When it's `true`, it hides hides `triggerElement` when `popover` dialog is opened.
       */
      showTrigger: { type: Boolean },

      /**
       * It's horizontal & vertical offset from `triggerElement` value in pixel. 
       * Default is [0, 0]
       */
      popoverOffset: { type: Array },

      /**
       * Animation of popover dialog. 
       * Possible values are: 'dropdown' or 'expand'. Default is 'dropdown'
       */
      popoverAnimation: { type: String },

      /**
       * Sets the placement of the popover dialog
       * Possible value: `bottom-start` or `bottom-end`
       */
      popoverPlacement: { type: String },

      /**
      * Input property. When it's `true`, it's height will be full (up to the bottom of viewport)
      */
      fullHeight: { type: Boolean }
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

  render() {
    if (this.type !== 'popover') {
      return html`${super.render()}`;
    }

    return html`
      <div id="popover_dialog__surface">
        <!-- Dialog Header -->
        <header class="dialog__title" id="dialog-header">${this._headerTemplate}</header>
      
        <!-- Dialog content -->
        <div class="dialog__content" id="dialog-content">
          ${this._contentTemplate}
        </div>
      
        <!-- Dialog footer -->
        <footer id="dialog-footer" class="dialog__footer">${this._footerTemplate}</footer>
      
      </div>
    `;
  }

  constructor() {
    super();
    this.popoverPlacement = 'bottom-start';
    this.popoverAnimation = 'dropdown';
    this.popoverOffset = [0, 0];
    this.type = 'popover';
  }

  /**
   * Initializes tippy & shows it.
   * @param {Object} triggerEl Trigger Element
   */
  _initTippy(triggerEl) {
    const dialog = this;
    const offset = this.showTrigger ? dialog.popoverOffset : [0, -(triggerEl.offsetHeight)]
    this._tippyInstance = tippy(triggerEl, {
      placement: dialog.popoverPlacement,
      offset,
      content: dialog._renderRootEl,
      trigger: 'manual',
      interactive: true,
      hideOnClick: false, //Note: interactive does not work in shadowDOM, so explicitly sets it to `false` & closes dialog from `onClickOutside` handler.
      appendTo: dialog.parentNode,
      onClickOutside(instance, event) { 
        const path = event.path;
        for (let el of path) {
          if (dialog.renderRoot === el) {
            return;
          }
        }
        dialog.close();
      },
      animation: this.popoverAnimation,
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }]
      },
      onCreate() {
        dialog.refreshMaxHeight(triggerEl);
        dialog._overlay = document.createElement('div');
        dialog._overlay.id = 'popover-overlay';
        dialog._sheet = document.createElement('style');
        dialog._sheet.id = 'popover-style';
        dialog._sheet.innerHTML = externalStyle.cssText;
        dialog.parentNode.appendChild(dialog._sheet);
        dialog.parentNode.appendChild(dialog._overlay);
      },
      onHidden() {
        if (dialog.isConnected) {
          dialog.opened = false;
          dialog.shadowRoot.appendChild(dialog._renderRootEl)
          dialog._overlay.remove();
          dialog._sheet.remove();
          dialog.close();
        }

      },
    });
    this._tippyInstance.show();
  }

  /**
   * Opens popover dialog.
   * @param {Object} triggerEl Trigger Element for which popover dialog should be opened.
   */
  open(triggerElement) {
    if (this.type !== 'popover') {
      super.open();
      return;
    }

    if (this.opened) {
      return;
    }

    const triggerEl = triggerElement || this.triggerElement;
    if (!triggerEl) {
      console.warn('Trigger element is not provided for popover.');
      return;
    }

    this.opened = true;
    this.updateComplete.then(() => {
      this._initTippy(triggerEl);
    })
  }

  /**
 * Closes the dialog
 */
  close() {
    if (this.type !== 'popover') {
      super.close();
      return;
    }
    if (this._tippyInstance) {
      this._tippyInstance.hide();
      this._tippyInstance.destroy();
      this._tippyInstance = null;
      this.opened = false;
    }
  }

  /**
   * Refreshes maximum height of popover dialog based on `triggerElement`'s position.
   * @param {Object} triggerElement Trigger element.
   */
  refreshMaxHeight(triggerElement) {
    this.updateComplete.then(() => {
      const surface = this.renderRoot.querySelector('#popover_dialog__surface');
      const maxHeight = `${window.innerHeight - triggerElement.getBoundingClientRect().top}px`;
      surface.style.maxHeight = maxHeight;
      if (this.fullHeight) {
        surface.style.height = maxHeight;
      }
    })
  }

  /**
   * Triggers `_onDialogOpened` or `_onDialogClosed` methods.
   * @param {Boolean} opened Opened
   */
  _onOpenedChanged(opened) {
    if (this.type !== 'popover') {
      super._onOpenedChanged(opened);
      return;
    }
    if (opened) {
      this._onDialogOpened();
    } else {
      this._onDialogClosed();
    }
  }

  /**
   * Tirggers `dw-dialog-opened` event when dialog is opened
   */
  _onDialogOpened(e) {
    if (this.type !== 'popover') {
      super._onDialogOpened();
      return;
    }
    const event = new CustomEvent('dw-dialog-opened', { bubbles: false });
    this.dispatchEvent(event);
  }

  /**
  * Tirggers `dw-dialog-closed` event when dialog is closed
  */
  _onDialogClosed(e) {
    if (this.type !== 'popover') {
      super._onDialogClosed();
      return;
    }
    const event = new CustomEvent('dw-dialog-closed', { bubbles: false });
    this.dispatchEvent(event);
  }

  disconnectedCallback() {
    if (this.type !== 'popover') {
      super.disconnectedCallback && super.disconnectedCallback();
      return;
    }

    if (this._overlay) {
      this._overlay.remove();
      this._overlay = null;
    }

    if (this._sheet) {
      this._sheet.remove();
      this._sheet = null;
    }

    if (this._tippyInstance) {
      this._tippyInstance.hide();
      this._tippyInstance.destroy();
      this._tippyInstance = null;
      this.opened = false;
    }
    super.disconnectedCallback && super.disconnectedCallback();
  }
}


export const DwPopoverDialog = DwPopoverDialogMixin(LitElement);

window.customElements.define('dw-popover-dialog', DwPopoverDialog);