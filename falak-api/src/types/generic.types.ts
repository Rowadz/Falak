import { Primitive } from 'utility-types'
export type PlainObject = Record<string, Primitive> // most likely will be used to type object literals
export type CUD = 'create' | 'delete' | 'update'
export type SimulationCUD = { type: CUD; sql: string }
export type SimulationCUDFunc = () => SimulationCUD
