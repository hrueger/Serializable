import type {ISerializer} from "./ISerializer";

export class JsonSerializer implements ISerializer {

    public serialize (data: Record<string, unknown>): string {
        return JSON.stringify(data);
    }

    public deserialize (data: string): Record<string, unknown> {
        return JSON.parse(data) as Record<string, unknown>;
    }

}
