import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage, IonToolbar, useIonRouter } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import ModuleModal from '../components/ModuleModal';
import { useData } from '../context/DataContext';

import './RoomPage.css';


interface RouteParams {
    roomName: string;
}

const RoomPage: React.FC = () => {
    const { roomName } = useParams<RouteParams>();
    const { modules, updateModule, loading } = useData();
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);
    const router = useIonRouter();

    const roomModules = modules.filter((m) => m.room === roomName);

    const ruleToString = (rule: Rule) => {
        const result = rule.state + " + Timer > " + rule.time + " → " + rule.output;
        return result;
    }

    const handleRoutingBack = () => {
        router.push("/rooms", "back");
    };

    const handleSave = async (updatedModule: Module) => {
        await updateModule(updatedModule);
    };

    if (loading) return <p className="text-label">Loading…</p>;

    return (
        <IonPage className='m-standard'>
            <IonContent fullscreen>
                <IonToolbar className='ion-no-padding mt-large mb-standard' onClick={handleRoutingBack}>
                    <IonIcon icon={chevronBack} slot='start' />
                    <p className='no-margin text-section pl-small'>{roomName}</p>
                </IonToolbar>
                <IonList className='ion-no-padding'>
                    {roomModules.map((mod, idx) => (
                        <IonItem className=' ion-no-padding module-list-item' key={idx} lines='none' button onClick={() => setSelectedModule(mod)}>
                            <IonButton className="bubble-roompage" shape="round" >
                                <p className="text-header">{mod.icon}</p>
                            </IonButton>
                            <IonLabel className='pl-small'>
                                <p className='text-label'>{mod.name}</p>
                                <p className='text-label text-secondary'>{mod.rule ? ruleToString(mod.rule) : "No Rule selected"}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>

                <ModuleModal
                    isOpen={!!selectedModule}
                    onDidDismiss={() => setSelectedModule(null)}
                    moduleData={selectedModule} onSave={handleSave} />
            </IonContent>
        </IonPage>
    );
};

export default RoomPage;