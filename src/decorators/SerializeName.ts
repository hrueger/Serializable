export const serializeName = (serializePropertyName: string): PropertyDecorator => (
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.defineMetadata("ts-serializable:serializeName", serializePropertyName, target, propertyKey);
};
