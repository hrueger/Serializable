import type {ISerializer} from "./ISerializer";
import * as yaml from "yaml";

export class YamlSerializer implements ISerializer {

    public serialize (data: Record<string, unknown>): string {
        return yaml.stringify(data);
    }

    public deserialize (data: string): Record<string, unknown> {
        return yaml.parse(data) as Record<string, unknown>;
    }

}
