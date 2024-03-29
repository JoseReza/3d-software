let { Scene3D, PhysicsLoader, Project } = globalThis.packages.enable3d;

export async function start(setup, frame = async function (escene) { }) {

  return new Promise((resolve, reject) => {
    class Main extends Scene3D {
      async create() {
        try {
          await setup(this);
          resolve(this);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      }

      async update() {
        try {
          await frame(this);
        } catch (error) {
          console.error(error);
        }
      }
    }
    const config = {
      scenes: [Main]
    };

    let thisScriptPath = import.meta.url;
    let physicsPath = "";
    let thisScriptPathSplittedBySlash = thisScriptPath.split("/");
    for (let index = 0; index < thisScriptPathSplittedBySlash.length - 1; index++) {
      if (thisScriptPathSplittedBySlash[index] != undefined) {
        physicsPath += `${thisScriptPathSplittedBySlash[index]}/`;
      } else {
        physicsPath += `/`;
      }
    }
    physicsPath += "physics";

    PhysicsLoader(physicsPath, () => {
      new Project(config)
    });
  });
}