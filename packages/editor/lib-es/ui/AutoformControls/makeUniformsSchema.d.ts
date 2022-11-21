import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import type { DataTType, JsonSchema } from '../../core/types';
declare function makeUniformsSchema<T extends DataTType>(jsonSchema: Omit<JsonSchema<T>, 'type'>): JSONSchemaBridge;
export default makeUniformsSchema;
//# sourceMappingURL=makeUniformsSchema.d.ts.map