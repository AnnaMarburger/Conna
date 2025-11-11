import { IonButton, IonContent, IonInput, IonPage, IonPopover, useIonRouter } from '@ionic/react';
import RoomCard from '../components/RoomCard';

import './Tab2.css';
import { useData } from '../context/DataContext';
import { useState } from 'react';


const Tab2: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const { rooms, loading, addRoom } = useData();
  const router = useIonRouter();


  const handleNewRoomButton = () => {
    setShowPopover(true);
  };

  const handleAddRoom = () => {
    addRoom(newRoomName);
    setNewRoomName("");
    setShowPopover(false);
  };

  const handleRouteToList = (name: string) => {
    const encodedName = encodeURIComponent(name);
    router.push(`/rooms/${encodedName}`, "forward");
  };


  if (loading) return <p className="text-label">Loading…</p>;


  return (
    <IonPage className='m-standard'>
      <IonContent fullscreen>
        <p className='text-section mt-large mb-standard'> Your Rooms </p>

        <div className="rooms-grid">
          <RoomCard isAddCard onClick={handleNewRoomButton} />
          <IonPopover isOpen={showPopover} onDidDismiss={() => setShowPopover(false)} className="select-popover p-standard" >
            <div className="popover-content">
              <p className="text-section mb-small"> Room Name: </p>
              <IonInput
                value={newRoomName}
                placeholder="e.g. Bathroom"
                onIonChange={(e) => setNewRoomName(e.detail.value!)}
              />
              <IonButton expand="block" className="mt-standard" disabled={!newRoomName.trim()}
                onClick={handleAddRoom}
              > Continue
              </IonButton>
            </div>
          </IonPopover>

          {rooms.map((room, i) => (
            <RoomCard key={room.name} name={room.name} modulesCount={room.modulesCount} onClick={() => handleRouteToList(room.name)} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
