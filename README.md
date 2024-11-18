# **Safar Karo: Travel Website**  

*Dream | Explore | Discover*  

---

## **Overview**  
**Safar Karo** is a modern travel booking platform designed to transform how people explore the world. Our mission is simple: to inspire travelers to dream big, explore new horizons, and discover the beauty of domestic and international destinations.  

This project seamlessly combines **ReactJS** for an intuitive frontend with the robust backend capabilities of **Django REST Framework**, offering a dynamic and user-friendly experience.  

With **Safar Karo**, users can:  
- Browse meticulously crafted travel packages.  
- View all essential details, from itineraries to prices, before making an informed choice.  
- Enjoy a smooth booking process that includes traveler details and receipt generation.  
- Access a personalized dashboard to manage past bookings and download receipts.  

Embark on your journey with **Safar Karo** and let your adventures begin!  

---

## **Table of Contents**  
1. [Overview](#overview)  
2. [Video](#video)  
3. [Features](#features)  
4. [Screenshots](#screenshots)  
5. [Technologies](#technologies)  
6. [Setup Instructions](#setup-instructions)  
7. [Website Flow](#website-flow)  

---

## **Video**  
🎥 Watch the video tutorial for project in action : <br> <br>
**Website Outlook**

[SafarVideo1.webm](https://github.com/user-attachments/assets/f8c056d0-60d9-40b7-94cd-61368ab36e4e)

**Website Outlook**

[safarVideo2.webm](https://github.com/user-attachments/assets/66a74707-3e6d-446c-a5b6-5edad83e6c06)

**Mail Confirmation**

[safarVideo3.webm](https://github.com/user-attachments/assets/b39e828d-98b0-4f12-b91d-94ed3e0553c4)

---

## **Features**  

- **Home Page**  
  - Discover top domestic and international destinations with user testimonials for added trust.  

- **Detailed Tour Pages**  
  - View tour-specific information such as itineraries, travel dates, prices, and terms & conditions.  

- **Booking Process**  
  - Complete the booking in a few simple steps, including filling in traveler details and confirming.  
  - Receive an automated confirmation email with booking details and a receipt.  

- **User Authentication & Dashboard**  
  - Sign up and log in to manage your travel plans.  
  - View your booking history and download receipts anytime.  

---

## **Screenshots**  

### 1. **Login Page**  
Explore curated domestic and international destinations.  

 <img src="https://github.com/user-attachments/assets/48b6e068-0916-4ad9-b7d5-b12eab95654e" alt="Screenshot 3" width="80%" height="60%" />

### 2. **Home Page**  
Explore curated domestic and international destinations.  

<p >
  <img src="https://github.com/user-attachments/assets/9ca27190-ecd2-4793-8050-23fc6e8c3842" alt="Screenshot 1" width="45%" height="60%" />
  <img src="https://github.com/user-attachments/assets/a1c9992a-34a2-472f-a251-564423167579" alt="Screenshot 2" width="45%"  height="60%"/>
</p>

### 3. **Tour Details Page**  
Get all the details about your chosen destination.  

<p align="">
  <img src="https://github.com/user-attachments/assets/aea9c8c3-977a-4c86-9dce-6324114c09b4" alt="Screenshot 1" width="90%"  />

  <img src="https://github.com/user-attachments/assets/4f99517b-1dd0-4aa4-9505-e2e96067249f" alt="Screenshot 1" width="90%" height="60%" />
    
  <img src="https://github.com/user-attachments/assets/f48c2a44-d45b-499a-8459-0ffeea197a20" alt="Screenshot 2" width="90%"  height="60%"/>
</p>

### 4. **About and Contact us Page**  
Get to know the Travel company and contact information. 

<p align="">
  <img src="https://github.com/user-attachments/assets/d88a87b4-f9a2-41ef-a9d9-92513df30d97" alt="Screenshot 1" width="90%"  />

  <img src="https://github.com/user-attachments/assets/5b9b5d7e-32cf-4158-9cd4-e9fe2a680bd7" alt="Screenshot 1" width="90%" height="60%" />
</p> 

### 5. **Payment Page**  
Make payment for your booking here.

 <img src="https://github.com/user-attachments/assets/015c0f99-de56-411f-aa56-7ce096572be5" alt="Screenshot 3" width="80%" height="60%" />

### 6. **User Dashboard**  
Manage your bookings and download receipts.  

 <img src="https://github.com/user-attachments/assets/0252b375-d50d-45b6-b0a9-1e50ef98e186" alt="Screenshot 3" width="80%" height="60%" />

<img src="https://github.com/user-attachments/assets/9271dee6-373a-4d94-83f8-b96b2b403276" alt="Screenshot 3" width="80%" height="60%" />


---

## **Technologies**  

### **Frontend**  
- ReactJS  
- HTML5, CSS3, Bootstrap  

### **Backend**  
- Python (Django & Django REST Framework)  

### **Database**  
- SQLite  

---

## **Setup Instructions**  

### **Clone the Repository**  
```bash
git clone https://github.com/yourusername/safarkaro.git
cd safarkaro
```
### **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

### **Access the Application**
   • Frontend: http://localhost:3000 <br> 
   • Backend: http://localhost:8000

### **Website Flow**
```mermaid
graph TD
    A[Home Page] --> B[Tour Details Page]
    B --> C[Traveller Details Form]
    C --> D[Confirmation Screen]
    D --> E[Booking Confirmation Email]
    E --> F[User Dashboard]
    F --> G[View Past Bookings]
    F --> H[Download Receipts]
    A --> I[User Authentication]
    I --> F
```

### **Data Models and Relationships**
The following diagram illustrates the key data models used in the project and their relationships with each other, including bookings, travelers, payments, and tour packages.

```mermaid
erDiagram
    User ||--o{ Booking : "has"
    Booking ||--o{ Traveller : "has"
    Booking ||--o{ Payment : "has"
    Booking ||--|| Domestic : "references"
    Booking ||--|| International : "references"
    Traveller ||--|| Booking : "belongs to"
    Payment ||--|| Booking : "belongs to"
    Packages_india {
        string package_name PK
        string img_poster
    }
    Packages_international {
        string package_name PK
        string img_poster
        text description
    }
    Domestic {
        string destination PK
        decimal price
        string days
        string nights
        string img_path
        text highlights
        text overview
        text itinerary
        text dates
    }
    International {
        string destination PK
        decimal price
        string days
        string nights
        string img_path
        text highlights
        text overview
        text itinerary
        text dates
    }
    Contact {
        string name
        email email
        integer mobile
        text message
    }
    User {
        integer id PK
        string username
    }
    Booking {
        string booking_id PK
        date booking_date
        string destination
        integer no_of_travellers
        integer travel_date
        string tour
    }
    Traveller {
        integer traveller_id PK
        string name
        integer age
        email email
        integer mobile
        string country
        string pancard
        string passportNo
        date issueDate
    }
    Payment {
        integer payment_id PK
        decimal amount
        date date
        string credit
    }
```
