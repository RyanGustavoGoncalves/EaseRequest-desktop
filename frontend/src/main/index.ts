import { app, shell, BrowserWindow, ipcMain, screen, Menu } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/iconList.ico?asset'

function createMenu() {
  const template = [
    {
      label: 'New',
      submenu: [
        {
          label: 'New request'
        },
      ],
    },
    {
      label: 'Settings',
      submenu: [
        {
          label: "Account",
        },
        {
          label: "Request settings",
        },
        {
          label: "Logout",
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}


function createWindow(): void {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1250,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    icon: icon,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
    }
  })

  // Calculate the position of the window in the center of the screen
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

  // Calcule a posição da janela no centro da tela
  const x = Math.round((screenWidth - mainWindow.getSize()[0]) / 2);
  const y = Math.round((screenHeight - mainWindow.getSize()[1]) / 2);

  // Defina a posição da janela
  mainWindow.setPosition(x, y);


  ipcMain.on('update-is-login-or-register', (event, arg) => {
    // Atualize a variável isAuthenticated com o valor recebido
    const isAuthenticated: boolean = arg;

    if (!isAuthenticated) {
      const menu = Menu.buildFromTemplate([]);
      Menu.setApplicationMenu(menu);
      mainWindow.setResizable(false);
    } else {

      createMenu();
      mainWindow.setResizable(true);
      mainWindow.maximize();
    }
  });


  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })


  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
