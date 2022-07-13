import { Generator } from '@jspm/generator';
import assert from 'assert';
import { SemverRange } from 'sver';

const generator = new Generator({
  rootUrl: new URL('./local', import.meta.url),
  env: ['production', 'browser', 'module'],
  resolutions: {
    'lit': '2.2.1',
    '@lit/reactive-element': '1.3.1',
    'lit-html': '2.2.1',
    'lit-element': '3.2.0'
  }
});

const esmsPkg = await generator.traceMap.resolver.resolveLatestTarget({ name: 'es-module-shims', registry: 'npm', ranges: [new SemverRange('*')] }, false, generator.traceMap.installer.defaultProvider);
const esmsUrl = generator.traceMap.resolver.pkgToUrl(esmsPkg, generator.traceMap.installer.defaultProvider) + 'dist/es-module-shims.js';

assert.strictEqual(await generator.htmlGenerate(`
<!doctype html>
<head>
  <script type="module">
    import {html, css, LitElement} from 'lit';

    class SimpleGreeting extends LitElement {
      static styles = css\`p { color: blue }\`;

      static properties = {
        name: {type: String},
      };

      constructor() {
        super();
        this.name = 'Somebody';
      }

      render() {
        return html\`<p>Hello, \${this.name}!</p>\`;
      }
    }
    customElements.define('simple-greeting', SimpleGreeting);
  </script>
</head>
<body>
  <simple-greeting name="World"></simple-greeting>
</body>
`, { preload: true }), '\n' +
'<!doctype html>\n' +
'<head>\n' +
'  <!-- Generated by @jspm/generator - https://github.com/jspm/generator -->\n' +
`  <script async src="${esmsUrl}" crossorigin="anonymous"></script>\n` +     
'  <script type="importmap">\n' +
'  {\n' +
'    "imports": {\n' +
'      "lit": "https://ga.jspm.io/npm:lit@2.2.1/index.js"\n' +
'    },\n' +
'    "scopes": {\n' +
'      "https://ga.jspm.io/": {\n' +
'        "@lit/reactive-element": "https://ga.jspm.io/npm:@lit/reactive-element@1.3.1/reactive-element.js",\n' +
'        "lit-element/lit-element.js": "https://ga.jspm.io/npm:lit-element@3.2.0/lit-element.js",\n' +
'        "lit-html": "https://ga.jspm.io/npm:lit-html@2.2.1/lit-html.js"\n' +
'      }\n' +
'    }\n' +
'  }\n' +
'  </script>\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:@lit/reactive-element@1.3.1/css-tag.js" />\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:@lit/reactive-element@1.3.1/reactive-element.js" />\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:lit-element@3.2.0/lit-element.js" />\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:lit-html@2.2.1/lit-html.js" />\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:lit@2.2.1/index.js" />\n' +
'  <script type="module">\n' +
"    import {html, css, LitElement} from 'lit';\n" +
'\n' +
'    class SimpleGreeting extends LitElement {\n' +
'      static styles = css`p { color: blue }`;\n' +
'\n' +
'      static properties = {\n' +
'        name: {type: String},\n' +
'      };\n' +
'\n' +
'      constructor() {\n' +
'        super();\n' +
"        this.name = 'Somebody';\n" +
'      }\n' +
'\n' +
'      render() {\n' +
'        return html`<p>Hello, ${this.name}!</p>`;\n' +
'      }\n' +
'    }\n' +
"    customElements.define('simple-greeting', SimpleGreeting);\n" +
'  </script>\n' +
'</head>\n' +
'<body>\n' +
'  <simple-greeting name="World"></simple-greeting>\n' +
'</body>\n');

