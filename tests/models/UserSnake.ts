/* eslint-disable max-classes-per-file */
import {serializableObject, SnakeCaseNamingStrategy, Serializable, serializeProperty, serializeIgnore} from "../../src";

export class FriendSnake extends Serializable {

    @serializeProperty(Number)
    public idSnake: number = 0;

    @serializeProperty(String)
    public nameSnake: string = "";

}

export class UserSnake extends Serializable {

    @serializeProperty(String)
    public idSnake?: string = "";

    @serializeProperty(Number)
    public indexSnake: number = 0;

    @serializeProperty(String)
    public guidSnake: string = "";

    @serializeProperty(Boolean)
    public isActiveSnake: boolean = false;

    @serializeProperty(String)
    public balanceSnake: string = "";

    @serializeProperty(String)
    public pictureSnake: string = "";

    @serializeProperty(Number)
    public ageSnake: number = 0;

    @serializeProperty(String)
    public eyeColorSnake: string = "";

    @serializeProperty(String)
    public nameSnake: string = "";

    @serializeProperty(String)
    public genderSnake: string = "";

    @serializeProperty(String)
    public companySnake: string = "";

    @serializeProperty(String)
    public emailSnake: string = "";

    @serializeProperty(String)
    public phoneSnake: string = "";

    @serializeProperty(String)
    public addressSnake: string = "";

    @serializeProperty(String)
    public aboutSnake: string = "";

    @serializeProperty(Date, null)
    public registeredSnake: Date | null = null;

    @serializeProperty(String)
    public latitudeSnake: string = "";

    @serializeProperty(String)
    public longitudeSnake: string = "";

    @serializeProperty([String])
    public tagsSnake: string[] = [];

    @serializeProperty([FriendSnake])
    public friendsSnake: FriendSnake[] = [];

    @serializeProperty(String)
    public greetingSnake: string = "";

    @serializeProperty(String)
    public favoriteFruitSnake: string = "";

    @serializeIgnore()
    public isExpandedSnake: boolean = false;

}

@serializableObject({namingStrategy: new SnakeCaseNamingStrategy()})
export class FriendSnakeObject extends FriendSnake {}

@serializableObject({namingStrategy: new SnakeCaseNamingStrategy()})
export class UserSnakeObject extends UserSnake {

    @serializeProperty([FriendSnakeObject])
    public friendsSnake: FriendSnakeObject[] = [];

}
