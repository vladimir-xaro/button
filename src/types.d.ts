import { I_EventEmitter } from '@xaro/event-emitter';

export interface I_Button {
  emitter:  I_EventEmitter;
  el:       HTMLElement;
  isLock:   boolean;

  lock():   void;
  unlock(): void;
}

export interface I_ButtonConstructorConfig {
  el: HTMLElement;
  on?: {
    beforeClick?:   I_ButtonMouseCallback | I_ButtonMouseCallback[];
    afterClick?:    I_ButtonMouseCallback | I_ButtonMouseCallback[];

    mouseenter?:    I_ButtonMouseCallback | I_ButtonMouseCallback[];
    mouseover?:     I_ButtonMouseCallback | I_ButtonMouseCallback[];
    mouseleave?:    I_ButtonMouseCallback | I_ButtonMouseCallback[];

    beforeLock?:    I_ButtonStateCallback | I_ButtonStateCallback[];
    afterLock?:     I_ButtonStateCallback | I_ButtonStateCallback[];

    beforeUnlock?:  I_ButtonStateCallback | I_ButtonStateCallback[];
    afterUnlock?:   I_ButtonStateCallback | I_ButtonStateCallback[];
  }
}

export type I_ButtonStateCallback = (button: I_Button) => void;
export type I_ButtonMouseCallback = (button: I_Button, originalEvent: MouseEvent) => void;

export interface I_ButtonCustomEvents {
  [key: string]: {
    listener: T_Func,
    dispose: T_Func[]
  }
}