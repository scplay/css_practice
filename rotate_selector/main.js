function RotateSelector(selector) {

    const ITEM_SCALE_REM_RATIO = 1.5;

    let __self = {
        anchor_elem: null,

        anchor_elem_child: null,

        selector_height: null,

        is_pressed: false,

        px_per_rem: null,

        start_pos: {
            x: null,
            y: null
        },

        // selection  的偏移量
        last_y: 0,

        cache_last_y: 0

    }

    this.value = null;

    this.__self = __self;

    this.getIndex = getIndex;

    this.moveToIndex = moveToIndex;

    this.getValue = () => {};

    init(selector);

    function getIndex() {
        return Math.round(__self.last_y / (__self.px_per_rem * ITEM_SCALE_REM_RATIO)) * -1;
    }

    /**
     * bind selector
     * calc height
     * @param {string} selector 
     */
    function init(selector) {

        __self.anchor_elem = document.querySelector(selector);

        __self.anchor_elem_child = __self.anchor_elem.children[0];

        /** calc height  */
        __self.px_per_rem = parseFloat(window.getComputedStyle(document.body).fontSize);
        __self.selector_height = __self.anchor_elem_child.offsetHeight;
        __self.max_offset = __self.selector_height * -1 + __self.px_per_rem * ITEM_SCALE_REM_RATIO;

        bindElementTouchMove(__self.anchor_elem);
    }

    /**
     * @deprecated 
     * 
     * @param {*} elements 
     */
    function bindElementsTouchMove(elements) {

        console.log('bind selector element');

        if (elements instanceof NodeList) {
            if (elements[0] instanceof HTMLElement) {
                bindElementTouchMove(elements[0]);
            }
        }
    }

    /**
     * bind events
     * 
     * @param {HTMLElemnt} element 
     */
    function bindElementTouchMove(element) {

        element.addEventListener('mousedown', recordStartPos, false);
        element.addEventListener('mousedown', stopSliding, false);

        element.addEventListener('mousemove', calcAndShift, false);
        element.addEventListener('mousemove', recordTickPos, false);

        element.addEventListener('mouseup', checkIfNeedSlide, false);
        element.addEventListener('mouseout', checkIfNeedSlide, false);
    }

    function recordStartPos(event) {
        __self.is_pressed = true;

        __self.start_pos.x = event.clientX;
        __self.start_pos.y = event.clientY;

        __self.cache_last_y = __self.last_y;

        console.log(event);
    }

    function stopSliding(event) {
        console.log('stop befor sliding');
    }

    function calcAndShift(event) {

        if (!__self.is_pressed) return;

        let delta = event.clientY - __self.start_pos.y;

        let dest_y = __self.cache_last_y + delta / 1.2;

        if (dest_y > 0) dest_y = 0;
        if (dest_y < __self.max_offset) dest_y = __self.max_offset;

        __self.anchor_elem_child.style.transform = 'translateY(' + dest_y + 'px)';

        __self.last_y = dest_y;

        // console.log(event);
    }

    function recordTickPos(event) {
        // console.log(event);
    }

    function checkIfNeedSlide(event) {
        __self.is_pressed = false;

        moveToIndex(getIndex());
    }

    function moveToIndex(idx) {
        __self.last_y = __self.px_per_rem * ITEM_SCALE_REM_RATIO * idx * -1;

        let dest_y = __self.px_per_rem * ITEM_SCALE_REM_RATIO * idx * -1;

        let last_tick_y = __self.last_y + (dest_y - __self.last_y) * .1;

        // let raf = requestAnimationFrame(function easeScroll() {

        //     if (Math.abs(last_tick_y) < 1) {
        //         __self.anchor_elem_child.style.transform = 'translateY(' + dest_y + 'px)';
        //         __self.last_y = dest_y;
        //     } else {
        //         __self.anchor_elem_child.style.transform = 'translateY(' + last_tick_y + 'px)';
        //         __self.last_y = last_tick_y;
        //         last_tick_y = __self.last_y + (dest_y - __self.last_y) * .1;
        //         raf = requestAnimationFrame(easeScroll);
        //     }
        // });

        __self.anchor_elem_child.style.transition = 'all 80ms ease-out';
        __self.anchor_elem_child.style.transform = 'translateY(' + __self.last_y + 'px)';
    }


}

let r_select = new RotateSelector('.select-stage');