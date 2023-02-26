export const serializeIgnore = (): PropertyDecorator => (
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.defineMetadata("ts-serializable:serializeIgnore", true, target, propertyKey);
};
