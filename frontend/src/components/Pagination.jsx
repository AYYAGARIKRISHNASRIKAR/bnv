import React from 'react';
import { Pagination } from 'antd';

const CustomPagination = ({ 
  current, 
  total, 
  pageSize, 
  onChange, 
  showSizeChanger = false,
  showQuickJumper = true,
  showTotal = true 
}) => {
  const showTotalConfig = showTotal ? 
    (total, range) => `${range[0]}-${range[1]} of ${total} users` : 
    null;

  return (
    <div className="flex justify-center mt-4">
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        showTotal={showTotalConfig}
        showLessItems
      />
    </div>
  );
};

export default CustomPagination;