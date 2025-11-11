import { IonCard, IonCardContent } from "@ionic/react";
import { useData } from "../context/DataContext";

import "./NotificationSection.css";


const NotifSection: React.FC = () => {
    const { notifications, loading } = useData();


    if (loading) {
        return <p className="text-label">Loading…</p>;
    }

    return (
        <IonCard className="module-bubbles-card ion-no-margin mt-standard" >
            <IonCardContent className="sectioncard-padding ">
                <p className="text-section mb-mediumsmall">Last Notifications</p>
                {notifications.map((n, index) => (
                    <IonCard key={index} className="notification-card">
                        <IonCardContent>
                            <p className="text-label">
                                <strong>{n.module_name}</strong>{": "}
                                <span className="text-label text-secondary">{n.text}</span>
                            </p>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonCardContent>
        </IonCard>
    );
};

export default NotifSection;