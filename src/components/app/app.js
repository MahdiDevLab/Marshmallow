class App extends HTMLElement {
   //------------------
   // Private Variable 
   //------------------
   #MT;
   #CSS;
   #ELEMENT;
   #ATTRIBUTES;
   #DEFAULT_ATTRIBUTES = {
      'color': 'var(--m-app-color, var(--m-background))',
      'inner-color': 'var(--m-app-inner-color, var(--m-on-background))',
   }
   
   //-------------
   // Constructor
   //-------------
   constructor() {
      super();
      this.#ELEMENT = this.attachShadow({ mode: 'open' });
      this.#MT = MarshmallowTools;
      this.#CSS = `<CSS/>`
      this.#ATTRIBUTES = { ...this.#DEFAULT_ATTRIBUTES };
      
      // render 
      this.#render();
   }
   
   //---------------------
   // Observed Attributes
   //---------------------
   static get observedAttributes() {
      return ['color', 'inner-color'];
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
}