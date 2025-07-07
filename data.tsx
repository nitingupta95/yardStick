import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Calendar,
  IndianRupee,
  PiggyBank,
  TrendingUp,
  Wallet,
  Shield,
  Bell,
} from "lucide-react";

// Stats Data - Updated for personal finance metrics
export const statsData = [
  {
    value: "₹50K+",
    label: "Total Budgets Created",
    icon: () => <PiggyBank className="h-6 w-6 text-green-600" />,
  },
  {
    value: "1M+",
    label: "Transactions Tracked",
    icon: () => <CreditCard className="h-6 w-6 text-blue-600" />,
  },
  {
    value: "95%",
    label: "Savings Improved",
    icon: () => <TrendingUp className="h-6 w-6 text-emerald-600" />,
  },
  {
    value: "4.8/5",
    label: "User Satisfaction",
    icon: () => <Shield className="h-6 w-6 text-amber-600" />,
  },
];

// Features Data - Focused on budgeting and transactions
export const featuresData = [
  {
    icon: () => <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Budget Visualization",
    description: "Interactive charts to track your budget vs actual spending",
  },
  {
    icon: () => <Receipt className="h-8 w-8 text-blue-600" />,
    title: "Transaction Management",
    description: "Easily add, edit, and categorize all your transactions",
  },
  {
    icon: () => <PieChart className="h-8 w-8 text-blue-600" />,
    title: "Spending Analysis",
    description: "Breakdown of expenses by category with visual charts",
  },
  {
    icon: () => <Calendar className="h-8 w-8 text-blue-600" />,
    title: "Monthly Tracking",
    description: "Compare monthly spending patterns and trends",
  },
  {
    icon: () => <IndianRupee className="h-8 w-8 text-blue-600" />,
    title: "Currency Support",
    description: "Native support for Indian Rupee with proper formatting",
  },
  {
    icon: () => <Bell className="h-8 w-8 text-blue-600" />,
    title: "Budget Alerts",
    description: "Get notified when approaching budget limits",
  },
];

// How It Works Data - Updated for your workflow
export const howItWorksData = [
  {
    icon: () => <Wallet className="h-8 w-8 text-blue-600" />,
    title: "1. Set Your Budget",
    description: "Create monthly budgets for different spending categories",
  },
  {
    icon: () => <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "2. Record Transactions",
    description: "Add expenses manually or import from bank statements",
  },
  {
    icon: () => <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "3. Monitor & Adjust",
    description: "Track your spending against budgets and adjust as needed",
  },
];


 
export const testimonialsData = [
  {
    name: "Priya Sharma",
    role: "Small Business Owner (Delhi)",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "This app has revolutionized how I manage my boutique finances. The budget tracking helps me maintain healthy cash flow during seasonal fluctuations.",
  },
  {
    name: "Rahul Patel",
    role: "Freelance Developer (Bangalore)",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "As a freelancer with multiple clients, the transaction categorization saves me hours during tax season. GST-compliant reports are a lifesaver!",
  },
  {
    name: "Ananya Gupta",
    role: "Financial Consultant (Mumbai)",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "I recommend this to all my clients. The Rupee-focused analytics and local bank integration make it perfect for Indian financial planning.",
  },
  {
    name: "Vikram Singh",
    role: "Startup Founder (Hyderabad)",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    quote:
      "The expense tracking with Indian payment modes like UPI and NetBanking helps me monitor my burn rate accurately. Essential for any Indian startup!",
  },
  {
    name: "Neha Joshi",
    role: "Homemaker (Chennai)",
    image: "https://randomuser.me/api/portraits/women/77.jpg",
    quote:
      "Managing household budgets became so much easier with the monthly spending analysis. I can now plan better for school fees and family expenses.",
  },
];