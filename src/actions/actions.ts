import { Action } from "redux";

export interface IRequestType {
   REQUEST: string
   SUCCESS: string
   FAILURE: string
}

export interface IStandardAction extends Action {
   payload?: any;
   meta?: any;
}

export interface IActionCreator {
   (...arg: any[]): IStandardAction
}

export const defineRequestType = (base: string): IRequestType => {
   return ["REQUEST", "SUCCESS", "FAILURE"].reduce<IRequestType>((acc: any, type: string) => {
      acc[type] = `${base}_${type}`;
      return acc;
   }, {} as IRequestType)
}