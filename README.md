# dw-dialog

- A dialog element with Material Design styling. [More detail](https://github.com/material-components/material-components-web/tree/master/packages/mdc-dialog)
- Provides 3 types of dialog.
  - modal
  - fit
  - popover

## Installation

``` html
npm install --save @dreamworld/dw-dialog
```

## Usage
### `dw-dialog`
``` html
  import '@dreamworld/dw-dialog/dw-dialog.js';
```
### `dw-fit-dialog`
``` html
    import { DwFitDialog } from '@dreamworld/dw-dialog/dw-fit-dialog.js';
```

### `dw-popover-dialog`
``` html
    import { DwPopoverDialog } from '@dreamworld/dw-dialog/dw-popover-dialog.js';
```

### `dw-composite-dialog`
``` html
    import { DwCompositeDialog } from '@dreamworld/dw-dialog/dw-composite-dialog.js';
```

## Usage pattern

- There is 2 ways to use dialog.
  1. extension
  2. composition

- `dw-fit-dialog`, `dw-popover-dialog` & `dw-composite-dialog` can be used by extention only.

### Using extension
#### dw-dialog
- Provide 3 methods `_headerTemplate`, `_contentTemplate` and `_footerTemplate` to provide dialog's header, content and footer

``` html
  import { DwDialog } from '@dreamworld/dw-dialog/dw-dialog.js';

  class SampleDialog extends DwDialog{
    static get styles() {
      return [
        Style,
        css`
          .mdc-dialog__title{
            // Customize header's style from here
          }

          .mdc-dialog__content{
            // Customize content's style from here
          }

          .mdc-dialog__actions{
            // Customize footer's style from here
          }
        `
      ]
    }

    get _headerTemplate() { return html`Title 1` }
    get _contentTemplate() { return html`<h2>Content</h2>` }
    get _footerTemplate() { return html`<button dismiss>Cancel</button>` }
  }
```

#### dw-fit-dialog
- Provide 3 methods `_headerTemplate`, `_contentTemplate` and `_footerTemplate` to provide dialog's header, content and footer

``` html
  import { DwFitDialog } from '@dreamworld/dw-dialog/dw-dialog.js';

  class MyFitDialog extends DwFitDialog{

    static get styles() {
      return [
        Style,
        css`
          header {
            // Customize header's style from here
          }

          .mdc-dialog__content{
            // Customize content's style from here
          }

          footer {
            // Customize footer's style from here
          }
        `
      ]
    }

    get _headerTemplate() { return html`Title 1` }
    get _contentTemplate() { return html`<h2>Content</h2>` }
    get _footerTemplate() { return html`<button dismiss>Cancel</button>` }
  }

  window.customElements.define('my-fit-dialog', MyFitDialog);
```

#### dw-popover-dialog
- Provide 3 methods `_headerTemplate`, `_contentTemplate` and `_footerTemplate` to provide dialog's header, content and footer

``` html
  import { DwPopoverDialog } from '@dreamworld/dw-dialog/dw-popover-dialog.js';

  class MyPopoverDialog extends DwPopoverDialog{
    constructor(){
      super();
      this.triggerElement; //This is mandatory property.
    }

    static get styles() {
      return [
        css`
          header {
            // Customize header's style from here
          }

          .mdc-dialog__content{
            // Customize content's style from here
          }

          footer {
            // Customize footer's style from here
          }
        `
      ]
    }

    get _headerTemplate() { return html`Title 1` }
    get _contentTemplate() { return html`<h2>Content</h2>` }
    get _footerTemplate() { return html`<button dismiss>Cancel</button>` }
  }

  window.customElements.define('my-popover-dialog', MyPopoverDialog);
```

#### dw-composite-dialog
- Provide 3 methods `_headerTemplate`, `_contentTemplate` and `_footerTemplate` to provide dialog's header, content and footer

``` html
  import { DwCompositeDialog } from '@dreamworld/dw-dialog/dw-composite-dialog.js';

  class MyCompositeDialog extends DwCompositeDialog{

    static get styles() {
      return [
        css`
          header {
            // Customize header's style from here
          }

          .mdc-dialog__content{
            // Customize content's style from here
          }

          footer {
            // Customize footer's style from here
          }
        `
      ]
    }

    get _headerTemplate() { return html`Title 1` }
    get _contentTemplate() { return html`<h2>Content</h2>` }
    get _footerTemplate() { return html`<button dismiss>Cancel</button>` }
  }

  window.customElements.define('my-popover-dialog', MyPopoverDialog);
```

### Using composition

#### dw-dialog
``` html
  <dw-dialog>
    <span slot="header">View dialog</span>
    <div>Dialog's content</div>
    <div slot="footer">
      <button dismiss>Close</button>
    </div>
  </dw-dialog>
```

## Example Usage

### Standard

```html
<dw-dialog>
  <span slot="header">Title</span>
  <div>Dialog content</div>
  <div slot="footer">
    <button dismiss>Close</button>
  </div>
</dw-dialog>
```

### Modal

```html
<dw-dialog noCancelOnEscKey noCancelOnOutsideClick>
  <span slot="header">Title</span>
  <div>Dialog content</div>
  <div slot="footer">
    <button dismiss>Close</button>
  </div>
</dw-dialog>
```

### Without backdrop(Scrim)

```html
<dw-dialog withoutBackdrop>
  <span slot="header">Title</span>
  <div>Dialog content</div>
  <div slot="footer">
    <button dismiss>Close</button>
    <button confirm>Save</button>
  </div>
</dw-dialog>
```

### Default opened

```html
<dw-dialog opened>
  <span slot="header">Title</span>
  <div>Dialog content</div>
  <div slot="footer">
    <button dismiss>Close</button>
  </div>
</dw-dialog>
```

## Properties
### `dw-dialog`
- noCancelOnEscKey - Set to true to disable canceling the overlay with the ESC key.
- noCancelOnOutsideClick - Set to true to disable canceling the overlay by clicking outside it.
- withoutBackdrop - Set to true to hide dialog backdrop(dialog__scrim)
- placement - Set the placement of dialog. possibles values are `center`(Default) and `bottom`
- `fit-height` - Sets the height of dialog to viewport height (fit to viewport). It is applicable only if `placement` is set to `bottom`.
- opened - Set to true to open the dialog. You can also use `open()` and `close()` method.

### `dw-popover-dialog
- `triggerElement` - It's used to anchor popover dialog.
- `showTrigger` - When it's set to `true`, shows trigger element when dialog is opened. By default it's falsy.
- `popoverOffset` - Offset of the popoever dialog. It's used only when `showTrigger` is set to `true` otherwise sets position of dialog based on trigger element's position.
- `popoverAnimation` - Animation of `popover` dialog. Possible values: `scale` or `dropdown`. Default is `dropdown`.
- `popoverPlacement` - Placement of `poppover` dialog in respect of `triggerElement`. Possible values: `bottom-start`, `bottom-end`,  `left`, `right` etc.. See referrence: https://atomiks.github.io/tippyjs/v6/all-props/#placement
- `hasOverlay` - When `true` shows overlay around dialog. Default is `false`.
- `appendTo` - When it's provided, append dialog to provided element. Default is `parent` of `triggerElement`.
- `boundaryPadding`: It's virtual padding of boundary(`viewport`). When contet of  dialog increases, it will adjust it's position according to available space in viewport. Default is `8`;
### `dw-fit-dialog`
  - opened - Set to `true` to open the dialog. You can use `open` and `close` method as well to open/close dialog.

## Attributes

`dismiss` and `confirm` attribute indicates that interacting with it should close the dialog with the specified attribute. This action is then reflected via event.detail.action in the `dw-dialog-closed` event.

`dismiss` and `confirm` mainly used with the footer action buttons to automatically close dialog on buttons click.

### Example

```html
  <dw-dialog opened>
    <div>Are you sure?</div>

    <div slot="footer">
      <button dismiss>No</button>
      <button confirm>Yes</button>
    </div>

</dw-dialog>
```


## Methods
### `dw-dialog`
- open - Opens the dialog.
- close - Closes the dialog
- layout - Recalculates layout and automatically adds/removes modifier classes e.g. --scrollable.

### `dw-fit-dialog`
- open - Opens dialog
- close - Closes dialog.


### `dw-popover-dialog`
- open: Opens dialog.
- close: Closes dialog.
- refreshMaxHeight - Refresh maximum height of popover dialog based on position of it's trigger element.

## CSS Custom Properties
### `dw-dialog`
| Name  | Description |
| ----  | ----------- |
| --dw-dialog-header-background | Background color of the header |
| --dw-dialog-footer-background | Background color of the footer |
| --dw-dialog-divider-color | Color of header bottom border color |
| --dw-dialog-border-radius | Radius of dialog |
| --dw-dialog-max-height | Max height of dialog |
| --dw-dialog-footer-padding | Padding of footer area |
| --dw-dialog-header-padding | padding of header area |

### `dw-fit-dialog`
| Name  | Description |
| ----  | ----------- |
| --dw-fit-dialog-header-height | Height of header. Default is `56px` |
| --dw-fit-dialog-footer-height | Height of footer. Default is `56px` |
| --dw-fit-dialog-header-background | Background color of Header |
| --dw-fit-dialog-content-background | Background color of Content |
| --dw-fit-dialog-footer-background | Background color of Footer |
| --dw-fit-dialog-max-width | Maximum width of dialog. Default is 768px |
| --dw-fit-dialog-overlay-color | Overlay color of dialog. Default is `rgba(0,0,0,0.4)` |
| --dw-fit-dialog-animation-time | Animation time of dialog. Default is `0.3s` |


### dw-popover-dialog
| Name  | Description |
| ----  | ----------- |
| --dw-popover-min-width | Minimum width of popover. Default is 280px.  |
| --dw-popover-width | Width of popover. Default is 280px.  |
| --dw-popover-overlay-background | Background styleing of popover overlay. Default is `rgba(0, 0, 0, 0.3)`  |
| --dw-popover-animation-time | Animation time for popup dialog. Default is `0.3s`  |

## Id selector to be used when extending DwDialog class

- dialog-header - For header's style
- dialog-content - For content's style
- dialog-footer - For footer's style