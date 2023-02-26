/* eslint-disable max-classes-per-file */
import {serializeProperty} from "../../src/decorators/SerializeProperty";
import {serializeIgnore} from "../../src/decorators/SerializeIgnore";
import {serializableObject} from "../../src/decorators/SerializableObject";

@serializableObject(void 0, true)
export class FriendExt {

    public deserialize!: (json: Record<string, unknown>) => this;

    @serializeProperty(Number)
    public id: number = 0;

    @serializeProperty(String)
    public name: string = "";

}

@serializableObject(void 0, true)
export class UserExt {

    public deserialize!: (json: Record<string, unknown>) => this;

    @serializeProperty(String)
    public id?: string = "";

    @serializeProperty(Number)
    public index: number = 0;

    @serializeProperty(String)
    public guid: string = "";

    @serializeProperty(Boolean)
    public isActive: boolean = false;

    @serializeProperty(String)
    public balance: string = "";

    @serializeProperty(String)
    public picture: string = "";

    @serializeProperty(Number)
    public age: number = 0;

    @serializeProperty(String)
    public eyeColor: string = "";

    @serializeProperty(String)
    public name: string = "";

    @serializeProperty(String)
    public gender: string = "";

    @serializeProperty(String)
    public company: string = "";

    @serializeProperty(String)
    public email: string = "";

    @serializeProperty(String)
    public phone: string = "";

    @serializeProperty(String)
    public address: string = "";

    @serializeProperty(String)
    public about: string = "";

    @serializeProperty(Date, null)
    public registered: Date | null = null;

    @serializeProperty(Number)
    public latitude: number = 0;

    @serializeProperty(Number)
    public longitude: number = 0;

    @serializeProperty([String])
    public tags: string[] = [];

    @serializeProperty([FriendExt])
    public friends: FriendExt[] = [];

    @serializeProperty(String)
    public greeting: string = "";

    @serializeProperty(String)
    public favoriteFruit: string = "";

    @serializeIgnore()
    public isExpanded: boolean = false;

}
