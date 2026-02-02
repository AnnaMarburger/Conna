import { IonCard, IonCardContent } from "@ionic/react";
import { useData } from "../context/DataContext";

import "./NotificationSection.css";


const NotifSection: React.FC = () => {
    const { notifications, loading } = useData();


    if (loading) {
        return (
            <IonCard className="module-bubbles-card ion-no-margin mt-standard" >
                <IonCardContent className="sectioncard-padding ">
                    <p className="text-section">Last Notifications</p>
                    <p className="text-label">Loading…</p>;
                </IonCardContent>
            </IonCard>)
    }

    return (
        <IonCard className="module-bubbles-card ion-no-margin mt-standard" >
            <IonCardContent className="sectioncard-padding ">
                <p className="text-section mb-mediumsmall">Last Notifications</p>
                {notifications.reverse().map((n, index) => (
                    <IonCard key={index} className="notification-card">
                        <IonCardContent>
                            <p className="text-label" style={{ display: "flex", justifyContent: "space-between" }}>
                                <strong>{n.module_name}</strong>
                                <span className="text-label text-secondary">
                                    {new Date(n.time).toLocaleString()}
                                </span>
                            </p>
                            <p className="text-label text-secondary">{n.text}</p>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonCardContent>
        </IonCard>
    );
};

export default NotifSection;