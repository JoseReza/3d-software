


let utils = {
    wait: async (time = 0) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }
}
