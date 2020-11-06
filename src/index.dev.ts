import Button, { I_Button } from "./";

const btn1 = new Button({
  el: document.querySelector('.button-1') as HTMLElement,
  on: {
    beforeClick:  (button: I_Button, originalEvent: MouseEvent) => {
      console.log('[button-1] beforeClick');
    },
    afterClick:   (button: I_Button, originalEvent: MouseEvent) => {
      console.log('[button-1] afterClick');
    },
    // mouseenter:   (button: I_Button, originalEvent: MouseEvent) => {
    //   console.log('[button-1] mouseenter');
    // },
    // mouseover:    (button: I_Button, originalEvent: MouseEvent) => {
    //   console.log('[button-1] mouseover');
    // },
    // mouseleave:   (button: I_Button, originalEvent: MouseEvent) => {
    //   console.log('[button-1] mouseleave');
    // },
    beforeLock:   (button: I_Button) => {
      console.log('[button-1] beforeLock');
    },
    afterLock:    (button: I_Button) => {
      console.log('[button-1] afterLock');
    },
    beforeUnlock: (button: I_Button) => {
      console.log('[button-1] beforeUnlock');
    },
    afterUnlock:  (button: I_Button) => {
      console.log('[button-1] afterUnlock');
    }
  }
});

btn1.on('mouseenter', (button: I_Button, originalEvent: MouseEvent) => {
  console.log('[button-1] mouseenter');
});

btn1.on('blur', (button: I_Button, originalEvent: MouseEvent) => {
  console.log('[button-1] blur');
});

btn1.on('focus', (button: I_Button, originalEvent: MouseEvent) => {
  console.log('[button-1] focus');
});

// btn1.removeEvent('mouseenter');

(window as any).btn1 = btn1;

const btn2 = new Button({
  el: document.querySelector('.button-2') as HTMLElement,
  on: {
    // click: [
    //   (button: I_Button) => {
    //     console.log('[button-2] click', button)
    //   }
    // ],
    afterLock: (button: I_Button) => {
      console.log('[button-2] afterLock')
    },
    afterUnlock: (button: I_Button) => {
      console.log('[button-2] afterUnlock')
    }
  }
});