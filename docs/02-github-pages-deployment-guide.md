# 使用 GitHub Actions 部署 Next.js 到 GitHub Pages

本指南將說明如何使用 GitHub Actions 自動部署 Next.js 專案到 GitHub Pages。

## 前置需求

- 已建立的 Next.js 專案
- GitHub 帳號
- Git 基本知識

## 步驟一：準備專案

### 1. 修改 Next.js 設定

在 `next.config.js` 中添加必要的設定：

```javascript
/** @type {import('next').NextConfig} */
module.exports = {
  output: "export", // 啟用靜態匯出
  basePath: "/你的儲存庫名稱", // 設定基礎路徑
  images: {
    unoptimized: true, // GitHub Pages 不支援圖片優化
  },
};
```

### 2. 確保 package.json 設定正確

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## 步驟二：設定 GitHub 儲存庫

### 1. 建立新的儲存庫

1. 前往 GitHub 並建立新的儲存庫
2. 記下儲存庫名稱（將用於 `next.config.js` 的 `basePath`）

### 2. 初始化並推送程式碼

```bash
# 初始化 Git 儲存庫
git init

# 添加所有檔案
git add .

# 提交變更
git commit -m "Initial commit"

# 設定主分支名稱
git branch -M main

# 添加遠端儲存庫
git remote add origin https://github.com/使用者名稱/儲存庫名稱.git

# 推送程式碼
git push -u origin main
```

## 步驟三：設定 GitHub Actions

### 1. 建立工作流程檔案

在專案根目錄建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main] # 當 main 分支有推送時觸發
  workflow_dispatch: # 允許手動觸發

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 步驟四：啟用 GitHub Pages

1. 前往儲存庫的 Settings 頁面
2. 點擊左側選單的 Pages
3. 在 "Build and deployment" 區段：
   - Source: 選擇 "GitHub Actions"

## 步驟五：驗證部署

1. 推送程式碼後，前往儲存庫的 Actions 頁面查看部署狀態
2. 部署完成後，訪問 `https://使用者名稱.github.io/儲存庫名稱` 查看網站

## 常見問題與解決方案

### Q1: 部署後樣式沒有正確載入

**問題**：網站部署後，CSS 樣式沒有正確顯示。

**解決方案**：

1. 確認 `next.config.js` 中的 `basePath` 設定正確
2. 檢查 `tailwind.config.js` 的設定
3. 重新部署

### Q2: 圖片無法顯示

**問題**：部署後圖片無法正確載入。

**解決方案**：

1. 確保 `next.config.js` 中設定了 `images.unoptimized: true`
2. 使用相對路徑引用圖片
3. 如果使用 `next/image`，確保正確設定了 `src` 屬性

### Q3: 404 錯誤

**問題**：某些頁面顯示 404 錯誤。

**解決方案**：

1. 確認 `basePath` 設定正確
2. 檢查路由設定
3. 確保所有連結都使用了正確的路徑

## 維護與更新

### 後續更新流程

1. 在本地進行修改
2. 提交變更：
   ```bash
   git add .
   git commit -m "你的更新說明"
   git push
   ```
3. GitHub Actions 會自動部署更新

### 監控部署

- 定期檢查 GitHub Actions 的執行狀態
- 查看部署日誌以排查問題
- 設定通知以接收部署狀態的更新

## 安全性考慮

1. 確保沒有敏感資訊在公開儲存庫中
2. 使用環境變數存儲機密資訊
3. 定期更新依賴包以修補安全漏洞

## 最佳實踐

1. 在推送前先在本地測試建置
2. 保持清晰的提交訊息
3. 使用分支進行開發，main 分支保持穩定
4. 定期更新依賴包
5. 保持文件的更新
