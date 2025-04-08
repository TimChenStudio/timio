# 從零開始建置 Next.js 專案

## 前置需求

- Node.js 環境（建議版本 >= 18.18.0）
- 包管理工具（npm/yarn/pnpm）
- 程式碼編輯器（VS Code/WebStorm 等）

## 步驟一：環境設定

### 1. 檢查 Node.js 版本

```bash
node -v
```

如果版本不符合要求，建議使用 nvm 管理 Node.js 版本：

```bash
# 安裝 nvm（如果還沒安裝）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 安裝並使用指定版本的 Node.js
nvm install 20
nvm use 20
```

## 步驟二：建立專案

### 1. 使用 create-next-app 建立專案

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

參數說明：

- `--typescript`: 啟用 TypeScript 支援
- `--tailwind`: 安裝並設定 Tailwind CSS
- `--eslint`: 安裝並設定 ESLint
- `--app`: 使用 App Router（新的路由系統）
- `--src-dir`: 將源碼放在 src 目錄下
- `--import-alias`: 設定 import 別名

### 2. 專案結構說明

```
your-project/
├── src/
│   ├── app/                 # 應用程式主要程式碼
│   │   ├── layout.tsx      # 根佈局
│   │   ├── page.tsx        # 首頁
│   │   └── globals.css     # 全域樣式
│   └── components/         # 可重用元件
├── public/                 # 靜態資源
├── next.config.js         # Next.js 設定
├── tailwind.config.js     # Tailwind 設定
├── postcss.config.js      # PostCSS 設定
├── tsconfig.json          # TypeScript 設定
└── package.json           # 專案依賴和腳本
```

## 步驟三：基本設定

### 1. 設定 Tailwind CSS

確保 `globals.css` 包含以下內容：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 其他全域樣式 */
```

### 2. 設定路由結構

在 `src/app` 目錄下建立基本路由：

```
src/app/
├── page.tsx          # 首頁 (/)
├── about/
│   └── page.tsx     # 關於頁面 (/about)
├── projects/
│   └── page.tsx     # 專案頁面 (/projects)
└── blog/
    └── page.tsx     # 部落格頁面 (/blog)
```

### 3. 建立共用元件

例如導航欄（`src/components/Navbar.tsx`）：

```tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">{/* 導航內容 */}</div>
      </div>
    </nav>
  );
};

export default Navbar;
```

## 步驟四：開發與測試

### 1. 啟動開發伺服器

```bash
npm run dev
```

訪問 `http://localhost:3000` 查看網站。

### 2. 建置專案

```bash
npm run build
```

### 3. 啟動生產環境伺服器

```bash
npm run start
```

## 常見問題與解決方案

### Q1: Node.js 版本不相容

**問題**：出現 "You are using Node.js [version]. For Next.js, Node.js version '^18.18.0 || ^19.8.0 || >= 20.0.0' is required" 錯誤。

**解決方案**：

1. 使用 nvm 安裝正確版本：
   ```bash
   nvm install 20
   nvm use 20
   ```
2. 重新安裝依賴：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Q2: Tailwind CSS 樣式未生效

**問題**：頁面沒有套用 Tailwind 樣式。

**解決方案**：

1. 確認 `globals.css` 正確引入 Tailwind：
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
2. 檢查 `tailwind.config.js` 的 content 設定是否正確。
3. 重新建置專案。

## 下一步

- 添加更多頁面和功能
- 設定 SEO
- 添加動態路由
- 整合資料庫（如果需要）
- 部署到生產環境
