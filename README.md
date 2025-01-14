# British Club Kolkata

## Introduction

The British Club Kolkata project is a digital platform developed to streamline club operations and enhance member engagement. It offers a secure e-wallet system, role-based dashboards, and numerous interactive tools to simplify management tasks and improve user experience.

## Features

- **Role-Based Access**:
  - **Admin Dashboard**: Access to full features, including analytics, member management, and transaction monitoring.
  - **Operator Dashboard**: Limited access for managing daily tasks, transactions, and supporting members.

- **eWallet System**:
  - Credit and debit functionality for secure cashless transactions.
  - Real-time balance updates and transaction history accessible to members.
  - Automatic email notifications for each transaction.

- **Analytics and Reporting**:
  - Comprehensive analytics dashboard to track club activity and finances.
  - Export data to Excel for offline analysis and record-keeping.

- **Membership Management**:
  - Add, update, or remove member profiles.
  - Track membership status and send renewal reminders.
  - Digital club cards for each member, complete with a QR code for easy access and verification.

- **Digital Card System**:
  - QR code on digital cards for quick scanning and verification.
  - Send digital cards via email for easy member access.
  - Membership expiry notifications with renewal reminders sent directly to members.

- **Email Notifications**:
  - Transactional emails sent for every e-wallet transaction.
  - Membership expiry and renewal reminders.
  - Digital club card sent via email for convenient access.

## Installation

To set up the British Club Kolkata project locally, follow these steps:

### Prerequisites
- **Node.js** and **npm**
- **MongoDB** database (local or cloud-based)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/British-Club-Kolkata.git
   cd British-Club-Kolkata
   
2. Install Dependencies: Run the following command to install all the dependencies required for the project.
   ```bash
   npm install
   
3. Set Up Environment Variables: Create a .env file in the root directory with the following variables:
   **for client directory**
   ```bash
   REACT_APP_API_URL=http://localhost:5000
   ```
   **for server directory**
   ```bash
   ADMIN_EMAIL=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   CLOUDINARY_NAME=
   DATABASE_NAME=
   DATABASE_URI=
   EMAIL=
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SERVICE=gmail
   ENCRYPTION_KEY=
   HASH_ALGO=
   JWT_SECRET=
   PASSWORD=
   PORT=5000
   SESSION_SECRET=
   ALLOWED_ORIGINS = ["http://localhost:3000"]
   FRONTEND_URL=
   ```
   
4. Run the Application: Use the following command to start the application locally.
   ```bash
   npm start
   
5. Access the Application:
   Open your browser and go to http://localhost:3000 to view the application locally.

Deployment
To deploy this project to Hostinger VPS, follow these steps:

Upload Project Files to the VPS server.
Install Dependencies and start the application on the server.
Set Up the Domain and link it to the server IP.
Configure SMTP for email notifications and set up required environment variables on the server...
