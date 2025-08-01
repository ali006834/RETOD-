import dynamic from "next/dynamic";
import { IkasEditorComponentLoader } from "@ikas/storefront";


const Component0 = dynamic(() => import("../header"), { loading: () => <IkasEditorComponentLoader /> });
const Component1 = dynamic(() => import("../footer"), { loading: () => <IkasEditorComponentLoader /> });
const Component2 = dynamic(() => import("../banner-top-slider"), { loading: () => <IkasEditorComponentLoader /> });
const Component3 = dynamic(() => import("../banner-single"), { loading: () => <IkasEditorComponentLoader /> });
const Component4 = dynamic(() => import("../banner-trio"), { loading: () => <IkasEditorComponentLoader /> });
const Component5 = dynamic(() => import("../featured-product-showcase"), { loading: () => <IkasEditorComponentLoader /> });
const Component6 = dynamic(() => import("../banner-sliding-slider"), { loading: () => <IkasEditorComponentLoader /> });
const Component7 = dynamic(() => import("../banner-thin"), { loading: () => <IkasEditorComponentLoader /> });
const Component8 = dynamic(() => import("../product-list"), { loading: () => <IkasEditorComponentLoader /> });
const Component9 = dynamic(() => import("../product-detail"), { loading: () => <IkasEditorComponentLoader /> });
const Component10 = dynamic(() => import("../bottom-scrolling-text"), { loading: () => <IkasEditorComponentLoader /> });


const Components = {
  "b01c12e8-e280-44b6-8beb-a315513086f9": Component0,"b6119c6a-04ef-4f91-932a-0bfcc99efc43": Component1,"43854e56-71f7-44f2-ab2f-f1fd72fd4462": Component2,"1fe7eeff-4022-495a-b0e8-c25ddfd97383": Component3,"67c7fb03-e524-44be-ab11-5e343570316c": Component4,"181f1f99-f1f4-4924-9928-28b0045975c2": Component5,"ae67efe6-3b7c-44b7-a8f6-3b17bbdb369a": Component6,"8a146ee7-8adb-49b9-82c0-90b4d08d61a7": Component7,"b0214df4-a89c-4a83-84ee-56e25518ccc9": Component8,"bf550c80-41a6-4875-a5b9-c87556690bb4": Component9,"b85ab2ab-f246-4873-812b-5a94035df6b6": Component10
};

export default Components;