import { ActionTypes } from "./ActionTypes";
import { EntityTypes } from "./EntityTypes";

export interface WebhookData {
    id: number;
    user_id: number;
    action: ActionTypes;
    entity_type: EntityTypes;
    entity_id: number;
}