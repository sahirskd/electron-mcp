import type {AppModule} from '../AppModule.js';
import {ModuleContext} from '../ModuleContext.js';
import {BrowserWindow} from 'electron';
import type {AppInitConfig} from '../AppInitConfig.js';
import store from './AppStore.js';
import setupTray from './SetupTray.js';

class WindowManager implements AppModule {
  readonly #preload: {path: string};
  readonly #renderer: {path: string} | URL;
  readonly #openDevTools;

  constructor({initConfig, openDevTools = false}: {initConfig: AppInitConfig, openDevTools?: boolean}) {
    this.#preload = initConfig.preload;
    this.#renderer = initConfig.renderer;
    this.#openDevTools = openDevTools;
  }

  async enable({app}: ModuleContext): Promise<void> {
    await app.whenReady();
    const window = await this.restoreOrCreateWindow(true);
    setupTray(window);
    app.on('second-instance', () => this.restoreOrCreateWindow(true));
    app.on('activate', () => this.restoreOrCreateWindow(true));
  }

  async createWindow(): Promise<BrowserWindow> {
    const { width, height } = store.get('window.bounds', { width: 1200, height: 800 });

    const browserWindow = new BrowserWindow({
      show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
      width,
      height,
      minWidth: 800,
      minHeight: 600,
      icon: "../buildResources/icon.png",
      titleBarStyle: 'hiddenInset', // Mac-style title bar
      backgroundColor: '#ffffff',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
        webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
        preload: this.#preload.path,
        // webSecurity: false,
      },
    });

    function upsertKeyValue(obj:any, keyToChange:string, value:any) {
      const keyToChangeLower = keyToChange.toLowerCase();
      for (const key of Object.keys(obj)) {
        if (key.toLowerCase() === keyToChangeLower) {
          // Reassign old key
          obj[key] = value;
          // Done
          return;
        }
      }
      // Insert at end instead
      obj[keyToChange] = value;
    }

    browserWindow.webContents.session.webRequest.onBeforeSendHeaders(
      (details, callback) => {
        const { requestHeaders } = details;
        upsertKeyValue(requestHeaders, "Access-Control-Allow-Origin", ["*"]);
        callback({ requestHeaders });
      }
    );

    browserWindow.webContents.session.webRequest.onHeadersReceived(
      (details, callback) => {
        const { responseHeaders } = details;
        upsertKeyValue(responseHeaders, "Access-Control-Allow-Origin", ["*"]);
        upsertKeyValue(responseHeaders, "Access-Control-Allow-Headers", ["*"]);
        callback({
          responseHeaders,
        });
      }
    );

    if (this.#renderer instanceof URL) {
      await browserWindow.loadURL(this.#renderer.href);
    } else {
      await browserWindow.loadFile(this.#renderer.path);
    }

    return browserWindow;
  }

  async restoreOrCreateWindow(show = false) {
    let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

    if (window === undefined) {
      window = await this.createWindow();
    }

    window.on('resize', () => {
      store.set('window.bounds', window.getBounds());
    });

    window.on('move', () => {
      store.set('window.bounds', window.getBounds());
    });

    if (!show) {
      return window;
    }

    if (window.isMinimized()) {
      window.restore();
    }

    window?.show();

    if (this.#openDevTools) {
      window?.webContents.openDevTools();
    }

    window.focus();

    return window;
  }

}

export function createWindowManagerModule(...args: ConstructorParameters<typeof WindowManager>) {
  return new WindowManager(...args);
}
