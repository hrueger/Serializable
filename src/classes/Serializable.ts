/* eslint-disable max-lines */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import type {AcceptedTypes} from "../models/AcceptedType.js";
import {SerializationSettings} from "../models/SerializationSettings.js";

/**
 * Class how help you deserialize object to classes.
 *
 * @export
 * @class Serializable
 */
export class Serializable {

    /**
     * Global setting for serialization and deserialization
     *
     * @static
     * @type {SerializationSettings}
     * @memberof Serializable
     */
    public static defaultSettings: SerializationSettings = new SerializationSettings();

    /**
     * Deserialize object from static method.
     *
     * Example:
     * const obj: MyObject = MyObject.deserialize({...data});
     *
     * @static
     * @param {object} serialized
     * @returns {object}
     * @memberof Serializable
     */
    public static deserialize<T extends Serializable>(
        this: new () => T,
        serialized: object,
        settings?: Partial<SerializationSettings>
    ): T {
        return new this().deserialize(serialized, settings);
    }

    /**
     * Deserialize object from static method.
     *
     * Example:
     * const obj: MyObject = MyObject.fromString({...data});
     *
     * @static
     * @param {object} serialized
     * @returns {object}
     * @memberof Serializable
     */
    public static fromString<T extends Serializable>(
        this: new () => T,
        str: string,
        settings?: Partial<SerializationSettings>
    ): T {
        return new this().fromString(str, settings);
    }

    /**
     * Fill property of current model by data from string.
     *
     * Example:
     * const obj: MyObject = new MyObject().fromString("{...data}"");
     *
     * @param {string} str
     * @returns {this}
     * @memberof Serializable
     */
    public fromString (str: string, settings?: Partial<SerializationSettings>): this {
        let {serializer} = Serializable.defaultSettings;
        if (Reflect.hasMetadata("ts-serializable:serializeObject", this.constructor)) {
            const objectSettings: Partial<SerializationSettings> = Reflect.getMetadata(
                "ts-serializable:serializeObject",
                this.constructor
            ) as Partial<SerializationSettings>;
            serializer = objectSettings.serializer ?? serializer;
        }
        return this.deserialize(serializer.deserialize(str), settings);
    }

    /**
     * Fill property of current model by data from serialized.
     *
     * Example:
     * const obj: MyObject = new MyObject().deserialize({...data});
     *
     * @param {object} serialized
     * @returns {this}
     * @memberof Serializable
     */
    public deserialize (serialized: object, settings?: Partial<SerializationSettings>): this {
        const unknownJson: unknown = serialized;

        if (
            unknownJson === null ||
            Array.isArray(unknownJson) ||
            typeof unknownJson !== "object"
        ) {
            this.onWrongType(String(unknownJson), "is not object", unknownJson);
            return this;
        }

        // eslint-disable-next-line guard-for-in
        for (const thisProp in this) {
            // Naming strategy and serializeName decorator
            let jsonProp: string = this.getJsonPropertyName(thisProp, settings);

            // For deep copy
            if (!unknownJson?.hasOwnProperty(jsonProp) && unknownJson?.hasOwnProperty(thisProp)) {
                jsonProp = thisProp;
            }

            if (
                unknownJson?.hasOwnProperty(jsonProp) &&
                this.hasOwnProperty(thisProp) &&
                Reflect.hasMetadata("ts-serializable:serializeTypes", this.constructor.prototype, thisProp)
            ) {
                const acceptedTypes: AcceptedTypes[] = Reflect.getMetadata(
                    "ts-serializable:serializeTypes",
                    this.constructor.prototype,
                    thisProp
                ) as [];
                const jsonValue: unknown = Reflect.get(unknownJson, jsonProp) as unknown;
                const extractedValue = this.deserializeProperty(thisProp, acceptedTypes, jsonValue, settings);
                Reflect.set(this, thisProp, extractedValue);
            }
        }

        return this;
    }

    /**
     * Process serialization for @serializeIgnore decorator
     *
     * @returns {object}
     * @memberof Serializable
     */
    public serialize (): Record<string, unknown> {
        // eslint-disable-next-line consistent-this
        const that: this = {...this};
        const toJson: Record<string, unknown> = {};

        for (const prop in that) {
            // Json.hasOwnProperty(prop) - preserve for deserialization for other classes with methods
            if (that.hasOwnProperty(prop) && this.hasOwnProperty(prop)) {
                if (Reflect.getMetadata("ts-serializable:serializeIgnore", this.constructor.prototype, prop) !== true) {
                    const toProp = this.getJsonPropertyName(prop);
                    Reflect.set(toJson, toProp, Reflect.get(that, prop));
                }
            }
        }

        return toJson;
    }

    public toJSON (): Record<string, unknown> {
        return this.serialize();
    }


    /**
     * Process serialization for @serializeIgnore decorator
     *
     * @returns {string}
     * @memberof Serializable
     */
    public toString (): string {
        let {serializer} = Serializable.defaultSettings;
        if (Reflect.hasMetadata("ts-serializable:serializeObject", this.constructor)) {
            const objectSettings: Partial<SerializationSettings> = Reflect.getMetadata(
                "ts-serializable:serializeObject",
                this.constructor
            ) as Partial<SerializationSettings>;
            serializer = objectSettings.serializer ?? serializer;
        }
        return serializer.serialize(this.serialize());
    }

