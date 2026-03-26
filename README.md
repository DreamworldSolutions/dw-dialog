# @dreamworld/dw-dialog

A LitElement-based web component library that provides three Material Design dialog types — modal, fit (full-screen), and popover — as composable mixins and ready-to-use custom elements.

---

## 1. User Guide

### Installation & Setup

```sh
yarn add @dreamworld/dw-dialog
```

Import the element you need. Each dialog lives in its own module:

```js
// Modal dialog (composition or extension)
import '@dreamworld/dw-dialog/dw-dialog.js';

// Fit (full-screen) dialog — extension only
import { DwFitDialog } from '@dreamworld/dw-dialog/dw-fit-dialog.js';

// Popover dialog — extension only
import { DwPopoverDialog } from '@dreamworld/dw-dialog/dw-popover-dialog.js';

// Composite dialog (all three types in one element) — extension only
import { DwCompositeDialog } from '@dreamworld/dw-dialog/dw-composite-dialog.js';
```

---

### Basic Usage

#### Modal Dialog — Composition

Use `<dw-dialog>` directly in HTML with named slots for header and footer.

```html
<dw-dialog>
  <span slot="header">Confirm Action</span>
  <p>Are you sure you want to proceed?</p>
  <div slot="footer">
    <button dismiss>Cancel</button>
    <button confirm>Confirm</button>
  </div>
</dw-dialog>

<script>
  const dialog = document.querySelector('dw-dialog');
  dialog.open();
</script>
```

#### Modal Dialog — Extension

```js
import { DwDialog } from '@dreamworld/dw-dialog/dw-dialog.js';
import { html, css } from '@dreamworld/pwa-helpers/lit.js';

class MyAlertDialog extends DwDialog {
  get _headerTemplate() {
    return html`Alert`;
  }

  get _contentTemplate() {
    return html`<p>Something went wrong.</p>`;
  }

  get _footerTemplate() {
    return html`<button confirm>OK</button>`;
  }
}

window.customElements.define('my-alert-dialog', MyAlertDialog);
```

#### Fit Dialog — Extension Only

```js
import { DwFitDialog } from '@dreamworld/dw-dialog/dw-fit-dialog.js';
import { html } from '@dreamworld/pwa-helpers/lit.js';

class MyFitDialog extends DwFitDialog {
  get _headerTemplate() {
    return html`<span>Settings</span>`;
  }

  get _contentTemplate() {
    return html`<div>Full-screen content here.</div>`;
  }

  get _footerTemplate() {
    return html`<button dismiss>Close</button>`;
  }
}

window.customElements.define('my-fit-dialog', MyFitDialog);
```

```html
<my-fit-dialog></my-fit-dialog>

<script>
  document.querySelector('my-fit-dialog').open();
</script>
```

#### Popover Dialog — Extension Only

```js
import { DwPopoverDialog } from '@dreamworld/dw-dialog/dw-popover-dialog.js';
import { html } from '@dreamworld/pwa-helpers/lit.js';

class MyPopoverDialog extends DwPopoverDialog {
  get _headerTemplate() {
    return html`Options`;
  }

  get _contentTemplate() {
    return html`<ul><li>Item 1</li><li>Item 2</li></ul>`;
  }

  get _footerTemplate() {
    return html`<button dismiss>Close</button>`;
  }
}

window.customElements.define('my-popover-dialog', MyPopoverDialog);
```

```html
<button id="trigger">Open Popover</button>
<my-popover-dialog></my-popover-dialog>

<script>
  const trigger = document.getElementById('trigger');
  const popover = document.querySelector('my-popover-dialog');

  trigger.addEventListener('click', () => {
    popover.triggerElement = trigger;
    popover.open();
  });
</script>
```

#### Composite Dialog — Extension Only

Use when a single component must switch between modal, fit, and popover rendering based on a `type` property.

```js
import { DwCompositeDialog } from '@dreamworld/dw-dialog/dw-composite-dialog.js';
import { html } from '@dreamworld/pwa-helpers/lit.js';

class MyDialog extends DwCompositeDialog {
  get _headerTemplate() { return html`Title`; }
  get _contentTemplate() { return html`<p>Content</p>`; }
  get _footerTemplate() { return html`<button dismiss>Close</button>`; }
}

window.customElements.define('my-dialog', MyDialog);
```

