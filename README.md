# dw-dialog

- A dialog element with Material Design styling. [More detail](https://github.com/material-components/material-components-web/tree/master/packages/mdc-dialog)

## Installation

``` html
npm install --save @dreamworld/dw-dialog
```

## Usage

``` html
  import '@dreamworld/dw-dialog/dw-dialog';
```

## Usage pattern

- There is 2 ways to use dialog
  1. extension
  2. composition

### Using extension

- Provide 3 methods `_headerTemplate`, `_contentTemplate` and `_footerTemplate` to provide dialog's header, content and footer

``` html
  import { DwDialog } from '@dreamworld/dw-dialog/dw-dialog';

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

### Using composition

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

### Customize

```html
dw-dialog{
  --dw-dialog-header-background: lightgreen;
}
```

## Slots

### For footer

```html
<span slot="header"></span>
```

### For footer

``` html
<span slot="footer"></span>
```

## Properties

- noCancelOnEscKey - Set to true to disable canceling the overlay with the ESC key.
- noCancelOnOutsideClick - Set to true to disable canceling the overlay by clicking outside it.
- withoutBackdrop - Set to true to hide dialog backdrop(dialog__scrim)
- placement - Set the placement of dialog. possibles values are `center`(Default) and `bottom`
- opened - Set to true to open the dialog. You can also use `open()` and `close()` mathod.

## Attributes

`dismiss` and `confirm` attribute indicates that interacting with it should close the dialog with the specified attribute. This action is then reflected via event.detail.action in the `dw-dialog-closed` event.


## Methods

- open - Opens the dialog.
- close - Closes the dialog
- layout - Recalculates layout and automatically adds/removes modifier classes e.g. --scrollable.

## CSS Custom Properties

| Name  | Description |
| ----  | ----------- |
| --dw-dialog-header-background | Background color of the header |
| --dw-dialog-footer-background | Background color of the footer |
| --dw-dialog-divider-color | Color of header bottom border color |
| --dw-dialog-border-radius | Radius of dialog |
| --dw-dialog-max-height | Max height of dialog |
| --dw-dialog-footer-padding | Padding of footer area |
| --dw-dialog-header-padding | padding of header area |
| --dw-dialog-header-line-height | line height of header container |
| --dw-dialog-header-before-height | default height of header container |

## Id selector to be used when extending DwDialog class

- dialog-header - For header's style
- dialog-content - For content's style
- dialog-footer - For footer's style