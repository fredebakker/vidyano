import * as Vidyano from "../../libs/vidyano/vidyano.js"
import * as Polymer from "../../libs/@polymer/polymer.js"
import "../popup-menu/popup-menu.js"
import { QueryGridColumn } from "./query-grid-column.js"
import { WebComponent, WebComponentListener } from "../web-component/web-component.js"

interface IResizeObserver {
    observe: (target: HTMLElement) => void;
    unobserve: (target: HTMLElement) => void;
}

declare class ResizeObserver implements IResizeObserver {
    constructor(observer: (entries: { target: HTMLElement; contentRect: ClientRect }[]) => void);
    observe: (target: HTMLElement, options?: { box : "border-box" | "content-box" }) => void;
    unobserve: (target: HTMLElement) => void;
}

let resizeObserver: ResizeObserver;
resizeObserver = new ResizeObserver(entries => {
    entries[0].target.parentElement.dispatchEvent(new CustomEvent("column-width-changed", {
        detail: entries.map(e => {
            let width = e["borderBoxSize"] != null ? e["borderBoxSize"][0].inlineSize : e.target.offsetWidth;
            return [(<QueryGridColumnHeader>e.target).column, width];
        }),
        bubbles: true,
        cancelable: true,
        composed: true
    }));
});

@WebComponent.register({
    properties: {
        column: {
            type: Object,
            observer: "_columnChanged"
        },
        canSort: {
            type: Boolean,
            reflectToAttribute: true,
            readOnly: true
        },
        sortingIcon: {
            type: String,
            computed: "_computeSortingIcon(column.sortDirection)"
        },
        canGroupBy: {
            type: Boolean,
            readOnly: true
        },
        isPinned: {
            type: Boolean,
            readOnly: true
        },
        groupByLabel: {
            type: String,
            computed: "_computeGroupByLabel(column.label, translations)"
        },
        pinLabel: {
            type: String,
            computed: "_computePinLabel(isPinned, translations)"
        }
    },
    forwardObservers: [
        "column.sortDirection"
    ],
    listeners: {
        "tap": "_sort"
    }
})
export class QueryGridColumnHeader extends WebComponentListener(WebComponent) {
    static get template() { return Polymer.html`<link rel="import" href="query-grid-column-header.html">` }

    column: QueryGridColumn;
    readonly canSort: boolean; private _setCanSort: (canSort: boolean) => void;
    readonly canGroupBy: boolean; private _setCanGroupBy: (canGroupBy: boolean) => void;
    readonly isPinned: boolean; private _setIsPinned: (isPinned: boolean) => void;

    connectedCallback() {
        super.connectedCallback();

        resizeObserver.observe(this, { box: "border-box" });
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        resizeObserver.unobserve(this);
    }

    private _columnChanged(column: QueryGridColumn) {
        if (!column)
            return;
        
        this._setCanSort(column.canSort);
        this._setCanGroupBy(column.canGroupBy);
        this._setIsPinned(column.isPinned);
    }

    private _computeSortingIcon(direction: Vidyano.SortDirection) {
        return direction === "ASC" ? "SortAsc" : (direction === "DESC" ? "SortDesc" : null);
    }

    private _computeGroupByLabel(label: string): string {
        return this.translateMessage("GroupByColumn", label);
    }

    private _computePinLabel(isPinned: boolean): string {
        return isPinned ? this.translations.Unpin : this.translations.Pin;
    }

    private _sort(direction: Vidyano.SortDirection);
    private _sort(e: Polymer.Gestures.TapEvent);
    private _sort(eventOrDirection: Vidyano.SortDirection | Polymer.Gestures.TapEvent) {
        let newSortingDirection: Vidyano.SortDirection;
        let multiSort = false;

        if (typeof eventOrDirection === "string")
            newSortingDirection = eventOrDirection;
        else {
            multiSort = (<any>eventOrDirection).detail.sourceEvent.ctrlKey;
            switch (this.column.sortDirection) {
                case "ASC": {
                    newSortingDirection = "DESC";
                    break;
                }
                case "DESC": {
                    newSortingDirection = multiSort && this.column.query.sortOptions.length > 1 ? "" : "ASC";
                    break;
                }
                case "": {
                    newSortingDirection = "ASC";
                    break;
                }
            }
        }

        this.column.column.sort(newSortingDirection, multiSort);
    }

    private _sortAsc(e: Polymer.Gestures.TapEvent) {
        e.stopPropagation();
        this._sort("ASC");
    }

    private _sortDesc(e: Polymer.Gestures.TapEvent) {
        e.stopPropagation();
        this._sort("DESC");
    }

    private _togglePin() {
        this.column.isPinned = !this.column.isPinned;
        this._setIsPinned(this.column.isPinned);

        this.fire("query-grid-column:update");
    }
}