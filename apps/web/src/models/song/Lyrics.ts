export interface Lyrics {
  parts: LyricsPart[]
}

export interface LyricsPart {
  type: LyricsPartType
  lyrics: string[]
}

export type LyricsPartType = 'verse' | 'chorus' | 'preChorus' | 'bridge'
