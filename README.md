# School Management Mini-Project

## Description
This is a **mini-project** for a Web Development assignment using Next.js (React) and MySQL.  
The project consists of two pages:  
1. **Add School Page** (`addSchool.jsx`) – A form to input and store school data.  
2. **Show Schools Page** (`showSchools.jsx`) – A page to display the list of schools from the database.

## Features
- Form to add schools with fields: name, address, city, state, contact number, email, and image.  
- Validation on form inputs (e.g., email validation).  
- Upload school image to the folder `schoolImages`.  
- Responsive design for both mobile and desktop.  
- Display schools like an e-commerce product listing (showing name, address, city, and image).  

## Database Configuration
The project uses a MySQL database table named `schools` with the following fields:

```
id          INT AUTO_INCREMENT PRIMARY KEY
name        TEXT
address     TEXT
city        TEXT
state       TEXT
contact     NUMBER
image       TEXT
email_id    TEXT
```

Set your database connection in the `.env` file:

```
DB_HOST=localhost
DB_USER=schooluser
DB_PASSWORD=School@123
DB_NAME=school_db
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <your-github-repo-url>
   ```
2. Navigate to the project folder:
   ```
   cd schoolproject
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up the database using the `.env` values mentioned above.
5. Run the project:
   ```
   npm run dev
   ```
   (Next.js development server)

## Submission
- GitHub repository URL: https://github.com/swatistack/schoolproject  

## Notes
- The project is responsive for both phones and desktops.  
- Images are stored in the folder `schoolImages`.  
- Form validations are implemented using `react-hook-form`.  
