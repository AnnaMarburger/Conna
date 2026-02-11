import { IonContent, IonPage } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {

  return (
    <IonPage className='m-standard'>
      <IonContent fullscreen>
                <p className='text-section mb-small'> Manual</p>
        <p className='text-label no-margin'>There are two types of modules:</p>
        <ul className='text-label'>
          <li><strong>Modules with reed sensor + magnet:</strong> Suitable for detecting whether cabinets/windows/doors etc. are open or closed. The magnet must be placed opposite the module side with the power switch (see marking).</li>
          <li><strong>Modules with gyroscope (position sensor):</strong> Suitable for detecting whether the position of e.g. a rotary knob has been changed. Each time it is switched on, the module registers its initial position and can thus warn of deviations.</li>
        </ul>
        <p className='text-label no-margin'>
          Each module that is to be used must be registered on the smart home website before use (go to the home tab for that). This is done using the module's ID, which can be found on the bottom of the housing (example: <i>reedsensor01</i>). 
          After registering it, you can modify the module's name, icon and room, as well as the rule it should follow by clicking on it in the home tab. 
          In tab 2 of the website (map symbol), different rooms can be created to organize the modules. 
          To avoid unwanted disturbance between 10 p.m. and 8 a.m., the night mode option can automatically turn off warnings (open the module editor by clicking on the modules icon for this option.).
          When switching on a module, a dim red light should be visible, otherwise the module needs to be charged (USB-C cable). 
        </p>

        <p className='text-section mb-small'> Privacy and Security Statement</p>
        <p className='text-label no-margin'>
          As part of this study, a prototype smart home system is deployed in your home environment. The system exclusively captures predefined sensor events
          and transmits them to a local home station. No audio recordings, video recordings, or personal content such as conversations, images, or texts are collected.
          All collected data will not be shared with third parties and will only be analyzed in anonymized form, so that no conclusions can be drawn about individual persons. </p>
        <br />
        <p className='text-label no-margin'>
          Please note that the deployed system is a prototype.
          Despite careful development, malfunctions, delays, or incomplete notifications may occur.
          The system does not replace security, alarm, or emergency response systems and must not be used as the sole basis for safety-critical decisions.
          The provided devices are intended exclusively for testing purposes. The study management assumes no liability for property damage,
          consequential damages, or other impairments arising in connection with the use of the prototype hardware, to the extent permitted by law.
          Participants are requested to use the devices exclusively in accordance with the provided instructions and to report visible damage or malfunctions immediately. 
          For technical problems, questions about data protection, or the study process, you can contact the study management at any time.
        </p>
        <br />
        <p className='text-label no-margin'>
          <strong>Anna Marburger</strong> <br />
          Universität Ulm <br />
          Institut Medien Informatik <br />
          89069 Ulm, Deutschland <br />
          Email: <a href="mailto:anna.marburger@uni-ulm.de"> anna.marburger@uni-ulm.de </a>
        </p>
      </IonContent>
    </IonPage>
            );
};

export default Tab3;
