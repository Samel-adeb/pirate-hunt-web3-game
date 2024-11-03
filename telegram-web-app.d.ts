// telegram-web-app.d.ts
declare global {
    interface Window {
        Telegram: {
            WebView: any;
            WebApp: {
                initData: string;
                initDataUnsafe: object;
                version: string;
                platform: string;
                colorScheme: string;
                themeParams: object;
                isExpanded: boolean;
                viewportHeight: number;
                viewportStableHeight: number;
                headerColor: string;
                backgroundColor: string;
                BackButton: {
                    isVisible: boolean;
                    show: () => void;
                    hide: () => void;
                    onClick: (callback: () => void) => void;
                    offClick: () => void
                };
                shareToStory: (
                    media_url: string,
                    params?: {
                        text?: string;
                        widget_link?: { url: string; text: string };
                    }
                ) => void;
                // Add other Telegram WebApp methods here if needed
            };
        };
    }
}

export {};
