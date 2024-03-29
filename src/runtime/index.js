import * as render from "./render/index.js";

async function setup(scene) {

    scene.renderer.setPixelRatio(2);
    scene.renderer.setSize(window.innerWidth, window.innerHeight);

    //object B
    let objectB = await render.importGltfModel("./models/Soldier.glb");
    objectB.scene.scale.set(4, 4, 4);
    objectB.scene.position.set(0, 10, 0);

    //Add physics to object B
    scene.physics.add.existing(objectB.scene, {shape: "convex"});
    //Add object B to the scene
    scene.scene.add(objectB.scene);

    //Ground
    scene.warpSpeed();

    //Axis lines
    //scene.physics.debug.enable();
    //Red   //  X
    //Blue  //  Y
    //Green //  Z

    //Camera position // X Y Z 
    scene.camera.position.set(-5, 16, -10);
}

let scene = await render.start(setup);