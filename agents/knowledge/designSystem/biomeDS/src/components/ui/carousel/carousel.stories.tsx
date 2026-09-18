import type { Meta, StoryObj } from "@storybook/react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"
import { Button } from "../button"

const meta: Meta<typeof Carousel> = {
  title: "Componentes/Carousel",
  component: Carousel,
  tags: [],
}

export default meta

type Story = StoryObj<typeof Carousel>

const meetingItems = Array.from({ length: 23 }).map((_, index) => ({
  id: index + 1,
  title: `Reunião ${String(index + 1).padStart(2, "0")}`,
  council: "Conselho Ambiental",
  date: "31/12/2026",
  location: "Belo Horizonte",
}))

const renderMeetingCard = (item: (typeof meetingItems)[number]) => (
  <div key={item.id} className="rounded-xl border bg-card p-4 shadow-sm">
    <div className="space-y-3">
      <p className="text-body-s text-foreground">{item.title}</p>
      <span className="inline-flex rounded-sm bg-muted px-2 py-1 text-meta-2xs text-muted-foreground">
        {item.council}
      </span>
      <small className="block text-meta-xs text-muted-foreground">
        {item.date} · {item.location}
      </small>
      <Button size="sm" variant="outline" className="w-full">
        Ver detalhes
      </Button>
    </div>
  </div>
)

export const Playground: Story = {
  args: {
    className: "w-full",
    items: meetingItems.map(renderMeetingCard),
    showControls: true,
    showPagination: true,
    showSummary: true,
    summaryItemLabel: "reuniões",
  },
}

export const WithPagination: Story = {
  args: {
    className: "w-full",
    items: meetingItems.slice(0, 12).map(renderMeetingCard),
    showControls: true,
    showPagination: true,
    showSummary: true,
    summaryItemLabel: "reuniões",
  },
}

export const WithControls: Story = {
  render: () => (
    <Carousel className="w-full">
      <div className="mb-4 flex w-full items-center justify-end gap-2">
        <CarouselPrevious />
        <CarouselNext />
      </div>
      <CarouselContent>
        {meetingItems.slice(0, 8).map((item) => (
          <CarouselItem key={item.id} className="basis-full sm:basis-1/2 lg:basis-1/4">
            {renderMeetingCard(item)}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    opts: { axis: "y" },
    className: "w-full max-w-sm",
    items: meetingItems.slice(0, 8).map(renderMeetingCard),
    showControls: false,
    showPagination: false,
    showSummary: false,
    summaryItemLabel: "reuniões",
  },
}

export const EcoUiRule: Story = {
  name: "Regra eco-ui (paginação por página)",
  args: {
    className: "w-full",
    paginationRule: "eco-ui",
    itemsPerPage: 8,
    summaryItemLabel: "reuniões",
    showControls: true,
    items: meetingItems.map(renderMeetingCard),
  },
}

export const ComposicaoAvancada: Story = {
  name: "Composição avançada (escape hatch)",
  render: () => (
    <Carousel className="w-full">
      <div className="mb-4 flex w-full items-center justify-end gap-2">
        <CarouselPrevious />
        <CarouselNext />
      </div>
      <CarouselContent>
        {meetingItems.slice(0, 4).map((item) => (
          <CarouselItem key={item.id} className="basis-full sm:basis-1/2 lg:basis-1/4">
            {renderMeetingCard(item)}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  ),
}
