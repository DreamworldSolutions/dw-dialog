

import { LitElement, html, css } from '@dreamworld/pwa-helpers/lit.js';
import { DwModalDialogMixin } from './dw-dialog.js';
import { DwPopoverDialogMixin } from './dw-popover-dialog.js';
import { DwFitDialogMixin } from './dw-fit-dialog.js';
import { DwCompositeBaseDialogMixin } from './dw-composite-base-dialog-mixin.js';
import { ModalDialogStyles } from './mwc-dialog-css.js';
import { popoverStyle } from './popover-dialog-css.js';
import { fitDialogStyles } from './fit-dialog-styles.js';
import { Shadow } from '@dreamworld/material-styles/shadow.js';

/**
 * Purpose: Composes `modal`, `fit` & "popover" dialogs.
 * 
 * Usage:
 *  - This dialog can be used by extension only. e.g `<my-composite-dialog></my-composite-dialog>`
 */
export class DwCompositeDialog extends DwCompositeBaseDialogMixin(DwModalDialogMixin(DwFitDialogMixin(DwPopoverDialogMixin(LitElement)))) {
  static get styles() {
    return [
      Shadow,
      ModalDialogStyles,
      popoverStyle,
      fitDialogStyles
    ]
  }
}

window.customElements.define('dw-composite-dialog', DwCompositeDialog);