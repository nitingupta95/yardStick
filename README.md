# Budget Tracker Application
 

A modern budgeting and expense tracking application with intuitive visualizations and financial insights.

## Features

- 📊 Interactive dashboard with charts and metrics
- 💰 Budget creation and management
- 🛒 Transaction tracking and categorization
- 📈 Monthly spending analysis
- 🏦 Support for Indian financial systems (UPI, NetBanking)
- 📱 Mobile-responsive design

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Styling**: CSS Modules
- **Build Tool**: Vite (if applicable)

## Project Structure



budget-tracker/
├── app/
│ ├── dashboard/ # Dashboard components
│ │ ├── BudgetChart.tsx
│ │ ├── CategoryPieChart.tsx
│ │ ├── MonthlyBarChart.tsx
│ │ └── SummaryCard.tsx
│ ├── transaction/ # Transaction management
│ │ ├── Transaction.tsx
│ │ └── TransactionForm.tsx
│ └── (other pages)
├── components/
│ ├── ui/ # UI components
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ └── ...
│ └── (other components)
├── public/ # Static assets
├── styles/ # Global styles
└── README.md



## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher) or yarn
- Git (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/budget-tracker.git 
```
2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
``` 
3. Start the development server:
    ```bash
    npm run dev     
    # or
    yarn dev

4. Open your web browser and navigate to `http://localhost:3000`

```

## Configuration
Create a .env.local file in the root directory with your environment variables:
    ```bash
    MONGODB_URI=your_mongodb_connection_string 
```
## Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

## License
Distributed under the MIT License. See LICENSE for more information.

## Contact
Nitin Gupta - @nitingupta95 - ng61315@gmail.com

## Project Link: https://github.com/nitingupta95/yardStick