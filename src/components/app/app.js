class App extends HTMLElement {
   //------------------
   // Private Variable 
   //------------------
   #ELM; // Element 
   #ATT; // Attributes 
   #CSS; // CSS Code
   #MT; // Marshmallow Tools
   
   //-------------
   // Constructor
   //-------------
   constructor() {
      super();
      this.#ELM = this.attachShadow({ mode: 'open' });
      this.#MT = MarshmallowTools;
      this.#CSS = `<CSS/>`
      this.#ATT = {
         color: 'var(--m-app-color, var(--m-background))',
         innerColor: 'var(--m-app-inner-color, var(--m-on-background))',
      }
      
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
      switch (name) {
         case 'color': {
            let {color, innerColor} = this.#MT.getColors(newValue);
            if (color) {
               this.#ATT.color = color;
               if (!this.hasAttribute('inner-color')) {
                  this.setAttribute('inner-color', innerColor);
               }
               this.#updateStyles();
            }
            break;
         }
         case 'inner-color': {
            let {color} = this.#MT.getColors(newValue);
            if (color) {
               this.#ATT.innerColor = color;
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
      const style = this.#ELM.querySelector('style');
      style.textContent = this.#getStyle();
   }
   
   #getStyle() {
      let css = this.#CSS;
      const vals = {
         color: this.#ATT.color,
         innerColor: this.#ATT.innerColor,
      };
      
      for (let key in vals) {
         css = css.split(`"$${key}"`).join(vals[key]);
      }
      
      return css;
   }
   
   #render() {
      this.#ELM.innerHTML = `
         <style>
            ${this.#getStyle()}
         </style>
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
      return this.#ATT.color; 
   }
   
   set innerColor(val) {
      this.setAttribute('inner-color', val);
   }
   get innerColor() {
      return this.#ATT.innerColor; 
   }
}