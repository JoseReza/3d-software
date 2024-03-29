export async function wait(time = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

export async function importStlModel(path = "", options = { color: "#444" }) {
    const loader = new globalThis.packages.threeStlLoader();
    return await new Promise((resolve, reject) => {
        loader.load(path, (geometry) => {
            if (geometry) {
                var material = new globalThis.packages.enable3d.THREE.MeshBasicMaterial(options);
                var mesh = new globalThis.packages.enable3d.THREE.Mesh(geometry, material);
                resolve({
                    scene: mesh
                });
            } else {
                reject();
            }
        });
    });
}

export async function importGltfModel(path = "", options = { color: "#444" }) {
    const loader = new globalThis.packages.threeGltfLoader();
    return await new Promise((resolve, reject) => {
        loader.load(path, (geometry) => {
            if (geometry) {
                const mixer = new packages.enable3d.THREE.AnimationMixer(geometry.scene);
                geometry.clipActions = geometry.animations.map((clip) => {
                    let clipAction = mixer.clipAction(clip);
                    return clipAction;
                });
                resolve(geometry);
            } else {
                reject();
            }
        });
    });
}

