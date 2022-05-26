/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { LitElement } from '@dreamworld/pwa-helpers/lit-element.js';
import { ThemeStyle } from '@dreamworld/material-styles/theme';
import '@material/mwc-button/mwc-button.js';
import '@material/mwc-switch';
import '@material/mwc-formfield';
import '../dw-dialog';
import './parent-fit-dialog.js';
import './my-popover-dialog.js';
import './my-composite-dialog.js';
  
export class DwDialogDemo extends LitElement {
  static get styles() {
    return [
      ThemeStyle,
      css`
        :host {
          display: block;
          outline:none;
          height: 100vh;
          overflow: hidden;
          padding: 24px;
        }

        :host[hidden] {
          display: none;
        }

        mwc-button{
          margin: 8px;
        }

        #customized{
          --dw-dialog-header-background: #03A9F4;
          --dw-dialog-footer-background: #9e9e9e1c;
          --dw-dialog-divider-color: #03A9F4;
          --dw-dialog-border-radius: 10px;
          --dw-dialog-max-height: 500px;
          --dw-dialog-footer-padding:0;
          --dw-dialog-header-padding: 0 16px;
        }

        #customized-header{
          color: #fff;
        }

        #customized-button{
          --mdc-theme-primary: #03A9F4;
        }


        mwc-formfield{
          display: block;
          padding-bottom: 24px;
          --mdc-theme-text-primary-on-background: var(--mdc-theme-text-primary);
        }

        div mwc-button{
          margin: 0;
          margin-left: 8px;
        }
      `
    ];
  }

