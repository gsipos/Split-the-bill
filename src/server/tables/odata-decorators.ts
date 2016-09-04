export abstract class ODataType {
	public static ByteArray: string = "Edm.Binary";
	public static Boolean: string = "Edm.Boolean";
	public static DateTime: string = "Edm.DateTime";
	public static Double: string = "Edm.Double";
	public static Guid: string = "Edm.Guid";
	public static Int32: string = "Edm.Int32";
	public static Int64: string = "Edm.Int64";
	public static String: string = "Edm.String";
}

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
