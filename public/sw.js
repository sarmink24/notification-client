// This service worker will handle push notifications even when the app is closed or in the background

self.addEventListener("push", function (event) {
  const data = event.data.json();

  const options = {
    body: data.body,
    icon: "./icon.png", // Notification icon
    badge: "./icon.png", // Badge icon for Android devices
    actions: [{ action: "open", title: "Open App" }],
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("https://yourapp.com"));
});
