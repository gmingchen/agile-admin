export namespace Theme {

  export interface ThemeColor {
    primary: '',
    success: '',
    warning: '',
    danger: '',
    error: '',
    info: ''
  }

  export interface ThemeText {
    primary: '',
    regular: '',
    secondary: '',
    placeholder: '',
    disabled: ''
  }

  export interface ThemeMenu {
    backgroundColor: '',
    textColor: '',
    activeTextColor: ''
  }

  export interface Base {
    color: ThemeColor,
    text: ThemeText,
    menu: ThemeMenu
  }

  export interface Layout {
    navigationMode: number,
    contanierMode: number,
    panelMode: number,
    showTabs: boolean
  }
}
