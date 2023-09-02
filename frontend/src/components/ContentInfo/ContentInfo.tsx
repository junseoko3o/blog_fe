import React from 'react';
import { Button, Typography, Space, Divider } from 'antd';
import { useContentInfo } from '../../hooks/contentInfo/useContentInfo';
import { useNavigate } from 'react-router-dom';
import { useContentDelete } from 'hooks/contentDelete/useContentDelete';
import styles from './lib/contentInfo.module.css';

const { Text, Title } = Typography;

const ContentInfo = () => {
  const { contentInfo } = useContentInfo();
  const { handleDelete } = useContentDelete();
  const navigate = useNavigate();

  const handleEditClick = (id: any) => {
    navigate(`/content/edit/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>{contentInfo?.title}</Title>
      <Text style={{ fontSize: '18px' }}>{contentInfo?.content}</Text>
      <Divider />
      <Space>
        <Button type="primary" onClick={() => handleEditClick(contentInfo?.id)} className={styles.button}>
          수정
        </Button>
        <Button type="primary" onClick={handleDelete} className={styles.button}>
          삭제
        </Button>
      </Space>
    </div>
  );
};

export default ContentInfo;
