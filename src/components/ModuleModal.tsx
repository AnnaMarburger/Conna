import { IonModal, IonContent, IonItem, IonButton, IonLabel, IonInput, IonSelect, IonSelectOption, IonPicker, IonPickerColumn, IonPickerColumnOption, IonDatetimeButton, IonDatetime } from "@ionic/react";
import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import "./ModuleModal.css";

interface ModuleModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSave: (updatedModule: Module) => void;
  moduleData: Module | null;
}

const ModuleModal: React.FC<ModuleModalProps> = ({ isOpen, moduleData, onDidDismiss, onSave }) => {
  const { rooms, loading } = useData();
  const [moduleDataUpdate, setModuleDataUpdate] = useState<Module | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (moduleData) {
      setModuleDataUpdate(moduleData);
    }
  }, [moduleData]);

  if (!moduleDataUpdate) return null;

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setModuleDataUpdate((prev) =>
      prev ? { ...prev, icon: emojiData.emoji } : null
    );
    setShowPicker(false);
  };

  const handleSave = () => {
    if (moduleDataUpdate) {
      onSave(moduleDataUpdate);
    }
    onDidDismiss();
  };

  const updateModule = (updater: (prev: Module) => Module) => {
    setModuleDataUpdate((prev) => {
      if (!prev) return prev;
      return updater(prev);
    });
  };


  if (loading) return <p className="text-label">Loading…</p>;


  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonContent className="modal-content">
        <IonItem className="ion-no-padding mb-standard" lines="none">
          <IonButton className="bubble-modal" shape="round" onClick={() => setShowPicker(true)} >
            <p className="text-header">{moduleDataUpdate.icon}</p>
          </IonButton>
          <IonLabel className="pl-small">
            <IonInput className="text-section" value={moduleDataUpdate.name}
              onIonChange={(e) => updateModule((prev) => ({ ...prev, name: e.detail.value! }))}
            />
            <p className="text-small text-secondary">{moduleDataUpdate.id}</p>
          </IonLabel>

          <IonModal isOpen={showPicker} onDidDismiss={() => setShowPicker(false)} >
            <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" height="350px" />
          </IonModal>
        </IonItem>

        <p className="text-small">
          {moduleDataUpdate.lastState
            ? `Last State: ${moduleDataUpdate.lastState}` : "No last State given | "}
          {moduleDataUpdate.lastUpdate
            ? `Last Update: ${moduleDataUpdate.lastUpdate}` : "No last Update given"}
        </p>

        <IonSelect className="text-label" label="Room: " interface="popover" value={moduleDataUpdate.room}
          onIonChange={(e) => updateModule((prev) => ({ ...prev, room: e.detail.value! }))}
        >
          {rooms.map(room =>
            <IonSelectOption className="text-label" key={room.name} value={room.name}>{room.name}</IonSelectOption>
          )}
        </IonSelect>

        <p className="text-section mt-standard">Rule</p>
        <IonSelect className="text-label" label={"IF " + moduleDataUpdate.name} interface="popover"
          value={moduleDataUpdate.rule?.state}
          onIonChange={(e) =>
            updateModule((prev) => ({
              ...prev,
              rule: { ...(prev.rule ?? {}), state: e.detail.value },
            }))
          }
        >
          <IonSelectOption value={"Open"} className="text-label">OPEN</IonSelectOption>
          <IonSelectOption value={"Closed"} className="text-label">CLOSED</IonSelectOption>
        </IonSelect>

        <div className="time-picker-row">
          <p className="text-label">For </p>
          <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
            <IonDatetime id="datetime" presentation="time" minuteValues="0, 5, 10, 15, 30, 45" size="fixed"
              formatOptions={{ time: { hour: '2-digit', minute: '2-digit' } }}
              value={
                moduleDataUpdate.rule?.time
                  ? `1970-01-01T${moduleDataUpdate.rule.time}:00` : undefined
              }
              onIonChange={(e) => {
                const iso = e.detail.value as string | null;
                const timeOnly = iso ? iso.split("T")[1].slice(0, 5) : "";
                updateModule((prev) => ({ ...prev,
                  rule: { ...(prev.rule ?? {}), time: timeOnly },
                }));
              }}
            ></IonDatetime>
          </IonModal>
          <p className="text-label">hours </p>
        </div>

        <IonSelect className="text-label" interface="popover" label={"THEN "} value={
          moduleDataUpdate.rule?.output === "Signal" ? "Signal" : "Speech"}
          onIonChange={(e) =>
            setModuleDataUpdate((prev) =>
              prev
                ? {
                  ...prev,
                  rule: {
                    ...(prev.rule ?? {}),
                    output:
                      e.detail.value === "Signal"
                        ? "Signal"
                        : prev.rule?.output ?? "",
                  },
                }
                : prev
            )
          }>
          <IonSelectOption value={"Signal"} className="text-label">Warning Signal</IonSelectOption>
          <IonSelectOption value={"Speech"} className="text-label">Custom Audio</IonSelectOption>
        </IonSelect>

        {moduleDataUpdate.rule?.output !== "Signal" && (
          <IonInput fill="outline" className="text-label no-margin" placeholder="Enter your Text..." value={moduleDataUpdate.rule?.output}
            onIonChange={(e) =>
              setModuleDataUpdate((prev) =>
                prev
                  ? {
                    ...prev,
                    rule: { ...(prev.rule ?? {}), output: e.detail.value! },
                  }
                  : prev
              )
            }
          />
        )}

        <IonButton className="bottom-button" expand="block" onClick={handleSave}>
          Save
        </IonButton>

      </IonContent>
    </IonModal>
  );
};

export default ModuleModal;
