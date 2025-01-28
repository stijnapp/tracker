import { useEffect, useState } from "react"
import { getMsFromDuration } from "../helpers/stringManipulation"

/**
 * @param {{
 *  className?: string,
 *  restartOnChildKeyChange?: boolean, // If true, will close and reopen the component when the key of the children changes
 *  key?: string | number, // A react key that is required for `restartOnChildKeyChange`
 *  children: JSX.Element | JSX.Element[]
 * }} props
 * @returns {JSX.Element | null}
 */
export default function AnimateInOut({ className = "", restartOnChildKeyChange = false, children }) {
    const [isHiding, setIsHiding] = useState(true)
    const [childrenCache, setChildrenCache] = useState(children)
    // ? `duration` needs to be tailwind duration, e.g. 'duration-[300ms]'
    const duration = 'duration-[300ms]'

    if (restartOnChildKeyChange && children?.key === null) {
        console.error('AnimateInOut component requires a unique key prop on children when using restartOnChildKeyChange', children)
    }

    useEffect(() => {
        let clearCacheTimeout
        let newChildrenTimeout

        if (restartOnChildKeyChange && children && childrenCache && children.key !== childrenCache.key) {
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