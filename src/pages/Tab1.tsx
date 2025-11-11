import { IonContent, IonPage } from '@ionic/react';
import ModuleBubbles from '../components/ModuleBubbles';
import NotifSection from '../components/NotificationSection';

import './Tab1.css';


const Tab1: React.FC = () => {

  return (
    <IonPage className='m-standard'>
      <IonContent fullscreen>
        <p className='text-header mt-xl mb-small'> Hello, Anna! 👋 </p>
        <p className='text-label no-margin'> Welcome to Home </p>
          <ModuleBubbles/>
          <NotifSection />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
