"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"

import { cn } from "../../../utils/cn"
import { Button } from "../button"
import { Icon } from "../icon"

type CarouselApi = UseEmblaCarouselType[1]
type CarouselApiInstance = NonNullable<CarouselApi>
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  /** Declarative slides API (recommended). */
  items?: React.ReactNode[]
  /** Show previous/next controls in declarative mode. */
  showControls?: boolean
  /** Enables page indicators (dots). */
  showPagination?: boolean
  /**
   * Pagination behavior:
   * - default: classic carousel (one slide per item)
   * - eco-ui: groups items into pages and shows "Mostrando X a Y de Z"
   */
  paginationRule?: "default" | "eco-ui"
  /** Number of items per page in eco-ui pagination mode. */
  itemsPerPage?: number
  /** Number of visible items per view in default mode. Use "auto" for responsive calculation. */
  itemsPerView?: "auto" | 1 | 2 | 3 | 4
  /** Optional total amount for summary text (useful with server pagination). */
  totalItems?: number
  /** Suffix used in the summary text (e.g. "reuniões", "itens"). */
  summaryItemLabel?: string
  /** Shows "Mostrando X a Y de Z ..." summary line. */
  showSummary?: boolean
  /** Additional class for generated page grid in eco-ui pagination mode. */
  pageGridClassName?: string
  /** Additional class for generated content wrapper in declarative mode. */
  contentClassName?: string
  /** Additional class for generated items in declarative mode. */
  itemClassName?: string
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      items,
      showControls = true,
      showPagination = true,
      paginationRule = "default",
      itemsPerPage = 8,
      itemsPerView = "auto",
      totalItems,
      summaryItemLabel = "itens",
      showSummary = true,
      pageGridClassName,
      contentClassName,
      itemClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical"
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        align: opts?.align ?? "start",
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [snapCount, setSnapCount] = React.useState(0)

    const getAutoVisibleCount = React.useCallback(
      (api: CarouselApiInstance) => {
        const view = api.rootNode().ownerDocument.defaultView
        const viewportWidth = view?.innerWidth ?? 0

        if (viewportWidth >= 1024) return 4
        if (viewportWidth >= 640) return 2
        return 1
      },
      []
    )

    const [autoVisibleCount, setAutoVisibleCount] = React.useState(1)
    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
      setSelectedIndex(api.selectedScrollSnap())
      setSnapCount(api.scrollSnapList().length)
      setAutoVisibleCount(getAutoVisibleCount(api))
    }, [getAutoVisibleCount])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("reInit", onSelect)
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    React.useEffect(() => {
      if (!api) return

      const update = () => setAutoVisibleCount(getAutoVisibleCount(api))
      update()

      const rootNode = api.rootNode()
      const firstSlide = api.slideNodes()[0]
      const observer = new ResizeObserver(update)
      observer.observe(rootNode)
      if (firstSlide) observer.observe(firstSlide)

      return () => observer.disconnect()
    }, [api, getAutoVisibleCount])

    const hasCustomChildren = children != null
    const usesEcoUiPagination = paginationRule === "eco-ui" && !hasCustomChildren
    const safeItemsPerPage = Math.max(1, itemsPerPage)
    const resolvedItems = items ?? []
    const pageCount = usesEcoUiPagination
      ? Math.max(1, Math.ceil(resolvedItems.length / safeItemsPerPage))
      : resolvedItems.length
    const groupedItems = React.useMemo(() => {
      if (!usesEcoUiPagination) {
        return resolvedItems.map((item) => [item])
      }

      const pages: React.ReactNode[][] = []
      for (let i = 0; i < resolvedItems.length; i += safeItemsPerPage) {
        pages.push(resolvedItems.slice(i, i + safeItemsPerPage))
      }

      return pages.length > 0 ? pages : [[]]
    }, [usesEcoUiPagination, resolvedItems, safeItemsPerPage])
    const shouldShowPagination =
      !isVertical && !hasCustomChildren && (showPagination || usesEcoUiPagination)
    const summaryTotal = totalItems ?? resolvedItems.length
    const maxSummaryIndex = Math.max(0, summaryTotal - 1)
    const safeEcoIndex = Math.min(
      selectedIndex,
      Math.max(0, Math.ceil(summaryTotal / safeItemsPerPage) - 1)
    )
    const ecoRangeStart =
      summaryTotal === 0 ? 0 : safeEcoIndex * safeItemsPerPage + 1
    const ecoRangeEnd = Math.min((safeEcoIndex + 1) * safeItemsPerPage, summaryTotal)
    const effectiveVisibleCount = itemsPerView === "auto" ? autoVisibleCount : itemsPerView
    const defaultStartIndex = Math.max(0, Math.min(selectedIndex, maxSummaryIndex))
    const defaultEndIndex = Math.max(
      defaultStartIndex,
      Math.min(defaultStartIndex + effectiveVisibleCount - 1, maxSummaryIndex)
    )
    const defaultRangeStart = summaryTotal === 0 ? 0 : defaultStartIndex + 1
    const defaultRangeEnd = summaryTotal === 0 ? 0 : defaultEndIndex + 1
    const rangeStart = usesEcoUiPagination ? ecoRangeStart : defaultRangeStart
    const rangeEnd = usesEcoUiPagination ? ecoRangeEnd : defaultRangeEnd
    const itemsPerViewClass =
      itemsPerView === "auto"
        ? "basis-full sm:basis-1/2 lg:basis-1/4"
        : itemsPerView === 1
        ? "basis-full"
        : itemsPerView === 2
          ? "basis-1/2"
          : itemsPerView === 3
            ? "basis-1/3"
            : "basis-1/4"
    const paginationLength = usesEcoUiPagination
      ? Math.max(1, pageCount)
      : Math.max(1, Math.ceil(summaryTotal / effectiveVisibleCount))
    const activePaginationIndex = usesEcoUiPagination
      ? Math.min(selectedIndex, Math.max(0, paginationLength - 1))
      : Math.min(
          Math.floor(selectedIndex / effectiveVisibleCount),
          Math.max(0, paginationLength - 1)
        )
    const scrollToPaginationIndex = React.useCallback(
      (index: number) => {
        if (!api) return
        if (usesEcoUiPagination) {
          api.scrollTo(index)
          return
        }
        api.scrollTo(index * effectiveVisibleCount)
      },
      [api, usesEcoUiPagination, effectiveVisibleCount]
    )

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {hasCustomChildren ? (
            children
          ) : (
            <>
              {showControls && !isVertical ? (
                <div className="mb-4 mt-1 flex w-full items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-primary text-primary hover:text-primary focus-visible:ring-primary active:border-primary"
                    disabled={!canScrollPrev}
                    onClick={scrollPrev}
                    aria-label="Previous slide"
                  >
                    <Icon name="chevron-left" size="sm" aria-hidden />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-primary text-primary hover:text-primary focus-visible:ring-primary active:border-primary"
                    disabled={!canScrollNext}
                    onClick={scrollNext}
                    aria-label="Next slide"
                  >
                    <Icon name="chevron-right" size="sm" aria-hidden />
                  </Button>
                </div>
              ) : null}
              <CarouselContent className={contentClassName}>
                {usesEcoUiPagination
                  ? groupedItems.map((pageItems, pageIndex) => (
                      <CarouselItem key={`carousel-page-${pageIndex}`} className={itemClassName}>
                        <div
                          className={cn(
                            "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
                            pageGridClassName
                          )}
                        >
                          {pageItems.map((item, itemIndex) => (
                            <div key={`carousel-page-item-${pageIndex}-${itemIndex}`}>{item}</div>
                          ))}
                        </div>
                      </CarouselItem>
                    ))
                  : resolvedItems.map((item, index) => (
                      <CarouselItem
                        key={`carousel-item-${index}`}
                        className={cn(itemsPerViewClass, itemClassName)}
                      >
                        {item}
                      </CarouselItem>
                    ))}
              </CarouselContent>
              {shouldShowPagination ? (
                <div
                  className={cn(
                    "mt-4 grid items-center gap-4",
                    showSummary
                      ? "grid-cols-[1fr_auto_1fr]"
                      : "grid-cols-1 justify-items-center"
                  )}
                >
                  <div className={showSummary ? "justify-self-start" : "hidden"} />
                  <div className="flex items-center gap-2 justify-self-center">
                    {Array.from({ length: paginationLength }).map((_, index) => (
                      <button
                        key={`carousel-dot-${index}`}
                        type="button"
                        onClick={() => scrollToPaginationIndex(index)}
                        className={cn(
                          "size-2 rounded-full transition-colors",
                          index === activePaginationIndex ? "bg-primary" : "bg-border hover:bg-muted-foreground"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === activePaginationIndex ? "true" : undefined}
                      />
                    ))}
                  </div>
                  {showSummary && !isVertical ? (
                    <span className="justify-self-end text-meta-xs text-muted-foreground">
                      Mostrando {rangeStart} a {rangeEnd} de {summaryTotal} {summaryItemLabel}.
                    </span>
                  ) : null}
                </div>
              ) : null}
            </>
          )}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "h-8 w-8 rounded-full border-primary text-primary hover:text-primary focus-visible:ring-primary active:border-primary",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <Icon name="chevron-left" size="sm" aria-hidden />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "h-8 w-8 rounded-full border-primary text-primary hover:text-primary focus-visible:ring-primary active:border-primary",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <Icon name="chevron-right" size="sm" aria-hidden />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  type CarouselProps,
  type CarouselOptions,
  type CarouselPlugin,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
