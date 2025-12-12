import React, { useState } from 'react';

const Tabs = ({
  tabs = [],
  defaultTab = 0,
  onChange,
  className = '',
  variant = 'default',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index, tabs[index]);
    }
  };

  const variants = {
    default: {
      active: 'border-[#238ae9] text-[#238ae9]',
      inactive: 'border-transparent text-gray-600 hover:text-[#242424]',
    },
    underline: {
      active: 'border-b-2 border-[#238ae9] text-[#238ae9]',
      inactive: 'border-b-2 border-transparent text-gray-600 hover:text-[#242424]',
    },
    pills: {
      active: 'bg-[#238ae9] text-white',
      inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    },
  };

  const variantStyles = variants[variant] || variants.default;

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div
        className={`
          flex border-b border-gray-200 mb-4
          ${variant === 'pills' ? 'gap-2 border-b-0' : ''}
        `}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`
              px-4 py-2 font-semibold font-['Satoshi'] text-sm
              transition-colors
              ${variant === 'pills' ? 'rounded-lg' : 'border-b-2'}
              ${
                activeTab === index
                  ? variantStyles.active
                  : variantStyles.inactive
              }
            `}
          >
            {tab.label}
            {tab.badge && (
              <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {tabs[activeTab]?.content && (
          <div className="animate-fadeIn">{tabs[activeTab].content}</div>
        )}
      </div>
    </div>
  );
};

export default Tabs;

