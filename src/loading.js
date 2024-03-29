
const loading = {
    show: async () => {
        document.getElementById("divLoading").style.display = "block";
        document.body.style.overflow = "hidden";
    },
    hide: async () => {
        document.getElementById("divLoading").style.display = "none";
        document.body.style.overflow = "auto";
    }
}