import {ODataType} from './tables';

function createOdataDecorator(odataType: string): PropertyDecorator {
	return (target, key) => target[`${key}@odata.type`] = odataType;
}

export const odataString    = createOdataDecorator(ODataType.String);
export const odataByteArray = createOdataDecorator(ODataType.ByteArray);
export const odataDateTime  = createOdataDecorator(ODataType.DateTime);
export const odataDouble    = createOdataDecorator(ODataType.Double);
export const odataGuid      = createOdataDecorator(ODataType.Guid);
export const odataInt32     = createOdataDecorator(ODataType.Int32);
export const odataInt64     = createOdataDecorator(ODataType.Int64);
export const odataBoolean   = createOdataDecorator(ODataType.Boolean);
