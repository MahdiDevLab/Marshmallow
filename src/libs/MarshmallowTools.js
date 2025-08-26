// Marshmallow Tools v1.0.0
const MarshmallowTools = {
   C: new ColorLab(),
   checkCssVar(varName, target) {
      if (!target) target = document.documentElement;
      return getComputedStyle(target).getPropertyValue(varName.toLowerCase()) !== '';
   },
   getCssVar(varName, target){
      if (!target) target = document.documentElement;
      return getComputedStyle(target).getPropertyValue(varName.toLowerCase());
   },
   isColor(color){
      if (/^@/.test(color)) {
         if (this.checkCssVar(color.replace('@', '--m-'))) {
            return this.C.isColor(this.getCssVar(color.replace('@', '--m-')))
         }
      } 
      return this.C.isColor(color);
   },
   getColors(color){
      let output = {
         color: undefined,
         innerColor: undefined,
      };
      if (!this.isColor(color)) return output;
      if (/^@/.test(color)) {
         output.color = this.getCssVar(color.replace('@', '--m-'));
      } else {
         output.color = color;
      }
      output.innerColor = this.C.getBestContrastColor(output.color);
      
      return output
   }
}