/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { SerializationSettings } from "../models/SerializationSettings";
import { Serializable } from "../classes/Serializable";

export const jsonObject = (settings?: Partial<SerializationSettings>, extend?: boolean): ClassDecorator => {
    return (target: object): void => {
        if (extend) {
            Reflect.set(target, "defaultSettings", Serializable.defaultSettings);
            Reflect.set(target, "fromJSON", Serializable.fromJSON);

            Reflect.set((target as any).prototype, "fromJSON", (Serializable.prototype as any).fromJSON);
            Reflect.set((target as any).prototype, "deserializeProperty", (Serializable.prototype as any).deserializeProperty);
            Reflect.set((target as any).prototype, "getJsonPropertyName", (Serializable.prototype as any).getJsonPropertyName);
            Reflect.set((target as any).prototype, "onWrongType", (Serializable.prototype as any).onWrongType);
            Reflect.set((target as any).prototype, "toJSON", (Serializable.prototype as any).toJSON);

            Reflect.defineMetadata("ts-serializable:jsonObjectExtended", true, target);
        }

        if (settings) {
            Reflect.defineMetadata("ts-serializable:jsonObject", settings, target);
        }
    };
};