  render() {
    return html`
      <mwc-formfield label="Enable dark theme">
         <mwc-switch @click="${(e) => {
            if (e.target.selected) { 
              this.setAttribute('dark-theme', e.detail);
              return;
            }
            this.removeAttribute('dark-theme');
           }}">
          </mwc-switch>
      </mwc-formfield>

      <mwc-button raised @click="${this.openAlertDialog}">Alert dialog</mwc-button>
      <mwc-button raised @click="${this.openConfirmationDialog}">Modal dialog</mwc-button>
      <mwc-button raised @click="${this.openScrollableDialog}">Scrollable dialog</mwc-button>
      <mwc-button raised @click="${this.openMultipleOverlayDialog}">Multiple overlay dialog</mwc-button>
      <mwc-button raised @click="${this.openCustomizedDialog}">Customized dialog</mwc-button>
      <mwc-button raised @click="${this.openWithoutBackdropDialog}">Without backdrop dialog</mwc-button>
      <mwc-button raised @click="${this.openBottomPlacementDialog}">Bottom placement dialog</mwc-button>
      <mwc-button raised @click="${this.openfitHeightDialog}">Dialog with full viewport height</mwc-button>
      <mwc-button raised @click="${this.openAutoFocusableDialog}">Dialog with Auto-focus element</mwc-button>
      <mwc-button raised @click="${this.openFitDalog}">Open Fit dialog</mwc-button>
      <mwc-button raised @click=${this.openpopoverDialog}>Open Popover dialog</mwc-button>
      <mwc-button raised @click=${this.openCompositeModalDialog}>Open Composite modal dialog</mwc-button>
      <mwc-button raised @click=${this.openCompositeFitDialog}>Open Composite fit dialog</mwc-button>
      <mwc-button raised @click=${this.openCompositePopoverDialog}>Open Composite Popover dialog</mwc-button>

      <dw-dialog id="alert">
        <div>Discard draft?</div>
        <div slot="footer">
          <mwc-button dismiss>Cancel</mwc-button>
          <mwc-button confirm>Discard</mwc-button>
        </div>
      </dw-dialog>

      <dw-dialog id="scrollable">
          <span slot="header">The Wonderful Wizard of Oz</span>
          <div>
              Dorothy lived in the midst of the great Kansas prairies, with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer's wife. Their house was small, for the lumber to build it had to be carried by wagon many miles. There were four walls, a floor and a roof, which made one room; and this room contained a rusty looking cookstove, a cupboard for the dishes, a table, three or four chairs, and the beds. Uncle Henry and Aunt Em had a big bed in one corner, and Dorothy a little bed in another corner. There was no garret at all, and no cellar--except a small hole dug in the ground, called a cyclone cellar, where the family could go in case one of those great whirlwinds arose, mighty enough to crush any building in its path. It was reached by a trap door in the middle of the floor, from which a ladder led down into the small, dark hole.

              When Dorothy stood in the doorway and looked around, she could see nothing but the great gray prairie on every side. Not a tree nor a house broke the broad sweep of flat country that reached to the edge of the sky in all directions. The sun had baked the plowed land into a gray mass, with little cracks running through it. Even the grass was not green, for the sun had burned the tops of the long blades until they were the same gray color to be seen everywhere. Once the house had been painted, but the sun blistered the paint and the rains washed it away, and now the house was as dull and gray as everything else.
              
              When Aunt Em came there to live she was a young, pretty wife. The sun and wind had changed her, too. They had taken the sparkle from her eyes and left them a sober gray; they had taken the red from her cheeks and lips, and they were gray also. She was thin and gaunt, and never smiled now. When Dorothy, who was an orphan, first came to her, Aunt Em had been so startled by the child's laughter that she would scream and press her hand upon her heart whenever Dorothy's merry voice reached her ears; and she still looked at the little girl with wonder that she could find anything to laugh at.
              
              Uncle Henry never laughed. He worked hard from morning till night and did not know what joy was. He was gray also, from his long beard to his rough boots, and he looked stern and solemn, and rarely spoke.
              
              It was Toto that made Dorothy laugh, and saved her from growing as gray as her other surroundings. Toto was not gray; he was a little black dog, with long silky hair and small black eyes that twinkled merrily on either side of his funny, wee nose. Toto played all day long, and Dorothy played with him, and loved him dearly.
              
              Today, however, they were not playing. Uncle Henry sat upon the doorstep and looked anxiously at the sky, which was even grayer than usual. Dorothy stood in the door with Toto in her arms, and looked at the sky too. Aunt Em was washing the dishes.
              
              From the far north they heard a low wail of the wind, and Uncle Henry and Dorothy could see where the long grass bowed in waves before the coming storm. There now came a sharp whistling in the air from the south, and as they turned their eyes that way they saw ripples in the grass coming from that direction also.
          </div>

          <div slot="footer">
              <mwc-button dismiss>Close</mwc-button>
            </div>
        </dw-dialog>

        <dw-dialog id="multiOverlay">
          <mwc-button @click="${this.openConfirmationDialog}">Open dialog</mwc-button>
          Dorothy lived in the midst of the great Kansas prairies, with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer's wife. Their house was small, for the lumber to build it had to be carried by wagon many miles. There were four walls, a floor and a roof, which made one room; and this room contained a rusty looking cookstove, a cupboard for the dishes, a table, three or four chairs, and the beds. Uncle Henry and Aunt Em had a big bed in one corner, and Dorothy a little bed in another corner. There was no garret at all, and no cellar--except a small hole dug in the ground, called a cyclone cellar, where the family could go in case one of those great whirlwinds arose, mighty enough to crush any building in its path. It was reached by a trap door in the middle of the floor, from which a ladder led down into the small, dark hole.

          When Dorothy stood in the doorway and looked around, she could see nothing but the great gray prairie on every side. Not a tree nor a house broke the broad sweep of flat country that reached to the edge of the sky in all directions. The sun had baked the plowed land into a gray mass, with little cracks running through it. Even the grass was not green, for the sun had burned the tops of the long blades until they were the same gray color to be seen everywhere. Once the house had been painted, but the sun blistered the paint and the rains washed it away, and now the house was as dull and gray as everything else.
          <div slot="footer">
            <mwc-button dismiss>Cancel</mwc-button>
            <mwc-button confirm>Ok</mwc-button>
          </div>
        </dw-dialog>

        <dw-dialog id="confirmation" noCancelOnEscKey noCancelOnOutsideClick>
        <span slot="header">The Wonderful Wizard of Oz</span>
          <div>Are you sure?</div>
          <div slot="footer">
            <mwc-button dismiss>Cancel</mwc-button>
            <mwc-button confirm>Ok</mwc-button>
          </div>
        </dw-dialog>

        <dw-dialog id="customized">
          <span id="customized-header" slot="header">The Wonderful Wizard of Oz</span>
          <div>
              Dorothy lived in the midst of the great Kansas prairies, with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer's wife. Their house was small, for the lumber to build it had to be carried by wagon many miles. There were four walls, a floor and a roof, which made one room; and this room contained a rusty looking cookstove, a cupboard for the dishes, a table, three or four chairs, and the beds. Uncle Henry and Aunt Em had a big bed in one corner, and Dorothy a little bed in another corner. There was no garret at all, and no cellar--except a small hole dug in the ground, called a cyclone cellar, where the family could go in case one of those great whirlwinds arose, mighty enough to crush any building in its path. It was reached by a trap door in the middle of the floor, from which a ladder led down into the small, dark hole.

              When Dorothy stood in the doorway and looked around, she could see nothing but the great gray prairie on every side. Not a tree nor a house broke the broad sweep of flat country that reached to the edge of the sky in all directions. The sun had baked the plowed land into a gray mass, with little cracks running through it. Even the grass was not green, for the sun had burned the tops of the long blades until they were the same gray color to be seen everywhere. Once the house had been painted, but the sun blistered the paint and the rains washed it away, and now the house was as dull and gray as everything else.
          </div>

          <div slot="footer">
              <mwc-button id="customized-button" dismiss>Close</mwc-button>
            </div>
        </dw-dialog>

        <dw-dialog id="withoutBackdrop" withoutBackdrop>
          <div>Are you sure?</div>
          <div slot="footer">
            <mwc-button dismiss>Cancel</mwc-button>
            <mwc-button confirm>Ok</mwc-button>
          </div>
        </dw-dialog>

        <dw-dialog id="bottomPlacement" placement="bottom" withoutBackdrop>
          <span slot="header">The Wonderful Wizard of Oz</span>
          <h5>Item 1</h5>
          <h5>Item 2</h5>
          <h5>Item 3</h5>
          <h5>Item 4</h5>
          <h5>Item 5</h5>
          <h5>Item 6</h5>
          <h5>Item 7</h5>
        </dw-dialog>

        <dw-dialog id="fitHeight" placement="bottom" withoutBackdrop fit-height>
          <span slot="header">The Wonderful Wizard of Oz</span>
          <h5>Item 1</h5>
          <h5>Item 2</h5>
          <h5>Item 3</h5>
          <h5>Item 4</h5>
          <h5>Item 5</h5>
          <h5>Item 6</h5>
          <h5>Item 7</h5>
        </dw-dialog>
        
        <dw-dialog id="autoFocus" autoFocusSelector="input">
          <input placeholder="Enter your name">
          <div slot="footer">
            <mwc-button confirm>Ok</mwc-button>
          </div>
        </dw-dialog>

        <parent-fit-dialog id="fit"></parent-fit-dialog>

        <my-popover-dialog id="popover" .popoverPlacement=${'bottom-end'} .popoverAnimation=${'scale'}></my-popover-dialog>
        <my-composite-dialog id="composite"></my-composite-dialog>
    `;
  }

