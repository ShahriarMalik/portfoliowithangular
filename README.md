```markdown
# Portfolio Projects

This repository contains the frontend and backend for the portfolio projects. The frontend is built with Angular, and the backend is built with PHP and PostgreSQL.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend

1. Clone the repository:

   ```sh
   git clone https://github.com/ShahriarMalik/portfoliowithangular.git
   cd portfoliowithangular/backend
   ```

2. Install dependencies using Composer:

   ```sh
   composer install
   ```

### Frontend

1. Navigate to the frontend directory:

   ```sh
   cd ../frontend
   ```

2. Install dependencies using npm:

   ```sh
   npm install
   ```

## Configuration

### Backend

1. Copy the example environment file and update it with your configuration:

   ```sh
   cp .env.example .env
   ```

2. Edit the `.env` file to match your database configuration:

   ```env
   DB_HOST=your-ec2-public-ip
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=admin
   DB_PASSWORD=yourpassword
   ```

### Frontend

1. Configure the API endpoint in your Angular environment files (e.g., `src/environments/environment.ts`).

## API Endpoints

### Create Submission

- **URL**: `/create_submission.php`
- **Method**: `POST`
- **Description**: Creates a new contact form submission.
- **Request Body**:

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, this is a test message."
  }
  ```

- **Response**:

  - `200 OK`: Submission was successful.
  - `400 Bad Request`: Invalid input.
  - `500 Internal Server Error`: Failed to insert data into the database.

## Database Setup

1. Ensure your PostgreSQL database is running and accessible.
2. Run the `setup_database.php` script to set up the database schema:

   ```sh
   cd backend
   php setup_database.php
   ```

## Usage

### Backend

1. Start the backend server (e.g., using Apache or Nginx).

### Frontend

1. Start the frontend development server:

   ```sh
   cd frontend
   ng serve
   ```

2. Access the application in your browser at `http://localhost:4200`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Frontend Project Structure

### Directories and Files

- `.angular`: Angular CLI configuration files.
- `.vscode`: Visual Studio Code workspace settings.
- `src`: Source files for the Angular application.
- `angular.json`: Angular CLI configuration.
- `package.json`: npm package configuration.
- `package-lock.json`: npm dependency tree.
- `tsconfig.app.json`: TypeScript configuration for the Angular application.
- `tsconfig.json`: TypeScript configuration.
- `tsconfig.spec.json`: TypeScript configuration for testing.

### Angular Modules

- `app-routing.module.ts`: Application routing configuration.
- `app.module.ts`: Root application module.
- `app.component.ts`: Root application component.
- `app.component.html`: Root application component template.
- `app.component.css`: Root application component styles.
- Other directories contain feature modules and components.

## Additional Notes

1. **File Upload to S3**:
   - Upload the contents of the `dist` folder to an S3 bucket.
   - Ensure the S3 bucket is configured to serve static websites.

2. **CloudFront Distribution**:
   - Create a CloudFront distribution for better performance and security.
   - Use the S3 website endpoint as the origin for the CloudFront distribution.

3. **CORS Configuration**:
   - Update your PHP backend to restrict API access to requests coming from your S3 or CloudFront URL.

4. **HTTPS Configuration**:
   - Ensure your CloudFront distribution is configured to use HTTPS for secure communication.
```
