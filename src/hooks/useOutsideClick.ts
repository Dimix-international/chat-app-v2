import {useEffect, useRef} from "react";

export const useClickOutside = (handler: () => void) => {
    //закрываем меню при клике снаружи
    const nodeDomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const maybeHandler = (e: MouseEvent) => {
            if (!nodeDomRef.current?.contains((e.target) as Node | null))
                handler();
        }

        document.addEventListener('click', maybeHandler, true);

        return () => {
            document.removeEventListener('click', maybeHandler, true);
        }
    })

    return nodeDomRef
}