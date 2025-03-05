import * as Polymer from "../../../libs/polymer/polymer.js"
import { QueryGridCell } from "./query-grid-cell.js"
import { QueryGridCellDefault } from "./query-grid-cell-default.js"
import { WebComponent } from "../../web-component/web-component.js"
import { getMarkdown } from "../../marked/marked.js"

@WebComponent.register({
    properties: {
        value: {
            type: Object,
            observer: "_valueChanged"
        },
        column: Object,
        right: {
            type: Boolean,
            reflectToAttribute: true
        },
        tag: {
            type: Boolean,
            reflectToAttribute: true
        }
    },
    sensitive: true
})
export class QueryGridCellCommonMark extends QueryGridCellDefault {
    static get template() { return Polymer.html`<link rel="import" href="query-grid-cell-common-mark.html">` }

    #asmarkdown: boolean;
    #textNode: Text;
    #textNodeValue: string;
    #markdownValue: string;

    protected _clearCell() {
        super._clearCell();

        if (this.#asmarkdown && this.#markdownValue) {
            this.$.text.innerHTML = "";
            this.#markdownValue = null;
        }
    }

    protected _updateCell(value: string) {
        const asmarkdown = this._getTypeHint(this.value.column, "displayingrid", null);
        this.#asmarkdown = Boolean.parse(asmarkdown);
        if (this.#asmarkdown) {
            if (this.#textNode) {
                // In case the cell was previously rendered as text, remove the text node.
                this.$.text.removeChild(this.#textNode);
                this.#textNode = this.#textNodeValue = null;
            }

            if (this.#markdownValue !== value)
                this.$.text.innerHTML = getMarkdown(this.#markdownValue = value);

            return;
        }

        if (this.#markdownValue) {
            // In case the cell was previously rendered as markdown, clear the innerHTML.
            this.$.text.innerHTML = "";
            this.#markdownValue = null;
        }

        super._updateCell(value);
    }

    private _onClick(e: Event) {
        if ((e.target as HTMLElement)?.tagName === "A")
            e.stopPropagation();
    }
}

QueryGridCell.registerCellType("CommonMark", QueryGridCellCommonMark);