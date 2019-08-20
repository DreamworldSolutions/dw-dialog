# dw-dialog

- A dialog element with Material Design styling. [More detail](https://github.com/material-components/material-components-web/tree/master/packages/mdc-dialog)

## Installation

``` html
npm install --save @dw/dw-dialog
```

## Usage

``` html
  import '@dw/dw-dialog/dw-dialog';
```

## Example Usage

### Standard

```html
<dw-dialog>
  <span slot="header">Title</span>
  <div>Dialog content</div>
  <div slot="footer">
    <button>Close</button>
  </div>
</dw-dialog>
```

### Modal

```html
<dw-dialog noCancelOnEscKey noCancelOnOutsideClick>
  <span slot="header">Title</span>
  <div>Dialog content</div>
  <div slot="footer">
    <button>Close</button>
  </div>
</dw-dialog>
```

### Without backdrop(Scrim)

```html
<dw-dialog withoutBackdrop>
  <span slot="header">Title</span>
  <div>Dialog content</div>
  <div slot="footer">
    <button>Close</button>
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