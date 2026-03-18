import { useEffect } from 'react';

export const useNotifications = () => {
  useEffect(() => {
    // Mock registration for push notifications
    const registerForPush = async () => {
      console.log("Registering for push notifications...");
      // In a real mobile app, we'd use Expo.Notifications here
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      }
    };

    registerForPush();
  }, []);

  const scheduleLocalNotification = (title: string, body: string, seconds: number) => {
    console.log(`Scheduling notification: ${title} in ${seconds}s`);
    setTimeout(() => {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, { body });
      } else {
        alert(`${title}: ${body}`);
      }
    }, seconds * 1000);
  };

  return { scheduleLocalNotification };
};
