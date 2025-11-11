import { IonCard, IonCardContent, IonIcon, IonText } from "@ionic/react";
import { add } from "ionicons/icons";

import "./RoomCard.css";

interface RoomCardProps {
    name?: string;
    modulesCount?: number;
    isAddCard?: boolean;
    onClick?: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ name, modulesCount, isAddCard, onClick }) => {
    return (
        <IonCard button className="room-card" onClick={onClick}>
            <IonCardContent className="room-card-content">
                {isAddCard ? (
                    <>
                        <IonIcon icon={add} className="add-icon" />
                        <p className="text-label">Add new Room</p>
                    </>
                ) : (
                    <>
                        <p className="text-label">{name}</p>
                        <p className="text-small text-secondary">{modulesCount} {modulesCount === 1 ? "Module" : "Modules"}</p>
                    </>
                )}
            </IonCardContent>
        </IonCard>
    );
};

export default RoomCard;