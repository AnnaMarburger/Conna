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
    deleteModule: (id: string) => Promise<void>;
    deleteRoom: (name: string) => Promise<void>;


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
    deleteModule: async () => { },
    deleteRoom: async () => { }

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

            console.log("Updated in Data Context", updated, res);

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
        console.log("Added Module in Data Context", newMod, res);
    };

    const deleteModule = async (id: string) => {
        try {
            const idx = modules.findIndex((mod) => mod.id === id);
            if (idx === -1) return;

            const res = await fetch(`${API_BASE_URL}/api/modules/${encodeURIComponent(id)}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`Delete failed: ${res.status}`);
            }

            const data = await res.json().catch(() => null);
            console.log("Deleted Module", id, data);
            loadData();

        } catch (err) {
            console.error("Delete module failed", err);
        }
    };

    const deleteRoom = async (name: string) => {
        try {
            const idx = rooms.findIndex((r) => r.name === name);
            if (idx === -1) return;

            const res = await fetch(`${API_BASE_URL}/api/rooms/${encodeURIComponent(name)}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`Delete failed: ${res.status}`);
            }

            const data = await res.json().catch(() => null);
            console.log("Deleted Room", name, data);
            loadData();

        } catch (err) {
            console.error("Delete room failed", err);
        }
    }


    const addRoom = async (newRoomName: string) => {
        const newRoom: Room = { name: newRoomName, modulesCount: 0 }
        setRooms((prev) => [...prev, newRoom]);

        const res = await fetch(`${API_BASE_URL}/api/rooms`, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: newRoomName,
        });

        console.log("Added Room in Data Context", rooms, res);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <DataContext.Provider value={{ modules, notifications, rooms, loading, reloadData: loadData, updateModule, addModule, addRoom, deleteModule, deleteRoom }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);