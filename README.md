# vite-spring-boot-demo

一个极简的 **Vite(React+TypeScript)** 前端 + **Spring Boot(Java)** 后端示例项目，用于演示：

- 前端输入 `name`，点击按钮后调用后端 `POST /api/hello`
- 后端返回 JSON：`{"message":"Hello, {name}! 来自Spring Boot后端"}`
- 前端展示返回结果

## 目录结构

- `frontend/`：Vite React + TypeScript
- `backend/`：Spring Boot（Maven），端口 8080（默认）

## 本地运行

### 1) 启动后端（8080）

```bash
cd backend
./mvnw spring-boot:run
```

Windows PowerShell 可用：

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

### 2) 启动前端（5173）

```bash
cd frontend
npm install
npm run dev
```

打开 `http://localhost:5173`，输入 name 点击按钮即可看到结果。

## 接口说明

- `POST /api/hello`
- 请求 JSON：`{ "name": "Tom" }`
- 响应 JSON：`{ "message": "Hello, Tom! 来自Spring Boot后端" }`

## 关键环境变量

### 前端

- `VITE_API_BASE_URL`
  - **本地**：可不设置（使用 Vite 代理转发到 `http://localhost:8080`）
  - **线上**（Zeabur 前端服务）：设置为后端公网地址，例如 `https://<your-backend-domain>`

### 后端

- `PORT`：监听端口（默认 8080）
- `ALLOWED_ORIGINS`：允许跨域的来源，逗号分隔（默认仅 `http://localhost:5173`）
  - 上线后请把 Zeabur 前端域名也加进去，例如：`http://localhost:5173,https://<your-frontend-domain>`

## Zeabur 部署（两个服务）

### 0) 总体步骤（推荐）

- 在 Zeabur 新建项目，选择 **从 GitHub 导入** `vite-spring-boot-demo`
- 在同一个 Zeabur 项目里创建 **两个服务**：
  - **Backend（Java）**：指向仓库子目录 `backend/`
  - **Frontend（Static/Node 构建）**：指向仓库子目录 `frontend/`
- 部署完成后：
  - 先拿到 **后端服务公网域名**
  - 再在 **前端服务**里设置 `VITE_API_BASE_URL`，触发重新构建
  - 同时在 **后端服务**里把 `ALLOWED_ORIGINS` 加上前端域名，避免线上跨域问题

### 后端服务（Java）

- **工作目录**：`backend/`
- **Build**：`./mvnw -DskipTests package`
- **Start**：`java -jar target/*.jar`
- **端口**：使用环境变量 `PORT`（默认 8080）
- **环境变量建议**：
  - `ALLOWED_ORIGINS`: `https://<your-frontend-domain>`

### 前端服务（Static/Node 构建）

- **工作目录**：`frontend/`
- **Build**：`npm ci && npm run build`
- **Output**：`dist`
- **环境变量**：
  - `VITE_API_BASE_URL`: `https://<your-backend-domain>`

### 常见问题

- **前端能打开但请求失败 / 控制台 CORS 报错**
  - 检查后端服务环境变量 `ALLOWED_ORIGINS` 是否包含你的前端域名（支持逗号分隔多个）
- **前端改了 `VITE_API_BASE_URL` 但仍然指向旧地址**
  - 这是构建期变量：确认前端服务已重新构建并发布最新版本

## GitHub 上传（命令参考）

```bash
git init
git add .
git commit -m "feat: init vite + spring boot demo"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
## 永久让git走代理
git config --global http.proxy  http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

## 不需要时取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy

