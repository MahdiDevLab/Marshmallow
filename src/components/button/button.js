class Button extends HTMLElement {
   //------------------
   // Private Variable 
   //------------------
   #MT;
   #CSS;
   #ELEMENT;
   #ATTRIBUTES;
   #DEFAULT_ATTRIBUTES = {
      'color': 'var(--m-button-color, var(--m-primary))',
      'inner-color': 'var(--m-on-primary)',
      'size': 'medium',
      'full': false,
      'outline': false,
      'disabled': false,
      'type': undefined,
   }
   
   //-------------
   // Constructor
   //-------------
   constructor() {
      super();
      this.#ELEMENT = this.attachShadow({ mode: 'open' });
      this.#MT = MarshmallowTools;
      this.#CSS = `<CSS/>`;
      this.#ATTRIBUTES = { ...this.#DEFAULT_ATTRIBUTES };
      
      // render 
      this.#render();
   }
   
   //---------------------
   // Observed Attributes
   //---------------------
   static get observedAttributes() {
      return ['color', 'inner-color', 'size', 'full', 'outline', 'disabled','type'];
   }
   
   attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;
      
      if (newValue === null) {
         this.#ATTRIBUTES[name] = this.#DEFAULT_ATTRIBUTES[name];
         this.#updateStyles();
         return;
      }
      
      switch (name) {
         case 'color': 
         case 'inner-color': {
            let { color } = this.#MT.getColors(newValue);
            if (color) {
               this.#ATTRIBUTES[name] = color;
               this.#updateStyles();
            }
            break;
         }
         case 'size':
         case 'type': {
            this.#ATTRIBUTES[name] = newValue;
            this.#updateStyles();
            break;
         }
         case 'full': 
         case 'outline': 
         case 'disabled': {
            this.#ATTRIBUTES[name] = this.hasAttribute(name);
            this.#updateStyles();
            break;
         }
      }
   }
   
   //-----------------
   // private Methods
   //-----------------
   #handleClick() {
      if (this.disabled) {
         event.preventDefault();
         event.stopPropagation();
         return;
      }
      let parentForm = this.closest('form');
      let type = this.getAttribute('type');
      if (parentForm) {
         if (type == 'submit') {
            parentForm.requestSubmit();
         } else if (type == 'reset') {
            parentForm.reset();
         }
      }
   }
   
   #updateStyles() {
      const style = this.#ELEMENT.querySelector('style');
      if (style) {
         style.textContent = this.#getStyle();
      }
   }
   
   #getStyle() {
      let css = this.#CSS;
      const vals = {
         'color': this.#ATTRIBUTES['color'],
         'inner-color': this.#ATTRIBUTES['inner-color'],
      };
      
      for (let key in vals) {
         css = css.split(`"$${key}"`).join(vals[key]);
      }
      
      return css;
   }
   
   #render() {
      this.#ELEMENT.innerHTML = `
         <style>${this.#getStyle()}</style>
         <slot></slot>
      `;
      
      this.addEventListener('click', this.#handleClick.bind(this));
   }
   
   //-----------------
   // Setter & Getter
   //-----------------
   
   set color(val) {
      this.setAttribute('color', val);
   }
   get color() {
      return this.#ATTRIBUTES['color'];
   }
   
   set innerColor(val) {
      this.setAttribute('inner-color', val);
   }
   get innerColor() {
      return this.#ATTRIBUTES['inner-color'];
   }
   
   set size(val) {
      this.setAttribute('size', val);
   }
   get size() {
      return this.#ATTRIBUTES['size'];
   }
   
   set full(val) {
      val ? this.setAttribute('full', '') : this.removeAttribute('full');
   }
   get full() {
      return this.#ATTRIBUTES['full'];
   }
   
   set outline(val) {
      val ? this.setAttribute('outline', '') : this.removeAttribute('outline');
   }
   get outline() {
      return this.#ATTRIBUTES['outline'];
   }
   
   set disabled(val) {
      val ? this.setAttribute('disabled', '') : this.removeAttribute('outline');
   }
   get disabled() {
      return this.#ATTRIBUTES['disabled'];
   }
   
   set type(val) {
      this.setAttribute('type', val);
   }
   get type() {
      return this.#ATTRIBUTES['disabled'];
   }
   
   //----------
   // Property 
   //----------
   toggleDisabled() {
      this.disabled = !this.disabled;
   }
   
}
   