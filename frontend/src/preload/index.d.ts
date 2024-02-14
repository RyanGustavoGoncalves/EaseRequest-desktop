import { ElectronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    ipcRenderer: typeof ipcRenderer
  }
}

(window as any).ipcRenderer = ipcRenderer;