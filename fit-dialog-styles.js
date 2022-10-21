import { css } from '@dreamworld/pwa-helpers/lit.js';
export const fitDialogStyles = css`
  /* START Container */
  :host([type="fit"]) {
    display: none;
  }  

  :host([type="fit"][opened]) {
    display: block;
  }
  /* END Container  */     

  /* START Header & Footer */
  :host([type="fit"]) header, 
  :host([type="fit"]) .header, 
  :host([type="fit"]) footer{
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed !important;
    width: 100%;          
    padding: 0px 16px;
    width: 100%;
    max-width: var(--dw-fit-dialog-max-width, 768px);
    right: auto;
    left: 50% !important;
    transform: translate3d(-50%, 0, 0);
    z-index: 101;
  }

  :host([type="fit"]) header, 
  :host([type="fit"]) .header {
    background: var(--dw-fit-dialog-header-background, #FFF);
    top: 0 !important;
    height: var(--dw-fit-dialog-header-height, 56px);
    color: var(--mdc-theme-text-primary, rgba(0, 0, 0, 0.87));
    border-bottom: none !important;
  }

  :host([type="fit"]:not([scrolled-up])) header {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.12), 0 1px 2px 0 rgba(0,0,0,0.24);
  }

  :host([type="fit"]) footer{
    background: var(--dw-fit-dialog-footer-background, #FFF);
    bottom: 0 !important;
    height: var(--dw-fit-dialog-footer-height, 56px);
    border-top: 1px solid  var(--dw-fit-dialog-divider-color, rgba(0, 0, 0, 0.12));
  }

  :host([type="fit"]) footer kerika-button {
    flex: 1 1 1e-09px;
  }

  :host([type="fit"]:not([scrolled-down])) footer {
    box-shadow:  0 -1px 3px 0 rgba(0,0,0,0.12), 0 1px 2px 0 rgba(0,0,0,0.24);
  }  

  :host([type="fit"][modal-dialog-opened]) header,
  :host([type="fit"][modal-dialog-opened]) footer {
    z-index: 99;
  }
  /* END Header & Footer */

  /* START Content */
  :host([type="fit"]) #dialog-content {
    box-sizing: border-box;
    color: var(--mdc-theme-text-secondary, rgba(0, 0, 0, 0.6));
    min-height: 100vh;
    z-index: 100;
  }

  :host([type="fit"][opened]) .mdc-dialog__content{
    box-sizing: border-box;
    background: var(--dw-fit-dialog-content-background, #FFF);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    min-height: 100vh;
    padding: 12px 16px;
    max-width: var(--dw-fit-dialog-max-width, 768px);
    margin: 0px auto;
  }

  :host([type="fit"][opened]:not([has-header])) header,
  :host([type="fit"][opened]:not([has-header])) .header{
    display: none;
  }

  :host([type="fit"][opened]:not([has-footer])) footer {
    display: none !important;
  }

  :host([type="fit"][opened][has-header]) .mdc-dialog__content {
    padding-top: 56px;
  }

  :host([type="fit"][opened][has-footer]) .mdc-dialog__content {
    padding-bottom: 56px;
  }

  :host([type="fit"][opened][scroll-locked]) .mdc-dialog__content,
  :host([type="fit"][opened][modal-dialog-opened]) .mdc-dialog__content {
    position: fixed;
  }

  :host([type="fit"]:not([has-footer])) .mdc-dialog__content {
    padding-bottom: 12px;
  }
  /* END Content */

  :host([type="fit"]) #overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0; 
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--dw-fit-dialog-overlay-color, rgba(0,0,0,0.4));
    z-index: 100;
    cursor: pointer;
  }

  #overlay, 
  #dialog-content {
    animation-name: fadeIn;
    animation-duration: var(--dw-fit-dialog-animation-time, 0.3s);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`