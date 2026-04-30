GIACOM Group 3 

## Overview

This project is a React frontend built with Vite and styled using Bootstrap. It connects to an Azure-hosted backend (API/services).

* Frontend: React + Vite + Bootstrap
* Backend: Azure

---
Login details to the system:

Admin Account:
Username: Admin-1287
Password: Auth6321-1

Customer Account:
Username: acme_it_ops
Password: acme-DES-9

## Prerequisites

* Node.js (v18+ recommended)
* npm or yarn
* Azure account (for deployment)

---

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root:

   ```env
   VITE_API_URL
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser:

   ```
   http://localhost:5173
   ```

---
## Project Architecture
1. src/api/: Contains the fetch logic to communicate with the Azure backend.
2. src/ components/: UI used across the entire site such as navbar.
3. src/css/: Styling for all pages across the quote generator.
4. src/pages/: Main page and view logic that handles things such as calculation.
5. GiacomBackend-master/Dtos/: Files like (QuoteCreateDto) will be the exact data structure required for API requests to run securely.
6. GiacomBackend-master/Controllers/: These handle entry points to the frontend such as (QuotesController.cs) Which are controllers that process logic such as quote logic.
7. GiacomBackend-master/Migrations/: Used for database migration. Track history of the database schema.

## Build

To create a production build:

```bash
npm run build
```

The output will be generated in the `dist/` folder.

---

## Deployment

### Frontend (Vite)

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist/` folder to Azure:

Step 1: Push code to a GitHub or Azure DevOps repository
Step 2: Create "Static Web App" in Azure Portal
Step 3: Link repository to the Azure Portal. Which will allow Azure to detect VITE and create a link that builds and deploys after every push.
Step 4: Add the VITE_API_URL to the configuration to the Azure Portal.

3. Deploy with Azure CLI block
Automated Deployment: The backend utilises GitHub Actions (.github/workflows/) to automate build and deployment
Trigger: Each push to master branch will automatically update the Azure Web App Service
---

## Environment Variables

| Variable     | Description              |
| ------------ | ------------------------ |
| VITE_API_URL | Base URL for backend API |

---

## Backend (Azure)

The backend is hosted on Azure.

Ensure the following are configured:

* ASP.NET Core Web API
* Database ORM: Framework to run SQL Server migrations
* Authenticator: JWT (JSON Web Tokens) via JwtService.cs
*Storage: Azure Blob Storage deals with file attachments

---

## Troubleshooting

**Blank page after deployment**
Ensure base of vite.config.js is the exact same as deployment path
Sometimes clearing browser cache will also help.

**API requests failing**
Verify there is a valid .env file in the root of the folder and VITE_API_URL includes "https://".
Ensure Azure App Service is running and database connection in appsettings.json is correct

**CORS errors**
Add Frontend URL to allowed origins on the Azure Portal for Backend App Service
For local testing make sure http://localhost:5173 is added to Azure CORS settings

## Endpoint List
1. /api/auth/login: Used to handle user session and JWT generation
2. /api/tickets: Used to manage IT support requests
3. /api/quotes: Used to create and update quote prices for resolving tickets
4. /api/attachments: Upload and download files to and from the Azure Blob Storage
5. /api/logs: Used to track system activity and audit trails
