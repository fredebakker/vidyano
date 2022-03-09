import * as Polymer from '../../../../libs/@polymer/polymer.js';
import * as Vidyano from "../../../../libs/vidyano/vidyano.js"
import { Icon } from "../../../icon/icon.js"
import { WebComponent } from "../../../web-component/web-component.js"
import { PersistentObjectAttribute } from "../../persistent-object-attribute.js"
import { PersistentObjectAttributeTranslatedStringDialog } from "./persistent-object-attribute-translated-string-dialog.js"

Icon.Add `
<vi-icon name="TranslatedString">
    <svg viewBox="0 0 32 32">
        <g>
            <path d="m 23.768684,3.4875715 c -0.187969,6.15e-4 -0.375821,0.00251 -0.563174,0.00251 -3.307948,-6.624e-4 -6.615915,0.00307 -9.923864,0.00511 C 12.047242,3.4972215 10.80365,3.8513851 9.7871011,4.5596721 8.9428659,5.1558007 8.256372,5.9894787 7.8882936,6.9594657 7.0906205,6.9795183 6.2929474,7.1259797 5.5499935,7.4203076 4.6027782,7.7914444 3.7531051,8.412417 3.1284252,9.2168879 2.4612617,10.06724 2.0350656,11.119794 1.9949616,12.204657 c -0.032285,1.449202 -0.0085,2.898734 -0.015986,4.347937 -0.00139,0.794613 -0.031295,1.601484 0.1542696,2.380465 0.1913454,0.726301 0.5094641,1.425772 0.9788235,2.015106 1.1752678,1.490325 3.0911106,2.328104 4.9790841,2.270326 -0.444209,1.764601 -0.8887365,3.5295 -1.3326061,5.2941 2.77979,-1.703423 5.5541223,-3.416015 8.3356123,-5.117739 0.152262,-0.09006 0.315069,-0.184868 0.498598,-0.178751 0.974406,-6.81e-4 1.948822,-0.0058 2.923566,0 0.716785,-0.0055 1.440016,0.03025 2.148983,-0.100263 0.716105,-0.122013 1.415237,-0.359581 2.045694,-0.722222 0.916287,0.561124 1.831565,1.123917 2.746833,1.68708 -0.423817,-1.685412 -0.848994,-3.370781 -1.27281,-5.056192 1.210615,0.03432 2.428345,-0.308644 3.441495,-0.973088 0.933621,-0.605987 1.690488,-1.499844 2.068423,-2.552419 0.268496,-0.667163 0.328664,-1.393761 0.328664,-2.106127 -0.0031,-0.975085 -9.54e-4,-1.95018 -0.0013,-2.925264 -0.0041,-0.7140655 0.01087,-1.4288219 -0.02618,-2.141867 C 29.907082,7.1616811 29.360199,6.0570854 28.55301,5.2230464 27.732547,4.3628345 26.617106,3.8112476 25.452374,3.6032475 24.897452,3.4956791 24.332601,3.4858013 23.768694,3.4875856 Z m 0.02076,0.9641666 c 0.569317,-0.00166 1.141801,0.00919 1.697913,0.1415237 1.070927,0.2321308 2.072214,0.8289516 2.727822,1.7153306 0.431633,0.5719998 0.726959,1.2534382 0.809207,1.9678433 0.03263,0.3334108 0.02448,0.6688515 0.03228,1.0036222 0.0026,1.0539351 0.0014,2.1078591 9.54e-4,3.1617941 -0.0089,0.757228 0.04999,1.526734 -0.121979,2.271388 -0.144785,0.532575 -0.371138,1.049516 -0.708628,1.488627 -0.915607,1.198718 -2.432784,1.883895 -3.932288,1.857385 -0.447268,-0.0023 -0.894525,0.01321 -1.341793,0.01933 0.330353,1.313934 0.661695,2.627571 0.992047,3.941846 -1.778492,-1.094719 -3.558366,-2.18743 -5.337921,-3.28011 -0.28481,-0.170274 -0.559797,-0.358222 -0.856842,-0.506405 -0.224654,-0.115215 -0.476487,-0.172653 -0.728329,-0.176732 -1.325832,-0.0052 -2.651671,0.0078 -3.977162,-0.0064 -0.740237,-0.03194 -1.479443,-0.205278 -2.142188,-0.54107 C 10.195958,17.143635 9.5729674,16.602564 9.1464311,15.927583 8.7515031,15.304943 8.5156657,14.573853 8.5180445,13.833617 8.5163087,12.123055 8.5183951,10.412875 8.5170898,8.7026533 8.5181313,8.0273332 8.708765,7.3574509 9.039797,6.7704965 9.5635362,5.8446927 10.441428,5.1380942 11.439965,4.7815714 12.05037,4.5589568 12.701888,4.453247 13.351039,4.4597046 c 3.398353,-0.00407 6.796684,-0.0044 10.194697,-0.00679 0.08114,-4.249e-4 0.162418,-9.46e-4 0.243749,-0.00118 z M 7.6095976,7.9824486 c -0.035688,0.2375684 -0.056794,0.4775266 -0.056447,0.717814 0.00139,1.7109024 -0.00104,3.4217934 9.546e-4,5.1330344 -0.00199,0.770824 0.1988449,1.536868 0.553668,2.219665 0.6566275,1.272131 1.8536369,2.238401 3.2144738,2.665956 0.631816,0.202222 1.295592,0.299785 1.958337,0.300464 1.235424,0.0014 2.470849,-6.9e-4 3.706274,0.001 0.198483,-0.01024 0.375195,0.0897 0.539012,0.188945 1.395842,0.850353 2.784219,1.712251 4.179382,2.563623 -0.697072,0.28821 -1.450541,0.432664 -2.20437,0.432324 -1.246641,0.0014 -2.49293,-0.0024 -3.739571,0.001 -0.256923,-0.0092 -0.518283,0.01465 -0.75959,0.108123 -0.219896,0.08395 -0.420461,0.210029 -0.621324,0.330682 -2.012705,1.237465 -4.025028,2.474929 -6.0384143,3.711373 0.345647,-1.377831 0.6933015,-2.75497 1.0396282,-4.13212 -0.4890716,-0.0061 -0.9784512,-0.01701 -1.4678638,-0.01497 -1.222169,0.0061 -2.4426613,-0.437093 -3.3745827,-1.228309 C 4.1211618,20.622878 3.7571616,20.194685 3.5025997,19.704254 3.2548358,19.22096 3.0723254,18.697531 3.0250839,18.154079 c -0.056421,-0.543451 -0.034654,-1.09063 -0.036694,-1.63578 0.00746,-1.438327 -0.017028,-2.877004 0.016619,-4.31533 0.050303,-1.021647 0.5274775,-1.994002 1.232026,-2.7250617 C 5.1088,8.5589015 6.3595605,8.0671103 7.6095998,7.9824834 Z M 24.433709,9.6879543 c -0.09788,-2.036e-4 -0.195765,0.00886 -0.291862,0.027506 -0.578119,0.1039979 -1.068242,0.5716487 -1.198411,1.1446687 -0.116576,0.474797 0.01295,1.001934 0.34024,1.366274 0.322195,0.370797 0.831331,0.567242 1.319383,0.508105 0.421098,-0.04385 0.816015,-0.277016 1.0631,-0.619943 0.237229,-0.322535 0.337119,-0.741245 0.273224,-1.136172 -0.06356,-0.422118 -0.315719,-0.80992 -0.67326,-1.0423902 C 25.020907,9.7731204 24.727339,9.6886211 24.433709,9.6879522 Z m -11.255779,6.86e-5 c -0.09587,1.699e-4 -0.191696,0.00928 -0.285756,0.027453 -0.5703,0.1029851 -1.055633,0.5590631 -1.19294,1.1218871 -0.126092,0.480914 0.0023,1.019257 0.334771,1.389374 0.322195,0.370458 0.83098,0.566583 1.318693,0.507786 0.421776,-0.0435 0.817715,-0.277322 1.064799,-0.62127 0.255921,-0.348366 0.350086,-0.807881 0.254583,-1.229318 -0.0853,-0.393243 -0.335472,-0.746718 -0.67602,-0.9608357 C 13.753646,9.7673545 13.465555,9.6875123 13.17793,9.688006 Z m 5.65192,1.024e-4 c -0.09957,-0.00158 -0.19926,0.00644 -0.297227,0.024583 -0.576419,0.097541 -1.069229,0.5560577 -1.208235,1.1236397 -0.124731,0.476836 -0.0014,1.01009 0.325265,1.379868 0.31098,0.363661 0.800063,0.564184 1.2769,0.523399 0.395608,-0.02855 0.775591,-0.221955 1.033892,-0.523079 0.285151,-0.325596 0.419378,-0.776581 0.358881,-1.205156 C 20.265286,10.588923 20.02227,10.196692 19.671185,9.9564057 19.425969,9.7848559 19.128546,9.6928688 18.82985,9.688121 Z" />
        </g>
    </svg>
</vi-icon>`;

