import {app, BrowserWindow, ipcMain} from "electron";
import {WindowAction} from "@/background/events/actions/windowAction";


ipcMain.on('toMain', (e, args) => {
  app.whenReady().then(async () => {
    let win = BrowserWindow.getAllWindows()[0]
    let context = win.webContents;
    let win_state = new WindowAction(win, args).invoke();
    context.send('WIN_STATE',win_state)
  })
})
