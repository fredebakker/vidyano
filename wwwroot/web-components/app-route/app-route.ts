import * as Polymer from "../../libs/@polymer/polymer.js"
import { AppServiceHooks } from "../app-service-hooks/app-service-hooks.js"
import { WebComponent, WebComponentListener } from "../web-component/web-component.js"

export interface IAppRouteActivatedArgs {
    route: AppRoute;
    parameters: { [key: string]: string };
}

@WebComponent.register({
    properties: {
        route: {
            type: String,
            reflectToAttribute: true
        },
        routeAlt: {
            type: String,
            reflectToAttribute: true
        },
        active: {
            type: Boolean,
            readOnly: true,
            observer: "_activeChanged"
        },
        path: {
            type: String,
            readOnly: true
        },
        allowSignedOut: Boolean,
        preserveContent: {
            type: Boolean,
            reflectToAttribute: true
        }
    },
    listeners: {
        "title-changed": "_titleChanged"
    }
})
export class AppRoute extends WebComponentListener(WebComponent) {
    static get template() { return Polymer.html`<link rel="import" href="app-route.html">`; }

    private _hasChildren: boolean;
    private _parameters: { [key: string]: string } = {};
    private _documentTitleBackup: string;
    readonly active: boolean; private _setActive: (val: boolean) => void;
    readonly path: string; private _setPath: (val: string) => void;
    allowSignedOut: boolean;
    deactivator: (result: boolean) => void;
    preserveContent: boolean;
    routeAlt: string;

    constructor(public route: string) {
        super();
    }

    matchesParameters(parameters: { [key: string]: string } = {}): boolean {
        return this._parameters && JSON.stringify(this._parameters) === JSON.stringify(parameters);
    }

    async activate(parameters: { [key: string]: string } = {}): Promise<any> {
        if (this.active && this.matchesParameters(parameters))
            return;

        this._documentTitleBackup = document.title;
        this._parameters = parameters;

        if (this.preserveContent && this.children.length > 0)
            this._fireActivate(<WebComponent>this.children[0]);
        else {
            this._clearChildren();

            const template = this.querySelector("template");
            if (template) {
                const templateClass = Polymer.Templatize.templatize(template);
                const templateInstance = new templateClass({ app: this.app });
                this.appendChild(templateInstance.root);
                this.shadowRoot.querySelector("slot").assignedElements().forEach(this._fireActivate.bind(this));

                this._hasChildren = true;
            }
            else {
                const firstChild = <WebComponent>this.children[0];
                if (firstChild)
                    this._fireActivate(firstChild);
            }
        }

        this._setActive(true);
        this._setPath(this.app.path);

        (<AppServiceHooks>this.service.hooks).trackPageView(this.app.path);
    }

    private _fireActivate(target: WebComponent) {
        if (target.fire)
            target.fire("app-route-activate", { route: this, parameters: this._parameters }, { bubbles: true });
    }

    private _clearChildren() {
        if (!this._hasChildren)
            return;

        Array.from(this.children).filter(c => c.tagName !== "TEMPLATE" && c.getAttribute("is") !== "dom-template").forEach(c => this.removeChild(c));
        this._hasChildren = false;
    }

    deactivate(nextRoute?: AppRoute): Promise<boolean> {
        const component = <WebComponent>this.children[0];

        return new Promise<boolean>(resolve => {
            this.deactivator = resolve;
            if (!component || !component.fire || !component.fire("app-route-deactivate", null, { bubbles: false, cancelable: true }).defaultPrevented)
                resolve(true);
        }).then(result => {
            if (result) {
                if (!this.preserveContent || nextRoute !== this)
                    this._setActive(false);

                document.title = this._documentTitleBackup;
            }

            return result;
        });
    }

    get parameters(): any {
        return this._parameters;
    }

    private _activeChanged() {
        this.classList.toggle("active", this.active);

        if (this.activate)
            this.fire("app-route-activated", { route: this, parameters: this._parameters }, { bubbles: true });
        else
            this.fire("app-route-deactivated", { route: this }, { bubbles: true });
    }

    private _titleChanged(e: CustomEvent) {
        const { title }: { title: string; } = e.detail;
        if (!this.active || e.defaultPrevented || (e.target as HTMLElement).parentNode !== this)
            return;

        if (this._documentTitleBackup !== title && !!title)
            document.title = `${title} · ${this._documentTitleBackup}`;
        else
            document.title = this._documentTitleBackup;

        e.stopPropagation();
    }
}