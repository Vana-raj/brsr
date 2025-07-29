declare module 'aos' {
    interface AosOptions {
        offset?: number;
        delay?: number;
        duration?: number;
        easing?: string;
        once?: boolean;
        mirror?: boolean;
        anchorPlacement?: string;
        disable?: 'phone' | 'tablet' | 'mobile' | boolean | (() => boolean);
        startEvent?: string;
        initClassName?: string;
        animatedClassName?: string;
        useClassNames?: boolean;
        disableMutationObserver?: boolean;
        debounceDelay?: number;
        throttleDelay?: number;
    }

    const AOS: {
        init(options?: AosOptions): void;
        refresh(): void;
        refreshHard(): void;
        init(): void;
    };

    export default AOS;
}
