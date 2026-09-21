import type { Meta, StoryObj } from "@storybook/react"
import { useMemo, useState } from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableColumn,
} from "./table"

type LicensingRow = {
  id: string
  protocolo: string
  sei: string
  unidade: string
  empreendimento: string
  cpfCnpj: string
  municipio: string
  modalidade: string
}

const licensingRows: LicensingRow[] = [
  {
    id: "39546",
    protocolo: "7019992/2023",
    sei: "1370.01.0041699/2020-85",
    unidade: "DGR",
    empreendimento: "MINERACAO MORRO DO L.",
    cpfCnpj: "22.902.554/0001-17",
    municipio: "Belo Horizonte",
    modalidade: "Licenciamento",
  },
  {
    id: "27657",
    protocolo: "00047684/2010",
    sei: "1370.01.0041699/2020-85",
    unidade: "URA CM",
    empreendimento: "VISAO PARTICIPACOES S.A.",
    cpfCnpj: "22.902.554/0001-17",
    municipio: "Belo Horizonte",
    modalidade: "-",
  },
  {
    id: "27683",
    protocolo: "00867012/2010",
    sei: "1370.01.0041699/2020-85",
    unidade: "URA CM",
    empreendimento: "AVG MINERACAO S.A.",
    cpfCnpj: "22.902.554/0001-17",
    municipio: "Belo Horizonte",
    modalidade: "-",
  },
  {
    id: "27731",
    protocolo: "0000000/0000",
    sei: "1370.01.0041699/2020-85",
    unidade: "URA CM",
    empreendimento: "CLUBE DE VOO LIVRE D.A.",
    cpfCnpj: "22.902.554/0001-17",
    municipio: "Belo Horizonte",
    modalidade: "-",
  },
  {
    id: "27754",
    protocolo: "00237015/2014",
    sei: "1370.01.0041699/2020-85",
    unidade: "URA CM",
    empreendimento: "INSTITUTO INHOTIM",
    cpfCnpj: "22.902.554/0001-17",
    municipio: "Belo Horizonte",
    modalidade: "-",
  },
  {
    id: "27829",
    protocolo: "00041837/2010",
    sei: "1370.01.0041699/2020-85",
    unidade: "URA CM",
    empreendimento: "CONDOMINIO QUINTAS D.",
    cpfCnpj: "22.902.554/0001-17",
    municipio: "Belo Horizonte",
    modalidade: "-",
  },
]

const licensingColumns: Array<TableColumn> = [
  { key: "id", header: "ID" },
  { key: "protocolo", header: "Protocolo" },
  { key: "sei", header: "Nº SEI" },
  { key: "unidade", header: "Unidade" },
  { key: "empreendimento", header: "Empreendimento" },
  { key: "cpfCnpj", header: "CPF/CNPJ" },
  { key: "municipio", header: "Município" },
  { key: "modalidade", header: "Modalidade" },
]

