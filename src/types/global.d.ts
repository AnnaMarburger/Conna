export { };
declare global {

    interface Rule {
        state?: "Open" | "Closed";
        time?: string;
        output?: string;
    }

    interface Module {
        id: string;
        icon: string;
        name: string;
        type?: string;
        room?: string;
        rule?: Rule;
        lastState?: string;
        lastUpdate?: string;

    }

    interface ModuleNotif {
        module_id: string;
        module_name: string;
        text: string;
        time: string;
    }

    interface Room {
        name: string;
        modulesCount: number
    }

}