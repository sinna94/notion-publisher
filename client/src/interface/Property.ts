import { Title } from "./Title";

export interface Property {
    id: string;
    date?: { start: string; end: string | null };
    title?: Title[];
    type: string;
};