```html
<!-- Renders as a modal dialog -->
<my-dialog type="modal"></my-dialog>

<!-- Renders as a fit dialog -->
<my-dialog type="fit"></my-dialog>

<!-- Renders as a popover dialog -->
<my-dialog type="popover"></my-dialog>
```

---

### API Reference

#### `dismiss` and `confirm` Attributes

Adding a `dismiss` or `confirm` attribute to any element inside the footer (or dialog) causes that element's click event to close the dialog. The attribute name is reflected in the `dw-dialog-closed` event's `detail.action` field.

```html
<div slot="footer">
  <button dismiss>No</button>
  <button confirm>Yes</button>
</div>
```

---

#### `<dw-dialog>` (Modal)

**Props**

| Name | Type | Default | Reflects | Description |
|---|---|---|---|---|
| `opened` | `Boolean` | `false` | Yes | Opens the dialog when `true`. |
| `noCancelOnEscKey` | `Boolean` | `false` | No | Disables closing the dialog with the ESC key. |
| `noCancelOnOutsideClick` | `Boolean` | `false` | No | Disables closing by clicking outside the dialog. |
| `withoutBackdrop` | `Boolean` | `false` | Yes | Hides the scrim/backdrop behind the dialog. |
| `placement` | `String` | `'center'` | Yes | Position of the dialog. Possible values: `'center'`, `'bottom'`. |
| `fitHeight` | `Boolean` | `false` | Yes (`fit-height`) | Sets dialog height to viewport height. Applicable only when `placement='bottom'`. |
| `autoFocusSelector` | `String` | `'.mdc-dialog__surface'` | No | CSS selector for the element to auto-focus when the dialog opens. |
| `scrolledDown` | `Boolean` | `true` | Yes (`scrolled-down`) | Output. `true` when the content is scrolled to the bottom. |
| `scrolledUp` | `Boolean` | `true` | Yes (`scrolled-up`) | Output. `true` when the content is scrolled to the top. |
| `type` | `String` | `'modal'` | Yes | Identifies the dialog type. Used internally by `dw-composite-dialog`. |

**Methods**

| Name | Signature | Description |
|---|---|---|
| `open` | `open(triggerEl?)` | Opens the dialog. |
| `close` | `close()` | Closes the dialog. |
| `layout` | `layout()` | Recalculates layout and adds/removes MDC modifier classes (e.g. `--scrollable`). |

**Events**

| Name | Bubbles | Composed | Detail | Description |
|---|---|---|---|---|
| `dw-dialog-opened` | Yes | Yes | MDCDialog opened event detail | Fired when the dialog finishes opening. |
| `dw-dialog-closed` | Yes | Yes | `{ action: 'dismiss' \| 'confirm' \| '' }` | Fired when the dialog finishes closing. |

**Slots**

| Name | Description |
|---|---|
| `header` | Optional header content. |
| `footer` | Optional footer content (action buttons). |
| *(default)* | Main body content. |

**CSS Custom Properties**

| Property | Default | Description |
|---|---|---|
| `--dw-dialog-min-width` | `280px` | Minimum width of the dialog surface. |
| `--dw-dialog-max-width` | `calc(100% - 32px)` | Maximum width. On viewports ≤ 592px this resolves to `calc(100vw - 32px)`. |
| `--dw-dialog-min-height` | — | Minimum height. |
| `--dw-dialog-max-height` | `calc(100% - 32px)` | Maximum height. |
| `--dw-dialog-border-radius` | `4px` | Border radius of the dialog surface. |
| `--dw-dialog-header-background` | — | Background color of the header area. |
| `--dw-dialog-footer-background` | — | Background color of the footer area. |
| `--dw-dialog-divider-color` | `rgba(0,0,0,0.12)` | Color of the header/footer divider border (appears when scrollable). |
| `--dw-dialog-header-padding` | `0px 24px 9px` | Padding of the header area. |
| `--dw-dialog-content-padding` | *(context-dependent)* | Padding of the content area. Value varies based on header/footer presence. |
| `--dw-dialog-footer-padding` | `8px` | Padding of the footer area. |

---

#### `<dw-fit-dialog>` (Full-Screen)

Can only be used via extension.

