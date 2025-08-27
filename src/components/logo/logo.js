class Logo extends HTMLElement {
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
         size: 'var(--m-logo-size, 100%)',
         color: 'var(--m-logo-color, #000)',
         innerColor: 'var(--m-logo-inner-color, #fff)',
      }
      
      // render 
      this.#render();
   }
   
   //---------------------
   // Observed Attributes
   //---------------------
   static get observedAttributes() {
      return ['size','color','inner-color'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
         case 'size': {
            this.#ATT.size = newValue;
            this.#updateStyles();
            break;
         }
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
         size: this.#ATT.size,
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
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
	         <path class="bg" d="M 500,0 C 850,0 1000,150 1000,500 C 1000,850 850,1000 500,1000 C 150,1000 0,850 0,500 C 0,150 150,0 500,0z" />
	         <path class="fg" d="M 300,300 C 300,150 700,150 700,300 L 700,700 C 700,850 300,850 300,700 L 300,300z" />
	         <path class="line" d="M 350,300 C 400,350 600,350 650,300" />
         </svg>
      `;
   }
   
   //-----------------
   // Setter & Getter
   //-----------------
   set size(val) {
      this.setAttribute('size', val);
   }
   get size() {
      return this.#ATT.size;
   }
}