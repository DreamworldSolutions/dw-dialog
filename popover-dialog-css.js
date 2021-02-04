import { css } from 'lit-element';

export const popoverStyle = css`
  :host([type="popover"]) {
    display: none;
    outline:none;
    color: var(--mdc-theme-text-primary);
    background-color: var(--mdc-theme-surface);
  }

  :host([type="popover"][opened]) {
    display: block;
    background: transparent;
  }

  #popover_dialog__surface {
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    border-radius: var(--dw-popover-border-radius, 4px);
    background: var(--mdc-theme-surface, #FFF);
    min-width: var(--dw-popover-min-width, 280px);
    overflow: auto;
    z-index: 101;
  }

  :host([type="popover"]) header, 
  :host([type="popover"]) footer {
    position: sticky;
    top: 0;
    background: var(--mdc-theme-surface, #FFF);
    padding: 16px;
    z-index: 1;
  }

  :host([type="popover"]) header {
    top: 0;
  }

  :host([type="popover"]) footer {
    bottom: 0;
  }

  #overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
  }
`

export const externalStyle = css`
  #popover-overlay {
    position:fixed; 
    top:0; 
    bottom:0; 
    left:0; 
    right:0; 
    background: var(--dw-popover-overlay-background, rgba(0,0,0,0.3));
    animation-name: fadeIn;
    animation-duration: var(--dw-popover-animation-time, 0.3s);
  }

  .tippy-box:focus {
    outline: none;
  }

  .tippy-box[data-animation="dropdown"] {
    animation-name: dropdown;
    animation-duration: var(--dw-popover-animation-time, 0.3s);
  }

  @keyframes dropdown {
    from {
      opacity: 0;
      transform-origin: left top;
      transform: scaleY(0);
    }

    to {
      opacity: 1;
      transform-origin: left top;
      transform: scaleY(1);
    }
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