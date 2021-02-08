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

  /**
   * Customize render root of element.
   */
  createRenderRoot() {
    this._renderRootEl = document.createElement('div');
    this._renderRootEl.id = 'render-root';
    this._renderRootEl.attachShadow({ mode: 'open' });
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this._renderRootEl);
    return this._renderRootEl.shadowRoot;
  }

  /**
   * Sets or Removes attribute to/from "renderRoot" element.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (newValue !== null && newValue !== undefined) {
      this._renderRootEl && this._renderRootEl.setAttribute(name, newValue);
    } else {
      this._renderRootEl && this._renderRootEl.removeAttribute(name);
    }
  }

  disconnectedCallback() {
    this._renderRootEl && this._renderRootEl.remove();
    this._renderRootEl = null;
    super.disconnectedCallback();
  }
}

