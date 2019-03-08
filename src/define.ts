import { render } from "preact";
import { extractDestructuredParams } from "./params";

export const define = (
  config: { tag: string; params: string[]; extendFromElement?: any },
  fn: Function
) => {
  const { tag, params, extendFromElement } = config;
  const fnParams = params ? params : extractDestructuredParams(fn.toString());
  const targetElement = extendFromElement || HTMLElement;

  function MyCustomElement() {
    const that = Reflect.construct(targetElement, [], MyCustomElement);

    fnParams.forEach((arg: string) => {
      Object.defineProperty(that, arg, {
        set: function(value) {
          this["_" + arg] = value;
          this._render();
        },
        get: function() {
          return this["_" + arg];
        }
      });
    });
    return that;
  }

  MyCustomElement.prototype.connectedCallback = function() {
    this.attachShadow({ mode: "open" });
    this._render();
  };

  MyCustomElement.prototype.attributeChangedCallback = function(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    this[name] = newValue;
  };

  MyCustomElement.prototype._render = function() {
    const attributes = fnParams.reduce((acc, curr) => {
      acc[curr] = this[curr];
      return acc;
    }, {});
    const args = Object.assign({ ["element"]: this }, attributes);

    const contentToRender = fn.call(this, args);

    if (Array.isArray(contentToRender)) {
      contentToRender.forEach((fragment, index) => {
        this[`fragment${index}`] = render(
          fragment,
          this.shadowRoot,
          this[`fragment${index}`]
        );
      });
    } else {
      this.htmlNode = render(contentToRender, this.shadowRoot, this.htmlNode);
    }
  };

  // Note that to get the attributeChangedCallback() callback to fire
  // when an attribute changes, you have to observe the attributes.
  // This is done by specifying a static get observedAttributes() method
  // inside custom element class - this should return  an array containing
  // the names of the attributes you want to observe
  MyCustomElement["observedAttributes"] = Array.from(fnParams);

  MyCustomElement.prototype.__proto__ = HTMLElement.prototype;
  MyCustomElement["__proto__"] = HTMLElement;

  return window.customElements.define(tag, MyCustomElement);
};
