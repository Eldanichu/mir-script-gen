export class WindowAction {
  constructor(win, action) {
    this.win = win;
    this.action = action
  }

  invoke() {
    if (!this.action.window_action) return;
    let _act = this.action.window_action;
    let _win_state = 'normal';
    if (_act === 'minimize') {
      this.win.minimize()
      _win_state = 'minimized'
    } else if (_act === 'restore') {
      if (this.win.isMaximized()) {
        this.win.unmaximize();
        _win_state = 'unmaximize'
      } else {
        this.win.maximize()
        _win_state = 'maximize'
      }
    } else if (_act === 'destroy') {
      _win_state = 'destroy'
      this.win.destroy();
    }

    return _win_state;
  }
}
