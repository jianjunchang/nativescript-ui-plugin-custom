import { MyButton as ButtonDefinition } from "./my-button";
import { View, Style, Property, CssProperty, isIOS } from "tns-core-modules/ui/core/view";
import { TextBase } from "tns-core-modules/ui/text-base";

export const textProperty = new Property<MyButtonBase, string>({ name: "text", defaultValue: "", affectsLayout: isIOS });

// using myOpacity instead of opacity as it will override the one defined in `tns-core-modules`
export const myOpacityProperty = new CssProperty<Style, number>({
    name: "myOpacity", cssName: "my-opacity", defaultValue: 1, valueConverter: (v) => {
        const x = parseFloat(v);
        if (x < 0 || x > 1) {
            throw new Error(`opacity accepts values in the range [0, 1]. Value: ${v}`);
        }

        return x;
    }
});

export abstract class MyButtonBase extends TextBase implements ButtonDefinition {
    public static tapEvent = "tap";
    text: string;

    constructor() {
        super();
        this.className = "mybtn";
    } 

    // Exposing myOpacity style property through MyButton.
    // This is all optional. If not exposed users will have to set it
    // through style: <control:MyButton style.myOpacity='0.4' />.
    get myOpacity(): number {
        return this.style.myOpacity;
    }
    set myOpacity(value: number) {
        this.style.myOpacity = value;
    }
}

// Augmenting Style definition so it includes our myOpacity property
declare module "tns-core-modules/ui/styling/style" {
    interface Style {
        myOpacity: number;
    }
}

// Defines 'text' property on MyButtonBase class.
textProperty.register(MyButtonBase);

// Defines 'myOpacity' property on Style class.
myOpacityProperty.register(Style);