**Props**

| Name | Type | Default | Reflects | Description |
|---|---|---|---|---|
| `opened` | `Boolean` | `false` | Yes | Opens the dialog when `true`. |
| `scrollLocked` | `Boolean` | `false` | Yes (`scroll-locked`) | Locks page scroll when `true`. Managed automatically for nested dialogs. |
| `autoFocusSelector` | `String` | — | No | CSS selector for the element to auto-focus when the dialog opens. |
| `scrolledDown` | `Boolean` | `true` | Yes (`scrolled-down`) | Output. `true` when scrolled to the bottom. |
| `scrolledUp` | `Boolean` | `true` | Yes (`scrolled-up`) | Output. `true` when scrolled to the top. |

**Methods**

| Name | Signature | Description |
|---|---|---|
| `open` | `open(triggerEl?)` | Opens the dialog and appends its render root to the document body (or the element set via `setAppendTo`). |
| `close` | `close()` | Closes the dialog. |
| `lockScroll` | `lockScroll()` | Manually locks page scroll. |
| `unlockScroll` | `unlockScroll()` | Manually unlocks page scroll. |
| `setAppendTo` *(static)* | `DwFitDialog.setAppendTo(element)` | Sets the element that the dialog render root is appended to on open. Default is `document.body`. |

**Events**

| Name | Bubbles | Composed | Description |
|---|---|---|---|
| `dw-fit-dialog-opened` | No | No | Fired when the dialog opens. |
| `dw-fit-dialog-closed` | No | No | Fired when the dialog closes. |

**CSS Custom Properties**

| Property | Default | Description |
|---|---|---|
| `--dw-fit-dialog-header-height` | `56px` | Height of the header area. |
| `--dw-fit-dialog-footer-height` | `56px` | Height of the footer area. |
| `--dw-fit-dialog-header-background` | `#FFF` | Header background color. |
| `--dw-fit-dialog-content-background` | `#FFF` | Content area background color. |
| `--dw-fit-dialog-footer-background` | `#FFF` | Footer background color. |
| `--dw-fit-dialog-max-width` | `768px` | Maximum width of the dialog container. |
| `--dw-fit-dialog-overlay-color` | `rgba(0,0,0,0.4)` | Color of the overlay behind the dialog. |
| `--dw-fit-dialog-animation-time` | `0.3s` | Open/close animation duration. |
| `--dw-fit-dialog-divider-color` | `rgba(0,0,0,0.12)` | Color of the header/footer divider. |

---

#### `<dw-popover-dialog>` (Popover)

Can only be used via extension. Requires a `triggerElement` to anchor the popover.

**Props**

