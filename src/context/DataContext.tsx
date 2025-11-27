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
            headers: { "Content-Type": "text/plain" },
            body: newRoomName,
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