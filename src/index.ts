// Decoratore
export {serializeIgnore} from "./decorators/SerializeIgnore.js";
export {serializeName} from "./decorators/SerializeName.js";
export {serializableObject} from "./decorators/SerializableObject.js";
export {serializeProperty} from "./decorators/SerializeProperty.js";

// Base class
export {Serializable} from "./classes/Serializable.js";

// Enums
export {DateFormatHandling} from "./enums/DateFormatHandling.js";
export {DefaultValueHandling} from "./enums/DefaultValueHandling.js";
export {MissingMemberHandling} from "./enums/MissingMemberHandling.js";
export {NullValueHandling} from "./enums/NullValueHandling.js";
export {ReferenceLoopHandling} from "./enums/ReferenceLoopHandling.js";
export {LogLevels} from "./enums/LogLevels.js";

// Settings
export {SerializationSettings} from "./models/SerializationSettings.js";

// Naming strategies
export type {INamingStrategy} from "./naming-strategies/INamingStrategy.js";
export {SnakeCaseNamingStrategy} from "./naming-strategies/SnakeCaseNamingStrategy.js";
export {PascalCaseNamingStrategy} from "./naming-strategies/PascalCaseNamingStrategy.js";
export {KebabCaseNamingStrategy} from "./naming-strategies/KebabCaseNamingStrategy.js";

// Serializers
export type {ISerializer} from "./serializers/ISerializer.js";
export {JsonSerializer} from "./serializers/JsonSerializer.js";
export {YamlSerializer} from "./serializers/YamlSerializer.js";
