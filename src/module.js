let module = {
    extension: "json",
    exportProject: async function (modules = {}) {
        console.warn("Exporting module");
        let blob = new Blob([JSON.stringify(modules)], { type: 'application/json' });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `3d-software-modules.${this.extension}`;
        document.body.appendChild(link);
        link.click();
    },
    importProject: async function (event) {
        console.warn("Importing module");
        return await new Promise((resolve, reject) => {
            const fileInput = event.target;
            const file = fileInput.files[0];

            if (!file) {
                alert('Please select a file project');
                return;
            }

            const reader = new FileReader();

            reader.onload = function (e) {
                const jsonContent = e.target.result;
                try {
                    const jsonObject = JSON.parse(jsonContent);
                    resolve(jsonObject);
                } catch (error) {
                    alert('Error al analizar el archivo JSON.');
                    console.error(error);
                    reject({ main: "//Error importing project" });
                }
            };

            reader.readAsText(file);
        });
    }
}