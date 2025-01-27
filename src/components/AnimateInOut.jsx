import { useEffect, useState } from "react"
import { getMsFromDuration } from "../helpers/stringManipulation"

export default function AnimateInOut({ className = "", restartAnimationOnChange = false, children }) {
    const [isHiding, setIsHiding] = useState(true)
    const [childrenCache, setChildrenCache] = useState(children)
    const duration = 'duration-[300ms]'

    useEffect(() => {
        let clearCacheTimeout
        let newChildrenTimeout

        if (restartAnimationOnChange && children && childrenCache && children !== childrenCache) {
            setIsHiding(true)

            newChildrenTimeout = setTimeout(() => {
                setChildrenCache(children)
            }, getMsFromDuration(duration))
        } else if (children) {
            setIsHiding(false)
            setChildrenCache(children)
        } else {
            setIsHiding(true)
        }

        clearCacheTimeout = setTimeout(() => {
            setChildrenCache(children)
        }, getMsFromDuration(duration))

        return () => {
            clearTimeout(clearCacheTimeout)
            clearTimeout(newChildrenTimeout)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, childrenCache])

    if (!children && !childrenCache) return null

    return (
        <div className={`${className} ${isHiding ? 'h-0 opacity-0 ease-in' : 'h-auto opacity-100 ease-out'} transition-[opacity,height,max-height] ${duration} overflow-hidden`}>
            {childrenCache}
        </div>
    )
}