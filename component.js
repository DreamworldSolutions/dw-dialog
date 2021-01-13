/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import * as tslib_1 from "tslib";
import { MDCComponent } from '@material/base/component';
import { closest, matches } from '@material/dom/ponyfill';
import { MDCRipple } from '@material/ripple/component';
import { MDCDialogFoundation } from '@material/dialog/foundation';

var strings = MDCDialogFoundation.strings;

var MDCDialog = /** @class */ (function (_super) {
    tslib_1.__extends(MDCDialog, _super);

    function MDCDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(MDCDialog.prototype, "isOpen", {
        get: function () {
            return this.foundation.isOpen();
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(MDCDialog.prototype, "escapeKeyAction", {
        get: function () {
            return this.foundation.getEscapeKeyAction();
        },
        set: function (action) {
            this.foundation.setEscapeKeyAction(action);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(MDCDialog.prototype, "scrimClickAction", {
        get: function () {
            return this.foundation.getScrimClickAction();
        },
        set: function (action) {
            this.foundation.setScrimClickAction(action);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(MDCDialog.prototype, "autoStackButtons", {
        get: function () {
            return this.foundation.getAutoStackButtons();
        },
        set: function (autoStack) {
            this.foundation.setAutoStackButtons(autoStack);
        },
        enumerable: true,
        configurable: true
    });

    MDCDialog.attachTo = function (root) {
        return new MDCDialog(root);
    };

    MDCDialog.prototype.initialize = function () {
        var e_1, _a;
        var container = this.root.querySelector(strings.CONTAINER_SELECTOR);
        if (!container) {
            throw new Error("Dialog component requires a " + strings.CONTAINER_SELECTOR + " container element");
        }
        this.container_ = container;
        this.content_ = this.root.querySelector(strings.CONTENT_SELECTOR);
        this.buttons_ = [].slice.call(this.root.querySelectorAll(strings.BUTTON_SELECTOR));
        this.defaultButton_ = this.root.querySelector("[" + strings.BUTTON_DEFAULT_ATTRIBUTE + "]");
        this.buttonRipples_ = [];
        try {
            for (var _b = tslib_1.__values(this.buttons_), _c = _b.next(); !_c.done; _c = _b.next()) {
                var buttonEl = _c.value;
                this.buttonRipples_.push(new MDCRipple(buttonEl));
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally {
                if (e_1) throw e_1.error;
            }
        }
    };

    MDCDialog.prototype.initialSyncWithDOM = function () {
        var _this = this;
        this.handleClick_ = this.foundation.handleClick.bind(this.foundation);
        this.handleKeydown_ = this.foundation.handleKeydown.bind(this.foundation);
        this.handleDocumentKeydown_ = this.foundation.handleDocumentKeydown.bind(this.foundation);
        this.handleLayout_ = this.layout.bind(this);
        var LAYOUT_EVENTS = ['resize', 'orientationchange'];
        this.handleOpening_ = function () {
            LAYOUT_EVENTS.forEach(function (evtType) {
                return window.addEventListener(evtType, _this.handleLayout_);
            });
            document.addEventListener('keydown', _this.handleDocumentKeydown_);
        };
        this.handleClosing_ = function () {
            LAYOUT_EVENTS.forEach(function (evtType) {
                return window.removeEventListener(evtType, _this.handleLayout_);
            });
            document.removeEventListener('keydown', _this.handleDocumentKeydown_);
        };
        this.listen('click', this.handleClick_);
        this.listen('keydown', this.handleKeydown_);
        this.listen(strings.OPENING_EVENT, this.handleOpening_);
        this.listen(strings.CLOSING_EVENT, this.handleClosing_);
    };

    MDCDialog.prototype.destroy = function () {
        this.unlisten('click', this.handleClick_);
        this.unlisten('keydown', this.handleKeydown_);
        this.unlisten(strings.OPENING_EVENT, this.handleOpening_);
        this.unlisten(strings.CLOSING_EVENT, this.handleClosing_);
        this.handleClosing_();
        this.buttonRipples_.forEach(function (ripple) {
            return ripple.destroy();
        });
        _super.prototype.destroy.call(this);
    };

    MDCDialog.prototype.layout = function () {
        this.foundation.layout();
    };

    MDCDialog.prototype.open = function () {
        this.foundation.open();
    };

    MDCDialog.prototype.close = function (action) {
        if (action === void 0) {
            action = '';
        }
        this.foundation.close(action);
    };

    MDCDialog.prototype.getDefaultFoundation = function () {
        var _this = this;
        
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        var adapter = {
            addBodyClass: function (className) {
                return document.body.classList.add(className);
            },

            addClass: function (className) {
                return _this.root.classList.add(className);
            },

            areButtonsStacked: function () {
                var tops = new Set();
                [].forEach.call(_this.buttons_, function (el) { return tops.add(_this.buttons_.offsetTop); });
                return tops.size > 1;
            },

            clickDefaultButton: function () {
                return _this.defaultButton_ && _this.defaultButton_.click();
            },

            eventTargetMatches: function (target, selector) {
                return target ? matches(target, selector) : false;
            },

            getActionFromEvent: function (evt) {
                if (!evt.target) {
                    return '';
                }

                var element = closest(evt.target, "[" + strings.ACTION_ATTRIBUTE + "]");

                if (element) {
                    var hasActionAttr = element.getAttribute(strings.ACTION_ATTRIBUTE);
                }

                var actionAttributes = ['confirm', 'dismiss'];

                actionAttributes.forEach((attr) => {
                    if (!element) {
                        element = closest(evt.target, "[" + attr + "]");
                        if (element) {
                            hasActionAttr = attr;
                        }
                    }
                });

                return element && (hasActionAttr || hasActionAttr !== null || hasActionAttr !== undefined);
            },

            hasClass: function (className) {
                return _this.root.classList.contains(className);
            },

            isContentScrollable: function () {
               return _this.content_ ? _this.content_.scrollHeight > _this.content_.offsetHeight : false;
            },

            notifyClosed: function (action) {
                return _this.emit(strings.CLOSED_EVENT, action ? {
                    action: action
                } : {});
            },

            notifyClosing: function (action) {
                return _this.emit(strings.CLOSING_EVENT, action ? {
                    action: action
                } : {});
            },

            notifyOpened: function () {
                return _this.emit(strings.OPENED_EVENT, {});
            },

            notifyOpening: function () {
                return _this.emit(strings.OPENING_EVENT, {});
            },

            removeBodyClass: function (className) {
                return document.body.classList.remove(className);
            },
            removeClass: function (className) {
                return _this.root.classList.remove(className);
            },

            reverseButtons: function () {
                _this.buttons_.reverse();
                _this.buttons_.forEach(function (button) {
                    button.parentElement.appendChild(button);
                });
            },
        };
        return new MDCDialogFoundation(adapter);
    };

    return MDCDialog;

}(MDCComponent));

export {
    MDCDialog
};