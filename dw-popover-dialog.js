

import { LitElement, html, css } from '@dreamworld/pwa-helpers/lit.js';
import { popoverStyle, externalStyle } from './popover-dialog-css.js';
import tippy from 'tippy.js';
import { DwCompositeBaseDialogMixin } from './dw-composite-base-dialog-mixin.js';
import { forEach } from 'lodash-es';

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
 *    - `--dw-popover-height`: Height of popover dialog. Default is auto.
 *    - `--dw-popover-max-height`: Maximum height of dialog. Default is 90vh.
 *    - `--dw-popover-overlay-background`: Background of popover overlay. Default is `rgba(0, 0, 0, 0.3)`
 *  - Events:
 *    - Dispatches `dw-dialog-opened` & `dw-dialog-closed` events.
 * 
 * Implementaiton Notes:
 *  - Extends `DwComposeBaseDialogMixin`
 *  - Renders popover using tippy.js
 *  - When nested popover is opened, On escape closes only last opened dialog.
 *  - When content resized, adjusts it's position automatically.
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
       * Possible values: See referrence: https://atomiks.github.io/tippyjs/v6/all-props/#placement
       */
      popoverPlacement: { type: String },

      /**
       * Input property.
       * Applies virtual padding to the boundary. Default is 8. 
       * For more detail visit this: https://popper.js.org/docs/v2/utils/detect-overflow/#padding
       */
      boundaryPadding: { type: Number },

      /**
       * Element in which content will be appened. Default is parent element of trigger element.
       */
      appendTo: { type: Object },

      /**
       * Input property.
       * Element z-index, default value is 9999. 
       */
      zIndex: { type: Number },

      /**
       * Extra options to be passed to Tippy.js
       */
      extraOptions: { type: Object },

      /**
       * Input property.
       * External styles to be applied on popover dialog
       */
      popoverStyles: { type: Object },

      /**
       * When `true`, shows overlay.
       */
      hasOverlay: { type: Boolean, reflect: true, attribute: 'has-overlay' },

      /**
       * `true` when header template is provided.
       */
      _hasHeader: { type: Boolean, reflect: true, attribute: 'has-header' },

      /**
       * `true` when footer template is provided.
       */
      _hasFooter: { type: Boolean, reflect: true, attribute: 'has-footer' },

      /**
       * This can be used when user wants to render when dialog's open animation is completed.
       */
      _openAnimationCompleted: { type: Boolean },
    };
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
    this.appendTo = 'parent';
    this.boundaryPadding = 8;
    this.__onKeyDown = this.__onKeyDown.bind(this);
    this.OPEN_ANIMATION_TIME = 200; //In milliseconds.
    this.zIndex = 9999;
  }

  updated(changedProps) {
    super.updated && super.updated(changedProps);
    if (this.type === 'popover') {
      this._hasHeader = !!this._headerTemplate;
      this._hasFooter = !!this._footerTemplate;
    }
    if (changedProps.has('opened') && this.type === 'popover') {
      this._onOpenedChanged(this.opened);
    }
  }

  /**
   * Initializes tippy & shows it.
   * @param {Object} triggerEl Trigger Element
   */
  _init(triggerEl) {
    const dialog = this;
    const offset = this.showTrigger ? dialog.popoverOffset : [0, -(triggerEl.offsetHeight)];
    const hideOnClick = this.extraOptions && this.extraOptions.hideOnClick;
    const trigger = this.extraOptions && this.extraOptions.trigger;

    let tippyOptions = {
      ...this.extraOptions,
      placement: dialog.popoverPlacement,
      offset,
      content: dialog._renderRootEl,
      maxWidth: 'none',
      trigger: trigger || 'manual',
      interactive: true,
      hideOnClick: hideOnClick || false, //Note: interactive does not work in shadowDOM, so explicitly sets it to `false` & closes dialog from `onClickOutside` handler.
      appendTo: dialog.appendTo,
      zIndex: this.zIndex,
      onClickOutside(instance, event) {
        if (dialog.doNotCloseOnOutsideClick) {
          return;
        }

        const path = event.composedPath && event.composedPath() || event.path;

        if (dialog.excludeOutsideClickFor && typeof dialog.excludeOutsideClickFor === 'string') {
          const selectors = dialog.excludeOutsideClickFor.split(" ");
          for (let el of path) {
            for (let selector of selectors) {
              if (el.classList && el.classList.contains(selector)) {
                return;
              }
            }
          }
        }

        const tippyBox = instance.popper.querySelector('.tippy-box');
        for (let el of path) {
          if (tippyBox === el) {
            return;
          }
        }
        dialog.close();
      },
      animation: this.popoverAnimation,
      popperOptions: {
        modifiers: [
        {
          name: 'preventOverflow',
          options: {
            altAxis: true,
            padding: dialog.boundaryPadding,
            tether: false
          },
        }]
      },
      onCreate() {
        dialog._sheet = document.createElement('style');
        dialog._sheet.id = 'popover-style';
        dialog._sheet.innerHTML = `${externalStyle.cssText} ${dialog.popoverStyles ? dialog.popoverStyles?.cssText : ''}`;
        const parentEl = dialog.appendTo === 'parent' ? triggerEl.parentNode : dialog.appendTo;
        parentEl.appendChild(dialog._sheet);
        if (dialog.hasOverlay) {
          dialog._overlay = document.createElement('div');
          dialog._overlay.id = 'popover-overlay';
          parentEl.appendChild(dialog._overlay);
        }
        
        dialog.__listenEvents();
        if (!window.__dwPopoverInstances) {
          window.__dwPopoverInstances = [];
        }
        window.__dwPopoverInstances.push(dialog);
      },
      onShow(instance) {
        //On reisze content, sets content of tippy again to manage dialog position.
        dialog._resizeObserver = new ResizeObserver(entries => {
          instance.setContent(dialog._renderRootEl);
        });
        const content = dialog.renderRoot.querySelector('#dialog-content');
        content && dialog._resizeObserver.observe(content);
      },
      onHidden() {
        if (dialog.isConnected) {
          dialog.opened = false;
          dialog.shadowRoot.appendChild(dialog._renderRootEl)
          dialog._overlay && dialog._overlay.remove();
          dialog._sheet && dialog._sheet.remove();
          dialog.close();
          dialog.__unlistenEvents();
          if (window.__dwPopoverInstances && window.__dwPopoverInstances.length) {
            window.__dwPopoverInstances.pop();
          }
          dialog._resizeObserver && dialog._resizeObserver.disconnect();
        }
      },
    }

    this._tippyInstance = tippy(triggerEl, tippyOptions);
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

    forEach(window.openedDwDialogsInstances, element => {
      if (element !== this && element._mdcDialogInstance) {
        element._mdcDialogInstance.escapeKeyAction = '';
      }
    });

    window.openedDwDialogsInstances.push(this);

    this.open();
    const event = new CustomEvent('dw-dialog-opened', { bubbles: false });
    this.dispatchEvent(event);
    setTimeout(() => { this._openAnimationCompleted = true }, this.OPEN_ANIMATION_TIME);
  }

  /**
  * Tirggers `dw-dialog-closed` event when dialog is closed
  */
  _onDialogClosed(e) {
    if (this.type !== 'popover') {
      super._onDialogClosed();
      return;
    }

    window.openedDwDialogsInstances.pop();
    let lastOpenedDialogsInstances = window.openedDwDialogsInstances[window.openedDwDialogsInstances.length - 1];
    if (lastOpenedDialogsInstances && lastOpenedDialogsInstances._mdcDialogInstance) {
      lastOpenedDialogsInstances._mdcDialogInstance.escapeKeyAction = lastOpenedDialogsInstances?.noCancelOnEscKey ? '' : 'close';
    }

    this.close();
    const event = new CustomEvent('dw-dialog-closed', { bubbles: false });
    this.dispatchEvent(event);
    this._openAnimationCompleted = false;
  }

  /**
   * Listens Events.
   * @private
   */
  __listenEvents() {
    document.addEventListener('keydown', this.__onKeyDown, { capture: true });
    this.__onWheelHandler = this.__onWheelHandler.bind(this);
    document.addEventListener('wheel', this.__onWheelHandler, { capture: true, passive: false });
  }

  /**
   * Unlistens Events.
   * @private
   */
  __unlistenEvents() {
    document.removeEventListener('keydown', this.__onKeyDown, { capture: true });
    document.removeEventListener('wheel', this.__onWheelHandler, { capture: true, passive: false });
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
      const lastOpenedDialog = window.__dwPopoverInstances.slice(-1)[0]
      lastOpenedDialog && lastOpenedDialog.close();
    }
  }

  /**
   * Prevents scroll from outside of the dialog.
   * @param {Object} event Event
   */
  __onWheelHandler(event) {
    const path = event.path || (event.composedPath && event.composedPath());
    const scrollEl = this.renderRoot.querySelector('#popover_dialog__surface');
    if (path && path.includes(scrollEl)) {
      return;
    }
    event.preventDefault();
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