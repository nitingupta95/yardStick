"use client";
import React, { useEffect, useState } from 'react';
import { TransactionFormData } from '../../../types/transaction';
import BudgetChart from './BudgetChart';
import CategoryPieChart from './CategorypieChart';
import MonthlyBarChart from './MonthlyBarchart';
import SummaryCard from './SummaryCard';
import axios from "axios";
import {
  IndianRupee,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Calendar,
  Download,
  Search
} from 'lucide-react';

interface DashboardProps {
  transactions?: TransactionFormData[];
}

type BudgetSummary = {
  month: string;
  budget: number;
  spent: number;
  remaining: number;
};

const Dashboard: React.FC<DashboardProps> = ({ transactions = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [budgetData, setbudgetdata] = useState<BudgetSummary[]>([]);

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const avgTransaction = transactions.length > 0 ? totalExpenses / transactions.length : 0;
  const transactionCount = transactions.length;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/budget");

      const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const transactionsByMonth: Record<number, TransactionFormData[]> = {};
      transactions.forEach(t => {
        const month = new Date(t.date).getMonth();
        if (!transactionsByMonth[month]) {
          transactionsByMonth[month] = [];
        }
        transactionsByMonth[month].push(t);
      });

      const summary: BudgetSummary[] = [];

      monthMap.forEach((monthName, monthIndex) => {
        const monthBudgets = res.data.filter((b: { startDate: string }) => {
          const budgetMonth = new Date(b.startDate).getMonth();
          return budgetMonth === monthIndex;
        });

        if (monthBudgets.length > 0) {
          const totalBudget = monthBudgets.reduce((sum: number, b: { amount: number }) => sum + b.amount, 0);
          const totalSpent = transactionsByMonth[monthIndex]?.reduce((sum, t) => sum + t.amount, 0) || 0;
          const totalRemaining = totalBudget - totalSpent;

          summary.push({
            month: monthName,
            budget: totalBudget,
            spent: totalSpent,
            remaining: totalRemaining > 0 ? totalRemaining : 0
          });
        }
      });

      setbudgetdata(summary);
    };

    fetchData();
  }, [transactions]);

  const currentMonth = new Date().toLocaleString('default', { month: 'short' });
  const currentBudget = budgetData.find(b => b.month === currentMonth);
  const monthlyBudget = currentBudget?.budget ?? 0;

  const categoryData = transactions.reduce((acc, transaction) => {
    const category = transaction.category || 'Other';
    const existing = acc.find(item => item.name === category);
    if (existing) {
      existing.value += transaction.amount;
    } else {
      acc.push({
        name: category,
        value: transaction.amount,
        color: '#3b82f6'
      });
    }
    return acc;
  }, [] as Array<{ name: string; value: number; color: string }>);

  const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 
  const monthlyData = monthMap.map((month, index) => { 
    const monthExpenses = transactions
      .filter(t => new Date(t.date).getMonth() === index)
      .reduce((sum, t) => sum + t.amount, 0); 
    const monthBudget = budgetData.find(b => b.month === month)?.budget ?? 0;

    return {
      month,
      income: monthBudget,
      expenses: monthExpenses,
      net: monthBudget - monthExpenses
    };
  });

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || transaction.category === selectedCategory;

    let matchesDate = true;
    if (dateRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = new Date(transaction.date) >= weekAgo;
    } else if (dateRange === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesDate = new Date(transaction.date) >= monthAgo;
    }

    return matchesSearch && matchesCategory && matchesDate;
  });

  const categories = [...new Set(transactions.map(t => t.category).filter(Boolean))];

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
            <p className="text-gray-600">Track your spending and manage your budget</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all">
              <Calendar className="w-4 h-4" />
              This Month
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            title="Total Expenses"
            value={<div className="flex items-center gap-1"><IndianRupee className="w-4 h-4" />{totalExpenses.toFixed(2)}</div>}
            change={12.5}
            changeLabel="vs last month"
            icon={IndianRupee}
            color="blue"
            trend="up"
          />

          <SummaryCard
            title="Monthly Budget"
            value={<div className="flex items-center gap-1"><IndianRupee className="w-4 h-4" />{monthlyBudget.toFixed(2)}</div>}
            change={-5.2}
            changeLabel="under budget"
            icon={PiggyBank}
            color="green"
            trend="down"
          />

          <SummaryCard
            title="Avg Transaction"
            value={<div className="flex items-center gap-1"><IndianRupee className="w-4 h-4" />{avgTransaction.toFixed(2)}</div>}
            change={8.1}
            changeLabel="vs last month"
            icon={CreditCard}
            color="purple"
            trend="up"
          />

          <SummaryCard
            title="Total Transactions"
            value={transactionCount.toString()}
            change={15.3}
            changeLabel="this month"
            icon={TrendingUp}
            color="orange"
            trend="up"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BudgetChart data={budgetData} />
          <CategoryPieChart data={categoryData} />
        </div>

        <div className="grid grid-cols-1 gap-8">
          <MonthlyBarChart data={monthlyData} />
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
            <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>
          </div>

          {/* Transactions */}
          <div className="p-6">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <CreditCard className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-600">No transactions found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTransactions.slice(0, 10).map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{transaction.description}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(transaction.date).toLocaleDateString()}
                        {transaction.category && ` • ${transaction.category}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        <IndianRupee />{transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