export interface ITranslatedString {
    key: string;
    label: string;
    value: string;
}

@WebComponent.register({
    properties: {
        strings: {
            type: Array,
            readOnly: true
        },
        multiline: {
            type: Boolean,
            reflectToAttribute: true,
            computed: "_computeMultiline(attribute)"
        },
        canShowDialog: {
            type: Boolean,
            computed: "_computeCanShowDialog(strings, multiline)"
        }
    }
})
export class PersistentObjectAttributeTranslatedString extends PersistentObjectAttribute {
    static get template() { return Polymer.html`<link rel="import" href="persistent-object-attribute-translated-string.html">`; }

    private _defaultLanguage: string;
    readonly strings: ITranslatedString[]; private _setStrings: (strings: ITranslatedString[]) => void;
    multiline: boolean;

    protected _optionsChanged(options: string[] | Vidyano.PersistentObjectAttributeOption[]) {
        super._optionsChanged(options);

        const strings: ITranslatedString[] = [];
        this._defaultLanguage = <string>this.attribute.options[1];
        const data = JSON.parse(<string>this.attribute.options[0]);
        const labels = JSON.parse(<string>this.attribute.options[2]);

        for (const key in labels) {
            strings.push({
                key: key,
                value: data[key] || "",
                label: labels[key]
            });
        }

        this._setStrings(strings);
    }

