// Marshmallow <version/>
((G) => {
   //-------------------------
   //          Libs
   //-------------------------
   <ColorLab/>;
   <Mushroom/>;
   <MarshmallowTools/>;
   
   //-------------------------
   //       Components 
   //-------------------------
   <Components/>;
   
   //-------------------------
   //       Marshmallow 
   //-------------------------
   class Marshmallow {
      /* Private Variables */
      #M;
      #C = {
         color: 'Deep Sky Blue',
         surfaceColor: 'primary',
         theme: 'light',
         contrast: 50,
         colorHarmony: 'analogous',
      };
      #O = {
         styleElement: null,
         commentNode: null,
      };
      #FirstGrow = true;
      
      /* Constructor */
      constructor(config) {
         this.version = '<version/>';
         this.#C = Object.assign({},config,this.#C);
         
         this.#M = this.#setUpMushroom();
         this.#M.ongrow = () => this.#grow();
      }
      
      /* Private Methods */
      #defineElements() {
         <DefineElements/>;
      }
      #setUpMushroom() {
         return new Mushroom({
            color: this.#C.color,
            surfaceColor: this.#C.surfaceColor,
            theme: this.#C.theme,
            contrast: this.#C.contrast,
            colorHarmony: this.#C.colorHarmony,
            
            // Marshmallow default 
            prefix: 'm',
            clearConsole: true,
            sprout: false,
            root: ':root',
            hasPalette: true,
            hasSubPalette: true,
            hasColorLoopPalette: true,
            hasSubColorLoopPalette: true,
            reverseSubPalette: false,
            fixedSubPalette: false,
            parts: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            customColors: {},
         });
      }
      #grow() {
         let id = 'MARSHMALLOW-CSS-OUTPUT';
         let comment = 'Marshmallow ' + this.version;
         let head = document.head;
         
         if (this.#O.styleElement) this.#O.styleElement.remove();
         if (this.#O.commentNode) this.#O.commentNode.remove();
         
         this.#O.commentNode = document.createComment(` ${comment} `);
         head.appendChild(this.#O.commentNode);
         
         this.#O.styleElement = document.createElement('style');
         this.#O.styleElement.id = id;
         this.#O.styleElement.textContent = `<MainStyle/> \n\n/* Mushroom */\n${this.#M.code}`;
         head.appendChild(this.#O.styleElement);
         
         if (this.#FirstGrow) {
            this.#defineElements();
            this.#FirstGrow = false;
         }
         
      }
      
      /* Methods */
      toggleTheme(){
         this.#M.toggleTheme();
      }
   }
   
   //-------------------------
   //         Exports 
   //-------------------------
   G.Marshmallow = Marshmallow;
   
})(globalThis);