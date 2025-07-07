# Budget Tracker Application

![App Screenshot](./public/screenshot.png) <!-- Add your screenshot file -->

A comprehensive personal finance manager with powerful visualization tools for tracking budgets and expenses.

## Key Features

### Dashboard
- 📊 Real-time spending analytics
- 📈 Interactive monthly trend charts
- 💰 Budget vs actual comparison
- 🏆 Financial health scoring

### Transactions
- 🛒 Smart transaction categorization
- 🔍 Advanced search and filtering
- 📅 Date-range reporting
- 🧾 Receipt image capture support

### Budgets
- 🗓️ Flexible budgeting periods
- 🔔 Overspending alerts
- 🔄 Recurring budget templates
- 🎯 Savings goal tracking

## Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 14 | App framework |
| React 18 | UI components |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Recharts | Data visualization |
| Lucide | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| MongoDB | Database |
| Mongoose | ODM |

## Project Structure

```text
yardStick/
├── app/ 
│   ├── dashboard/           # Dashboard pages
│   │   ├── analytics/       # Analytics subpages
│   │   └── page.tsx         # Main dashboard
│   ├── transactions/        # Transaction management
│   ├── budgets/             # Budget management
│   └── api/                 # API routes
├── components/
│   ├── charts/              # Chart components
│   ├── forms/               # Form components
│   └── ui/                  # UI primitives
├── lib/                     # Utility functions
├── public/                  # Static assets
├── styles/                  # Global styles
└── types/                   # Type definitions
```



## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher) or yarn
- Git (optional)

### Installation
 
   ```bash
   # Clone repository
git clone https://github.com/nitingupta95/yardStick.git
cd yardStick

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# running the application
npm run dev
 
```
### Configuration
Edit .env.local with your settings:

    ```bash
    MONGODB_URI=your_mongodb_connection_string 
```

``

## Contributing to the project
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Open a pull request

## License
Distributed under the MIT License. See LICENSE for more information.

## Contact
Nitin Gupta - @nitingupta95 - ng61315@gmail.com

## Project Link: https://github.com/nitingupta95/yardStick