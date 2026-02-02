import React from 'react';
import { Card } from 'antd';

function NotFoundPage() {
  return (
    <div style={{ padding: '20px' }}>
      <Card title="404 Not Found">
        <p>The page you are looking for does not exist.</p>
      </Card>
    </div>
  );
}

export default NotFoundPage;
