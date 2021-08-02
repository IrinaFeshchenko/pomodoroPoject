import { Module as WFMModule } from "./core/module";
import { Component as WFMComponent } from "./core/component";
import { bootstrap } from "./core/bootstrap"
import { Router } from '../app/router';

/** Export all modules functionality to make components and modules. */
export {
    WFMModule,
    WFMComponent,
    bootstrap,
    Router
}