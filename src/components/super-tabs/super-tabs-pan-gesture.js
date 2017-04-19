"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("ionic-angular/util/dom");
class SuperTabsPanGesture {
    constructor(plt, el, config, rnd) {
        this.plt = plt;
        this.el = el;
        this.config = config;
        this.rnd = rnd;
        this.leftThreshold = 0;
        this.rightThreshold = 0;
        this.listeners = [];
        this.listeners.push(rnd.listen(el, 'touchstart', this._onStart.bind(this)), rnd.listen(el, 'touchmove', this._onMove.bind(this)), rnd.listen(el, 'touchend', this._onEnd.bind(this)));
        if (config.sideMenu === 'both' || config.sideMenu === 'left') {
            this.leftThreshold = config.sideMenuThreshold;
        }
        if (config.sideMenu === 'both' || config.sideMenu === 'right') {
            this.rightThreshold = config.sideMenuThreshold;
        }
    }
    destroy() {
        this.listeners.forEach(fn => fn());
    }
    _onStart(ev) {
        const coords = dom_1.pointerCoord(ev), vw = this.plt.width();
        if (coords.x < this.leftThreshold || coords.x > vw - this.rightThreshold) {
            // ignore this gesture, it started in the side menu touch zone
            this.shouldCapture = false;
            return;
        }
        // the starting point looks good, let's see what happens when we move
        this.initialCoords = coords;
        if (this.config.shortSwipeDuration > 0)
            this.initialTimestamp = Date.now();
        this.lastPosX = coords.x;
    }
    _onMove(ev) {
        const coords = dom_1.pointerCoord(ev);
        if (!this.isDragging) {
            if (typeof this.shouldCapture !== 'boolean')
                // we haven't decided yet if we want to capture this gesture
                this.checkGesture(coords);
            if (this.shouldCapture === true)
                // gesture is good, let's capture all next onTouchMove events
                this.isDragging = true;
            else
                return;
        }
        // stop anything else from capturing these events, to make sure the content doesn't slide
        ev.stopPropagation();
        ev.preventDefault();
        // get delta X
        const deltaX = this.lastPosX - coords.x;
        // emit value
        // this.onMove && this.debouncer.write(() => this.onMove(deltaX));
        this.onMove && this.onMove(deltaX);
        // update last X value
        this.lastPosX = coords.x;
    }
    _onEnd(ev) {
        const coords = dom_1.pointerCoord(ev);
        if (this.shouldCapture === true) {
            if (this.config.shortSwipeDuration > 0) {
                const deltaTime = Date.now() - this.initialTimestamp;
                if (deltaTime <= this.config.shortSwipeDuration)
                    this.onEnd && this.onEnd(true, coords.x - this.initialCoords.x);
                else
                    this.onEnd && this.onEnd(false);
            }
            else
                this.onEnd && this.onEnd(false);
        }
        this.isDragging = false;
        this.shouldCapture = undefined;
    }
    checkGesture(newCoords) {
        const radians = this.config.maxDragAngle * (Math.PI / 180), maxCosine = Math.cos(radians), deltaX = newCoords.x - this.initialCoords.x, deltaY = newCoords.y - this.initialCoords.y, distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance >= this.config.dragThreshold) {
            // swipe is long enough so far
            // lets check the angle
            const angle = Math.atan2(deltaY, deltaX), cosine = Math.cos(angle);
            this.shouldCapture = Math.abs(cosine) > maxCosine;
        }
    }
}
exports.SuperTabsPanGesture = SuperTabsPanGesture;
//# sourceMappingURL=super-tabs-pan-gesture.js.map