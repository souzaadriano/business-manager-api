type PrimitivePropertie = string | number | boolean | null;
type Propertie = PrimitivePropertie | JsonDocument | List;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface List extends Array<Propertie> {}

export interface JsonDocument {
  [member: string]: Propertie;
}

export type JsonValue = Propertie;
