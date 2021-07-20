import { Property } from "./Property";

export interface Result {
    archived: boolean;
    'created_time': string;
    id: string;
    'last_edited_time': string;
    object: string;
    properties: {
        [name: string]: Property;
    };
    url: string;
    parent: {
        'database_id': string;
        type: string;
    };
}
