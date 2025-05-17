export default class Alert {
  constructor(jsonUrl = "./json/alert.json") {
    this.jsonUrl = jsonUrl;
    this.containerClass = "alert-list";
  }

  async loadAlerts() {
    try {
      const response = await fetch(this.jsonUrl);
      if (!response.ok) throw new Error("Failed to load alerts");
      const alerts = await response.json();
      if (alerts.length > 0) this.renderAlerts(alerts);
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  }

  renderAlerts(alerts) {
    const main = document.querySelector("main");
    if (!main) {
      console.warn("<main> element not found in the document.");
      return;
    }

    const section = document.createElement("section");
    section.className = this.containerClass;

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    main.prepend(section);
  }
}
