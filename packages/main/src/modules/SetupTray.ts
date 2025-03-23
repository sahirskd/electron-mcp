
import { app, Menu, Tray } from 'electron';

let tray;
function setupTray(mainWindow: Electron.BrowserWindow) {
    tray = new Tray('buildResources/favicon.png');

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open App',
            click: () => mainWindow.show()
        },
        {
            type: 'separator'
        },
        {
            label: 'Local Servers',
            submenu: [
                {
                    label: 'Show Server Dashboard',
                    click: () => {
                        mainWindow.show();
                        mainWindow.webContents.send('navigate', 'servers');
                    }
                },
                {
                    type: 'separator'
                },
                // Dynamic server list will be updated later
                {
                    label: 'No servers running',
                    enabled: false
                }
            ]
        },
        {
            type: 'separator'
        },
        {
            label: 'Quit',
            click: () => {
                // app.isQuitting = true;
                app.quit();
            }
        }
    ]);

    tray.setToolTip('AI Assistant');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
}

export default setupTray;
