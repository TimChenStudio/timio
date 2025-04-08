# Next.js SEO 和 Google Analytics 設定指南

本指南將說明如何在 Next.js 專案中設定 SEO 和 Google Analytics，以優化網站的搜尋引擎排名和追蹤訪客數據。

## SEO 設定

### 1. 基本 Metadata 設定

在 `src/app/layout.tsx` 中設定基本的 metadata：

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "你的網站名稱",
    template: "%s | 你的網站名稱",
  },
  description: "你的網站描述",
  keywords: ["關鍵字1", "關鍵字2"],
  authors: [{ name: "你的名字" }],
  creator: "你的名字",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://你的網站網址",
    title: "你的網站名稱",
    description: "你的網站描述",
    siteName: "你的網站名稱",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
```

### 2. 頁面專屬 Metadata

在各個頁面中設定專屬的 metadata：

```tsx
// src/app/blog/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  return {
    title: "文章標題",
    description: "文章描述",
    openGraph: {
      title: "文章標題",
      description: "文章描述",
      type: "article",
      publishedTime: "發布時間",
    },
  };
}
```

### 3. robots.txt 設定

在 `public` 資料夾中建立 `robots.txt`：

```txt
User-agent: *
Allow: /
Sitemap: https://你的網站網址/sitemap.xml
```

### 4. sitemap.xml 生成

安裝 `next-sitemap`：

```bash
npm install next-sitemap
```

建立 `next-sitemap.config.js`：

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://你的網站網址",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: "./out",
};
```

在 `package.json` 中添加建置後腳本：

```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

## Google Analytics 設定

### 1. 建立 Google Analytics 帳戶

1. 前往 [Google Analytics](https://analytics.google.com/)
2. 建立新的帳戶和資源
3. 取得 Measurement ID（格式如：G-XXXXXXXXXX）

### 2. 建立 Analytics 元件

建立 `src/components/Analytics.tsx`：

```tsx
"use client";

import Script from "next/script";

export default function Analytics() {
  const measurementId = "G-XXXXXXXXXX"; // 替換成你的 Measurement ID

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
```

### 3. 將 Analytics 添加到應用程式

在 `src/app/layout.tsx` 中引入：

```tsx
import Analytics from "@/components/Analytics";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 進階 SEO 優化

### 1. 結構化資料（Schema Markup）

為部落格文章添加結構化資料：

```tsx
// src/app/blog/[slug]/page.tsx
export default function BlogPost() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "文章標題",
    datePublished: "發布時間",
    author: {
      "@type": "Person",
      name: "作者名稱",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 文章內容 */}
    </>
  );
}
```

### 2. 效能優化

1. 使用 Next.js 的圖片元件優化圖片：

```tsx
import Image from "next/image";

export default function OptimizedImage() {
  return (
    <Image
      src="/path/to/image.jpg"
      alt="描述文字"
      width={800}
      height={600}
      priority={true} // 對於首屏圖片
    />
  );
}
```

2. 使用動態載入減少首次載入大小：

```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  loading: () => <p>載入中...</p>,
});
```

## 監控與分析

### 1. Google Analytics 報表

重要的監控指標：

- 頁面瀏覽量（Pageviews）
- 平均工作階段時間（Avg. Session Duration）
- 跳出率（Bounce Rate）
- 使用者來源（Traffic Sources）
- 使用者行為流程（User Flow）

### 2. 效能監控

使用 [Web Vitals](https://web.dev/vitals/) 追蹤關鍵指標：

```tsx
export function reportWebVitals(metric: any) {
  if (metric.label === "web-vital") {
    gtag("event", metric.name, {
      value: Math.round(metric.value),
      event_category: "Web Vitals",
    });
  }
}
```

## 最佳實踐

1. 定期檢查 Google Search Console 的效能報告
2. 監控並改善核心網頁指標（Core Web Vitals）
3. 確保所有頁面都有適當的 meta 標籤
4. 優化圖片和其他媒體資源
5. 實作響應式設計以支援行動裝置
6. 定期檢查並更新網站地圖
7. 確保網站具有良好的內部連結結構
