class Divider extends HTMLElement {
   //------------------
   // Private Variable 
   //------------------
   #MT;
   #CSS;
   #ELEMENT;
   #ATTRIBUTES;
   #DEFAULT_ATTRIBUTES = {
      'color': 'var(--m-divider-color, var(--m-surface-container-high))',
      'weight': 'var(--m-divider-weight, 2px)',
      'type': 'var(--m-divider-type, solid)',
      'gap': 'var(--m-divider-gap, 10px)',
      'round': false,
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
      return ['color', 'weight', 'type', 'gap', 'round'];
   }
   
   attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;
      
      if (newValue === null) {
         this.#ATTRIBUTES[name] = this.#DEFAULT_ATTRIBUTES[name];
         this.#updateStyles();
         return;
      }
      
      switch (name) {
         case 'color': {
            let { color } = this.#MT.getColors(newValue);
            if (color) {
               this.#ATTRIBUTES[name] = color;
               this.#updateStyles();
            }
            break;
         }
         case 'weight':
         case 'type':
         case 'gap': {
            this.#ATTRIBUTES[name] = newValue;
            this.#updateStyles();
         }
         case 'round': {
            this.#ATTRIBUTES[name] = this.hasAttribute(name);
            this.#updateStyles();
         }
      }
   }
   
   //-----------------
   // private Methods
   //-----------------
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
         'weight': this.#ATTRIBUTES['weight'],
         'type': this.#ATTRIBUTES['type'],
         'gap': this.#ATTRIBUTES['gap'],
      };
      
      for (let key in vals) {
         css = css.split(`"$${key}"`).join(vals[key]);
      }
      
      return css;
   }
   
   #render() {
      this.#ELEMENT.innerHTML = `<style>${this.#getStyle()}</style>`;
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
   
   set weight(val) {
      this.setAttribute('weight', val);
   }
   get weight() {
      return this.#ATTRIBUTES['weight'];
   }
   
   set type(val) {
      this.setAttribute('type', val);
   }
   get type() {
      return this.#ATTRIBUTES['type'];
   }
   
   set gap(val) {
      this.setAttribute('gap', val);
   }
   get gap() {
      return this.#ATTRIBUTES['gap'];
   }
   
   set round(val) {
      this.setAttribute('round', val);
   }
   get round() {
      return this.#ATTRIBUTES['round'];
   }
}