    /**
     * Process exceptions from wrong types.
     * By default just print warning in console, but can by override for drop exception or logging to backend.
     *
     * @protected
     * @param {string} prop
     * @param {string} message
     * @param {(unknown)} jsonValue
     * @memberof Serializable
     */
    protected onWrongType (prop: string, message: string, jsonValue: unknown): void {
        // eslint-disable-next-line no-console
        console.error(`${this.constructor.name}.deserialize: serialized.${prop} ${message}:`, jsonValue);
    }

    /**
     * //todo: write jsdoc
     *
     * @private
     * @param {object} object
     * @param {string} prop
     * @param {AcceptedTypes[]} acceptedTypes
     * @param {(unknown)} jsonValue
     * @returns {(Object | null | void)}
     * @memberof Serializable
     */
    protected deserializeProperty (
        prop: string,
        acceptedTypes: AcceptedTypes[],
        jsonValue: unknown,
        settings?: Partial<SerializationSettings>
    ): unknown {
        for (const acceptedType of acceptedTypes) { // Type Symbol is not a property
            if (// Null
                acceptedType === null &&
                jsonValue === null
            ) {
                return null;
            } else if (// Void, for deep copy classes only, serialized don't have void type
                acceptedType === void 0 &&
                jsonValue === void 0
            ) {
                return void 0;
            } else if (// Boolean, Boolean
                acceptedType === Boolean &&
                (typeof jsonValue === "boolean" || jsonValue instanceof Boolean)
            ) {
                return Boolean(jsonValue);
            } else if (// Number, Number
                acceptedType === Number &&
                (typeof jsonValue === "number" || jsonValue instanceof Number)
            ) {
                return Number(jsonValue);
            } else if (// String, String
                acceptedType === String &&
                (typeof jsonValue === "string" || jsonValue instanceof String)
            ) {
                return String(jsonValue);
            } else if (// Object, Object
                acceptedType === Object &&
                (typeof jsonValue === "object")
            ) {
                return Object(jsonValue);
            } else if (// Date
                acceptedType === Date &&
                (typeof jsonValue === "string" || jsonValue instanceof String || jsonValue instanceof Date)
            ) {
                // 0 year, 0 month, 0 days, 0 hours, 0 minutes, 0 seconds
                let unicodeTime: number = new Date("0000-01-01T00:00:00.000").getTime();

                if (typeof jsonValue === "string") {
                    unicodeTime = Date.parse(jsonValue);
                } else if (jsonValue instanceof String) {
                    unicodeTime = Date.parse(String(jsonValue));
                } else if (jsonValue instanceof Date) {
                    unicodeTime = jsonValue.getTime();
                }
                if (isNaN(unicodeTime)) { // Preserve invalid time
                    this.onWrongType(prop, "is invalid date", jsonValue);
                }

                return new Date(unicodeTime);
            } else if (// Array
                Array.isArray(acceptedType) &&
                Array.isArray(jsonValue)
            ) {
                if (acceptedType[0] === void 0) {
                    this.onWrongType(prop, "invalid type", jsonValue);
                }

                return jsonValue.map((arrayValue: unknown) => this.deserializeProperty(
                    prop,
                    acceptedType,
                    arrayValue,
                    settings
                ));
            } else if (// Serializable
                acceptedType !== null &&
                acceptedType !== void 0 &&
                !Array.isArray(acceptedType) &&
                (
                    acceptedType.prototype instanceof Serializable ||
                    Boolean(Reflect.getMetadata("ts-serializable:serializeObjectExtended", acceptedType))
                ) &&
                jsonValue !== null &&
                jsonValue !== void 0 &&
                typeof jsonValue === "object" && !Array.isArray(jsonValue)
            ) {
                const TypeConstructor: new () => Serializable = acceptedType as new () => Serializable;

                return new TypeConstructor().deserialize(jsonValue, settings);
            } else if (// Instance any other class, not Serializable, for parse from other classes instance
                acceptedType instanceof Function &&
                jsonValue instanceof acceptedType
            ) {
                return jsonValue;
            }
        }

        // Process wrong type and return default value
        this.onWrongType(prop, "is invalid", jsonValue);

        return Reflect.get(this, prop);
    }

    protected getJsonPropertyName (thisProperty: string, settings?: Partial<SerializationSettings>): string {
        if (Reflect.hasMetadata("ts-serializable:serializeName", this.constructor.prototype, thisProperty)) {
            return Reflect.getMetadata("ts-serializable:serializeName", this.constructor.prototype, thisProperty) as string;
        }

        if (settings?.namingStrategy) {
            return settings.namingStrategy.toJsonName(thisProperty);
        }

        if (Reflect.hasMetadata("ts-serializable:serializeObject", this.constructor)) {
            const objectSettings: Partial<SerializationSettings> = Reflect.getMetadata(
                "ts-serializable:serializeObject",
                this.constructor
            ) as Partial<SerializationSettings>;
            return objectSettings.namingStrategy?.toJsonName(thisProperty) ?? thisProperty;
        }

        if (Serializable.defaultSettings.namingStrategy) {
            const {namingStrategy} = Serializable.defaultSettings;
            return namingStrategy.toJsonName(thisProperty) ?? thisProperty;
        }

        return thisProperty;
    }

}
