import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors'; // Material UI が 提供 する グレー палитра を インポート

// ライトテーマ
const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FFC107',
    },
    background: {
      default: '#F0F2F5',
      paper: '#fff',
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
    },
    mode: 'light', // ライトモード を 指定
  },
});

// ダークテーマ
const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#90caf9', // светло оттенki の 青色
    },
    secondary: {
      main: '#a5d6a7', // светло оттенki の 緑色
    },
    warning: {
      main: '#ffd740', // светло оттенki の 黄色
    },
    background: {
      default: '#121212', // очень 濃い灰色
      paper: grey[900],   // ダークモード の 紙 компонент 背景色 は Material UI が 提供 する グレー палитра から 選択
    },
    text: {
      primary: '#fff',    // 白色
      secondary: '#cccccc', // светло оттенki の 灰色
    },
    mode: 'dark',  // ダークモード を 指定
  },
});

export { lightTheme, darkTheme }; // ライトテーマ と ダークテーマ を エクスポート