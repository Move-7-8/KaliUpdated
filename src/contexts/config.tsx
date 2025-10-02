"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo } from "react";

import { useLocalStorage } from "@/hooks/use-local-storage";

// export const themes = ["light", "contrast", "material", "dark", "dim", "material-dark", "system"] as const;
export const themes = ["y2k"] as const;

export type ITheme = (typeof themes)[number];

type IConfig = {
    theme: ITheme;
    direction: "ltr" | "rtl";
    sidebarTheme: ITheme;
    fullscreen: boolean;
};

const defaultConfig: IConfig = {
    theme: "y2k",
    direction: "ltr",
    sidebarTheme: "y2k",
    fullscreen: false,
};

const useHook = () => {
    const [config, setConfig] = useLocalStorage<IConfig>("__NEXUS_CONFIG_v2.0__", defaultConfig);

    useEffect(() => {
        const fullscreenMedia = window.matchMedia("(display-mode: fullscreen)");
        const fullscreenListener = () => {
            updateConfig({ fullscreen: fullscreenMedia.matches });
        };
        fullscreenMedia.addEventListener("change", fullscreenListener);
        return () => {
            fullscreenMedia.removeEventListener("change", fullscreenListener);
        };
    }, []);

    const htmlRef = useMemo(() => (typeof window !== "undefined" ? document.documentElement : null), []);

    const updateConfig = (changes: Partial<IConfig>) => {
        setConfig({ ...config, ...changes });
    };

    useEffect(() => {
        if (!htmlRef) return;

        // Apply daisyUI theme
        htmlRef.setAttribute("data-theme", config.theme);

        // Fullscreen flag
        if (config.fullscreen) htmlRef.setAttribute("data-fullscreen", "");
        else htmlRef.removeAttribute("data-fullscreen");

        // Sidebar theme (for your own selectors)
        htmlRef.setAttribute("data-sidebar-theme", config.sidebarTheme);

        // Change flag
        if (JSON.stringify(config) !== JSON.stringify(defaultConfig)) htmlRef.setAttribute("data-changed", "");
        else htmlRef.removeAttribute("data-changed");

        // Direction
        htmlRef.dir = config.direction;
    }, [config, htmlRef]);

    const changeTheme = (theme: IConfig["theme"]) => updateConfig({ theme });
    const changeSidebarTheme = (sidebarTheme: IConfig["sidebarTheme"]) => updateConfig({ sidebarTheme });
    const changeDirection = (direction: IConfig["direction"]) => updateConfig({ direction });

    const toggleFullscreen = () => {
        if (document.fullscreenElement != null) {
            document.exitFullscreen();
        } else if (htmlRef) {
            htmlRef.requestFullscreen();
        }
        updateConfig({ fullscreen: !config.fullscreen });
    };

    const reset = () => {
        setConfig(defaultConfig);
        if (document.fullscreenElement != null) {
            document.exitFullscreen();
        }
    };

    return { config, reset, changeSidebarTheme, changeTheme, changeDirection, toggleFullscreen };
};

const ConfigContext = createContext({} as ReturnType<typeof useHook>);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    return <ConfigContext.Provider value={useHook()}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => useContext(ConfigContext);
