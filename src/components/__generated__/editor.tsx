import dynamic from "next/dynamic";
import { IkasEditorComponentLoader } from "@ikas/storefront";


const Component0 = dynamic(() => import("../header"), { loading: () => <IkasEditorComponentLoader /> });
const Component1 = dynamic(() => import("../footer"), { loading: () => <IkasEditorComponentLoader /> });


const Components = {
  "b01c12e8-e280-44b6-8beb-a315513086f9": Component0,"b6119c6a-04ef-4f91-932a-0bfcc99efc43": Component1
};

export default Components;