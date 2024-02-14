import { remote } from 'electron';

const menu = new remote.Menu();

menu.append(
  new remote.MenuItem({
    label: 'Minimizar',
    click: () => {
      const mainWindow = remote.getCurrentWindow();
      mainWindow.minimize();
    },
    accelerator: 'CmdOrCtrl+M',
  }),
  new remote.MenuItem({
    label: 'Maximizar',
    click: () => {
      const mainWindow = remote.getCurrentWindow();
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    },
    accelerator: 'CmdOrCtrl+X',
  }),
  new remote.MenuItem({
    label: 'Fechar',
    click: () => {
      const mainWindow = remote.getCurrentWindow();
      mainWindow.close();
    },
    accelerator: 'CmdOrCtrl+Q',
  })
);

remote.setMenu(menu);