  openAlertDialog(){
    var elDialog = this.shadowRoot.querySelector('#alert');
    elDialog.open();
  }

  openConfirmationDialog(){
    var elDialog = this.shadowRoot.querySelector('#confirmation');
    elDialog.open();
  }

  openScrollableDialog(){
    var elDialog = this.shadowRoot.querySelector('#scrollable');
    elDialog.open();
  }

  openMultipleOverlayDialog(){
    var elDialog = this.shadowRoot.querySelector('#multiOverlay');
    elDialog.open();
  }

  openCustomizedDialog() { 
    var elDialog = this.shadowRoot.querySelector('#customized');
    elDialog.open();
  }

  openWithoutBackdropDialog() { 
    var elDialog = this.shadowRoot.querySelector('#withoutBackdrop');
    elDialog.open();
  }

  openBottomPlacementDialog() { 
    var elDialog = this.shadowRoot.querySelector('#bottomPlacement');
    elDialog.open();
  }

  openfitHeightDialog() {
    var elDialog = this.shadowRoot.querySelector('#fitHeight');
    elDialog.open();
  }

  openAutoFocusableDialog() { 
    var elDialog = this.shadowRoot.querySelector('#autoFocus');
    elDialog.open();
  }

  openFitDalog() {
    const dialogEl = this.renderRoot.querySelector('#fit');
    dialogEl.open();
  }

  openpopoverDialog(e) {
    const dialogEl = this.renderRoot.querySelector('#popover');
    const triggerEl = e.target;
    dialogEl && dialogEl.open(triggerEl);
  }

  openCompositeModalDialog() {
    const dialog = this.renderRoot.querySelector('my-composite-dialog');
    dialog.type = 'modal';
    dialog.open();
  }

  openCompositeFitDialog() {
    const dialog = this.renderRoot.querySelector('my-composite-dialog');
    dialog.type = 'fit';
    dialog.open();
  }

  openCompositePopoverDialog(e) {
    const dialog = this.renderRoot.querySelector('my-composite-dialog');
    dialog.type = 'popover';
    dialog.appendTo = document.body;
    const triggerEl = e.target;
    dialog.open(triggerEl);
  }
}

window.customElements.define('dw-dialog-demo', DwDialogDemo);