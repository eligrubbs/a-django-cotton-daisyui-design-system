const initConfig = () => {
    const defaultConfig = {
        theme: "system",
    }

    const html = document.documentElement
    let config = {}
    const configCache = localStorage.getItem("__app_config__")
    if (configCache) {
        config = JSON.parse(configCache)
    } else {
        config = { ...defaultConfig }
    }

    updateTheme = () => {
        localStorage.setItem("__app_config__", JSON.stringify(config))

        if (config.theme === "system") {
            html.removeAttribute("data-theme")
        } else {
            html.setAttribute("data-theme", config.theme)
        }
    }

    initEventListener = () => {
        const themeControls = document.querySelectorAll("[data-theme-control]")
        themeControls.forEach((control) => {
            control.addEventListener("click", () => {
                config.theme =
                    config.theme === "light" ? "dark" : config.theme === "dark" ? "system" : "light"
                updateTheme()
            })
        })
    }

    updateTheme()
    window.addEventListener("DOMContentLoaded", initEventListener)
}


initConfig();
