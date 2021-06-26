import { css } from 'lit-element';

export const ModalDialogStyles = css`
  :host([type="modal"]) {
    display: block;
    outline: none;
    color: var(--mdc-theme-text-primary);
  }

  /* STARTS dialog container style */

  :host([type="modal"]:not([has-header])) .mdc-dialog.mdc-dialog--scrollable .mdc-dialog__surface {
    padding-top: 8px;
  }

  :host([type="modal"]:not([has-footer])) .mdc-dialog.mdc-dialog--scrollable .mdc-dialog__surface {
    padding-bottom: 8px;
  }

  :host([type="modal"]) .mdc-dialog .mdc-dialog__surface {
    min-width: var(--dw-dialog-min-width, 280px);
    max-width: var(--dw-dialog-max-width, calc(100% - 32px));
    min-height: var(--dw-dialog-min-height);
    max-height: var(--dw-dialog-max-height, calc(100% - 32px));
    border-radius: var(--dw-dialog-border-radius, 4px);
    box-shadow: 0px 2px 6px #ccc;
  }


  /* ENDS dialog container style */

  :host([type="modal"]) .mdc-dialog,
  :host([type="modal"]) .mdc-dialog__scrim {
    position: fixed;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  :host([type="modal"]) .mdc-dialog {
    display: none;
    z-index: 7;
  }

  :host([type="modal"]) .mdc-dialog .mdc-dialog__surface {
    background-color: #fff;
    /* @alternate */
    background-color: var(--mdc-theme-surface, #fff);
  }

  :host([type="modal"]) .mdc-dialog .mdc-dialog__scrim {
    background-color: rgba(0, 0, 0, 0.32);
  }

  :host([type="modal"]) .mdc-dialog .mdc-dialog__title {
    color: rgba(0, 0, 0, 0.87);
  }

  :host([type="modal"]) .mdc-dialog .mdc-dialog__content {
    color: rgba(0, 0, 0, 0.6);
  }

  :host([type="modal"]) .mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,
  :host([type="modal"]) .mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions {
    border-color: rgba(0, 0, 0, 0.12);
  }

  :host([type="modal"]) .mdc-dialog .mdc-dialog__surface {
    min-width: 280px;
  }

  @media (max-width: 592px) {
    :host([type="modal"]) .mdc-dialog .mdc-dialog__surface {
      max-width: var(--dw-dialog-max-width, calc(100vw - 32px));
    }
  }

  @media (min-width: 592px) {
    :host([type="modal"]) .mdc-dialog .mdc-dialog__surface {
      max-width: var(--dw-dialog-max-width, 560px);
    }
  }

  :host([type="modal"]) .mdc-dialog .mdc-dialog__surface {
    max-height: calc(100% - 32px);
  }

  :host([type="modal"]) .mdc-dialog__scrim {
    opacity: 0;
    z-index: -1;
  }

  :host([type="modal"]) .mdc-dialog__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    height: 100%;
    transform: scale(0.8);
    opacity: 0;
    pointer-events: none;
  }

  :host([type="modal"]) .mdc-dialog__surface {
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;
    pointer-events: auto;
    overflow-y: auto;
  }

  :host([type="modal"]) .mdc-dialog[dir="rtl"] .mdc-dialog__surface,
  [dir="rtl"] .mdc-dialog .mdc-dialog__surface {
    /* @noflip */
    text-align: right;
  }

  :host([type="modal"]) .mdc-dialog__title {
    display: block;
    margin-top: 0;
    /* @alternate */
    line-height: normal;
    font-family: Roboto, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-size: 1.25rem;
    line-height: 2rem;
    font-weight: 500;
    letter-spacing: 0.0125em;
    text-decoration: inherit;
    text-transform: inherit;
    position: relative;
    flex-shrink: 0;
    box-sizing: border-box;
    margin: 0;
    padding: 0 24px 9px;
    border-bottom: 1px solid transparent;
  }

  :host([type="modal"]) .mdc-dialog__title::before {
    display: inline-block;
    width: 0;
    height: 40px;
    content: "";
    vertical-align: 0;
  }

  :host([type="modal"]) .mdc-dialog[dir="rtl"] .mdc-dialog__title,
  [dir="rtl"] .mdc-dialog .mdc-dialog__title {
    /* @noflip */
    text-align: right;
  }

  :host([type="modal"]) .mdc-dialog--scrollable .mdc-dialog__title {
    padding-bottom: 15px;
  }

  :host([type="modal"]) .mdc-dialog__content {
    font-family: Roboto, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.03125em;
    text-decoration: inherit;
    text-transform: inherit;
    flex-grow: 1;
    box-sizing: border-box;
    margin: 0;
    padding: 20px 24px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  :host([type="modal"]) .mdc-dialog__content> :first-child {
    margin-top: 0;
  }

  :host([type="modal"]) .mdc-dialog__content> :last-child {
    margin-bottom: 0;
  }

  :host([type="modal"]) .mdc-dialog__title+.mdc-dialog__content {
    padding-top: 0;
  }

  :host([type="modal"]) .mdc-dialog--scrollable .mdc-dialog__content {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  :host([type="modal"]) .mdc-dialog__content .mdc-list:first-child:last-child {
    padding: 6px 0 0;
  }

  :host([type="modal"]) .mdc-dialog--scrollable .mdc-dialog__content .mdc-list:first-child:last-child {
    padding: 0;
  }

  :host([type="modal"]) .mdc-dialog__actions {
    display: flex;
    position: relative;
    flex-shrink: 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    min-height: 52px;
    margin: 0;
    padding: 8px;
    border-top: 1px solid transparent;
  }

  :host([type="modal"]) .mdc-dialog--stacked .mdc-dialog__actions {
    flex-direction: column;
    align-items: flex-end;
  }

  :host([type="modal"]) .mdc-dialog__button {
    /* @noflip */
    margin-left: 8px;
    /* @noflip */
    margin-right: 0;
    max-width: 100%;
    /* @noflip */
    text-align: right;
  }

  :host([type="modal"]) [dir="rtl"] .mdc-dialog__button,
  :host([type="modal"]) .mdc-dialog__button[dir="rtl"] {
    /* @noflip */
    margin-left: 0;
    /* @noflip */
    margin-right: 8px;
  }

  :host([type="modal"]) .mdc-dialog__button:first-child {
    /* @noflip */
    margin-left: 0;
    /* @noflip */
    margin-right: 0;
  }

  :host([type="modal"]) [dir="rtl"] .mdc-dialog__button:first-child,
  :host([type="modal"]) .mdc-dialog__button:first-child[dir="rtl"] {
    /* @noflip */
    margin-left: 0;
    /* @noflip */
    margin-right: 0;
  }

  :host([type="modal"]) .mdc-dialog[dir="rtl"] .mdc-dialog__button,
  :host([type="modal"]) [dir="rtl"] .mdc-dialog .mdc-dialog__button {
    /* @noflip */
    text-align: left;
  }

  :host([type="modal"]) .mdc-dialog--stacked .mdc-dialog__button:not(:first-child) {
    margin-top: 12px;
  }

  :host([type="modal"]) .mdc-dialog--open,
  :host([type="modal"]) .mdc-dialog--opening,
  :host([type="modal"]) .mdc-dialog--closing {
    display: flex;
  }

  :host([type="modal"]) .mdc-dialog--opening .mdc-dialog__scrim {
    transition: opacity 150ms linear;
  }

  :host([type="modal"]) .mdc-dialog--closing .mdc-dialog__scrim,
  :host([type="modal"]) .mdc-dialog--closing .mdc-dialog__container {
    transition: opacity 75ms linear;
  }

  :host([type="modal"]) .mdc-dialog--closing .mdc-dialog__container {
    transform: scale(1);
  }

  :host([type="modal"]) .mdc-dialog--open .mdc-dialog__scrim {
    opacity: 1;
  }

  :host([type="modal"]) .mdc-dialog--open .mdc-dialog__container {
    transform: scale(1);
    opacity: 1;
  }

  :host([type="modal"]) .mdc-dialog-scroll-lock {
    overflow: hidden;
  }

  /* STARTS dialog header style */

  :host([type="modal"]) .mdc-dialog__title {
    background: var(--dw-dialog-header-background);
    padding: var(--dw-dialog-header-padding, 0px 24px 9px);
  }

  :host([type="modal"]) .mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title {
    border-color: var(--dw-dialog-divider-color, rgba(0, 0, 0, 0.12));
  }
  /* ENDS dialog header style */

  /* STARTS dialog footer style */
  :host([type="modal"]) .mdc-dialog__actions {
    background: var(--dw-dialog-footer-background);
    padding: var(--dw-dialog-footer-padding, 8px);
  }
  /* ENDS dialog footer style */

  :host([type="modal"]) .mdc-dialog .mdc-dialog__content {
    color: var(--mdc-theme-text-primary, rgba(0, 0, 0, 0.87));
  }

  :host([type="modal"]:not([scrolled-down])) .mdc-dialog footer {
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  }

  :host([type="modal"]:not([scrolled-up])) .mdc-dialog .mdc-dialog__title {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  }

  :host([type="modal"]) .mdc-dialog .mdc-dialog__title {
    color: var(--mdc-theme-text-primary, rgba(0, 0, 0, 0.87));
    border-bottom: none !important;
  }

  :host([type="modal"]) .mdc-dialog footer {
    border-top: 1px solid var(--dw-dialog-divider-color, rgba(0, 0, 0, 0.12)) !important;
  }

  /* Style for 'withoutBackdrop' */

  :host([type="modal"][withoutBackdrop]) .mdc-dialog--open .mdc-dialog__scrim {
    opacity: 0
  }


  /* STARTS: style for bottom placement */

  :host([type="modal"][placement="bottom"]) .mdc-dialog__container {
    align-items: flex-end;
  }

  :host([type="modal"][placement="bottom"]) .mdc-dialog--opening .mdc-dialog__container .mdc-dialog__surface {
    animation: slideInUp 0.2s forwards;
  }

  :host([type="modal"][placement="bottom"]) .mdc-dialog .mdc-dialog__surface {
    width: 100%;
    min-width: var(--dw-dialog-min-width, 100%);
    max-width: var(--dw-dialog-max-width, 100%);
    max-height: var(--dw-dialog-max-height, 100%);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host([type="modal"][placement="bottom"]) .mdc-dialog .mdc-dialog__container {
    width: 100%;
  }

  :host([type="modal"][opened][placement="bottom"][fit-height]),
  :host([type="modal"][opened][placement="bottom"][fit-height]) .mdc-dialog__surface {
    position: fixed;
    top: 0;
    bottom: 0;
  }

  :host([type="modal"]:not([has-footer])) .mdc-dialog .mdc-dialog__content {
    padding-bottom: 12px;
  }

  :host([type="modal"][opened][placement="bottom"][full-height]) .mdc-dialog__surface,
  :host([type="modal"][opened][placement="bottom"][fit-height]) .mdc-dialog__surface {
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

  :host([type="modal"][placement="center"]) .mdc-dialog__container {
    transition: opacity 75ms linear, transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);
  }
/* ENDS: style for center placement */
`