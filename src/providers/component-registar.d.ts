export declare class ComponentRegistar {
    private components;
    registerComponent(component: any): void;
    unregisterComponent(component: any): void;
    registerComponents(components: Array<any>): void;
    unregisterComponents(components: Array<any>): void;
    getComponent(componentname: string): any;
    private isPresent(component);
}
