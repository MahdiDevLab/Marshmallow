// Marshmallow <Version/>
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
         color: 'Royal Blue',
         theme: 'light',
      };
      #O = {
         styleElement: null,
         commentNode: null,
      };
      #FirstGrow = true;
      
      /* Constructor */
      constructor() {
         this.version = '<Version/>';
         
         this.#M = this.#setUpMushroom();
         this.#M.ongrow = () => this.#grow();
      }
      
      /* Private Methods */
      #defineElements() {
         <DefineElements/>;
      }
      #setUpMushroom() {
         return new Mushroom({
            prefix: 'm',
            sprout: false,
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
   }
   
   //-------------------------
   //         Exports 
   //-------------------------
   G.Marshmallow = Marshmallow;
   
})(globalThis);