import React, { useEffect } from "react";

const Notification = () => {
  useEffect(() => {
    if (
      "Notification" in window &&
      typeof Notification.requestPermission === "function"
    ) {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.");
          } else {
            console.log("Notification permission denied.");
          }
        })
        .catch((err) => {
          console.error("Error requesting notification permission:", err);
        });
    } else {
      console.log(
        "This browser does not support notifications or Notification.requestPermission is not available."
      );
    }
  }, []);

  const subscribeUser = async () => {
    const registration = await navigator.serviceWorker.ready;

    // Subscribe the user to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BHR4uIH5k44R0-VkXZsVEv_HG8yz3uliPlb3opWVwuu6OtDKkKKVQM-tDSk6k2wkVN98E4jrd7zBZj7gUYZpJYU", // Use the public VAPID key here
    });

    // Send the subscription object to the backend
    await fetch("http://localhost:5000/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("User subscribed:", subscription);
  };

  const sendNotification = () => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        reg.showNotification("Notification Title", {
          body: "Notification Body",
          icon: "./icon.png",
          badge: "./icon.png",
        });
      });
    }
  };

  return (
    <div>
      <h2>Push Notifications</h2>
      <button onClick={subscribeUser}>Subscribe to Notifications</button>
      <button onClick={sendNotification}>Send Test Notification</button>
    </div>
  );
};

export default Notification;
