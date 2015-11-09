
namespace SplitTheBill.Server.Tables {
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
}