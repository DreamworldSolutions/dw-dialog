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

  :host([type="popover"]:not([has-header])) header,
  :host([type="popover"]:not([has-footer])) footer {
    display: none;
  }

  #popover_dialog__surface {
    border-radius: var(--dw-popover-border-radius, 4px);
    background: var(--mdc-theme-surface, #FFF);
    min-width: var(--dw-popover-min-width, 280px);
    width: var(--dw-popover-width, 280px);
    height: var(--dw-popover-height, auto);
    max-height: var(--dw-popover-max-height, 90vh);
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
`

export const externalStyle = css`
  #popover-overlay {
    position:fixed; 
    top:0; 
    bottom:0; 
    left:0; 
    right:0; 
    background: var(--dw-popover-overlay-background, rgba(0,0,0,0.3));
    will-change: opacity, transform;
    animation-name: fadeIn;
    animation-duration: var(--dw-popover-animation-time, 0.3s);
    z-index: 99;
  }

  .tippy-box {
    box-shadow: var(--dw-popover-box-shadow, var(--mdc-elevation--z2, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)));
    border-radius: var(--dw-popover-border-radius, 4px);
  }

  .tippy-box:focus {
    outline: none;
  }

  .tippy-box[data-animation="dropdown"] {
    will-change: opacity, transform, transform-origin;
    animation-name: dropdown;
    animation-duration: var(--dw-popover-animation-time, 0.3s);
  }

  .tippy-box[data-animation="scale"] {
    will-change: opacity, transform;
    animation-name: scale;
    animation-duration: var(--dw-popover-animation-time, 0.3s);
  }

  .tippy-box[data-animation="expand"] {
    will-change: transform, transform-origin;
    animation-name: expand;
    animation-duration: var(--dw-popover-animation-time, 0.3s);
  }

  .tippy-box[data-animation="expand"][data-placement="bottom-start"] {
    transform-origin: top left;
  }

  .tippy-box[data-animation="expand"][data-placement="bottom-end"] {
    transform-origin: top right;
  }

  .tippy-box[data-animation="expand"][data-placement="top-start"] {
    transform-origin: bottom left;
  }

  .tippy-box[data-animation="expand"][data-placement="top-end"] {
    transform-origin: bottom right;
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

  @keyframes scale {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

@keyframes expand {
  from {
    transform: scale(0)
  }

  50% {
    transform: scale(1)
  }
}
`