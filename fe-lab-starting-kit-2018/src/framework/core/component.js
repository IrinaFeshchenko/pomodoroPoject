/** Class representing a Component. 
 * @module core/Component
*/
/** Export Component to make represetation of pages. */
export class Component{

    /**
     * Create a component.
     * @param {String} template - The components.
     * @param {String} selector - The main component.
     * @param {Array} array - Array of Events.
     */
    constructor(config){
        this.template = config.template
        this.selector = config.selector
        this.el = null
    }

    /**
     * @function render
     * Start implement components into selectors and init events after render.
     */
    render(){
        this.el = document.querySelector(this.selector)
        if(!this.el) throw new Error(`Component with selector ${this.selector} not found`)
        this.el.innerHTML = this.template

        this._initEvents()
    }

    /**
     * @function _initEvents
     * Set events to the selectors.
     */
    _initEvents(){
        if(this.isUnderfined(this.events)) return

        let events = this.events()

        Object.keys(events).forEach(key =>{
            let listener = key.split(' ')

            this.el
            .querySelector(listener[1])
            .addEventListener(listener[0], this[events[key]].bind(this))
        })
    }

    /**
     * @function _initEvents
     * @return {undefined} - Type of events to selectors.
     */
    isUnderfined(d) {
        return typeof d === 'undefined';
    }
}