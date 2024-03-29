import { Component, ElementRef, Input, HostBinding, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/interfaces.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function Properties() { }
if (false) {
    /* Skipping unnamed member:
    "transition-duration"?: number;*/
    /* Skipping unnamed member:
    "double-tap"?: boolean;*/
    /* Skipping unnamed member:
    "double-tap-scale"?: number;*/
    /* Skipping unnamed member:
    "auto-zoom-out"?: boolean;*/
    /* Skipping unnamed member:
    "limit-zoom"?: number | "original image size";*/
    /** @type {?|undefined} */
    Properties.prototype.disabled;
    /** @type {?|undefined} */
    Properties.prototype.element;
    /** @type {?|undefined} */
    Properties.prototype.disablePan;
    /** @type {?|undefined} */
    Properties.prototype.overflow;
    /** @type {?|undefined} */
    Properties.prototype.disableZoomControl;
    /** @type {?|undefined} */
    Properties.prototype.zoomControlScale;
    /** @type {?|undefined} */
    Properties.prototype.backgroundColor;
    /** @type {?|undefined} */
    Properties.prototype.limitPan;
    /** @type {?|undefined} */
    Properties.prototype.minScale;
    /** @type {?|undefined} */
    Properties.prototype.eventHandler;
    /** @type {?|undefined} */
    Properties.prototype.listeners;
    /** @type {?|undefined} */
    Properties.prototype.wheel;
    /** @type {?|undefined} */
    Properties.prototype.autoHeight;
    /** @type {?|undefined} */
    Properties.prototype.wheelZoomFactor;
    /** @type {?|undefined} */
    Properties.prototype.draggableImage;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/properties.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const defaultProperties = {
    transitionDuration: 200,
    doubleTap: true,
    doubleTapScale: 2,
    limitZoom: "original image size",
    autoZoomOut: false,
    disabled: false,
    overflow: "hidden",
    zoomControlScale: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    minScale: 0,
    disableZoomControl: "auto",
    listeners: "mouse and touch",
    wheel: true,
    wheelZoomFactor: 0.2,
    draggableImage: false
};
/** @type {?} */
const backwardCompatibilityProperties = {
    "transition-duration": "transitionDuration",
    "double-tap": "doubleTap",
    "double-tap-scale": "doubleTapScale",
    "zoom-button": "zoomButton",
    "auto-zoom-out": "autoZoomOut",
    "limit-zoom": "limitZoom"
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/touches.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function Properties$1() { }
if (false) {
    /** @type {?} */
    Properties$1.prototype.element;
    /** @type {?|undefined} */
    Properties$1.prototype.listeners;
    /** @type {?|undefined} */
    Properties$1.prototype.resize;
}
class Touches {
    /**
     * @param {?} properties
     */
    constructor(properties) {
        this.eventType = undefined;
        this.handlers = {};
        this.startX = 0;
        this.startY = 0;
        this.lastTap = 0;
        this.doubleTapMinTimeout = 300;
        this.tapMinTimeout = 200;
        this.touchstartTime = 0;
        this.i = 0;
        this.isMousedown = false;
        this.touchListeners = {
            "touchstart": "handleTouchstart",
            "touchmove": "handleTouchmove",
            "touchend": "handleTouchend"
        };
        this.mouseListeners = {
            "mousedown": "handleMousedown",
            "mousemove": "handleMousemove",
            "mouseup": "handleMouseup",
            "wheel": "handleWheel"
        };
        this.otherListeners = {
            "resize": "handleResize"
        };
        /*
             * Listeners
             */
        /* Touchstart */
        this.handleTouchstart = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.elementPosition = this.getElementPosition();
            this.touchstartTime = new Date().getTime();
            if (this.eventType === undefined) {
                this.getTouchstartPosition(event);
            }
            this.runHandler("touchstart", event);
        });
        /* Touchmove */
        this.handleTouchmove = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const touches = event.touches;
            // Pan
            if (this.detectPan(touches)) {
                this.runHandler("pan", event);
            }
            // Pinch
            if (this.detectPinch(event)) {
                this.runHandler("pinch", event);
            }
        });
        /* Touchend */
        this.handleTouchend = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const touches = event.touches;
            // Double Tap
            if (this.detectDoubleTap()) {
                this.runHandler("double-tap", event);
            }
            // Tap
            this.detectTap();
            this.runHandler("touchend", event);
            this.eventType = 'touchend';
            if (touches && touches.length === 0) {
                this.eventType = undefined;
                this.i = 0;
            }
        });
        /* Mousedown */
        this.handleMousedown = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.isMousedown = true;
            this.elementPosition = this.getElementPosition();
            this.touchstartTime = new Date().getTime();
            if (this.eventType === undefined) {
                this.getMousedownPosition(event);
            }
            this.runHandler("mousedown", event);
        });
        /* Mousemove */
        this.handleMousemove = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            //event.preventDefault();
            if (!this.isMousedown) {
                return;
            }
            // Pan
            this.runHandler("pan", event);
            // Linear swipe
            switch (this.detectLinearSwipe(event)) {
                case "horizontal-swipe":
                    event.swipeType = "horizontal-swipe";
                    this.runHandler("horizontal-swipe", event);
                    break;
                case "vertical-swipe":
                    event.swipeType = "vertical-swipe";
                    this.runHandler("vertical-swipe", event);
                    break;
            }
            // Linear swipe
            if (this.detectLinearSwipe(event) ||
                this.eventType === 'horizontal-swipe' ||
                this.eventType === 'vertical-swipe') {
                this.handleLinearSwipe(event);
            }
        });
        /* Mouseup */
        this.handleMouseup = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // Tap
            this.detectTap();
            this.isMousedown = false;
            this.runHandler("mouseup", event);
            this.eventType = undefined;
            this.i = 0;
        });
        /* Wheel */
        this.handleWheel = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.runHandler("wheel", event);
        });
        /* Resize */
        this.handleResize = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.runHandler("resize", event);
        });
        this.properties = properties;
        this.element = this.properties.element;
        this.elementPosition = this.getElementPosition();
        this.toggleEventListeners('addEventListener');
    }
    /**
     * @return {?}
     */
    destroy() {
        this.toggleEventListeners('removeEventListener');
    }
    /**
     * @param {?} action
     * @return {?}
     */
    toggleEventListeners(action) {
        /** @type {?} */
        let listeners;
        if (this.properties.listeners === 'mouse and touch') {
            listeners = Object.assign(this.touchListeners, this.mouseListeners);
        }
        else {
            listeners = this.detectTouchScreen() ? this.touchListeners : this.mouseListeners;
        }
        if (this.properties.resize) {
            listeners = Object.assign(listeners, this.otherListeners);
        }
        for (var listener in listeners) {
            /** @type {?} */
            const handler = listeners[listener];
            // Window
            if (listener === "resize") {
                if (action === 'addEventListener') {
                    window.addEventListener(listener, this[handler], false);
                }
                if (action === 'removeEventListener') {
                    window.removeEventListener(listener, this[handler], false);
                }
                // Document
            }
            else if (listener === 'mouseup' || listener === "mousemove") {
                if (action === 'addEventListener') {
                    document.addEventListener(listener, this[handler], false);
                }
                if (action === 'removeEventListener') {
                    document.removeEventListener(listener, this[handler], false);
                }
                // Element
            }
            else {
                if (action === 'addEventListener') {
                    this.element.addEventListener(listener, this[handler], false);
                }
                if (action === 'removeEventListener') {
                    this.element.removeEventListener(listener, this[handler], false);
                }
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleLinearSwipe(event) {
        //event.preventDefault();
        this.i++;
        if (this.i > 3) {
            this.eventType = this.getLinearSwipeType(event);
        }
        if (this.eventType === 'horizontal-swipe') {
            this.runHandler('horizontal-swipe', event);
        }
        if (this.eventType === 'vertical-swipe') {
            this.runHandler('vertical-swipe', event);
        }
    }
    /**
     * @param {?} eventName
     * @param {?} response
     * @return {?}
     */
    runHandler(eventName, response) {
        if (this.handlers[eventName]) {
            this.handlers[eventName](response);
        }
    }
    /*
         * Detection
         */
    /**
     * @param {?} touches
     * @return {?}
     */
    detectPan(touches) {
        return touches.length === 1 && !this.eventType || this.eventType === 'pan';
    }
    /**
     * @return {?}
     */
    detectDoubleTap() {
        if (this.eventType != undefined) {
            return;
        }
        /** @type {?} */
        const currentTime = new Date().getTime();
        /** @type {?} */
        const tapLength = currentTime - this.lastTap;
        clearTimeout(this.doubleTapTimeout);
        if (tapLength < this.doubleTapMinTimeout && tapLength > 0) {
            return true;
        }
        else {
            this.doubleTapTimeout = setTimeout((/**
             * @return {?}
             */
            () => {
                clearTimeout(this.doubleTapTimeout);
            }), this.doubleTapMinTimeout);
        }
        this.lastTap = currentTime;
    }
    /**
     * @return {?}
     */
    detectTap() {
        if (this.eventType != undefined) {
            return;
        }
        /** @type {?} */
        const currentTime = new Date().getTime();
        /** @type {?} */
        const tapLength = currentTime - this.touchstartTime;
        if (tapLength > 0) {
            if (tapLength < this.tapMinTimeout) {
                this.runHandler("tap", event);
            }
            else {
                this.runHandler("longtap", event);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    detectPinch(event) {
        /** @type {?} */
        const touches = event.touches;
        return (touches.length === 2 && this.eventType === undefined) || this.eventType === 'pinch';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    detectLinearSwipe(event) {
        /** @type {?} */
        const touches = event.touches;
        if (touches) {
            if (touches.length === 1 && !this.eventType || this.eventType === 'horizontal-swipe' || this.eventType === 'vertical-swipe') {
                return this.getLinearSwipeType(event);
            }
        }
        else {
            if (!this.eventType || this.eventType === 'horizontal-swipe' || this.eventType === 'vertical-swipe') {
                return this.getLinearSwipeType(event);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getLinearSwipeType(event) {
        if (this.eventType !== 'horizontal-swipe' && this.eventType !== 'vertical-swipe') {
            /** @type {?} */
            const movementX = Math.abs(this.moveLeft(0, event) - this.startX);
            /** @type {?} */
            const movementY = Math.abs(this.moveTop(0, event) - this.startY);
            if ((movementY * 3) > movementX) {
                return 'vertical-swipe';
            }
            else {
                return 'horizontal-swipe';
            }
        }
        else {
            return this.eventType;
        }
    }
    /**
     * @return {?}
     */
    getElementPosition() {
        return this.element.getBoundingClientRect();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getTouchstartPosition(event) {
        this.startX = event.touches[0].clientX - this.elementPosition.left;
        this.startY = event.touches[0].clientY - this.elementPosition.top;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getMousedownPosition(event) {
        this.startX = event.clientX - this.elementPosition.left;
        this.startY = event.clientY - this.elementPosition.top;
    }
    /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    moveLeft(index, event) {
        /** @type {?} */
        const touches = event.touches;
        if (touches) {
            return touches[index].clientX - this.elementPosition.left;
        }
        else {
            return event.clientX - this.elementPosition.left;
        }
    }
    /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    moveTop(index, event) {
        /** @type {?} */
        const touches = event.touches;
        if (touches) {
            return touches[index].clientY - this.elementPosition.top;
        }
        else {
            return event.clientY - this.elementPosition.top;
        }
    }
    /**
     * @return {?}
     */
    detectTouchScreen() {
        /** @type {?} */
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        /** @type {?} */
        var mq = (/**
         * @param {?} query
         * @return {?}
         */
        function (query) {
            return window.matchMedia(query).matches;
        });
        if (('ontouchstart' in window)) {
            return true;
        }
        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://git.io/vznFH
        /** @type {?} */
        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    }
    /* Public properties and methods */
    /**
     * @param {?} event
     * @param {?} handler
     * @return {?}
     */
    on(event, handler) {
        if (event) {
            this.handlers[event] = handler;
        }
    }
}
if (false) {
    /** @type {?} */
    Touches.prototype.properties;
    /** @type {?} */
    Touches.prototype.element;
    /** @type {?} */
    Touches.prototype.elementPosition;
    /** @type {?} */
    Touches.prototype.eventType;
    /** @type {?} */
    Touches.prototype.handlers;
    /** @type {?} */
    Touches.prototype.startX;
    /** @type {?} */
    Touches.prototype.startY;
    /** @type {?} */
    Touches.prototype.lastTap;
    /** @type {?} */
    Touches.prototype.doubleTapTimeout;
    /** @type {?} */
    Touches.prototype.doubleTapMinTimeout;
    /** @type {?} */
    Touches.prototype.tapMinTimeout;
    /** @type {?} */
    Touches.prototype.touchstartTime;
    /** @type {?} */
    Touches.prototype.i;
    /** @type {?} */
    Touches.prototype.isMousedown;
    /** @type {?} */
    Touches.prototype.touchListeners;
    /** @type {?} */
    Touches.prototype.mouseListeners;
    /** @type {?} */
    Touches.prototype.otherListeners;
    /** @type {?} */
    Touches.prototype.handleTouchstart;
    /** @type {?} */
    Touches.prototype.handleTouchmove;
    /** @type {?} */
    Touches.prototype.handleTouchend;
    /** @type {?} */
    Touches.prototype.handleMousedown;
    /** @type {?} */
    Touches.prototype.handleMousemove;
    /** @type {?} */
    Touches.prototype.handleMouseup;
    /** @type {?} */
    Touches.prototype.handleWheel;
    /** @type {?} */
    Touches.prototype.handleResize;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ivypinch.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IvyPinchProperties() { }
if (false) {
    /** @type {?} */
    IvyPinchProperties.prototype.element;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.key;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.doubleTap;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.doubleTapScale;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.zoomControlScale;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.transitionDuration;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.autoZoomOut;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.limitZoom;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.disablePan;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.limitPan;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.minScale;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.eventHandler;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.listeners;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.wheel;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.autoHeight;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.wheelZoomFactor;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.draggableImage;
}
/** @type {?} */
const IvyPinchDefaultProperties = {
    doubleTap: true,
    doubleTapScale: 2,
    transitionDuration: 200,
    limitZoom: "original image size",
    minScale: 0,
    wheelZoomFactor: 0.2,
    draggableImage: true
};
class IvyPinch {
    /**
     * @param {?} properties
     */
    constructor(properties) {
        this.i = 0;
        this.scale = 1;
        this.initialScale = 1;
        this.startX = 0;
        this.startY = 0;
        this.moveX = 0;
        this.moveY = 0;
        this.initialMoveX = 0;
        this.initialMoveY = 0;
        this.moveXC = 0;
        this.moveYC = 0;
        this.lastTap = 0;
        this.draggingMode = false;
        this.distance = 0;
        this.doubleTapTimeout = 0;
        this.initialDistance = 0;
        this.events = {};
        this.maxHtmlContentScale = 3;
        this.maxScale = 1;
        /* Touchstart */
        this.handleTouchstart = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.getElementPosition();
            if (this.eventType === undefined) {
                this.getTouchstartPosition(event);
            }
        });
        /* Touchend */
        this.handleTouchend = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /* touchend */
            if (event.type === "touchend") {
                this.i = 0;
                this.draggingMode = false;
                /** @type {?} */
                const touches = event.touches;
                // Min scale
                if (this.scale < 1) {
                    this.scale = 1;
                }
                // Auto Zoom Out
                if (this.properties.autoZoomOut && this.eventType === 'pinch') {
                    this.scale = 1;
                }
                // Align image
                if (this.eventType === 'pinch' || this.eventType === 'pan') {
                    this.alignImage();
                }
                // Update initial values
                if (this.eventType === 'pinch' ||
                    this.eventType === 'pan' ||
                    this.eventType === 'horizontal-swipe' ||
                    this.eventType === 'vertical-swipe') {
                    this.updateInitialValues();
                }
                this.eventType = 'touchend';
                if (touches && touches.length === 0) {
                    this.eventType = undefined;
                }
            }
            /* mouseup */
            if (event.type === "mouseup") {
                this.draggingMode = false;
                this.updateInitialValues();
                this.eventType = undefined;
            }
        });
        /*
             * Handlers
             */
        this.handlePan = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (this.scale <= 1 || this.properties.disablePan) {
                return;
            }
            event.preventDefault();
            const { clientX, clientY } = this.getClientPosition(event);
            if (!this.eventType) {
                this.startX = clientX - this.elementPosition.left;
                this.startY = clientY - this.elementPosition.top;
            }
            this.eventType = 'pan';
            this.moveX = this.initialMoveX + (this.moveLeft(event, 0) - this.startX);
            this.moveY = this.initialMoveY + (this.moveTop(event, 0) - this.startY);
            if (this.properties.limitPan) {
                this.limitPanY();
                this.limitPanX();
            }
            /* mousemove */
            if (event.type === "mousemove") {
                this.centeringImage();
            }
            this.transformElement(0);
        });
        this.handleDoubleTap = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.toggleZoom(event);
            return;
        });
        this.handlePinch = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            event.preventDefault();
            if (this.eventType === undefined || this.eventType === 'pinch') {
                /** @type {?} */
                const touches = event.touches;
                if (!this.eventType) {
                    this.initialDistance = this.getDistance(touches);
                    /** @type {?} */
                    const moveLeft0 = this.moveLeft(event, 0);
                    /** @type {?} */
                    const moveLeft1 = this.moveLeft(event, 1);
                    /** @type {?} */
                    const moveTop0 = this.moveTop(event, 0);
                    /** @type {?} */
                    const moveTop1 = this.moveTop(event, 1);
                    this.moveXC = ((moveLeft0 + moveLeft1) / 2) - this.initialMoveX;
                    this.moveYC = ((moveTop0 + moveTop1) / 2) - this.initialMoveY;
                }
                this.eventType = 'pinch';
                this.distance = this.getDistance(touches);
                this.scale = this.initialScale * (this.distance / this.initialDistance);
                this.moveX = this.initialMoveX - (((this.distance / this.initialDistance) * this.moveXC) - this.moveXC);
                this.moveY = this.initialMoveY - (((this.distance / this.initialDistance) * this.moveYC) - this.moveYC);
                this.handleLimitZoom();
                if (this.properties.limitPan) {
                    this.limitPanY();
                    this.limitPanX();
                }
                this.transformElement(0);
            }
        });
        this.handleWheel = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            event.preventDefault();
            /** @type {?} */
            let zoomFactor = event.deltaY < 0 ? (this.properties.wheelZoomFactor) : (-this.properties.wheelZoomFactor);
            /** @type {?} */
            let newScale = this.initialScale + zoomFactor;
            /* Round value */
            if (newScale < (1 + this.properties.wheelZoomFactor)) {
                newScale = 1;
            }
            else if (newScale < this.maxScale && newScale > this.maxScale - this.properties.wheelZoomFactor) {
                newScale = this.maxScale;
            }
            if (newScale < 1 || newScale > this.maxScale) {
                return;
            }
            if (newScale === this.scale) {
                return;
            }
            this.getElementPosition();
            this.scale = newScale;
            /* Get cursor position over image */
            /** @type {?} */
            let xCenter = (event.clientX - this.elementPosition.left) - this.initialMoveX;
            /** @type {?} */
            let yCenter = (event.clientY - this.elementPosition.top) - this.initialMoveY;
            this.setZoom({
                scale: newScale,
                center: [xCenter, yCenter]
            });
        });
        this.handleResize = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.setAutoHeight();
        });
        this.element = properties.element;
        this.elementTarget = this.element.querySelector('*').tagName;
        this.parentElement = this.element.parentElement;
        this.properties = Object.assign({}, IvyPinchDefaultProperties, properties);
        this.touches = new Touches({
            element: properties.element,
            listeners: properties.listeners,
            resize: properties.autoHeight
        });
        /* Init */
        this.setBasicStyles();
        /*
         * Listeners
         */
        this.touches.on('touchstart', this.handleTouchstart);
        this.touches.on('touchend', this.handleTouchend);
        this.touches.on('mousedown', this.handleTouchstart);
        this.touches.on('mouseup', this.handleTouchend);
        this.touches.on('pan', this.handlePan);
        this.touches.on('mousemove', this.handlePan);
        this.touches.on('pinch', this.handlePinch);
        if (this.properties.wheel) {
            this.touches.on('wheel', this.handleWheel);
        }
        if (this.properties.doubleTap) {
            this.touches.on('double-tap', this.handleDoubleTap);
        }
        if (this.properties.autoHeight) {
            this.touches.on('resize', this.handleResize);
        }
    }
    /**
     * @return {?}
     */
    handleLimitZoom() {
        /** @type {?} */
        const limitZoom = this.maxScale;
        /** @type {?} */
        const minScale = this.properties.minScale;
        if (this.scale > limitZoom || this.scale <= minScale) {
            /** @type {?} */
            const imageWidth = this.getImageWidth();
            /** @type {?} */
            const imageHeight = this.getImageHeight();
            /** @type {?} */
            const enlargedImageWidth = imageWidth * this.scale;
            /** @type {?} */
            const enlargedImageHeight = imageHeight * this.scale;
            /** @type {?} */
            const moveXRatio = this.moveX / (enlargedImageWidth - imageWidth);
            /** @type {?} */
            const moveYRatio = this.moveY / (enlargedImageHeight - imageHeight);
            if (this.scale > limitZoom) {
                this.scale = limitZoom;
            }
            if (this.scale <= minScale) {
                this.scale = minScale;
            }
            /** @type {?} */
            const newImageWidth = imageWidth * this.scale;
            /** @type {?} */
            const newImageHeight = imageHeight * this.scale;
            this.moveX = -Math.abs((moveXRatio * (newImageWidth - imageWidth)));
            this.moveY = -Math.abs((-moveYRatio * (newImageHeight - imageHeight)));
        }
    }
    /**
     * @return {?}
     */
    getLimitZoom() {
        if (this.properties.limitZoom === "original image size") {
            if (this.elementTarget === "IMG") {
                /** @type {?} */
                let img = this.element.getElementsByTagName("img")[0];
                if (img.naturalWidth && img.offsetWidth) {
                    this.maxScale = img.naturalWidth / img.offsetWidth;
                    return this.maxScale;
                }
            }
            else {
                this.maxScale = this.maxHtmlContentScale;
                return this.maxScale;
            }
        }
        else {
            this.maxScale = this.properties.limitZoom;
            return this.maxScale;
        }
    }
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    moveLeft(event, index = 0) {
        /** @type {?} */
        const clientX = this.getClientPosition(event, index).clientX;
        return clientX - this.elementPosition.left;
    }
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    moveTop(event, index = 0) {
        /** @type {?} */
        const clientY = this.getClientPosition(event, index).clientY;
        return clientY - this.elementPosition.top;
    }
    /*
         * Detection
         */
    /**
     * @return {?}
     */
    centeringImage() {
        /** @type {?} */
        const img = this.element.getElementsByTagName(this.elementTarget)[0];
        /** @type {?} */
        const initialMoveX = this.moveX;
        /** @type {?} */
        const initialMoveY = this.moveY;
        if (this.moveY > 0) {
            this.moveY = 0;
        }
        if (this.moveX > 0) {
            this.moveX = 0;
        }
        if (img) {
            this.limitPanY();
            this.limitPanX();
        }
        if (img && this.scale < 1) {
            if (this.moveX < this.element.offsetWidth * (1 - this.scale)) {
                this.moveX = this.element.offsetWidth * (1 - this.scale);
            }
        }
        return initialMoveX !== this.moveX || initialMoveY !== this.moveY;
    }
    /**
     * @return {?}
     */
    limitPanY() {
        /** @type {?} */
        const imgHeight = this.getImageHeight();
        /** @type {?} */
        const scaledImgHeight = imgHeight * this.scale;
        /** @type {?} */
        const parentHeight = this.parentElement.offsetHeight;
        /** @type {?} */
        const elementHeight = this.element.offsetHeight;
        if (scaledImgHeight < parentHeight) {
            this.moveY = (parentHeight - elementHeight * this.scale) / 2;
        }
        else {
            /** @type {?} */
            const imgOffsetTop = ((imgHeight - elementHeight) * this.scale) / 2;
            if (this.moveY > imgOffsetTop) {
                this.moveY = imgOffsetTop;
            }
            else if ((scaledImgHeight + Math.abs(imgOffsetTop) - parentHeight) + this.moveY < 0) {
                this.moveY = -(scaledImgHeight + Math.abs(imgOffsetTop) - parentHeight);
            }
        }
    }
    /**
     * @return {?}
     */
    limitPanX() {
        /** @type {?} */
        const imgWidth = this.getImageWidth();
        /** @type {?} */
        const scaledImgWidth = imgWidth * this.scale;
        /** @type {?} */
        const parentWidth = this.parentElement.offsetWidth;
        /** @type {?} */
        const elementWidth = this.element.offsetWidth;
        if (scaledImgWidth < parentWidth) {
            this.moveX = (parentWidth - elementWidth * this.scale) / 2;
        }
        else {
            /** @type {?} */
            const imgOffsetLeft = ((imgWidth - elementWidth) * this.scale) / 2;
            if (this.moveX > imgOffsetLeft) {
                this.moveX = imgOffsetLeft;
            }
            else if ((scaledImgWidth + Math.abs(imgOffsetLeft) - parentWidth) + this.moveX < 0) {
                this.moveX = -(imgWidth * this.scale + Math.abs(imgOffsetLeft) - parentWidth);
            }
        }
    }
    /**
     * @return {?}
     */
    setBasicStyles() {
        this.element.style.display = 'flex';
        this.element.style.alignItems = 'center';
        this.element.style.justifyContent = 'center';
        this.element.style.transformOrigin = '0 0';
        this.setImageSize();
        this.setDraggableImage();
    }
    /**
     * @return {?}
     */
    removeBasicStyles() {
        this.element.style.display = '';
        this.element.style.alignItems = '';
        this.element.style.justifyContent = '';
        this.element.style.transformOrigin = '';
        this.removeImageSize();
        this.removeDraggableImage();
    }
    /**
     * @return {?}
     */
    setDraggableImage() {
        /** @type {?} */
        const imgElement = this.getImageElement();
        if (imgElement) {
            imgElement.draggable = this.properties.draggableImage;
        }
    }
    /**
     * @return {?}
     */
    removeDraggableImage() {
        /** @type {?} */
        const imgElement = this.getImageElement();
        if (imgElement) {
            imgElement.draggable = !this.properties.draggableImage;
        }
    }
    /**
     * @return {?}
     */
    setImageSize() {
        /** @type {?} */
        const imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (imgElement.length) {
            imgElement[0].style.maxWidth = '100%';
            imgElement[0].style.maxHeight = '100%';
            this.setAutoHeight();
        }
    }
    /**
     * @return {?}
     */
    setAutoHeight() {
        /** @type {?} */
        const imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (!this.properties.autoHeight || !imgElement.length) {
            return;
        }
        /** @type {?} */
        const imgNaturalWidth = imgElement[0].getAttribute("width");
        /** @type {?} */
        const imgNaturalHeight = imgElement[0].getAttribute("height");
        /** @type {?} */
        const sizeRatio = imgNaturalWidth / imgNaturalHeight;
        /** @type {?} */
        const parentWidth = this.parentElement.offsetWidth;
        imgElement[0].style.maxHeight = parentWidth / sizeRatio + "px";
    }
    /**
     * @return {?}
     */
    removeImageSize() {
        /** @type {?} */
        const imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (imgElement.length) {
            imgElement[0].style.maxWidth = '';
            imgElement[0].style.maxHeight = '';
        }
    }
    /**
     * @return {?}
     */
    getElementPosition() {
        this.elementPosition = this.element.parentElement.getBoundingClientRect();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getTouchstartPosition(event) {
        const { clientX, clientY } = this.getClientPosition(event);
        this.startX = clientX - this.elementPosition.left;
        this.startY = clientY - this.elementPosition.top;
    }
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    getClientPosition(event, index = 0) {
        /** @type {?} */
        let clientX;
        /** @type {?} */
        let clientY;
        if (event.type === "touchstart" || event.type === "touchmove") {
            clientX = event.touches[index].clientX;
            clientY = event.touches[index].clientY;
        }
        if (event.type === "mousedown" || event.type === "mousemove") {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        return {
            clientX,
            clientY
        };
    }
    /**
     * @return {?}
     */
    resetScale() {
        this.scale = 1;
        this.moveX = 0;
        this.moveY = 0;
        this.updateInitialValues();
        this.transformElement(this.properties.transitionDuration);
    }
    /**
     * @return {?}
     */
    updateInitialValues() {
        this.initialScale = this.scale;
        this.initialMoveX = this.moveX;
        this.initialMoveY = this.moveY;
    }
    /**
     * @param {?} touches
     * @return {?}
     */
    getDistance(touches) {
        return Math.sqrt(Math.pow(touches[0].pageX - touches[1].pageX, 2) + Math.pow(touches[0].pageY - touches[1].pageY, 2));
    }
    /**
     * @return {?}
     */
    getImageHeight() {
        /** @type {?} */
        const img = this.element.getElementsByTagName(this.elementTarget)[0];
        return img.offsetHeight;
    }
    /**
     * @return {?}
     */
    getImageWidth() {
        /** @type {?} */
        const img = this.element.getElementsByTagName(this.elementTarget)[0];
        return img.offsetWidth;
    }
    /**
     * @param {?} duration
     * @return {?}
     */
    transformElement(duration) {
        this.element.style.transition = "all " + duration + "ms";
        this.element.style.transform = "matrix(" + Number(this.scale) + ", 0, 0, " + Number(this.scale) + ", " + Number(this.moveX) + ", " + Number(this.moveY) + ")";
    }
    /**
     * @return {?}
     */
    isTouchScreen() {
        /** @type {?} */
        const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        if (('ontouchstart' in window)) {
            return true;
        }
        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://git.io/vznFH
        /** @type {?} */
        const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return this.getMatchMedia(query);
    }
    /**
     * @param {?} query
     * @return {?}
     */
    getMatchMedia(query) {
        return window.matchMedia(query).matches;
    }
    /**
     * @return {?}
     */
    isDragging() {
        if (this.properties.disablePan) {
            return false;
        }
        /** @type {?} */
        const imgHeight = this.getImageHeight();
        /** @type {?} */
        const imgWidth = this.getImageWidth();
        if (this.scale > 1) {
            return imgHeight * this.scale > this.parentElement.offsetHeight ||
                imgWidth * this.scale > this.parentElement.offsetWidth;
        }
        if (this.scale === 1) {
            return imgHeight > this.parentElement.offsetHeight ||
                imgWidth > this.parentElement.offsetWidth;
        }
    }
    /**
     * @return {?}
     */
    pollLimitZoom() {
        /** @type {?} */
        let poll = setInterval((/**
         * @return {?}
         */
        () => {
            if (this.getLimitZoom()) {
                clearInterval(poll);
            }
        }), 10);
    }
    /**
     * @return {?}
     */
    getImageElement() {
        /** @type {?} */
        const imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (imgElement.length) {
            return imgElement[0];
        }
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    toggleZoom(event = false) {
        if (this.initialScale === 1) {
            if (event && event.changedTouches) {
                if (this.properties.doubleTapScale === undefined) {
                    return;
                }
                /** @type {?} */
                const changedTouches = event.changedTouches;
                this.scale = this.initialScale * this.properties.doubleTapScale;
                this.moveX = this.initialMoveX - (changedTouches[0].clientX - this.elementPosition.left) * (this.properties.doubleTapScale - 1);
                this.moveY = this.initialMoveY - (changedTouches[0].clientY - this.elementPosition.top) * (this.properties.doubleTapScale - 1);
            }
            else {
                this.scale = this.initialScale * (this.properties.zoomControlScale + 1);
                this.moveX = this.initialMoveX - this.element.offsetWidth * (this.scale - 1) / 2;
                this.moveY = this.initialMoveY - this.element.offsetHeight * (this.scale - 1) / 2;
            }
            this.centeringImage();
            this.updateInitialValues();
            this.transformElement(this.properties.transitionDuration);
        }
        else {
            this.resetScale();
        }
    }
    /**
     * @param {?} properties
     * @return {?}
     */
    setZoom(properties) {
        this.scale = properties.scale;
        /** @type {?} */
        let xCenter;
        /** @type {?} */
        let yCenter;
        /** @type {?} */
        let visibleAreaWidth = this.element.offsetWidth;
        /** @type {?} */
        let visibleAreaHeight = this.element.offsetHeight;
        /** @type {?} */
        let scalingPercent = (visibleAreaWidth * this.scale) / (visibleAreaWidth * this.initialScale);
        if (properties.center) {
            xCenter = properties.center[0];
            yCenter = properties.center[1];
        }
        else {
            xCenter = visibleAreaWidth / 2 - this.initialMoveX;
            yCenter = visibleAreaHeight / 2 - this.initialMoveY;
        }
        this.moveX = this.initialMoveX - ((scalingPercent * xCenter) - xCenter);
        this.moveY = this.initialMoveY - ((scalingPercent * yCenter) - yCenter);
        this.centeringImage();
        this.updateInitialValues();
        this.transformElement(this.properties.transitionDuration);
    }
    /**
     * @return {?}
     */
    alignImage() {
        /** @type {?} */
        const isMoveChanged = this.centeringImage();
        if (isMoveChanged) {
            this.updateInitialValues();
            this.transformElement(this.properties.transitionDuration);
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        this.removeBasicStyles();
        this.touches.destroy();
    }
}
if (false) {
    /** @type {?} */
    IvyPinch.prototype.properties;
    /** @type {?} */
    IvyPinch.prototype.touches;
    /** @type {?} */
    IvyPinch.prototype.element;
    /** @type {?} */
    IvyPinch.prototype.elementTarget;
    /** @type {?} */
    IvyPinch.prototype.parentElement;
    /** @type {?} */
    IvyPinch.prototype.i;
    /** @type {?} */
    IvyPinch.prototype.scale;
    /** @type {?} */
    IvyPinch.prototype.initialScale;
    /** @type {?} */
    IvyPinch.prototype.elementPosition;
    /** @type {?} */
    IvyPinch.prototype.eventType;
    /** @type {?} */
    IvyPinch.prototype.startX;
    /** @type {?} */
    IvyPinch.prototype.startY;
    /** @type {?} */
    IvyPinch.prototype.moveX;
    /** @type {?} */
    IvyPinch.prototype.moveY;
    /** @type {?} */
    IvyPinch.prototype.initialMoveX;
    /** @type {?} */
    IvyPinch.prototype.initialMoveY;
    /** @type {?} */
    IvyPinch.prototype.moveXC;
    /** @type {?} */
    IvyPinch.prototype.moveYC;
    /** @type {?} */
    IvyPinch.prototype.lastTap;
    /** @type {?} */
    IvyPinch.prototype.draggingMode;
    /** @type {?} */
    IvyPinch.prototype.distance;
    /** @type {?} */
    IvyPinch.prototype.doubleTapTimeout;
    /** @type {?} */
    IvyPinch.prototype.initialDistance;
    /** @type {?} */
    IvyPinch.prototype.events;
    /** @type {?} */
    IvyPinch.prototype.maxHtmlContentScale;
    /** @type {?} */
    IvyPinch.prototype.maxScale;
    /** @type {?} */
    IvyPinch.prototype.handleTouchstart;
    /** @type {?} */
    IvyPinch.prototype.handleTouchend;
    /** @type {?} */
    IvyPinch.prototype.handlePan;
    /** @type {?} */
    IvyPinch.prototype.handleDoubleTap;
    /** @type {?} */
    IvyPinch.prototype.handlePinch;
    /** @type {?} */
    IvyPinch.prototype.handleWheel;
    /** @type {?} */
    IvyPinch.prototype.handleResize;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/pinch-zoom.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PinchZoomComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.transitionDuration = 200;
        this.doubleTap = true;
        this.doubleTapScale = 2;
        this.autoZoomOut = false;
        this.disabled = false;
        this.zoomControlScale = 1;
        this.backgroundColor = "rgba(0,0,0,0.85)";
        this.minScale = 0;
        this.listeners = 'mouse and touch';
        this.wheel = true;
        this.autoHeight = false;
        this.wheelZoomFactor = 0.2;
        this.draggableImage = false;
        this.applyOptionsDefault(defaultProperties, {});
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set properties(value) {
        if (value) {
            this._properties = value;
        }
    }
    /**
     * @return {?}
     */
    get properties() {
        return this._properties;
    }
    /**
     * @return {?}
     */
    get hostOverflow() {
        return this.properties['overflow'];
    }
    /**
     * @return {?}
     */
    get hostBackgroundColor() {
        return this.properties['backgroundColor'];
    }
    /**
     * @return {?}
     */
    get isTouchScreen() {
        /** @type {?} */
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        /** @type {?} */
        var mq = (/**
         * @param {?} query
         * @return {?}
         */
        function (query) {
            return window.matchMedia(query).matches;
        });
        if (('ontouchstart' in window)) {
            return true;
        }
        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://git.io/vznFH
        /** @type {?} */
        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    }
    /**
     * @return {?}
     */
    get isDragging() {
        return this.pinchZoom.isDragging();
    }
    /**
     * @return {?}
     */
    get isDisabled() {
        return this.properties['disabled'];
    }
    /**
     * @return {?}
     */
    get scale() {
        return this.pinchZoom.scale;
    }
    /**
     * @return {?}
     */
    get isZoomedIn() {
        return this.scale > 1;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initPinchZoom();
        /* Calls the method until the image size is available */
        this.pollLimitZoom();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        let changedOptions = this.getProperties(changes);
        changedOptions = this.renameProperties(changedOptions);
        this.applyOptionsDefault(defaultProperties, changedOptions);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy();
    }
    /**
     * @return {?}
     */
    initPinchZoom() {
        if (this.properties['disabled']) {
            return;
        }
        this.properties['element'] = this.elementRef.nativeElement.querySelector('.pinch-zoom-content');
        this.pinchZoom = new IvyPinch(this.properties);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    getProperties(changes) {
        /** @type {?} */
        let properties = {};
        for (var prop in changes) {
            if (prop !== 'properties') {
                properties[prop] = changes[prop].currentValue;
            }
            if (prop === 'properties') {
                properties = changes[prop].currentValue;
            }
        }
        return properties;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    renameProperties(options) {
        for (var prop in options) {
            if (backwardCompatibilityProperties[prop]) {
                options[backwardCompatibilityProperties[prop]] = options[prop];
                delete options[prop];
            }
        }
        return options;
    }
    /**
     * @param {?} defaultOptions
     * @param {?} options
     * @return {?}
     */
    applyOptionsDefault(defaultOptions, options) {
        this.properties = Object.assign({}, defaultOptions, options);
    }
    /**
     * @return {?}
     */
    toggleZoom() {
        this.pinchZoom.toggleZoom();
    }
    /**
     * @return {?}
     */
    isControl() {
        if (this.isDisabled) {
            return false;
        }
        if (this.properties['disableZoomControl'] === "disable") {
            return false;
        }
        if (this.isTouchScreen && this.properties['disableZoomControl'] === "auto") {
            return false;
        }
        return true;
    }
    /**
     * @return {?}
     */
    pollLimitZoom() {
        this.pinchZoom.pollLimitZoom();
    }
    /**
     * @return {?}
     */
    destroy() {
        this.pinchZoom.destroy();
    }
}
PinchZoomComponent.decorators = [
    { type: Component, args: [{
                selector: 'pinch-zoom, [pinch-zoom]',
                exportAs: 'pinchZoom',
                template: "<div class=\"pinch-zoom-content\" [class.pz-dragging]=\"isDragging\">\n\t<ng-content></ng-content>\n</div>\n\n<!-- Control: one button -->\n<div class=\"pz-zoom-button pz-zoom-control-position-bottom\" \n\t[class.pz-zoom-button-out]=\"isZoomedIn\" \n\t*ngIf=\"isControl()\" \n\t(click)=\"toggleZoom()\"></div>",
                styles: [":host{position:relative;overflow:hidden;display:block}.pinch-zoom-content{height:inherit}.pz-dragging{cursor:all-scroll}.pz-zoom-button{position:absolute;z-index:1000;color:#fff;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgc3R5bGU9IiI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6IiBpZD0ic3ZnXzEiIGNsYXNzPSIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIvPjxwYXRoIGQ9Ik0xMiAxMGgtMnYySDl2LTJIN1Y5aDJWN2gxdjJoMnYxeiIgaWQ9InN2Z18zIiBjbGFzcz0iIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiLz48L2c+PC9zdmc+),url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6TTcgOWg1djFIN3oiIGlkPSJzdmdfMiIgY2xhc3M9IiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPg==);background-color:rgba(0,0,0,.8);background-position:center,-1000px;background-repeat:no-repeat,no-repeat;background-size:40px;width:56px;height:56px;border-radius:4px;opacity:.5;cursor:pointer;transition:opacity .1s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pz-zoom-button-out{background-position:-1000px,center}.pz-zoom-button:hover{opacity:.7}.pz-zoom-button.pz-zoom-control-position-right{right:16px;top:50%;margin-top:-28px}.pz-zoom-button.pz-zoom-control-position-right-bottom{right:16px;bottom:32px}.pz-zoom-button.pz-zoom-control-position-bottom{bottom:16px;left:50%;margin-left:-28px}.pz-zoom-control{position:absolute;background-color:rgba(0,0,0,.8);border-radius:4px;overflow:hidden}.pz-zoom-control.pz-zoom-control-position-right{right:16px;top:50%;margin-top:-48px}.pz-zoom-control.pz-zoom-control-position-right-bottom{right:16px;bottom:32px}.pz-zoom-control.pz-zoom-control-position-bottom{bottom:16px;left:50%;margin-left:-48px}.pz-zoom-in,.pz-zoom-out{width:48px;height:48px;background-position:center;background-repeat:no-repeat;opacity:1;cursor:pointer}.pz-zoom-in:hover,.pz-zoom-out:hover{background-color:rgba(255,255,255,.2)}.pz-zoom-control-position-bottom .pz-zoom-in,.pz-zoom-control-position-bottom .pz-zoom-out{float:right}.pz-disabled{opacity:.5;cursor:default}.pz-disabled:hover{background-color:rgba(255,255,255,0)}.pz-zoom-in{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgc3R5bGU9IiI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE5IDEzaC02djZoLTJ2LTZINXYtMmg2VjVoMnY2aDZ2MnoiIGlkPSJzdmdfMSIgY2xhc3M9IiIgc3Ryb2tlPSJub25lIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiLz48cGF0aCBkPSJNLTE1LjgzNjczNDQyMDQ2MTY1Myw0NC41MzU0MDkzMDY3MTAxOCBoNTguMjA0MDgwODI3NTkzMDkgdi02LjU3NjIyNjcyMzM2OTIyMTUgSC0xNS44MzY3MzQ0MjA0NjE2NTMgeiIgZmlsbD0ibm9uZSIgaWQ9InN2Z18yIiBjbGFzcz0iIiBzdHJva2U9Im5vbmUiLz48L2c+PC9zdmc+)}.pz-zoom-out{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE5IDEzSDV2LTJoMTR2MnoiIGlkPSJzdmdfMSIgY2xhc3M9IiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPg==)}"]
            }] }
];
/** @nocollapse */
PinchZoomComponent.ctorParameters = () => [
    { type: ElementRef }
];
PinchZoomComponent.propDecorators = {
    properties: [{ type: Input, args: ['properties',] }],
    transitionDuration: [{ type: Input, args: ['transition-duration',] }],
    doubleTap: [{ type: Input, args: ['double-tap',] }],
    doubleTapScale: [{ type: Input, args: ['double-tap-scale',] }],
    autoZoomOut: [{ type: Input, args: ['auto-zoom-out',] }],
    limitZoom: [{ type: Input, args: ['limit-zoom',] }],
    disabled: [{ type: Input, args: ['disabled',] }],
    disablePan: [{ type: Input }],
    overflow: [{ type: Input }],
    zoomControlScale: [{ type: Input }],
    disableZoomControl: [{ type: Input }],
    backgroundColor: [{ type: Input }],
    limitPan: [{ type: Input }],
    minScale: [{ type: Input }],
    listeners: [{ type: Input }],
    wheel: [{ type: Input }],
    autoHeight: [{ type: Input }],
    wheelZoomFactor: [{ type: Input }],
    draggableImage: [{ type: Input }],
    hostOverflow: [{ type: HostBinding, args: ['style.overflow',] }],
    hostBackgroundColor: [{ type: HostBinding, args: ['style.background-color',] }]
};
if (false) {
    /** @type {?} */
    PinchZoomComponent.prototype.pinchZoom;
    /** @type {?} */
    PinchZoomComponent.prototype._properties;
    /** @type {?} */
    PinchZoomComponent.prototype.transitionDuration;
    /** @type {?} */
    PinchZoomComponent.prototype.doubleTap;
    /** @type {?} */
    PinchZoomComponent.prototype.doubleTapScale;
    /** @type {?} */
    PinchZoomComponent.prototype.autoZoomOut;
    /** @type {?} */
    PinchZoomComponent.prototype.limitZoom;
    /** @type {?} */
    PinchZoomComponent.prototype.disabled;
    /** @type {?} */
    PinchZoomComponent.prototype.disablePan;
    /** @type {?} */
    PinchZoomComponent.prototype.overflow;
    /** @type {?} */
    PinchZoomComponent.prototype.zoomControlScale;
    /** @type {?} */
    PinchZoomComponent.prototype.disableZoomControl;
    /** @type {?} */
    PinchZoomComponent.prototype.backgroundColor;
    /** @type {?} */
    PinchZoomComponent.prototype.limitPan;
    /** @type {?} */
    PinchZoomComponent.prototype.minScale;
    /** @type {?} */
    PinchZoomComponent.prototype.listeners;
    /** @type {?} */
    PinchZoomComponent.prototype.wheel;
    /** @type {?} */
    PinchZoomComponent.prototype.autoHeight;
    /** @type {?} */
    PinchZoomComponent.prototype.wheelZoomFactor;
    /** @type {?} */
    PinchZoomComponent.prototype.draggableImage;
    /**
     * @type {?}
     * @private
     */
    PinchZoomComponent.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/pinch-zoom.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PinchZoomModule {
}
PinchZoomModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    PinchZoomComponent
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    PinchZoomComponent
                ],
                providers: [],
                bootstrap: [],
                entryComponents: [
                    PinchZoomComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-pinch-zoom.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PinchZoomModule, PinchZoomComponent as ɵa };
//# sourceMappingURL=ngx-pinch-zoom.js.map
