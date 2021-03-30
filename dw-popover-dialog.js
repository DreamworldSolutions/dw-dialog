

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
 *    - `--dw-popover-min-width`: Minimum width of popover dialog. Default is 280px
 *    - `--dw-popover-width`: Width of popover dialog. Default is 280px.
 *    - `--dw-popover-overlay-background`: Background of popover overlay. Default is `rgba(0, 0, 0, 0.3)`
 *    - `--dw-popover-animation-time`: Animation time of popover. Default is 0.3s
 *  - Events:
 *    - Dispatches `dw-dialog-opened` & `dw-dialog-closed` events.
 * Implementaiton Notes:
 *  - Extends `DwComposeBaseDialogMixin`
 *  - Renders popover using tippy.js
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
       * Opens dialog when true.
       * Closes dialog when false
       */
      opened: { type: Boolean, reflect: true },

      /**
       * Trigger element for which `popover` dialog is opened.
       */
      triggerElement: { type: Object },

      /**
       * When it's `true`, it hides `triggerElement` when `popover` dialog is opened.
       */
      showTrigger: { type: Boolean },

      /**
       * It's horizontal & vertical offset from `triggerElement`. Value is in pixel. 
       * Default is [0, 0]
       */
      popoverOffset: { type: Array },

      /**
       * Animation of popover dialog. 
       * Possible values are: 'dropdown' or 'scale'. Default is 'dropdown'
       * Note: To apply custom animation, style should be imported explicitly where trigger element exists.
 *     * e.g: if popoverAnimation is "fadeIn" then animation styling should be applied on `.tippy-box[data-animation="fadeIn"]` selector.
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
      fullHeight: { type: Boolean },

      /**
       * `true` when header template is provided.
       */
      _hasHeader: { type: Boolean, reflect: true, attribute: 'has-header' },

      /**
       * `true` when footer template is provided.
       */
      _hasFooter: { type: Boolean, reflect: true, attribute: 'has-footer' },
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
    this.__onKeyDown = this.__onKeyDown.bind(this);
  }

  updated(changedProps) {
    super.updated && super.updated(changedProps);
    if (this.type === 'popover') {
      this._hasHeader = !!this._headerTemplate;
      this._hasFooter = !!this._footerTemplate;
    }
  }

  /**
   * Initializes tippy & shows it.
   * @param {Object} triggerEl Trigger Element
   */
  _init(triggerEl) {
    const dialog = this;
    const offset = this.showTrigger ? dialog.popoverOffset : [0, -(triggerEl.offsetHeight)]
    this._tippyInstance = tippy(triggerEl, {
      placement: dialog.popoverPlacement,
      offset,
      content: dialog._renderRootEl,
      maxWidth: 'none',
      trigger: 'manual',
      interactive: true,
      hideOnClick: false, //Note: interactive does not work in shadowDOM, so explicitly sets it to `false` & closes dialog from `onClickOutside` handler.
      appendTo: 'parent',
      onClickOutside(instance, event) {
        const path = event.composedPath && event.composedPath() || event.path;
        for (let el of path) {
          if (dialog._overlay === el) {
            dialog.close();
            return;
          }
        }
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
        triggerEl.parentNode.appendChild(dialog._sheet);
        triggerEl.parentNode.appendChild(dialog._overlay);
        dialog.__listenEvents();
      },
      onHidden() {
        if (dialog.isConnected) {
          dialog.opened = false;
          dialog.shadowRoot.appendChild(dialog._renderRootEl)
          dialog._overlay.remove();
          dialog._sheet.remove();
          dialog.close();
          dialog.__unlistenEvents();
        }
      },
    });
    this._tippyInstance.show();
  }

  /**
   * Opens popover dialog.
   * @param {Object} triggerEl Trigger Element for which popover dialog should be opened.
   */
  async open(triggerElement) {
    if (this.type !== 'popover') {
      super.open();
      return;
    }
    this.opened = true;
    await this.updateComplete;
    const triggerEl = triggerElement || this.triggerElement;
    if (!triggerEl) {
      console.warn('Trigger element is not provided for popover.');
      return;
    }
    if (this._tippyInstance) {
      return;
    }
    this._init(triggerEl);
  }

  /**
 * Closes the dialog.
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

    this.open();
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
    this.close();
    const event = new CustomEvent('dw-dialog-closed', { bubbles: false });
    this.dispatchEvent(event);
  }

  /**
   * Listens Events.
   * @private
   */
  __listenEvents() {
    document.addEventListener('keydown', this.__onKeyDown, { capture: true });
  }

  /**
   * Unlistens Events.
   * @private
   */
  __unlistenEvents() {
    document.removeEventListener('keydown', this.__onKeyDown, { capture: true });
  }

  /**
   * Closes dialog on `ESC`.
   * @param {Object} e Event
   */
  __onKeyDown(e) {
    const keyCode = e.keyCode || e.which;
    if(keyCode === 27) {
      e.preventDefault();
      e.stopPropagation();
      this.close();
    }
  }

  disconnectedCallback() {
    if (this.type === 'popover') {
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
      this.__unlistenEvents();
    }

    super.disconnectedCallback();
  }
}


export const DwPopoverDialog = DwPopoverDialogMixin(LitElement);

window.customElements.define('dw-popover-dialog', DwPopoverDialog);