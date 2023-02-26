import type {AcceptedTypes} from "../models/AcceptedType.js";

export const serializeProperty = (...args: AcceptedTypes[]): PropertyDecorator => (
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.defineMetadata("ts-serializable:serializeTypes", args, target, propertyKey);
};
