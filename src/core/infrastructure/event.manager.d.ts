import {IFunc} from "./event.listener";

export declare interface IBindResult{
	(...args: any[]): any;
}

export declare class EventManager {
	constructor(public context: object, public apply: IFunc);

	bind(f: IFunc): IBindResult;
}