    protected _valueChanged(newValue: string, oldValue: string) {
        if (newValue === this.attribute.value)
            return;

        super._valueChanged(newValue, oldValue);

        this.strings.find(s => s.key === this._defaultLanguage).value = newValue;

        const newOption = {};
        this.strings.forEach(val => {
            newOption[val.key] = val.value;
        });

        this.set("attribute.options.0", JSON.stringify(newOption));
    }

    private _editInputBlur() {
        if (this.attribute && this.attribute.isValueChanged && this.attribute.triggersRefresh)
            this.attribute.setValue(this.value = this.attribute.value, true).catch(Vidyano.noop);
    }

    private _computeMultiline(attribute: Vidyano.PersistentObjectAttribute): boolean {
        return attribute && attribute.getTypeHint("MultiLine") === "True";
    }

    private _computeCanShowDialog(strings: ITranslatedString[], multiline: boolean): boolean {
        return strings.length > 1 || multiline;
    }

    private async _showLanguagesDialog() {
        const result = await this.app.showDialog(new PersistentObjectAttributeTranslatedStringDialog(this.attribute.label, this.strings.slice(), this.multiline, this.readOnly));
        if (this.readOnly || !result)
            return;

        const newData = {};
        result.forEach(s => {
            newData[s.key] = this.strings[s.key] = s.value;
            if (s.key === this._defaultLanguage)
                this.attribute.value = s.value;
        });

        this.attribute.options[0] = JSON.stringify(newData);

        this.attribute.isValueChanged = true;
        this.attribute.parent.triggerDirty();

        await this.attribute.setValue(this.value = this.attribute.value, true);
    }
}

PersistentObjectAttribute.registerAttributeType("TranslatedString", PersistentObjectAttributeTranslatedString);