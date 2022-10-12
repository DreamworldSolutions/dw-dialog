import { adoptStyles } from '@dreamworld/pwa-helpers/lit.js';

/**
 * Purpose: Costimzes renderRoot of element & proxies attribute of element to host element.
 * @param {Object} baseElement Base Element
 */
export const DwCompositeBaseDialogMixin = (baseElement) => class DwCompositeBaseDialog extends baseElement {

  static get properties() {
    return {
      /**
       * Input property. Possible values: 'modal', 'fit', 'popover'
       */
      type: { type: String, reflect: true }
    }
  }

  constructor() {
    super();
    this.type = undefined;
    this.mandatoryProps = ['type'];
    this.constantProps = ['type'];
  }

  /**
   * Customize render root of element.
   */
  createRenderRoot() {
    this._renderRootEl = document.createElement('div');
    this._renderRootEl.id = 'render-root';
    this._renderRootEl.attachShadow(this.constructor.shadowRootOptions);
    this.attachShadow(this.constructor.shadowRootOptions);
    this.shadowRoot.appendChild(this._renderRootEl);
    const renderRoot = this._renderRootEl.shadowRoot;
    adoptStyles(renderRoot, this.constructor.elementStyles)
    return renderRoot;
  }

  /**
   * Sets or Removes attribute to/from "renderRoot" element.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (newValue !== null && newValue !== undefined && name !== 'title') {
      this._renderRootEl && this._renderRootEl.setAttribute(name, newValue);
    } else {
      this._renderRootEl && this._renderRootEl.removeAttribute(name);
    }
  }

  disconnectedCallback() {
    this._renderRootEl && this._renderRootEl.remove();
    super.disconnectedCallback();
  }
}