const PaginatedDeclarativeTable = ({ caption }: { caption?: React.ReactNode }) => {
  const pageSizeOptions = [5, 10, 20]
  const [pageSize, setPageSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1)

  const totalItems = licensingRows.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const clampedPage = Math.min(page, totalPages)
  const from = totalItems === 0 ? 0 : (clampedPage - 1) * pageSize + 1
  const to = Math.min(clampedPage * pageSize, totalItems)
  const visibleRows = useMemo(
    () => licensingRows.slice((clampedPage - 1) * pageSize, clampedPage * pageSize),
    [clampedPage, pageSize]
  )
  const canGoPrev = clampedPage > 1
  const canGoNext = clampedPage < totalPages

  return (
    <div className="space-y-3">
      <Table className="min-w-270" caption={caption} columns={licensingColumns} rows={visibleRows} rowKey="id" />

      <div className="flex items-center justify-end gap-4 px-1">
        <label className="inline-flex items-center gap-2 text-label-m text-foreground">
          <span className="text-label-m">Registros por Página</span>
          <select
            aria-label="Registros por página"
            className="h-7 rounded-sm border border-border bg-background px-2 text-foreground"
            value={pageSize}
            onChange={(event) => {
              const nextSize = Number(event.target.value)
              setPageSize(nextSize)
              setPage(1)
            }}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <span className="text-body-s text-muted-foreground">{`${from} - ${to} de ${totalItems}`}</span>

        <div className="inline-flex items-center gap-3 text-foreground">
          <button
            className={canGoPrev ? "" : "opacity-40"}
            type="button"
            aria-label="Primeira página"
            disabled={!canGoPrev}
            onClick={() => setPage(1)}
          >
            «
          </button>
          <button
            className={canGoPrev ? "" : "opacity-40"}
            type="button"
            aria-label="Página anterior"
            disabled={!canGoPrev}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            ‹
          </button>
          <button
            className={canGoNext ? "" : "opacity-40"}
            type="button"
            aria-label="Próxima página"
            disabled={!canGoNext}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          >
            ›
          </button>
          <button
            className={canGoNext ? "" : "opacity-40"}
            type="button"
            aria-label="Última página"
            disabled={!canGoNext}
            onClick={() => setPage(totalPages)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  )
}

const PaginatedAdvancedTable = () => {
  const pageSizeOptions = [5, 10, 20]
  const [pageSize, setPageSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1)

  const totalItems = licensingRows.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const clampedPage = Math.min(page, totalPages)
  const from = totalItems === 0 ? 0 : (clampedPage - 1) * pageSize + 1
  const to = Math.min(clampedPage * pageSize, totalItems)
  const visibleRows = useMemo(
    () => licensingRows.slice((clampedPage - 1) * pageSize, clampedPage * pageSize),
    [clampedPage, pageSize]
  )
  const canGoPrev = clampedPage > 1
  const canGoNext = clampedPage < totalPages

  return (
    <div className="space-y-3">
      <Table className="min-w-270">
        <TableHeader>
          <TableRow>
            {licensingColumns.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.protocolo}</TableCell>
              <TableCell>{row.sei}</TableCell>
              <TableCell>{row.unidade}</TableCell>
              <TableCell>{row.empreendimento}</TableCell>
              <TableCell>{row.cpfCnpj}</TableCell>
              <TableCell>{row.municipio}</TableCell>
              <TableCell>{row.modalidade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end gap-4 px-1">
        <label className="inline-flex items-center gap-2 text-label-m text-foreground">
          <span className="text-label-m">Registros por Página</span>
          <select
            aria-label="Registros por página"
            className="h-7 rounded-sm border border-border bg-background px-2 text-foreground"
            value={pageSize}
            onChange={(event) => {
              const nextSize = Number(event.target.value)
              setPageSize(nextSize)
              setPage(1)
            }}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <span className="text-body-s text-muted-foreground">{`${from} - ${to} de ${totalItems}`}</span>

        <div className="inline-flex items-center gap-3 text-foreground">
          <button
            className={canGoPrev ? "" : "opacity-40"}
            type="button"
            aria-label="Primeira página"
            disabled={!canGoPrev}
            onClick={() => setPage(1)}
          >
            «
          </button>
          <button
            className={canGoPrev ? "" : "opacity-40"}
            type="button"
            aria-label="Página anterior"
            disabled={!canGoPrev}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            ‹
          </button>
          <button
            className={canGoNext ? "" : "opacity-40"}
            type="button"
            aria-label="Próxima página"
            disabled={!canGoNext}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          >
            ›
          </button>
          <button
            className={canGoNext ? "" : "opacity-40"}
            type="button"
            aria-label="Última página"
            disabled={!canGoNext}
            onClick={() => setPage(totalPages)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof Table> = {
  title: "Componentes/Table",
  component: Table,
}

export default meta
type Story = StoryObj<typeof Table>

export const Playground: Story = {
  render: () => <PaginatedDeclarativeTable />,
}

export const WithCaption: Story = {
  render: () => <PaginatedDeclarativeTable caption={<TableCaption className="sr-only">Tabela de licenças ambientais</TableCaption>} />,
}

export const Striped: Story = {
  render: () => <PaginatedDeclarativeTable />,
}

export const ComposicaoAvancada: Story = {
  name: "Composição avançada (escape hatch)",
  render: () => <PaginatedAdvancedTable />,
}
