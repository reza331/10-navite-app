import * as Notifications from 'expo-notifications';

export const requestNotificationPermission = async () => {
    const { status: currentStatus } =
        await Notifications.getPermissionsAsync();

    if (currentStatus === 'granted') {
        return true;
    }

    const { status } = await Notifications.requestPermissionsAsync();

    return status === 'granted';
};

export const sendTestNotification = async () => {
    const hasPermission = await requestNotificationPermission();

    if (!hasPermission) {
        throw new Error('Notification permission not granted');
    }

    return Notifications.scheduleNotificationAsync({
        content: {
            title: 'Nova Store',
            body: 'Your test notification is working!',
            data: {
                type: 'test',
            },
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 5,
        },
    });
};