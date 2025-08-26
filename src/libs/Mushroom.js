// Mushroom v5.3.0 (Marshmallow EDITION!)
class Mushroom {
   
   //-------------------------
   //    Private Variables 
   //-------------------------
   #E = new EventTarget();
   #CL = new ColorLab();
   #PCS = window.matchMedia("(prefers-color-scheme:dark)");
   #C = {
      id: 'MUSHROOM',
      comment: 'Mushroom.js Output',
      clearConsole: false,
      sprout: true,
      color: 'Medium Violet Red',
      surfaceColor: 'primary',
      theme: 'auto',
      root: ':root',
      prefix: '',
      contrast: 50,
      colorHarmony: 'analogous',
      hasPalette: true,
      hasSubPalette: false,
      hasColorLoopPalette: true,
      hasSubColorLoopPalette: false,
      reverseSubPalette: false,
      fixedSubPalette: false,
      parts: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      customColors: {},
   };
   #O = {
      palette: {},
      subPalette: {},
      colorLoopPalette: {},
      subColorLoopPalette: {},
      allPalettes: {},
      code: '',
      styleElement: null,
      commentNode: null,
   };
   #V = {
      // basic 
      str: i => {
         return typeof i === 'string';
      },
      bol: i => {
         return typeof i === 'boolean';
      },
      num: i => {
         return typeof i === 'number'
      },
      obj: i => {
         return typeof i === 'object' && !Array.isArray(i) && i !== null
      },
      arr: i => {
         return typeof i === 'object' && Array.isArray(i) && i !== null
      },
      // Configs
      id: i => {
         return this.#V.str(i);
      },
      comment: i => {
         return this.#V.str(i);
      },
      color: i => {
         return this.#V.str(i) && this.#CL.isColor(i);
      },
      surfaceColor: i => {
         return this.#V.str(i) && (this.#CL.isColor(i) || /^(primary|secondary|tertiary|quaternary)$/i.test(i));
      },
      theme: i => {
         return this.#V.str(i) && /^(light|dark|auto)$/.test(i);
      },
      colorHarmony: i => {
         return this.#V.str(i) && /^(analogous|complementary|tetradic|compound|split-complementary|monochromatic|triadic|square)$/.test(i);
      },
      contrast: i => {
         return (i === 'auto') || (this.#V.num(i) && i >= 0 && i <= 100);
      },
      parts: i => {
         return this.#V.arr(i) && i.every(x => this.#V.num(x) && x >= 0 && x <= 100);
      },
      prefix: i => {
         return this.#V.str(i) && /^[a-z]*$/i.test(i);
      },
      customColors: i => {
         return this.#V.obj(i) && (Object.values(i).every(x => this.#V.color(x)) && Object.keys(i).every(x => /^[a-z][a-z0-9]*$/i.test(x)));
      },
      sprout: i => {
         return this.#V.bol(i);
      },
      hasPalette: i => {
         return this.#V.bol(i);
      },
      hasSubPalette: i => {
         return this.#V.bol(i);
      },
      reverseSubPalette: i => {
         return this.#V.bol(i);
      },
      fixedSubPalette: i => {
         return this.#V.bol(i);
      },
      hasColorLoopPalette: i => {
         return this.#V.bol(i);
      },
      hasSubColorLoopPalette: i => {
         return this.#V.bol(i);
      },
      clearConsole: i => {
         return this.#V.bol(i);
      },
   };
   #W = {
      'id': 'Invalid id "$1"!\nMust be an string',
      'comment': 'Invalid comment "$1"!\nMust be an string',
      'color': 'Invalid color "$1"!\nAccepted formats: 148 standard colors, Hex, RGB, HSL, CMYK, or HSV',
      'surfaceColor': 'Invalid surfaceColor "$1".\nAccepted formats: 148 standard colors, Hex, RGB, HSL, CMYK, or HSV',
      'theme': 'Invalid theme "$1"!\nMust be a string value exactly matching: "light", "dark", or "auto"',
      'colorHarmony': 'Invalid colorHarmony "$1".\nMust be a string exactly matching: "analogous", "complementary", "triadic", "tetradic", "square", "compound", "split-complementary", or "monochromatic"',
      'contrast': 'Invalid contrast "$1"!\nMust be: number (0-100) or string "auto"',
      'parts': 'Invalid parts "$1"!\nMust be an array of numbers (0-100)',
      'prefix': 'Invalid prefix "$1"!\nMust be English letters only (a-zA-Z)',
      'customColors': 'Invalid customColor!\n' +
         '• Object keys must:\n' +
         '  - Start with English letter\n' +
         '  - Contain only English letters and numbers\n' +
         '• Color values must use valid formats:\n' +
         '  - 148 standard colors\n' +
         '  - Hex, RGB, HSL, CMYK, or HSV',
      'sprout': 'Invalid sprout "$1"!\nMust be boolean: true or false',
      'hasPalette': 'Invalid hasPalette "$1"!\nMust be boolean: true or false',
      'hasSubPalette': 'Invalid hasSubPalette "$1"!\nMust be boolean: true or false',
      'reverseSubPalette': 'Invalid reverseSubPalette "$1"!\nMust be boolean: true or false',
      'fixedSubPalette': 'Invalid fixedSubPalette "$1"!\nMust be boolean: true or false',
      'hasColorLoopPalette': 'Invalid hasColorLoopPalette "$1"!\nMust be boolean: true or false',
      'hasSubColorLoopPalette': 'Invalid hasSubColorLoopPalette "$1"!\nMust be boolean: true or false',
      'clearConsole': 'Invalid clearConsole "$1"!\nMust be boolean: true or false',
      'UnauthorizedCustomColor': 'Unauthorized custom color name "$1".\n' +
         'Reserved system color names: ' +
         'primary, secondary, tertiary, quaternary, error\n' +
         'Please choose a different name',
   };
   
   //-------------------------
   //       Constructor
   //-------------------------
   constructor(configs = {}) {
      this.version = "5.3.0";
      this.#setupConfigs(configs);
      this.#setupThemeChange();
   }
   
   //-------------------------
   //     private Methods 
   //-------------------------
   #warn(name, warn) {
      let messages = this.#W[name].replace('$1', warn);
      queueMicrotask(() => this.#dispatch('warn', { name, warn, messages }));
      console.warn('[Mushroom.js]', this.#W[name].replace('$1', warn));
   }
   #dispatch(event, detail = {}) {
      this.#E.dispatchEvent(new CustomEvent(event, { detail }));
   }
   #setConfig(key, val) {
      if (val === undefined) return;
      let V = this.#V[key](val);
      if (V) {
         this.#C[key] = val;
         this.#grow();
      }
      else {
         this.#warn(key, val);
      }
   }
   #setupConfigs(configs) {
      let C = this.#C;
      for (let i in C) {
         if (configs[i] !== undefined) {
            let V = this.#V[i](configs[i]);
            if (V) this.#C[i] = configs[i];
            else this.#warn(i, configs[i]);
         }
      }
      this.#grow();
   }
   #setupThemeChange() {
      if (this.#C.theme === 'auto') {
         this.#PCS.onchange = () => this.#grow();
      }
   }
   #accentHue(colorHarmony) {
      switch (colorHarmony) {
         case 'analogous':
            return [0, 30, -30, 30];
         case 'complementary':
            return [0, 180, 0, 180];
         case 'tetradic':
            return [0, 60, 180, 240];
         case 'compound':
            return [0, 150, -150, 150];
         case 'split-complementary':
            return [0, 30, 180, 210];
         case 'monochromatic':
            return [0, 0, 0, 0];
         case 'triadic':
            return [0, 120, -120, 120];
         case 'square':
            return [0, 90, -90, 180];
         default:
            return [0, 30, -30, 30];
      }
   }
   #colorLoop() {
      let makeToneRatios = (target = 0, count = 12) => {
         const min = 0.2;
         const max = 1;
         const amplitude = (max - min) / 2;
         const offset = min + amplitude;
         
         const startIndex = Math.round((target % 360) / (360 / count)) % count;
         
         const ratios = [];
         for (let i = 0; i < count; i++) {
            const angle = (i / count) * 2 * Math.PI;
            const value = offset + amplitude * Math.cos(angle);
            ratios.push(+value.toFixed(3));
         }
         
         const maxIndex = ratios.indexOf(max);
         
         const result = [];
         for (let i = 0; i < count; i++) {
            const index = (maxIndex + count - startIndex + i) % count;
            result.push(ratios[index]);
         }
         
         return result;
      };
      
      let C = this.#C;
      let N = ['red', 'orange', 'yellow', 'lime', 'green', 'spring-green', 'sky-blue', 'royal-blue', 'blue', 'indigo', 'purple', 'pink'];
      let { H, S } = this.#CL.toHslChannels(C.color);
      let steps = 360 / N.length;
      
      let ratios = makeToneRatios(H, N.length);
      
      let result = {};
      for (let i = 0; i < N.length; i++) {
         result[N[i]] = {
            H: (i * steps) % 360,
            S: Math.min(100, ratios[i] * S)
         };
      }
      
      return result;
   }
   #palette() {
      let V = this.#V;
      let C = this.#C;
      let { H, S, L } = this.#CL.toHslChannels(C.color);
      let theme = this.currentTheme();
      let AN = ['primary', 'secondary', 'tertiary', 'quaternary'];
      let AH = this.#accentHue(C.colorHarmony);
      let HA = AH.map(i => i + H > 360 ? i + H - 360 : i + H)
      let sH, sS, sL;
      let result = {};
      
      if (C.contrast !== 'auto') L = C.contrast;
      if (V.color(C.surfaceColor)) {
         sH = this.#CL.getHue(C.surfaceColor);
         sS = this.#CL.getSaturation(C.surfaceColor);
         sL = this.#CL.getLightness(C.surfaceColor);
         if (C.contrast !== 'auto') sL = C.contrast;
      }
      else {
         sH = HA[AN.indexOf(C.surfaceColor)];
         sS = S;
         sL = L;
      }
      
      let D = {
         N: {
            accent: ['primary', 'secondary', 'tertiary', 'quaternary'],
            error: 'error',
            surface: 'surface',
            background: 'background',
            outline: 'outline',
            custom: []
         },
         H: {
            accent: HA,
            error: 0,
            surface: sH,
            background: sH,
            outline: sH,
            custom: []
         },
         S: {
            accent: S,
            error: 100,
            surface: sS / 3,
            background: sS / 3,
            outline: [sS / 3, sS / 2],
            custom: [],
         },
         L: {
            light: {
               accent: [
                  [35, 100],
                  [80 + L / 10, 20 - L / 10]
               ],
               accentLD: [45, 25],
               surface: [87 + sL / 10, 85 + sL / 10, 83 + sL / 10, 80 + sL / 10, 78 + sL / 10],
               background: [90 + sL / 10, 20 - sL / 10],
               outline: [60, 80],
               inverse: [70, 10],
               inverseSurface: [15 - sL / 10, 65 + sL / 10],
            },
            dark: {
               accent: [
                  [70, 10],
                  [20 - L / 10, 70 + L / 10]
               ],
               accentLD: [80, 60],
               surface: [15 - sL / 10, 17 - sL / 10, 19 - sL / 10, 21 - sL / 10, 30 - sL / 10],
               background: [10 - sL / 10, 70 + sL / 10],
               outline: [40, 20],
               inverse: [35, 100],
               inverseSurface: [87 + sL / 10, 30 - sL / 10]
            },
         },
         F: {
            a: ['', 'on-'],
            b: ['', '-container'],
            c: ['', '-container-low', '-container', '-container-high', '-variant'],
            d: ['', '-variant'],
            e: 'inverse-',
            f: ['light-', 'dark-'],
         },
      }
      
      for (let i in D.N.accent) {
         for (let j in D.F.b) {
            for (let k in D.F.a) {
               result[D.F.a[k] + D.N.accent[i] + D.F.b[j]] = this.#CL.channels.hsl.hex(D.H.accent[i], D.S.accent, D.L[theme].accent[j][k]);
            }
         }
         for (let j in D.F.f) {
            result[D.F.f[j] + D.N.accent[i]] = this.#CL.channels.hsl.hex(D.H.accent[i], D.S.accent, D.L[theme].accentLD[j]);
         }
      }
      for (let i in D.F.b) {
         for (let j in D.F.a) {
            result[D.F.a[j] + D.N.error + D.F.b[i]] = this.#CL.channels.hsl.hex(D.H.error, D.S.error, D.L[theme].accent[i][j]);
         }
      }
      for (let j in D.F.f) {
         result[D.F.f[j] + D.N.error] = this.#CL.channels.hsl.hex(D.H.error, D.S.error, D.L[theme].accentLD[j]);
      }
      for (let i in D.N.accent) {
         for (let j in D.F.a) {
            result[D.F.a[j] + D.F.e + D.N.accent[i]] = this.#CL.channels.hsl.hex(D.H.accent[i], D.S.accent, D.L[theme].inverse[j]);
         }
      }
      for (let i in D.F.a) {
         result[D.F.a[i] + D.F.e + D.N.error] = this.#CL.channels.hsl.hex(D.H.error, D.S.error, D.L[theme].inverse[i]);
      }
      for (let i in D.F.a) {
         result[D.F.a[i] + D.N.background] = this.#CL.channels.hsl.hex(D.H.background, D.S.background, D.L[theme].background[i]);
      }
      for (let i in D.F.c) {
         result[D.N.surface + D.F.c[i]] = this.#CL.channels.hsl.hex(D.H.surface, D.S.surface, D.L[theme].surface[i]);
      }
      for (let j in D.F.a) {
         result[D.F.a[j] + D.F.e + D.N.surface] = this.#CL.channels.hsl.hex(D.H.surface, D.S.surface, D.L[theme].inverseSurface[j]);
      }
      for (let i in D.F.d) {
         result[D.N.outline + D.F.d[i]] = this.#CL.channels.hsl.hex(D.H.outline, D.S.outline[i], D.L[theme].outline[i]);
      }
      // custom color
      for (let i in C.customColors) {
         let limit = Object.keys(result);
         let allowed = ['primary', 'secondary', 'tertiary', 'quaternary', 'error'];
         if (limit.includes(i) == false || allowed.includes(i)) {
            D.N.custom.push(i);
            D.H.custom.push(this.#CL.getHue(C.customColors[i]));
            D.S.custom.push(this.#CL.getSaturation(C.customColors[i]));
         } else {
            this.#warn('UnauthorizedCustomColor', `${i}: ${C.customColors[i]}`);
         }
      }
      for (let i in D.N.custom) {
         for (let j in D.F.b) {
            for (let k in D.F.a) {
               result[D.F.a[k] + D.N.custom[i] + D.F.b[j]] = this.#CL.channels.hsl.hex(D.H.custom[i], D.S.custom[i], D.L[theme].accent[j][k]);
            }
         }
         for (let j in D.F.f) {
            result[D.F.f[j] + D.N.custom[i]] = this.#CL.channels.hsl.hex(D.H.custom[i], D.S.custom, D.L[theme].accentLD[j]);
         }
      }
      for (let i in D.N.custom) {
         for (let j in D.F.a) {
            result[D.F.a[j] + D.F.e + D.N.custom[i]] = this.#CL.channels.hsl.hex(D.H.custom[i], D.S.custom[i], D.L[theme].inverse[j]);
         }
      }
      // result
      return result;
   }
   #subPalette() {
      let V = this.#V;
      let C = this.#C;
      let { H, S } = this.#CL.toHslChannels(C.color);
      let theme = this.currentTheme();
      let AN = ['primary', 'secondary', 'tertiary', 'quaternary'];
      let AH = this.#accentHue(C.colorHarmony);
      let HA = AH.map(i => i + H > 360 ? i + H - 360 : i + H)
      let sH, sS;
      let result = {};
      
      if (V.color(C.surfaceColor)) {
         sH = this.#CL.getHue(C.surfaceColor);
         sS = this.#CL.getSaturation(C.surfaceColor);
      }
      else {
         sH = HA[AN.indexOf(C.surfaceColor)];
         sS = S;
      }
      
      let D = {
         N: {
            accent: AN,
            error: 'error',
            custom: [],
            neutral: ['neutral', 'neutral-variant'],
         },
         H: {
            accent: HA,
            error: 0,
            custom: [],
            neutral: sH
         },
         S: {
            accent: S,
            error: 100,
            custom: [],
            neutral: [sS / 4, sS / 2]
         },
      };
      
      for (let i in C.customColors) {
         D.N.custom.push(i);
         D.H.custom.push(this.#CL.getHue(C.customColors[i]));
         D.S.custom.push(this.#CL.getSaturation(C.customColors[i]));
      }
      
      if (C.fixedSubPalette) {
         for (let i in D.N.accent) {
            for (let j in C.parts) {
               result[D.N.accent[i] + '-' + C.parts[j]] = this.#CL.channels.hsl.hex(
                  D.H.accent[i],
                  D.S.accent,
                  C.parts[j]
               );
            }
         }
         for (let i in C.parts) {
            result[D.N.error + '-' + C.parts[i]] = this.#CL.channels.hsl.hex(
               D.H.error,
               D.S.error,
               C.parts[i]
            );
         }
         for (let i in D.N.custom) {
            for (let j in C.parts) {
               result[D.N.custom[i] + '-' + C.parts[j]] = this.#CL.channels.hsl.hex(
                  D.H.custom[i],
                  D.S.custom[i],
                  C.parts[j]
               );
            }
         }
         for (let i in D.N.neutral) {
            for (let j in C.parts) {
               result[D.N.neutral[i] + '-' + C.parts[j]] = this.#CL.channels.hsl.hex(
                  D.H.neutral,
                  D.S.neutral[i],
                  C.parts[j]
               );
            }
         }
      }
      else if (!C.reverseSubPalette || !theme) {
         for (let i in D.N.accent) {
            for (let j in C.parts) {
               result[D.N.accent[i] + '-' + C.parts[j]] = this.#CL.channels.hsl.hex(
                  D.H.accent[i],
                  D.S.accent,
                  C.parts[j]
               );
            }
         }
         for (let i in C.parts) {
            result[D.N.error + '-' + C.parts[i]] = this.#CL.channels.hsl.hex(
               D.H.error,
               D.S.error,
               C.parts[i]
            );
         }
         for (let i in D.N.custom) {
            for (let j in C.parts) {
               result[D.N.custom[i] + '-' + C.parts[j]] = this.#CL.channels.hsl.hex(
                  D.H.custom[i],
                  D.S.custom[i],
                  C.parts[j]
               );
            }
         }
         for (let i in D.N.neutral) {
            for (let j in C.parts) {
               result[D.N.neutral[i] + '-' + C.parts[j]] = this.#CL.channels.hsl.hex(
                  D.H.neutral,
                  D.S.neutral[i],
                  C.parts[j]
               );
            }
         }
      }
      else {
         for (let i in D.N.accent) {
            for (let j in C.parts) {
               result[D.N.accent[i] + '-' + C.parts[j]] = this.#CL.channels.hsl.hex(
                  D.H.accent[i],
                  D.S.accent,
                  C.parts[C.parts.length - 1] - C.parts[j]
               );
            }
         }
         for (let i in C.parts) {
            result[D.N.error + '-' + C.parts[i]] = this.#CL.channels.hsl.hex(
               D.H.error,
               D.S.error,
               C.parts[C.parts.length - 1] - C.parts[i]
            );
         }
         for (let i in D.N.custom) {
            for (let j in C.parts) {
               result[D.N.custom[i] + '-' + C.parts[j]] = this.#CL.channels.hsl.hex(
                  D.H.custom[i],
                  D.S.custom[i],
                  C.parts[C.parts.length - 1] - C.parts[j]
               );
            }
         }
         for (let i in D.N.neutral) {
            for (let j in C.parts) {
               result[D.N.neutral[i] + '-' + C.parts[j]] = this.#CL.channels.hsl.hex(
                  D.H.neutral,
                  D.S.neutral[i],
                  C.parts[C.parts.length - 1] - C.parts[j]
               );
            }
         }
      }
      
      return result;
   }
   #CLPalette() {
      let C = this.#C;
      let L = (C.contrast === 'auto') ? this.#CL.getLightness(C.color) : C.contrast;
      let theme = this.currentTheme();
      let result = {};
      
      let l = {
         light: {
            accent: [
               [35, 100],
               [80 + L / 10, 20 - L / 10]
            ],
            accentLD: [45, 25],
         },
         dark: {
            accent: [
               [70, 10],
               [20 - L / 10, 70 + L / 10]
            ],
            accentLD: [80, 60],
         },
      };
      
      let a = ['', 'on-'];
      let b = ['', '-container'];
      let c = ['light-', 'dark-'];
      
      let loop = this.#colorLoop();
      for (let i in loop) {
         for (let j in b) {
            for (let k in a) {
               result[a[k] + i + b[j]] = this.#CL.channels.hsl.hex(loop[i].H, loop[i].S, l[theme].accent[j][k]);
            }
         }
         for (let j in c) {
            result[c[j] + i] = this.#CL.channels.hsl.hex(loop[i].H, loop[i].S, l[theme].accentLD[j]);
         }
      }
      
      
      return result;
   }
   #CLSubPalette() {
      let C = this.#C;
      let result = {};
      
      if (C.fixedSubPalette) {
         let loop = this.#colorLoop();
         for (let i in loop) {
            for (let j in C.parts) {
               result[i + '-' + C.parts[j]] = this.#CL.channels.hsl.hex(
                  loop[i].H,
                  loop[i].S,
                  C.parts[j]
               );
            }
         }
      }
      else if (!C.reverseSubPalette || !theme) {
         let loop = this.#colorLoop();
         for (let i in loop) {
            for (let j in C.parts) {
               result[i + '-' + C.parts[j]] = this.#CL.channels.hsl.hex(
                  loop[i].H,
                  loop[i].S,
                  C.parts[j]
               );
            }
         }
      }
      else {
         let loop = this.#colorLoop();
         for (let i in loop) {
            for (let j in C.parts) {
               result[i + '-' + C.parts[j]] = this.#CL.channels.hsl.hex(
                  loop[i].H,
                  loop[i].S,
                  C.parts[C.parts.length - 1] - C.parts[j]
               );
            }
         }
      }
      
      return result;
   }
   #toCss(obj) {
      let C = this.#C;
      let P = (C.prefix === '') ? '' : C.prefix + '-';
      let code = `\n${C.root} {\n`;
      for (let [K, V] of Object.entries(obj)) {
         code += `   --${P}${K}: ${V};\n`;
      }
      code += '}';
      return code;
   }
   #sprout() {
      let { id, comment } = this.#C;
      let head = document.head;
      
      if (this.#O.styleElement) this.#O.styleElement.remove();
      if (this.#O.commentNode) this.#O.commentNode.remove();
      
      this.#O.commentNode = document.createComment(` ${comment} `);
      head.appendChild(this.#O.commentNode);
      
      this.#O.styleElement = document.createElement('style');
      this.#O.styleElement.id = id;
      this.#O.styleElement.textContent = this.#O.code;
      head.appendChild(this.#O.styleElement);
   }
   #grow() {
      let C = this.#C;
      
      // generate 
      if (C.hasPalette) this.#O.palette = this.#palette();
      if (C.hasSubPalette) this.#O.subPalette = this.#subPalette();
      if (C.hasColorLoopPalette) this.#O.colorLoopPalette = this.#CLPalette();
      if (C.hasSubColorLoopPalette) this.#O.subColorLoopPalette = this.#CLSubPalette();
      
      this.#O.allPalettes = Object.assign({},
         this.#O.subColorLoopPalette,
         this.#O.colorLoopPalette,
         this.#O.subPalette,
         this.#O.palette
      );
      
      this.#O.code = this.#toCss(this.#O.allPalettes);
      
      // sprout
      if (C.sprout) this.#sprout(this.#O.code);
      
      // event
      queueMicrotask(() => { this.#dispatch('grow', this.#O) })
   }
   
   //-------------------------
   //         Methods 
   //-------------------------
   /* configs */
   setColor(val) {
      this.#setConfig('color', val);
      return this;
   }
   setSurfaceColor(val) {
      this.#setConfig('surfaceColor', val);
      return this;
   }
   setTheme(val) {
      this.#setConfig('theme', val);
      return this;
   }
   setColorHarmony(val) {
      this.#setConfig('colorHarmony', val);
      return this;
   }
   setContrast(val) {
      this.#setConfig('contrast', val);
      return this;
   }
   setParts(val) {
      this.#setConfig('parts', val);
      return this;
   }
   setPrefix(val) {
      this.#setConfig('prefix', val);
      return this;
   }
   setCustomColors(val) {
      this.#setConfig('customColors', val);
      return this;
   }
   setSprout(val) {
      this.#setConfig('sprout', val);
      return this;
   }
   setPalette(val) {
      this.#setConfig('hasPalette', val);
      return this;
   }
   setSubPalette(val) {
      this.#setConfig('hasSubPalette', val);
      return this;
   }
   setReverseSubPalette(val) {
      this.#setConfig('reverseSubPalette', val);
      return this;
   }
   setFixedSubPalette(val) {
      this.#setConfig('fixedSubPalette', val);
      return this;
   }
   setColorLoopPalette(val) {
      this.#setConfig('hasColorLoopPalette', val);
      return this;
   }
   setSubColorLoopPalette(val) {
      this.#setConfig('hasSubColorLoopPalette', val);
      return this;
   }
   
   /* helper configs */
   addCustomColors(key, val) {
      let obj = Object.assign(this.#C.customColors, {
         [key]: val
      });
      this.#setConfig('customColors', obj);
      return this;
   }
   removeCustomColors(key) {
      delete this.#C.customColors[key];
      this.#grow();
      return this;
   }
   clearCustomColors(key) {
      this.#C.customColors = {};
      this.#grow();
      return this;
   }
   
   /* API */
   toggleTheme() {
      this.setTheme(isDarkmode() ? 'light' : 'dark');
      return this;
   }
   randomColor() {
      this.setColor(this.#CL.randomColor());
      return this;
   }
   isDarkmode() {
      if (this.#C.theme == 'auto') {
         return (this.#PCS.matches);
      } else {
         return (this.#C.theme == 'dark') ? true : false;
      }
   }
   currentTheme() {
      if (this.#C.theme == 'auto') {
         return (this.#PCS.matches) ? 'dark' : 'light';
      } else {
         return this.#C.theme;
      }
   }
   remove() {
      this.#O.styleElement?.remove();
      this.#O.styleElement = null;
      this.#O.commentNode?.remove();
      this.#O.commentNode = null;
      return this;
   }
   destroy() {
      this.remove();
      this.#O.subColorLoopPalette = {};
      this.#O.colorLoopPalette = {};
      this.#O.subPalette = {};
      this.#O.palette = {};
      this.#O.allPalettes = {};
      this.#O.code = {};
      return this;
   }
   
   //-------------------------
   //        Property 
   //-------------------------
   /*** Events ***/
   set onwarn(callback) {
      this.#E.addEventListener('warn', (e) => callback(e.detail));
   }
   set ongrow(callback) {
      this.#E.addEventListener('grow', (e) => callback(e.detail));
   }
   
   /*** Output ***/
   get output() {
      return this.#O
   }
   get palette() {
      return this.#O.palette;
   }
   get subPalette() {
      return this.#O.subPalette;
   }
   get colorLoopPalette() {
      return this.#O.colorLoopPalette;
   }
   get subColorLoopPalette() {
      return this.#O.subColorLoopPalette;
   }
   get allPalettes() {
      return this.#O.allPalettes;
   }
   get code() {
      return this.#O.code;
   }
   
   /*** Configs ***/
   set configs(val) {
      this.#setupConfigs(val);
   }
   get configs() {
      return this.#C;
   }
   
   set color(val) {
      this.setColor(val);
   }
   get color() {
      return this.#C.color;
   }
   
   set surfaceColor(val) {
      this.setSurfaceColor(val);
   }
   get surfaceColor() {
      return this.#C.surfaceColor;
   }
   
   set theme(val) {
      this.setTheme(val);
   }
   get theme() {
      return this.#C.theme;
   }
   
   set colorHarmony(val) {
      this.setColorHarmony(val);
   }
   get colorHarmony() {
      return this.#C.colorHarmony;
   }
   
   set contrast(val) {
      this.setContrast(val);
   }
   get contrast() {
      return this.#C.contrast;
   }
   
   set parts(val) {
      this.setParts(val);
   }
   get parts() {
      return this.#C.parts;
   }
   
   set prefers(val) {
      this.setPrefix(val);
   }
   get prefers() {
      return this.#C.prefers;
   }
   
   set customColors(val) {
      this.setCustomColors(val);
   }
   get customColors() {
      return this.#C.customColors;
   }
   
   set sprout(val) {
      this.setSprout(val);
   }
   get sprout() {
      return this.#C.sprout;
   }
   
   set hasPalette(val) {
      this.setPalette(val);
   }
   get hasPalette() {
      return this.#C.hasPalette;
   }
   
   set hasSubPalette(val) {
      this.setSubPalette(val);
   }
   get hasSubPalette() {
      return this.#C.hasSubPalette;
   }
   
   set reverseSubPalette(val) {
      this.setReverseSubPalette(val);
   }
   get reverseSubPalette() {
      return this.#C.reverseSubPalette;
   }
   
   set reverseSubPalette(val) {
      this.setReverseSubPalette(val);
   }
   get reverseSubPalette() {
      return this.#C.reverseSubPalette;
   }
   
   set fixedSubPalette(val) {
      this.setFixedSubPalette(val);
   }
   get fixedSubPalette() {
      return this.#C.fixedSubPalette;
   }
   
   set hasColorLoopPalette(val) {
      this.setColorLoopPalette(val);
   }
   get hasColorLoopPalette() {
      return this.#C.hasColorLoopPalette;
   }
   
   set hasSubColorLoopPalette(val) {
      this.setColorSubLoopPalette(val);
   }
   get hasSubColorLoopPalette() {
      return this.#C.hasSubColorLoopPalette;
   }
}
