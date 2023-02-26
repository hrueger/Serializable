import {Serializable, serializeProperty, serializeName} from "../../src";

export class UserNaming extends Serializable {

    @serializeName("user::profile::id")
    @serializeProperty(String)
    public id: string = "";

    @serializeName("user::profile::first:name")
    @serializeProperty(String)
    public firstName: string = "";

    @serializeName("user::profile::last:name")
    @serializeProperty(String)
    public lastName: string = "";

}
