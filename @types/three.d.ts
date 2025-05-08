declare module 'three/examples/jsm/loaders/GLTFLoader' {
    import { Loader } from 'three';
    import { Group } from 'three';

    export class GLTFLoader extends Loader {
        constructor();
        load(
            url: string,
            onLoad: (gltf: { scene: Group }) => void,
            onProgress?: (event: ProgressEvent) => void,
            onError?: (error: Error) => void
        ): void;
    }
}