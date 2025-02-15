import { useEffect, useState } from "react"

/**
 * A component that animates children in and out with a height transition
 * @param {Object} props
 * @param {boolean} [props.restartOnChildKeyChange=false] - If true, will close and reopen the component when the key of the child changes
 * @param {"vertical" | "horizontal" | "both"} [props.direction="vertical"] - The direction of the transition
 * @param {string} [props.hiddenClassName=""] - Optional styling for the hidden state of the component (e.g. '-mt-4')
 * @param {boolean} [props.disableOverflowSpace=false] - If true, will not add margin and padding to the component
 * @param {boolean} [props.animateOnMount=false] - If true, will animate in on mount
 * @param {string} [props.className=""] - Optional styling for the component
 * @param {JSX.Element} props.children - The children to animate
 * @returns {JSX.Element | null} The animated component
 */
export default function AnimateInOut({ restartOnChildKeyChange = false, direction = "vertical", hiddenClassName = '', disableOverflowSpace = false, animateOnMount = false, className = "", children }) {
    const [isHiding, setIsHiding] = useState(animateOnMount)
    const [childrenCache, setChildrenCache] = useState(children)

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
            }, 300)
        } else if (children) {
            setIsHiding(false)
            setChildrenCache(children)
        } else {
            setIsHiding(true)
        }

        clearCacheTimeout = setTimeout(() => {
            setChildrenCache(children)
        }, 300)

        return () => {
            clearTimeout(clearCacheTimeout)
            clearTimeout(newChildrenTimeout)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, childrenCache])

    if (!children && !childrenCache) return null

    const hiddenSizes = {
        vertical: 'h-0 py-0 my-0',
        horizontal: 'w-0 px-0 mx-0',
        both: 'h-0 w-0 p-0 p-0'
    }

    const shownSizes = {
        vertical: 'h-auto',
        horizontal: 'w-[calc-size(auto,size)]',
        both: 'h-auto w-auto'
    }

    return (
        <div className={`${className} ${isHiding ? `${hiddenSizes[direction] || hiddenSizes['vertical']} opacity-0 ${hiddenClassName}` : `${shownSizes[direction] || shownSizes['vertical']} opacity-100`} transition-[height,width,padding,margin,opacity] duration-[300ms] overflow-hidden ${disableOverflowSpace ? '' : '-m-2 p-2'}`}>
            {!isHiding && children ? (restartOnChildKeyChange ? childrenCache : children) : childrenCache}
        </div>
    )
}