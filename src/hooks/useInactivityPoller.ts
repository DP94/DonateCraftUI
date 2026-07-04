import { useCallback, useEffect, useRef, useState } from "react";

export interface UseInactivityPollerOptions {
    intervalMs: number;
    maxTicks: number;
}

/** Wrap fetchFn in useCallback to keep the interval stable across renders. */
export function useInactivityPoller(
    fetchFn: () => Promise<void>,
    { intervalMs, maxTicks }: UseInactivityPollerOptions,
) {
    const [initialLoading, setInitialLoading] = useState(true);
    const [showInactivityModal, setShowInactivityModal] = useState(false);
    const tickCountRef = useRef(0);

    const poll = useCallback(async () => {
        if (tickCountRef.current >= maxTicks) {
            setShowInactivityModal(true);
            return;
        }
        await fetchFn();
        tickCountRef.current += 1;
    }, [fetchFn, maxTicks]);

    useEffect(() => {
        poll().then(() => setInitialLoading(false));
        const timer = window.setInterval(poll, intervalMs);
        return () => window.clearInterval(timer);
    }, [poll, intervalMs]);

    const resetActivity = useCallback(() => {
        tickCountRef.current = 0;
    }, []);

    const onInactivityContinue = useCallback(async () => {
        resetActivity();
        setShowInactivityModal(false);
        await poll();
    }, [poll, resetActivity]);

    const toggleInactivityModal = useCallback(() => {
        setShowInactivityModal(v => !v);
    }, []);

    return {
        initialLoading,
        showInactivityModal,
        toggleInactivityModal,
        onInactivityContinue,
        resetActivity,
    };
}
