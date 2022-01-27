

import { html, css } from 'lit-element';
import { LitElement } from '@dreamworld/pwa-helpers/lit-element.js';
import { DwModalDialogMixin } from './dw-dialog.js';
import { DwPopoverDialogMixin } from './dw-popover-dialog.js';
import { DwFitDialogMixin } from './dw-fit-dialog.js';
import { DwCompositeBaseDialogMixin } from './dw-composite-base-dialog-mixin.js';
import { ModalDialogStyles } from './mwc-dialog-css.js';
import { popoverStyle } from './popover-dialog-css.js';
import { fitDialogStyles } from './fit-dialog-styles.js';

/**
 * Purpose: Composes `modal`, `fit` & "popover" dialogs.
 * 
 * Usage:
 *  - This dialog can be used by extention only. e.g `<my-composite-dialog></my-composite-dialog>`
 */
export class DwCompositeDialog extends DwCompositeBaseDialogMixin(DwModalDialogMixin(DwFitDialogMixin(DwPopoverDialogMixin(LitElement)))) {
  static get styles() {
    return [
      ModalDialogStyles,
      popoverStyle,
      fitDialogStyles
    ]
  }
}

window.customElements.define('dw-composite-dialog', DwCompositeDialog);