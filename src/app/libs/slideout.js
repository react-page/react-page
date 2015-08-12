'use strict';
/**
 The MIT License (MIT)

 Copyright (c) 2015 Mango

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

/**
 * Module dependencies
 */
var decouple = require('decouple'),
    Emitter = require('emitter');

/**
 * Privates
 */
var scrollTimeout,
    scrolling = false,
    doc = window.document,
    html = doc.documentElement,
    msPointerSupported = window.navigator.msPointerEnabled,
    touch = {
        'start': msPointerSupported ? 'MSPointerDown' : 'touchstart',
        'move': msPointerSupported ? 'MSPointerMove' : 'touchmove',
        'end': msPointerSupported ? 'MSPointerUp' : 'touchend'
    };
var prefix = (function prefix() {
    var regex = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/;
    var styleDeclaration = doc.getElementsByTagName('script')[0].style;
    for (var prop in styleDeclaration) {
        if (regex.test(prop)) {
            return '-' + prop.match(regex)[0].toLowerCase() + '-';
        }
    }
    // Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
    // However (prop in style) returns the correct value, so we'll have to test for
    // the precence of a specific property
    if ('WebkitOpacity' in styleDeclaration) {
        return '-webkit-';
    }
    if ('KhtmlOpacity' in styleDeclaration) {
        return '-khtml-';
    }
    return '';
}());
function extend(destination, from) {
    for (var prop in from) {
        if (from[prop]) {
            destination[prop] = from[prop];
        }
    }
    return destination;
}
function inherits(child, uber) {
    child.prototype = extend(child.prototype || {}, uber.prototype);
}

/**
 * Slideout constructor
 */
function Slideout(options) {
    options = options || {};

    // Sets default values
    this._startOffsetX = 0;
    this._currentOffsetX = 0;
    this._opening = false;
    this._moved = false;
    this._opened = false;
    this._preventOpen = false;
    this._touch = options.touch === undefined ? true : options.touch && true;

    // Sets panel
    this.panel = options.panel;
    this.menu = options.menu;

    // Sets  classnames
    if (this.panel.className.search('slideout-panel') === -1) {
        this.panel.className += ' slideout-panel';
    }
    if (this.menu.className.search('slideout-menu') === -1) {
        this.menu.className += ' slideout-menu';
    }


    // Sets options
    this._fx = options.fx || 'ease';
    this._duration = parseInt(options.duration, 10) || 300;
    this._tolerance = parseInt(options.tolerance, 10) || 70;
    this._padding = this._translateTo = parseInt(options.padding, 10) || 256;
    this._orientation = options.side === 'right' ? -1 : 1;
    this._translateTo *= this._orientation;

    // Init touch events
    if (this._touch) {
        this._initTouchEvents();
    }
}

/**
 * Inherits from Emitter
 */
inherits(Slideout, Emitter);

/**
 * Opens the slideout menu.
 */
Slideout.prototype.open = function () {
    var self = this;
    this.emit('beforeopen');
    if (html.className.search('slideout-open') === -1) {
        html.className += ' slideout-open';
    }
    this._setTransition();
    this._translateXTo(this._translateTo);
    this._opened = true;
    setTimeout(function () {
        console.log('timed out open');
        self.panel.style.transition = self.panel.style['-webkit-transition'] = '';
        self.menu.style.transition = self.menu.style['-webkit-transition'] = '';
        self.emit('open');
    }, this._duration + 50);
    return this;
};

/**
 * Closes slideout menu.
 */
Slideout.prototype.close = function () {
    var self = this;
    if (!this.isOpen() && !this._opening) {
        return this;
    }
    this.emit('beforeclose');
    this._setTransition();
    this._translateXTo(0);
    this._opened = false;
    setTimeout(function () {
        html.className = html.className.replace(/ slideout-open/, '');
        self.panel.style.transition = self.panel.style['-webkit-transition'] = self.panel.style[prefix + 'transform'] = self.panel.style.transform = '';
        self.menu.style.transition = self.menu.style['-webkit-transition'] = self.menu.style[prefix + 'transform'] = self.menu.style.transform = '';
        self.emit('close');
    }, this._duration + 50);
    return this;
};