| Name | Type | Default | Reflects | Description |
|---|---|---|---|---|
| `opened` | `Boolean` | `false` | Yes | Opens the popover when `true`. |
| `triggerElement` | `Object` | — | No | **Required.** The DOM element the popover is anchored to. |
| `showTrigger` | `Boolean` | `false` | No | When `true`, shows the trigger element while the popover is open (uses `popoverOffset`). When `false` (default), positions relative to trigger element's bounds. |
| `popoverOffset` | `Array` | `[0, 0]` | No | `[skidding, distance]` offset from the trigger element in pixels. Used when `showTrigger` is `true`. |
| `popoverAnimation` | `String` | `'dropdown'` | No | Animation type. Possible values: `'dropdown'`, `'scale'`. Custom animations can be applied via `.tippy-box[data-animation="<name>"]`. |
| `popoverPlacement` | `String` | `'bottom-start'` | No | Placement relative to `triggerElement`. Accepts all [Tippy.js placement values](https://atomiks.github.io/tippyjs/v6/all-props/#placement). |
| `boundaryPadding` | `Number` | `8` | No | Virtual padding (px) applied to the viewport boundary when auto-adjusting position. |
| `appendTo` | `Object\|String` | `'parent'` | No | Element to append the popover into. Default `'parent'` uses the trigger element's parent node. |
| `zIndex` | `Number` | `9999` | No | CSS `z-index` of the Tippy popover. |
| `extraOptions` | `Object` | — | No | Additional options passed directly to the Tippy.js instance. |
| `popoverStyles` | `Object` | — | No | A CSSResult object whose `cssText` is injected as an inline `<style>` tag alongside the popover. |
| `hasOverlay` | `Boolean` | `false` | Yes (`has-overlay`) | When `true`, renders an overlay element behind the popover. |
| `doNotCloseOnOutsideClick` | `Boolean` | — | No | When `true`, outside clicks do not close the popover. *(Not declared as a LitElement property; set directly on the instance.)* |
| `excludeOutsideClickFor` | `String` | — | No | Space-separated CSS class names. Clicks on elements with these classes will not close the popover. Only evaluated when `doNotCloseOnOutsideClick` is falsy. *(Not declared as a LitElement property; set directly on the instance.)* |

**Methods**

| Name | Signature | Description |
|---|---|---|
| `open` | `async open(triggerElement?)` | Opens the popover. Optionally accepts a trigger element; falls back to `this.triggerElement`. |
| `close` | `close()` | Closes and destroys the Tippy instance. |

**Events**

| Name | Bubbles | Composed | Description |
|---|---|---|---|
| `dw-dialog-opened` | No | No | Fired when the popover opens. |
| `dw-dialog-closed` | No | No | Fired when the popover closes. |

**CSS Custom Properties**

| Property | Default | Description |
|---|---|---|
| `--dw-popover-min-width` | `280px` | Minimum width of the popover. |
| `--dw-popover-width` | `280px` | Width of the popover. |
| `--dw-popover-height` | `auto` | Height of the popover. |
| `--dw-popover-max-height` | `90vh` | Maximum height of the popover. |
| `--dw-popover-overlay-background` | `rgba(0,0,0,0.3)` | Background of the optional overlay. |
| `--dw-popover-animation-time` | `0.3s` | Animation duration. |
| `--dw-popover-border-radius` | `4px` | Border radius of the popover surface. |
| `--dw-popover-box-shadow` | *(mdc-elevation--z2)* | Box shadow of the popover surface. |

---

#### `<dw-composite-dialog>`

A single component that combines modal, fit, and popover behavior. The active rendering mode is controlled by the `type` property.

- **Extension only** — override `_headerTemplate`, `_contentTemplate`, `_footerTemplate`.
- `type` is a **mandatory, constant** property that must be set before or at construction time.
- Inherits all props, methods, events, and CSS variables from all three dialog types; only the ones matching the active `type` are in effect at any time.

---

### Advanced Usage

#### Template Methods

All dialog types support three getter-based template methods that can be overridden in a subclass. These are the primary extension points.

```js
get _headerTemplate() { return html`...`; }
get _contentTemplate() { return html`...`; }
get _footerTemplate() { return html`...`; }
```

Returning a falsy value from `_headerTemplate` or `_footerTemplate` suppresses the corresponding DOM region entirely.

#### Styling Extension Zones

When extending any dialog, target these stable `id` selectors to apply scoped styles:

| ID | Zone |
|---|---|
| `#dialog-header` | Header container |
| `#dialog-content` | Content container |
| `#dialog-footer` | Footer container |

```js
static get styles() {
  return [
    super.styles,
    css`
      #dialog-header { background: #f5f5f5; }
      #dialog-content { padding: 24px; }
      #dialog-footer { border-top: 1px solid #e0e0e0; }
    `
  ];
}
```

#### Nested Dialogs

All dialog types automatically manage stacking. When a second dialog opens:
- Only the topmost dialog responds to ESC key.
- Fit dialogs lock the scroll of any underlying fit dialog and restore it on close.
- Popover dialogs track instances in `window.__dwPopoverInstances`; ESC closes only the last opened one.

#### Mixin Usage

Each dialog type is exported as a mixin, allowing you to compose them onto a custom base class:

```js
import { DwModalDialogMixin } from '@dreamworld/dw-dialog/dw-dialog.js';
import { LitElement } from '@dreamworld/pwa-helpers/lit.js';

class MyBaseDialog extends DwModalDialogMixin(LitElement) { ... }
```

The mixin chain used by `DwCompositeDialog`:

```js
DwCompositeBaseDialogMixin(
  DwModalDialogMixin(
    DwFitDialogMixin(
      DwPopoverDialogMixin(LitElement)
    )
  )
)
```

---

## 2. Developer Guide / Architecture

### Architecture Overview

```
┌─────────────────────────────────────────────────┐
│              DwCompositeDialog                  │
│  (DwCompositeBaseDialogMixin                    │
│    (DwModalDialogMixin                          │
│      (DwFitDialogMixin                          │
│        (DwPopoverDialogMixin(LitElement)))))    │
└────────────────────┬────────────────────────────┘
                     │ composes
     ┌───────────────┼───────────────┐
     ▼               ▼               ▼
DwModalDialogMixin  DwFitDialogMixin  DwPopoverDialogMixin
(dw-dialog.js)      (dw-fit-dialog.js) (dw-popover-dialog.js)
     │                    │                  │
     │ wraps               │ uses             │ uses
     ▼                    ▼                  ▼
MDCDialog              LitElement +       Tippy.js
(@material/dialog)     Custom DOM         (popover positioning)
```

### Module Responsibilities

| Module | Exported Symbols | Responsibility |
|---|---|---|
| `dw-dialog.js` | `DwModalDialogMixin`, `DwDialog` | Wraps MDCDialog; provides modal overlay, placement, scroll tracking. |
| `dw-fit-dialog.js` | `DwFitDialogMixin`, `DwFitDialog` | Full-screen dialog appended to body; manages scroll locking and stacking. |
| `dw-popover-dialog.js` | `DwPopoverDialogMixin`, `DwPopoverDialog` | Tippy.js-anchored popover; handles overlay, outside-click, and wheel events. |
| `dw-composite-dialog.js` | `DwCompositeDialog` | Combines all three mixins into one element; dispatches to the correct mixin based on `type`. |
| `dw-composite-base-dialog-mixin.js` | `DwCompositeBaseDialogMixin` | Customizes the render root to create a separate DOM container; proxies attributes for fit/popover dialogs. |
| `component.js` | `MDCDialog` | Thin re-export of the MDC Dialog foundation used by `DwModalDialogMixin`. |
| `mwc-dialog-css.js` | `ModalDialogStyles` | Scoped CSS for `[type="modal"]`. |
| `fit-dialog-styles.js` | `fitDialogStyles` | Scoped CSS for `[type="fit"]`. |
| `popover-dialog-css.js` | `popoverStyle`, `externalStyle` | Scoped CSS for `[type="popover"]` and inline styles injected alongside the Tippy container. |

### Design Patterns

**Mixin Pattern**
Each dialog type is a factory function `(baseElement) => class extends baseElement { ... }`. This allows them to be stacked in any order and applied to any LitElement subclass without multiple inheritance conflicts.

**Template Method Pattern**
`_headerTemplate`, `_contentTemplate`, and `_footerTemplate` are getter-based hooks. The base mixin calls them in `render()`; subclasses override them to supply content. Returning `null`/`undefined` suppresses that region's DOM.

**Type-Based Branching**
All lifecycle methods (`open`, `close`, `render`, `updated`, etc.) in `DwModalDialogMixin` check `if (this.type !== 'modal')` before executing and delegate to `super` otherwise. This allows the same class to serve as a no-op passthrough when a different mixin is active in the `DwCompositeDialog` chain.

**Global Window State**
Three window-level arrays coordinate multi-dialog stacking without a centralized store:

| Variable | Used by | Purpose |
|---|---|---|
| `window.openedDwDialogsInstances` | Modal + Fit | Tracks all open modal/fit instances; controls ESC key routing. |
| `window.openedDwFitDialogsInstances` | Fit | Tracks open fit dialogs for scroll-lock and scroll-position restoration. |
| `window.__dwPopoverInstances` | Popover | Tracks open popovers; ESC closes only the last entry. |

### Dependencies

| Package | Version | Role |
|---|---|---|
| `@dreamworld/pwa-helpers` | `^1.14.0` | Provides `LitElement`, `html`, `css` re-exports. |
| `@material/dialog` | `^14.0.0` | MDCDialog foundation for modal dialogs. |
| `tippy.js` | `^6.2.7` | Popover positioning and lifecycle for `dw-popover-dialog`. |
| `lodash-es` | `^4.17.15` | `forEach`, `isEmpty`, `findIndex` utilities. |
| `@dreamworld/material-styles` | `^3.1.0` | Material shadow elevation styles used by `DwCompositeDialog`. |
