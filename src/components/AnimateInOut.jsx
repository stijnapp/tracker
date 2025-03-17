import { useEffect, useState } from 'react'

/**
 * A component that animates children in and out with a height transition
 * @param {Object} props
 * @param {"vertical" | "horizontal" | "both"} [props.direction="vertical"] - The direction of the transition
 * @param {boolean} [props.animateOnMount=false] - If true, will animate in on mount
 * @param {boolean} [props.restartOnIdChange=false] - If true, will close and reopen the component when the contentId changes
 * @param {string} [props.contentId=null] - The ID to watch for changes
 * @param {boolean} [props.disableOverflowSpace=false] - If true, will not add margin and padding to the component
 * @param {string} [props.hiddenClassName=""] - Optional styling for the hidden state of the component (e.g. '-mt-4')
 * @param {string} [props.className=""] - Optional styling for the component
 * @param {JSX.Element} props.children - The children to animate
 * @returns {JSX.Element | null} The animated component
 */
export default function AnimateInOut({ direction = "vertical", animateOnMount = false, restartOnIdChange = false, contentId = null, disableOverflowSpace = false, hiddenClassName = '', className = "", children }) {
    const [isHiding, setIsHiding] = useState(animateOnMount)
    const [childrenCache, setChildrenCache] = useState(children)
    const [contentIdCache, setContentIdCache] = useState(contentId)

    useEffect(() => {
        let resetCacheTimeout
        let newChildrenAnimationTimeout

        if (restartOnIdChange && children && childrenCache && contentId !== contentIdCache) {
            setIsHiding(true)
            setContentIdCache(contentId)

            newChildrenAnimationTimeout = setTimeout(() => {
                setIsHiding(false)
            }, 300)
        } else if (children) {
            setIsHiding(false)
            setChildrenCache(children)
        } else {
            setIsHiding(true)
            setContentIdCache(contentId)
        }

        resetCacheTimeout = setTimeout(() => {
            setChildrenCache(children)
        }, 300)

        return () => {
            clearTimeout(resetCacheTimeout)
            clearTimeout(newChildrenAnimationTimeout)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, contentId])

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
        <div className={`${className} ${isHiding ? `${hiddenSizes[direction] || hiddenSizes['vertical']} opacity-0 ${hiddenClassName}` : `${shownSizes[direction] || shownSizes['vertical']} opacity-100`} motion-safe:transition-[height,width,padding,margin,opacity] motion-safe:duration-[300ms] overflow-hidden ${disableOverflowSpace ? '' : '-m-2 p-2'}`}>
            {!isHiding && children ? (restartOnIdChange ? childrenCache : children) : childrenCache}
        </div>
    )
}