(function bootstrapPromoteGraph() {
  const scriptElement = document.currentScript;
  if (!scriptElement) {
    return;
  }

  const host = document.createElement("div");
  host.id = "promotegraph-widget-host";
  scriptElement.parentElement?.insertBefore(host, scriptElement.nextSibling);

  const shadowRoot = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = `
    .pg-shell {
      font-family: 'Space Grotesk', sans-serif;
      background: linear-gradient(120deg, #10271c, #1f593f);
      color: #f7f4eb;
      border-radius: 14px;
      padding: 16px;
      max-width: 360px;
      box-shadow: 0 12px 34px rgba(16, 39, 28, 0.35);
    }
    .pg-title {
      margin: 0 0 6px;
      font-size: 1rem;
      letter-spacing: 0.02em;
    }
    .pg-body {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.88;
    }
  `;

  const shell = document.createElement("div");
  shell.className = "pg-shell";
  shell.innerHTML = `
    <h4 class="pg-title">Maitreya PromoteGraph</h4>
    <p class="pg-body">This embeddable widget is isolated through Shadow DOM to prevent style collisions.</p>
  `;

  shadowRoot.append(style, shell);
})();
