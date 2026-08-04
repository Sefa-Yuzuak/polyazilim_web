/* PolyAzılım — typing effect + matrix background */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
    link.addEventListener("click", function () {
      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          method: "email_click",
          transport_type: "beacon",
        });
      }
    });
  });

  /* ---------- hero typing effect ---------- */
  var typedEl = document.getElementById("typed");
  var outputEl = document.getElementById("t-output");
  var cursorEl = document.getElementById("type-cursor");
  var command = "polyazilim --init";

  function showOutput() {
    if (outputEl) outputEl.hidden = false;
  }

  if (typedEl) {
    if (reducedMotion) {
      typedEl.textContent = command;
      showOutput();
    } else {
      var i = 0;
      var type = function () {
        if (i <= command.length) {
          typedEl.textContent = command.slice(0, i);
          i += 1;
          setTimeout(type, 65 + Math.random() * 60);
        } else {
          setTimeout(showOutput, 350);
        }
      };
      setTimeout(type, 500);
    }
  }

  /* ---------- matrix rain ---------- */
  var canvas = document.getElementById("matrix");
  if (!canvas || reducedMotion) {
    if (canvas) canvas.remove();
    return;
  }

  var ctx = canvas.getContext("2d");
  var chars = "01<>/\\|$#@%&*+=-_?!;:.~^[]{}()ABCDEFabcdef";
  var fontSize = 14;
  var columns = 0;
  var drops = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (var c = 0; c < columns; c++) {
      drops[c] = Math.floor(Math.random() * (canvas.height / fontSize));
    }
  }

  resize();
  window.addEventListener("resize", resize);

  var last = 0;
  var frameInterval = 80; /* ms — slow, subtle */

  function draw(now) {
    if (now - last >= frameInterval) {
      last = now;
      /* fade trail */
      ctx.fillStyle = "rgba(10, 10, 10, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + "px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(0, 255, 156, 0.10)"; /* very low opacity */

      for (var c = 0; c < columns; c++) {
        var ch = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(ch, c * fontSize, drops[c] * fontSize);
        if (drops[c] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[c] = 0;
        }
        drops[c] += 1;
      }
    }
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
