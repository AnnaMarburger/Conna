import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonInput, IonPopover, IonRow } from "@ionic/react";
import { useState } from "react";
import ModuleModal from "./ModuleModal";

import "./ModuleBubbles.css";
import { useData } from "../context/DataContext";


const ModuleBubbles: React.FC = () => {
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);
    const { modules, updateModule, addModule, loading } = useData();
    const [showPopover, setShowPopover] = useState(false);
    const [newModuleId, setNewModuleId] = useState("");

    const handleAddModuleClick = () => {
        setShowPopover(true);
    };

    const handleAddModule = () => {
        const newMod: Module = {
            id: newModuleId.trim(),
            icon: "👋",
            name: "New Module",
        };

        addModule(newMod);
        setSelectedModule(newMod);
        setNewModuleId("");
        setShowPopover(false);
    };

    const saveUpdatedModule = async (updatedMod: Module) => {
        await updateModule(updatedMod);
    }

    if (loading) {
        return <p className="text-label">Loading…</p>;
    }


    return (
        <IonCard className="module-bubbles-card ion-no-margin mt-standard" >
            <IonCardContent className="sectioncard-padding">
                <p className="text-section">Your Modules</p>

                <IonGrid className="mt-small ion-no-padding">
                    <IonRow className="ion-justify-content-start ion-align-items-center">
                        <IonCol size="auto">
                            <IonButton className="bubble add" shape="round" onClick={handleAddModuleClick}>
                                <p className="text-icon text-light">+</p>
                            </IonButton>

                            <IonPopover isOpen={showPopover} onDidDismiss={() => setShowPopover(false)} className="select-popover p-standard" >
                                <div className="popover-content">
                                    <p className="text-section mb-small">Enter Module ID:</p>
                                    <IonInput 
                                        value={newModuleId}
                                        placeholder="e.g. ESP001"
                                        onIonChange={(e) => setNewModuleId(e.detail.value!)}
                                    />
                                    <IonButton expand="block" className="mt-standard" disabled={!newModuleId.trim()}
                                        onClick={handleAddModule}
                                    > Continue
                                    </IonButton>
                                </div>
                            </IonPopover>
                        </IonCol>

                        {modules.map((mod) => (
                            <IonCol key={mod.id} size="auto">
                                <IonButton className="bubble" shape="round" onClick={() => setSelectedModule(mod)}>
                                    <p className="text-header">{mod.icon}</p>
                                </IonButton>
                            </IonCol>
                        ))}

                    </IonRow>
                </IonGrid>

                <ModuleModal isOpen={!!selectedModule}
                    onDidDismiss={() => setSelectedModule(null)}
                    moduleData={selectedModule} onSave={saveUpdatedModule}
                />

            </IonCardContent>
        </IonCard>
    );
};

export default ModuleBubbles;