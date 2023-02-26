/* eslint-disable camelcase */
import("reflect-metadata"); // Polyfill
import {assert} from "chai";
import {Serializable, SnakeCaseNamingStrategy, serializableObject, serializeProperty, serializeName} from "../src";

describe("Serializable", () => {
    describe("readme samples", () => {
        it("naming strategies sample", () => {
            const json = {
                first_name: "Jack",
                last_name: "Sparrow",
                date_of_birth: "1690-05-05T21:29:43.000Z",
                "very::strange::json:name": "I love jewelry"
            };

            @serializableObject({namingStrategy: new SnakeCaseNamingStrategy()})
            class User extends Serializable {

                @serializeProperty(String, null)
                public firstName: string | null = null;

                @serializeProperty(String, null)
                public lastName: string | null = null;

                @serializeProperty(Date, null)
                public dateOfBirth: Date | null = null;

                @serializeName("very::strange::json:name")
                @serializeProperty(String, null)
                public veryStrangePropertyName: string | null = null;

            }

            const user = new User().deserialize(json);

            assert.strictEqual(user.firstName, json.first_name); // True
            assert.strictEqual(user.lastName, json.last_name); // True
            assert.strictEqual(user.dateOfBirth?.toISOString(), json.date_of_birth); // True
            assert.strictEqual(user.veryStrangePropertyName, json["very::strange::json:name"]); // True
        });
    });
});
