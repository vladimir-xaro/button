import EventEmitter, { I_EventEmitter, T_Func } from "@xaro/event-emitter";
import { checkButtonType } from "./helpers";
import { I_Button, I_ButtonConstructorConfig, I_ButtonCustomEvents } from "./types";

export default class Button implements I_Button {
  emitter:        I_EventEmitter;
  isLock:         boolean               = false;
  customEvents:   I_ButtonCustomEvents  = {};

  el:             HTMLElement;

  protected disabledObj!: {
    can:          boolean;
    target?:      HTMLButtonElement | HTMLInputElement;
    constructor?: Function;
  }


  /**
   * Create button
   */
  constructor(config: I_ButtonConstructorConfig) {
    this.emitter        = new EventEmitter(config.on);
    this.el             = config.el;

    this.el.addEventListener('click', this.click.bind(this));

    if (config.on) {
      // config.on.mouseenter  && this.el.addEventListener('mouseenter', this.mouseenter.bind(this) as EventListener);
      // config.on.mouseover   && this.el.addEventListener('mouseover',  this.mouseover.bind(this) as EventListener);
      // config.on.mouseleave  && this.el.addEventListener('mouseleave', this.mouseleave.bind(this) as EventListener);
    }

    if (checkButtonType(this.el)) {
      this.disabledObj = {
        can:          true,
        target:       this.el  as HTMLButtonElement | HTMLInputElement,
        constructor:  this.el.constructor
      }
    } else {
      let btn = this.el.querySelector('.button');
      if (btn && checkButtonType(btn)) {
        this.disabledObj = {
          can:          true,
          target:       btn as HTMLButtonElement | HTMLInputElement,
          constructor:  btn.constructor
        }
      } else {
        this.disabledObj = {
          can: false
        }
      }
    }
  }


  /**
   * DOM listener
   */
  protected click(originalEvent: Event) {
    originalEvent.preventDefault();

    if (this.isLock) {
      return;
    }

    this.emitter.emit('beforeClick', this, originalEvent);

    this.emitter.emit('afterClick', this, originalEvent);
  }

  // protected mouseenter(originalEvent: MouseEvent) {
  //   this.emitter.emit('mouseenter', this, originalEvent);
  // }

  // protected mouseover(originalEvent: MouseEvent) {
  //   this.emitter.emit('mouseover', this, originalEvent);
  // }

  // protected mouseleave(originalEvent: MouseEvent) {
  //   this.emitter.emit('mouseleave', this, originalEvent);
  // }


  /**
   * Add custom event
   */
  on(key: string, cb: T_Func): { listener: T_Func, dispose: T_Func[] } {
    let result: { listener: T_Func, dispose: T_Func[] } = {
      listener: ((originalEvent: Event) => this.emitter.emit(key, this, originalEvent)).bind(this),
      dispose: this.emitter.subscribe(key, cb)
    }

    this.el.addEventListener(key, result.listener);

    this.customEvents[key] = result;

    return result;
  }


  /**
   * Remove custom event
   */
  off(key: string) {
    if (! (this.customEvents as Object).hasOwnProperty(key)) {
      return;
    }

    // remove dom listener
    this.el.removeEventListener(key, this.customEvents[key].listener);
    
    // dispose emitter listeners
    for (const dispose of this.customEvents[key].dispose) {
      dispose();
    }

    // check and remove event key
    if (! this.emitter.listenerCount(key)) {
      this.emitter.unsubscribe(key);
    }

    // remove instance customEvent by key
    delete this.customEvents[key];
  }


  /**
   * Lock button;
   */
  lock() {
    this.emitter.emit('beforeLock', this);

    if (this.disabledObj.can) {
      this.disabledObj.target!.disabled = true;
    }

    this.isLock = true;

    this.el.classList.add('disabled');

    this.emitter.emit('afterLock', this);
  }


  /**
   * Unlock button
   */
  unlock() {
    this.emitter.emit('beforeUnlock', this);

    if (this.disabledObj.can) {
      this.disabledObj.target!.disabled = false;
    }

    this.isLock = false;

    this.el.classList.remove('disabled');

    this.emitter.emit('afterUnlock', this);
  }
}