import { MyButtonBase } from "./my-button-base";
export declare class MyButton extends MyButtonBase {
    nativeView: android.widget.Button;
    createNativeView(): Object;
    initNativeView(): void;
    disposeNativeView(): void;
}
