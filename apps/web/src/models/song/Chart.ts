import { Key } from './Key'

export type ChartType = 'chordChart' | 'leadSheet'
export const allChartTypes: ChartType[] = ['chordChart', 'leadSheet']

export const chartTypeInfo: Record<ChartType, { name: string }> = {
  chordChart: {
    name: 'Chord chart',
  },
  leadSheet: {
    name: 'Lead sheet',
  },
}

export interface Chart {
  key: Key
  url: string
  type: ChartType
}
