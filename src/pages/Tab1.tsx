import { IonContent, IonPage } from '@ionic/react';
import ModuleBubbles from '../components/ModuleBubbles';
import NotifSection from '../components/NotificationSection';

import './Tab1.css';


const Tab1: React.FC = () => {

  return (
    <IonPage className='m-standard'>
      <IonContent fullscreen>
        <p className='text-header mt-xl mb-small'> Hello! 👋 </p>
        <p className='text-label no-margin'> Welcome to your custom Smart Home System. Start by adding a new module by it's ID!</p>
          <ModuleBubbles/>
          <NotifSection />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
