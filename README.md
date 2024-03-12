# Real-Time Code Collaboration System

This project is a real-time code collaboration system built using React, Express, and Socket.io. 
It allows multiple users to collaborate on editing code in real-time.
Users can join as either mentors or students, with mentors having read-only access to the code while students can edit it.

## Features

- Real-time code collaboration: Changes made by any user are instantly reflected for all others viewing the same code block.
- Role-based access: Users can join as either mentors or students, with mentors having read-only access to the code.
- Simple code block selection: Users can choose from a list of predefined code blocks to work on.

## Installation

  1. Install dependencies for both the server and client:
     cd real-time-code-collaboration
     cd server && npm install
     cd ../client && npm install

  2. Start the server:
     cd ../server && npm start

  3. Start the client:
     cd ../client && npm start

  4. Open your web browser and go to http://localhost:3000 to view the application.

## Usage

Upon opening the application, you'll be presented with a list of code blocks to choose from. Click on a code block to start collaborating.

If you're the first user to join a code block, you'll automatically be assigned the mentor role and have read-only access to the code.

Subsequent users joining the same code block will be assigned the student role and can edit the code.

Changes made by any user will be instantly reflected for all others viewing the same code block.