// Idempotency
assert.strictEqual(await generator.htmlGenerate('\n' +
'<!doctype html>\n' +
'<head>\n' +
'  <!-- Generated by @jspm/generator - https://github.com/jspm/generator -->\n' +
`  <script async src="${esmsUrl}" crossorigin="anonymous"></script>\n` +     
'  <script type="importmap">\n' +
'  {\n' +
'    "imports": {\n' +
'      "lit": "https://ga.jspm.io/npm:lit@2.2.1/index.js"\n' +
'    },\n' +
'    "scopes": {\n' +
'      "https://ga.jspm.io/": {\n' +
'        "@lit/reactive-element": "https://ga.jspm.io/npm:@lit/reactive-element@1.3.1/reactive-element.js",\n' +
'        "lit-element/lit-element.js": "https://ga.jspm.io/npm:lit-element@3.2.0/lit-element.js",\n' +
'        "lit-html": "https://ga.jspm.io/npm:lit-html@2.2.1/lit-html.js"\n' +
'      }\n' +
'    }\n' +
'  }\n' +
'  </script>\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:@lit/reactive-element@1.3.1/css-tag.js" />\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:@lit/reactive-element@1.3.1/reactive-element.js" />\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:lit-element@3.2.0/lit-element.js" />\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:lit-html@2.2.1/lit-html.js" />\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:lit@2.2.1/index.js" />\n' +
'  <script type="module">\n' +
"    import {html, css, LitElement} from 'lit';\n" +
'\n' +
'    class SimpleGreeting extends LitElement {\n' +
'      static styles = css`p { color: blue }`;\n' +
'\n' +
'      static properties = {\n' +
'        name: {type: String},\n' +
'      };\n' +
'\n' +
'      constructor() {\n' +
'        super();\n' +
"        this.name = 'Somebody';\n" +
'      }\n' +
'\n' +
'      render() {\n' +
'        return html`<p>Hello, ${this.name}!</p>`;\n' +
'      }\n' +
'    }\n' +
"    customElements.define('simple-greeting', SimpleGreeting);\n" +
'  </script>\n' +
'</head>\n' +
'<body>\n' +
'  <simple-greeting name="World"></simple-greeting>\n' +
'</body>\n', { preload: true}), '\n' +
'<!doctype html>\n' +
'<head>\n' +
'  <!-- Generated by @jspm/generator - https://github.com/jspm/generator -->\n' +
`  <script async src="${esmsUrl}" crossorigin="anonymous"></script>\n` +     
'  <script type="importmap">\n' +
'  {\n' +
'    "imports": {\n' +
'      "lit": "https://ga.jspm.io/npm:lit@2.2.1/index.js"\n' +
'    },\n' +
'    "scopes": {\n' +
'      "https://ga.jspm.io/": {\n' +
'        "@lit/reactive-element": "https://ga.jspm.io/npm:@lit/reactive-element@1.3.1/reactive-element.js",\n' +
'        "lit-element/lit-element.js": "https://ga.jspm.io/npm:lit-element@3.2.0/lit-element.js",\n' +
'        "lit-html": "https://ga.jspm.io/npm:lit-html@2.2.1/lit-html.js"\n' +
'      }\n' +
'    }\n' +
'  }\n' +
'  </script>\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:@lit/reactive-element@1.3.1/css-tag.js" />\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:@lit/reactive-element@1.3.1/reactive-element.js" />\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:lit-element@3.2.0/lit-element.js" />\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:lit-html@2.2.1/lit-html.js" />\n' +
'  <link rel="modulepreload" href="https://ga.jspm.io/npm:lit@2.2.1/index.js" />\n' +
'  <script type="module">\n' +
"    import {html, css, LitElement} from 'lit';\n" +
'\n' +
'    class SimpleGreeting extends LitElement {\n' +
'      static styles = css`p { color: blue }`;\n' +
'\n' +
'      static properties = {\n' +
'        name: {type: String},\n' +
'      };\n' +
'\n' +
'      constructor() {\n' +
'        super();\n' +
"        this.name = 'Somebody';\n" +
'      }\n' +
'\n' +
'      render() {\n' +
'        return html`<p>Hello, ${this.name}!</p>`;\n' +
'      }\n' +
'    }\n' +
"    customElements.define('simple-greeting', SimpleGreeting);\n" +
'  </script>\n' +
'</head>\n' +
'<body>\n' +
'  <simple-greeting name="World"></simple-greeting>\n' +
'</body>\n');