/**
 * Toggles (open/close) slideout menu.
 */
Slideout.prototype.toggle = function () {
    return this.isOpen() ? this.close() : this.open();
};

/**
 * Returns true if the slideout is currently open, and false if it is closed.
 */
Slideout.prototype.isOpen = function () {
    return this._opened;
};

/**
 * Translates panel and updates currentOffset with a given X point
 */
Slideout.prototype._translateXTo = function (translateX) {
    this.panel.style[prefix + 'transform'] = this.panel.style.transform = 'translate(' + translateX + 'px, 0)';
    this.panel.style.marginRight = (translateX) + 'px';
    this.menu.style[prefix + 'transform'] = this.menu.style.transform = 'translate(' + translateX + 'px, 0)';
};

/**
 * Set transition properties
 */
Slideout.prototype._setTransition = function () {
    this.panel.style[prefix + 'transition'] = this.panel.style.transition = prefix + 'transform ' + this._duration + 'ms ' + this._fx + ', margin-right ' + this._duration + 'ms ' + this._fx;
    this.menu.style[prefix + 'transition'] = this.menu.style.transition = prefix + 'transform ' + this._duration + 'ms ' + this._fx;
};

/**
 * Initializes touch event
 */
Slideout.prototype._initTouchEvents = function () {
    var self = this;

    /**
     * Decouple scroll event
     */
    decouple(doc, 'scroll', function () {
        if (!self._moved) {
            clearTimeout(scrollTimeout);
            scrolling = true;
            scrollTimeout = setTimeout(function () {
                scrolling = false;
            }, 250);
        }
    });

    /**
     * Prevents touchmove event if slideout is moving
     */
    doc.addEventListener(touch.move, function (eve) {
        if (self._moved) {
            eve.preventDefault();
        }
    });

    /**
     * Resets values on touchstart
     */
    this.panel.addEventListener(touch.start, function (eve) {

        if (typeof eve.touches === 'undefined') {
            return;
        }

        self._moved = false;
        self._opening = false;
        self._startOffsetX = eve.touches[0].pageX;
        self._preventOpen = (!self._touch || (!self.isOpen() && self.menu.clientWidth !== 0));
    });

    /**
     * Resets values on touchcancel
     */
    this.panel.addEventListener('touchcancel', function () {
        self._moved = false;
        self._opening = false;
    });

    /**
     * Toggles slideout on touchend
     */
    this.panel.addEventListener(touch.end, function () {
        if (self._moved) {
            (self._opening && Math.abs(self._currentOffsetX) > self._tolerance) ? self.open() : self.close();
        }
        self._moved = false;
    });

    /**
     * Translates panel on touchmove
     */
    this.panel.addEventListener(touch.move, function (eve) {

        if (scrolling || self._preventOpen || typeof eve.touches === 'undefined') {
            return;
        }

        var dif_x = eve.touches[0].clientX - self._startOffsetX;
        var translateX = self._currentOffsetX = dif_x;

        if (Math.abs(translateX) > self._padding) {
            return;
        }

        if (Math.abs(dif_x) > 20) {
            self._opening = true;

            var oriented_dif_x = dif_x * self._orientation;
            if (self._opened && oriented_dif_x > 0 || !self._opened && oriented_dif_x < 0) {
                return;
            }
            if (oriented_dif_x <= 0) {
                translateX = dif_x + self._padding * self._orientation;
                self._opening = false;
            }

            if (!self._moved && html.className.search('slideout-open') === -1) {
                html.className += ' slideout-open';
            }

            // TODO Slideout.prototype._translateXTo
            self.panel.style[prefix + 'transform'] = self.panel.style.transform = 'translate(' + translateX + 'px, 0, 0)';
            //self.menu.style[prefix + 'transform'] = self.menu.style.transform = 'translate3d(' + translateX + 'px, 0, 0)';
            self.emit('translate', translateX);
            self._moved = true;
        }

    });

};

Slideout.prototype.enableTouch = function () {
    this._touch = true;
    return this;
};

Slideout.prototype.disableTouch = function () {
    this._touch = false;
    return this;
};

/**
 * Expose Slideout
 */
module.exports = Slideout;

