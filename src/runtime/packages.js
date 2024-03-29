
import * as enable3d from "enable3d";
import * as threeStlLoader from "three/examples/jsm/loaders/STLLoader"
import * as threeGltfLoader from "three/examples/jsm/loaders/GLTFLoader"

globalThis.packages = {
    enable3d: enable3d,
    threeStlLoader: threeStlLoader.STLLoader,
    threeGltfLoader: threeGltfLoader.GLTFLoader
};