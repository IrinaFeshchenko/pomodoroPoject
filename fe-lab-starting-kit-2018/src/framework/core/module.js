import { Router } from '../../app/router';
/** Class representing a Module. 
 * @module core/Module
*/
/** Export Module to render app components. */
export class Module {
    /**
     * Create a module.
     * @param {class} components - The components.
     * @param {class} mainComp - The main component.
     * @param {appRoutes[]} routes - Routes array.
     */
    constructor(config) {
        this.components = config.components
        this.mainComp = config.mainComp
        this.routes = config.routes
    }

    /**
     * @function start
     * Start to init components with routes.
     * @returns {initComponents()} 
     * @returns {initRoutes()}
     */
    start() {
        this.initComponents()
        if (this.routes) this.initRoutes()
    }
    /**
     * @function initComponents
     * Get components that was decleared in constructor.
     * @returns {this.render():void} 
     * @returns {this.renderComponent():void}
     */
    initComponents() {
        this.mainComp.render()
        this.components.forEach(this.renderComponent.bind(this))
    }
    /**
     * @function initRoutes
     * Init, get hashchange and render route.
     */
    initRoutes() {
        window.addEventListener('hashchange', this.renderRoute.bind(this))
        this.renderRoute()
    }

    /**
     * @function renderRoute
     * Render route that will be used with header, main and notification components.
     * 
     */
    renderRoute() {
        let url = Router.getUrl()
        let route = this.routes.find(r => r.path === url);
        if (this.isUnderfined(route)) {
            route = this.routes.find(r => r.path === '**');
        }
        if (route.component.selector != null) {
            document.querySelector('router-outlet').innerHTML = `<${route.component.selector}></${route.component.selector}>`
            this.renderComponent(route.component)
        }
        if (route.header.selector != null) {
            document.querySelector('header-outlet').innerHTML = `<${route.header.selector}></${route.header.selector}>`
            this.renderComponent(route.header)
        }
        if (route.notify.selector != null) {
            document.querySelector('notify-outlet').innerHTML = `<${route.notify.selector}></${route.notify.selector}>`
            this.renderComponent(route.notify)
        }
    }

    /**
     * @function renderRoute
     * Render route that will be used with header, main and notification components.
     * @param {Class} component - The components.
     */
    renderComponent(component) {
        if (!this.isUnderfined(component.onInit)) component.onInit()
        component.render()
        if (!this.isUnderfined(component.afterInit)) component.afterInit()
    }

    /**
     * @function isUnderfined
     * Return the type of component.
     * @return {undefined} - Type of component.
     */
    isUnderfined(d) {
        return typeof d === 'undefined';
    }
}