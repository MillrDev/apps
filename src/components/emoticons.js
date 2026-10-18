/* ==========================================================
   emoticons.js
   Turns text emoticons into glossy yellow SVG smileys:
     :)  :D  :P  ;)  :(  :O  8)  <3
   (also with a nose:  :-)  :-D  etc.)
   Runs automatically on page load. To skip a page, add
   data-emoticons="off" on <body>. To run it yourself later:
     Emoticons.parse(someElement)
   ========================================================== */
(function () {
  var DEFS =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<radialGradient id="emoFace" cx=".35" cy=".3" r=".85">' +
    '<stop offset="0" stop-color="#fffbb0"/><stop offset=".5" stop-color="#ffd81f"/><stop offset="1" stop-color="#e49b00"/></radialGradient>' +
    '<radialGradient id="emoHeart" cx=".35" cy=".3" r=".85">' +
    '<stop offset="0" stop-color="#ff9aa8"/><stop offset=".6" stop-color="#e8203a"/><stop offset="1" stop-color="#a00f24"/></radialGradient>' +
    "</defs></svg>";

  var EYES =
    '<ellipse cx="8.3" cy="9.3" rx="1.7" ry="2.3" fill="#3b2400"/>' +
    '<ellipse cx="15.7" cy="9.3" rx="1.7" ry="2.3" fill="#3b2400"/>';
  var SHINE =
    '<ellipse cx="9" cy="5.2" rx="5" ry="2.4" fill="#fff" opacity=".45"/>';

  function line(d) {
    return (
      '<path d="' +
      d +
      '" fill="none" stroke="#5a3200" stroke-width="1.7" stroke-linecap="round"/>'
    );
  }

  var KINDS = {
    smile: { mouth: line("M6.2 13.6 Q12 20 17.8 13.6") },
    grin: {
      mouth:
        '<path d="M5.8 13 Q12 22.5 18.2 13 Z" fill="#6b1a00" stroke="#5a3200" stroke-width="1.2" stroke-linejoin="round"/>' +
        '<path d="M7.4 13.6 Q12 15.2 16.6 13.6 L16.2 15.5 Q12 16.7 7.8 15.5 Z" fill="#fff"/>',
    },
    tongue: {
      mouth:
        line("M6.5 14.2 Q12 18 17.5 14.2") +
        '<path d="M12.2 16.2 h4 v2.6 a2 2 0 0 1 -4 0 Z" fill="#ff6f8f" stroke="#b22d52" stroke-width="1"/>',
    },
    wink: {
      eyes:
        '<ellipse cx="8.3" cy="9.3" rx="1.7" ry="2.3" fill="#3b2400"/>' +
        '<path d="M13.6 9.6 h4.2" stroke="#3b2400" stroke-width="1.8" stroke-linecap="round"/>',
      mouth: line("M6.2 13.6 Q12 20 17.8 13.6"),
    },
    sad: { mouth: line("M6.8 18 Q12 12.8 17.2 18") },
    wow: {
      mouth:
        '<ellipse cx="12" cy="16.4" rx="2.6" ry="3.3" fill="#6b1a00" stroke="#5a3200"/>',
    },
    cool: {
      eyes:
        '<path d="M3.6 7.6 H20.4 V10.2 Q20.4 13.4 17.2 13.4 Q14.2 13.4 13.4 10.4 H10.6 ' +
        'Q9.8 13.4 6.8 13.4 Q3.6 13.4 3.6 10.2 Z" fill="#1d1d1d"/>',
      mouth: line("M6.2 14.6 Q12 20.4 17.8 14.6"),
    },
  };

  function kindOf(code) {
    var c = code.replace("-", "").toLowerCase();
    if (c === ":)") return "smile";
    if (c === ":d") return "grin";
    if (c === ":p") return "tongue";
    if (c === ";)") return "wink";
    if (c === ":(") return "sad";
    if (c === ":o") return "wow";
    if (c === "8)") return "cool";
    if (c === "<3") return "heart";
    return null;
  }

  function render(code) {
    var k = kindOf(code);
    if (!k) return code;
    var open =
      '<svg class="emo" viewBox="0 0 24 24" role="img" aria-label="' +
      code.replace(/</g, "&lt;") +
      '">';
    if (k === "heart") {
      return (
        open +
        '<path d="M12 21 C4 14.5 2.5 9.5 6 6.5 C8.5 4.5 11 6 12 8 C13 6 15.5 4.5 18 6.5 C21.5 9.5 20 14.5 12 21 Z" ' +
        'fill="url(#emoHeart)" stroke="#8a0f1f" stroke-width="1" stroke-linejoin="round"/>' +
        '<ellipse cx="8.3" cy="8.2" rx="2.6" ry="1.5" fill="#fff" opacity=".5" transform="rotate(-30 8.3 8.2)"/></svg>'
      );
    }
    var d = KINDS[k];
    return (
      open +
      '<circle cx="12" cy="12" r="10.6" fill="url(#emoFace)" stroke="#a06a00" stroke-width="1"/>' +
      (d.eyes || EYES) +
      d.mouth +
      SHINE +
      "</svg>"
    );
  }

  var RE =
    /(?<![\w])(:-?\)|:-?[dD]|:-?[pP]|;-?\)|:-?\(|:-?[oO]|8-?\)|<3)(?![\w])/g;
  var SKIP = /^(SCRIPT|STYLE|TEXTAREA|CODE|PRE|SVG)$/i;

  function ensureDefs() {
    if (!document.getElementById("emoFace")) {
      document.body.insertAdjacentHTML("afterbegin", DEFS);
    }
  }

  function parse(root) {
    root = root || document.body;
    ensureDefs();
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return n.parentNode && SKIP.test(n.parentNode.nodeName)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      },
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (node) {
      var text = node.nodeValue,
        m,
        last = 0;
      RE.lastIndex = 0;
      if (!RE.test(text)) return;
      RE.lastIndex = 0;
      var frag = document.createDocumentFragment();
      while ((m = RE.exec(text))) {
        if (m.index > last)
          frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var span = document.createElement("span");
        span.className = "emo-wrap";
        span.innerHTML = render(m[1]);
        frag.appendChild(span);
        last = m.index + m[0].length;
      }
      if (last < text.length)
        frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  function init() {
    if (document.body.getAttribute("data-emoticons") === "off") return;
    parse(document.body);
  }

  window.Emoticons = { parse: parse, render: render };
  // Plain <script src="emoticons.js">: runs by itself.
  // Imported as a module (Vue, Vite etc.): call Emoticons.parse(element) yourself.
  if (document.currentScript) {
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})();
