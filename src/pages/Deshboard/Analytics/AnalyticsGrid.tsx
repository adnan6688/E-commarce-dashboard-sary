import React from 'react';
import amountBox from '../../../assets/TkBox.png';
import { ChartNoAxesCombined, ShoppingCart, Wallet } from 'lucide-react';

// Define the shape for each card's unique styling and data
interface ICardConfig {
  title: string;
  value: string;
  percentage: string;
  bg: string;      
  iconBg: string;      
  textColor: string;   
  icon: React.ReactNode;
}

export default function AnalyticsGrid() {
  const cardData: ICardConfig[] = [
    {
      title: 'Total Revenue',
      value: '$1,54,200.00',
      percentage: '+12.5%',
      bg: '#E5F5EA',      // Greenish
      iconBg: '#C6E6D0',
      textColor: '#128635',
      icon: <img src={amountBox} alt="Revenue" className="w-6 h-6" />,
    },
    {
      title: 'Total Orders',
      value: '$45,600',
      percentage: '+8.2%',
      bg: '#E7F3FF',      // Blueish
      iconBg: '#D1E9FF',
      textColor: '#5038DA',
      icon: <ShoppingCart  className="w-6 h-6 text-[#1673B3]" />,
    },
    {
      title: 'Net Profit',
      value: '$85,400.00',
      percentage: '+5.4%',
      bg: '#F4EFFF',      // Purpleish
      iconBg: '#E9DFFF',
      textColor: '#6610F2',
      icon: <Wallet className="w-6 h-6 text-[#5038DA]" />,
    },

    {
      title: 'Conversion Rate',
      value: '14.5%',
      percentage: '+2.1%',
      bg: '#FDECD7',      // Orangish
      iconBg: '#FFF4E5',
      textColor: '#EC7427',
      icon: <ChartNoAxesCombined className="w-6 h-6 text-[#EC7427]" />,
    },
  ];

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          style={{ backgroundColor: card.bg }}
          className="flex px-4 py-5 gap-x-4 rounded-xl transition-transform cursor-pointer"
        >
          {/* Icon Section */}
          <div className="flex items-start pt-1">
            <div
              style={{ backgroundColor: card.iconBg }}
              className="p-3 rounded-lg flex items-center justify-center"
            >
              {card.icon}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-y-1">
            <h1 
              style={{ color: card.textColor }} 
              className="font-semibold text-[16px]"
            >
              {card.title}
            </h1>
            <h2 className="text-[22px] font-bold text-[#1A1A1A]">
              {card.value}
            </h2>
            
            <div className="flex items-center gap-x-2 mt-1">
              <span 
                style={{ color: card.textColor }} 
                className="font-bold text-sm"
              >
                {card.percentage}
              </span>
              <span className="text-[14px] text-[#7D7D7D]">
                Last Month
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}