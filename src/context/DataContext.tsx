import { createContext, useContext, useEffect, useState } from "react";

type DataContextType = {
    modules: Module[];
    notifications: ModuleNotif[];
    rooms: Room[];
    loading: boolean;
    reloadData: () => void;
    updateModule: (updated: Module) => Promise<void>;
    addModule: (added: Module) => Promise<void>;
    addRoom: (name: string) => Promise<void>;

}

const DataContext = createContext<DataContextType>({
    modules: [],
    notifications: [],
    rooms: [],
    loading: false,
    reloadData: () => { },
    updateModule: async () => { },
    addModule: async () => { },
    addRoom: async () => { },
});


/* ---------------DUMMY DATA ----------------------------------*/
const ROOMS: Room[] = [{ name: "Bathroom", modulesCount: 4 },
{ name: "Bedroom", modulesCount: 2 },
{ name: "Living Room", modulesCount: 3 },
{ name: "Kitchen", modulesCount: 5 },
{ name: "Corridor", modulesCount: 1 }];

const MODULES: Module[] = [
    {
        id: "82374gduh1", icon: "🚪",
        name: 'Door Module',
        rule: {
            state: "Open",
            time: "13:12",
            output: "Signal"
        },
        room: 'Corridor'
    },
    {
        id: "ch183gr6", icon: "🪟",
        name: 'Window Bedroom',
        rule: {
            state: "Closed",
            time: "10:11",
            output: "Signal"
        }, room: 'Bedroom'

    },
    {
        id: "d19384zrhd1", icon: "🛁",
        name: 'Air Bathroom',
        rule: {
            state: "Open",
            time: "04:12",
            output: "Signal"
        }, room: 'Bathroom'

    },
    {
        id: "d1h3d4gr1", icon: "🍲",
        name: 'Kitchen Stove',
        rule: {
            state: "Open",
            time: "09:32",
            output: "Signal"
        }, room: 'Kitchen'

    },
    {
        id: "j128347rgif1", icon: "💡",
        name: 'Bedroom Light',
        rule: {
            state: "Closed",
            time: "13:12",
            output: "Signal"
        }, room: 'Bedroom'

    },
];

const NOTIFS: ModuleNotif[] = [{
    module_id: "window_livingroom",
    module_name: "Window Bedroom",
    text: "Das Wohnzimmerfenster war seit über 2 Stunden geschlossen. Zeit zum Lüften!",
    time: "2025-11-06T08:15:00Z"
},
{
    module_id: "cabinet_kitchen",
    module_name: "Kitchen Cabinet",
    text: "Schrank in der Küche war seit 3 Tagen nicht geöffnet. Denk daran, das Ablaufdatum zu prüfen.",
    time: "2025-11-06T09:45:00Z"
},
{
    module_id: "bathroom_sensor",
    module_name: "Air Bathroom",
    text: "Luftfeuchtigkeit im Bad ist seit 30 Minuten hoch. Fenster öffnen empfohlen.",
    time: "2025-11-06T10:20:00Z"
},
{
    module_id: "fridge_sensor",
    module_name: "Kitchen Fridge",
    text: "Low Battery - charge the module soon",
    time: "2025-11-06T11:00:00Z"
},
{
    module_id: "light_bedroom",
    module_name: "Bedroom light",
    text: "Das Schlafzimmerlicht ist seit Mitternacht an. Möchtest du es ausschalten?",
    time: "2025-11-06T11:30:00Z"
}]



export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modules, setModules] = useState<Module[]>([]);
    const [notifications, setNotifications] = useState<ModuleNotif[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = "http://10.3.141.1:1880";

    const loadData = async () => {
        setLoading(true);
        try {
            const [modulesRes, notifRes, roomsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/modules`),
                fetch(`${API_BASE_URL}/api/notifications`),
                fetch(`${API_BASE_URL}/api/rooms`),
            ]);
            console.log(modulesRes);
            console.log(notifRes);
            console.log(roomsRes);

            setModules(await modulesRes.json());
            setNotifications(await notifRes.json());
            setRooms(await roomsRes.json());

        } catch (err) {
            console.error("Fehler beim Laden:", err);
            if (err instanceof Response) console.log(await err.text());
            setModules(MODULES);
            setNotifications(NOTIFS);
            setRooms(ROOMS);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const updateModule = async (updated: Module) => {
        try {
            setModules((prev) =>
                prev.map((mod) => (mod.id === updated.id ? { ...mod, ...updated } : mod))
            );

            const res = await fetch(`${API_BASE_URL}/api/modules/${updated.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            });

            console.log("Updated in Data Context", res);

        } catch (err) {
            console.error("Fehler beim Aktualisieren:", err);
        }
    };

    const addModule = async (newMod: Module) => {
        setModules((prev) => [...prev, newMod]);

        const res = await fetch(`${API_BASE_URL}/api/modules`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMod),
        });
        const saved = await res.json();

        console.log("Added Module in Data Context", saved);
    };


    const addRoom = async (newRoomName: string) => {
        const newRoom: Room = { name: newRoomName, modulesCount: 0 }
        setRooms((prev) => [...prev, newRoom]);

        const res = await fetch(`${API_BASE_URL}/api/rooms`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRoomName),
        });

        const saved = await res.json();
        console.log("Added Room in Data Context", saved);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <DataContext.Provider value={{ modules, notifications, rooms, loading, reloadData: loadData, updateModule, addModule, addRoom }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);