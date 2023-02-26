/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable max-statements */
import type {SerializationSettings} from "../models/SerializationSettings.js";
import {Serializable} from "../classes/Serializable.js";

export const serializableObject = (
    settings?: Partial<SerializationSettings>,
    extend?: boolean
): ClassDecorator => (target: object): void => {
    if (extend === true) {
        Reflect.set(target, "defaultSettings", Serializable.defaultSettings);
        Reflect.set(target, "deserialize", Serializable.deserialize);

        Reflect.set((target as any).prototype, "deserialize", (Serializable.prototype as any).deserialize);
        Reflect.set((target as any).prototype, "deserializeProperty", (Serializable.prototype as any).deserializeProperty);
        Reflect.set((target as any).prototype, "getSerializePropertyName", (Serializable.prototype as any).getSerializePropertyName);
        Reflect.set((target as any).prototype, "onWrongType", (Serializable.prototype as any).onWrongType);
        Reflect.set((target as any).prototype, "serialize", (Serializable.prototype as any).serialize);

        Reflect.defineMetadata("ts-serializable:serializeObjectExtended", true, target);
    }

    if (settings) {
        Reflect.defineMetadata("ts-serializable:serializeObject", settings, target);
    }
};
